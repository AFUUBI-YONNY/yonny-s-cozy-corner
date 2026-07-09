import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Clock, RefreshCw, Trash2, Settings, Package } from "lucide-react";
import { getOrders, updateOrderNotification, type Order } from "@/lib/orders";
import { formatPrice } from "@/data/products";
import { cn } from "@/lib/utils";

// Simple PIN protection — change this to something only you know
const ADMIN_PIN = "1234";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Business Arena" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<"orders" | "settings">("orders");
  const [settings, setSettings] = useState({
    ownerPhone: "",
    ownerEmail: "",
    callmebotApiKey: "",
    resendApiKey: "",
  });
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [retrying, setRetrying] = useState<string | null>(null);

  useEffect(() => {
    if (unlocked) {
      setOrders(getOrders());
      const saved = localStorage.getItem("ba-admin-settings");
      if (saved) setSettings(JSON.parse(saved));
    }
  }, [unlocked]);

  const handlePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      setUnlocked(true);
      setPinError(false);
    } else {
      setPinError(true);
      setPin("");
    }
  };

  const refresh = () => setOrders(getOrders());

  const saveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("ba-admin-settings", JSON.stringify(settings));
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2000);
  };

  const clearAllOrders = () => {
    if (!window.confirm("Delete all orders? This cannot be undone.")) return;
    localStorage.removeItem("business-arena-orders-v1");
    setOrders([]);
  };

  const retryNotification = async (order: Order, channel: "email" | "whatsapp") => {
    const key = `${order.id}-${channel}`;
    setRetrying(key);
    try {
      const endpoint = channel === "email" ? "/api/notify" : "/api/whatsapp";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      const data = (await res.json()) as { success: boolean };
      updateOrderNotification(order.id, channel, data.success ? "sent" : "failed");
    } catch {
      updateOrderNotification(order.id, channel, "failed");
    }
    setOrders(getOrders());
    setRetrying(null);
  };

  // PIN gate
  if (!unlocked) {
    return (
      <div className="container-page flex min-h-[70vh] items-center justify-center">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-semibold tracking-tight">Admin access</h1>
          <p className="mt-1 text-sm text-muted-foreground">Enter your PIN to continue</p>
          <form onSubmit={handlePin} className="mt-6 space-y-3">
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="PIN"
              maxLength={8}
              className="w-full rounded-xl border border-hairline bg-background px-4 py-3 text-sm outline-none transition focus:border-foreground"
            />
            {pinError && (
              <p className="text-xs text-red-500">Incorrect PIN. Try again.</p>
            )}
            <button
              type="submit"
              className="w-full rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background"
            >
              Unlock
            </button>
          </form>
        </div>
      </div>
    );
  }

  const stats = {
    total: orders.length,
    emailFailed: orders.filter((o) => o.notifications.email === "failed").length,
    waFailed: orders.filter((o) => o.notifications.whatsapp === "failed").length,
    revenue: orders.reduce((sum, o) => sum + o.total, 0),
  };

  return (
    <div className="container-page py-10 md:py-14">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Admin Panel</h1>
          <p className="mt-1 text-sm text-muted-foreground">Business Arena · Order management</p>
        </div>
        <Link
          to="/"
          className="text-sm text-muted-foreground transition hover:text-foreground"
        >
          ← Back to site
        </Link>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total orders" value={stats.total} />
        <StatCard label="Total revenue" value={formatPrice(stats.revenue)} />
        <StatCard label="Email failures" value={stats.emailFailed} alert={stats.emailFailed > 0} />
        <StatCard label="WhatsApp failures" value={stats.waFailed} alert={stats.waFailed > 0} />
      </div>

      {/* Tabs */}
      <div className="mt-8 flex gap-1 rounded-full border border-hairline bg-surface p-1 w-fit">
        {(["orders", "settings"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition capitalize",
              activeTab === tab
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab === "orders" ? <Package size={14} /> : <Settings size={14} />}
            {tab}
          </button>
        ))}
      </div>

      {/* Orders tab */}
      {activeTab === "orders" && (
        <div className="mt-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{orders.length} order{orders.length !== 1 ? "s" : ""}</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={refresh}
                className="inline-flex items-center gap-1.5 rounded-full border border-hairline px-3 py-1.5 text-xs text-foreground transition hover:bg-surface"
              >
                <RefreshCw size={12} /> Refresh
              </button>
              {orders.length > 0 && (
                <button
                  type="button"
                  onClick={clearAllOrders}
                  className="inline-flex items-center gap-1.5 rounded-full border border-red-200 px-3 py-1.5 text-xs text-red-500 transition hover:bg-red-50"
                >
                  <Trash2 size={12} /> Clear all
                </button>
              )}
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="rounded-2xl border border-hairline bg-surface p-16 text-center">
              <Package size={32} className="mx-auto mb-3 text-muted-foreground" strokeWidth={1.5} />
              <p className="text-sm text-muted-foreground">No orders yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  retrying={retrying}
                  onRetry={retryNotification}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Settings tab */}
      {activeTab === "settings" && (
        <div className="mt-6 max-w-lg">
          <form onSubmit={saveSettings} className="space-y-4">
            <div className="rounded-2xl border border-hairline bg-surface p-6 space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider">Notification recipients</h2>
              <SettingField
                label="Owner WhatsApp number (with country code)"
                placeholder="233592588531"
                value={settings.ownerPhone}
                onChange={(v) => setSettings((s) => ({ ...s, ownerPhone: v }))}
              />
              <SettingField
                label="Owner email address"
                placeholder="yonnyafuubi477@gmail.com"
                value={settings.ownerEmail}
                onChange={(v) => setSettings((s) => ({ ...s, ownerEmail: v }))}
              />
            </div>

            <div className="rounded-2xl border border-hairline bg-surface p-6 space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider">API Keys</h2>
              <p className="text-xs text-muted-foreground">
                These are stored locally and used by the server. Set them as environment variables (<code className="font-mono bg-surface px-1 rounded">RESEND_API_KEY</code>, <code className="font-mono bg-surface px-1 rounded">CALLMEBOT_APIKEY</code>) for production.
              </p>
              <SettingField
                label="Resend API Key (for email)"
                placeholder="re_xxxxxxxxxxxxxxxx"
                value={settings.resendApiKey}
                onChange={(v) => setSettings((s) => ({ ...s, resendApiKey: v }))}
                type="password"
              />
              <div className="rounded-xl bg-surface border border-hairline p-3 text-xs text-muted-foreground">
                <strong className="text-foreground">CallMeBot setup:</strong> To get your free WhatsApp API key,
                send a message to <strong>+34 644 27 15 70</strong> on WhatsApp saying:
                <br /><code className="font-mono">I allow callmebot to send me messages</code>
                <br />You'll receive your API key within a few minutes.
              </div>
              <SettingField
                label="CallMeBot API Key (for WhatsApp)"
                placeholder="123456"
                value={settings.callmebotApiKey}
                onChange={(v) => setSettings((s) => ({ ...s, callmebotApiKey: v }))}
                type="password"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:bg-foreground/90"
            >
              {settingsSaved ? "Saved ✓" : "Save settings"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

function OrderCard({
  order,
  retrying,
  onRetry,
}: {
  order: Order;
  retrying: string | null;
  onRetry: (order: Order, channel: "email" | "whatsapp") => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const date = new Date(order.createdAt).toLocaleString("en-GH", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

  return (
    <div className="rounded-2xl border border-hairline bg-background overflow-hidden">
      {/* Header row */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between gap-4 p-4 text-left hover:bg-surface transition"
      >
        <div className="min-w-0">
          <p className="text-sm font-medium">{order.id}</p>
          <p className="text-xs text-muted-foreground">{date} · {order.customer.firstName} {order.customer.lastName} · {order.customer.phone}</p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="text-sm font-semibold">{formatPrice(order.total)}</span>
          <NotifBadge status={order.notifications.email} label="Email" />
          <NotifBadge status={order.notifications.whatsapp} label="WA" />
          <span className="text-xs text-muted-foreground">{expanded ? "▲" : "▼"}</span>
        </div>
      </button>

      {/* Expanded details */}
      {expanded && (
        <div className="border-t border-hairline px-4 pb-4 pt-3 space-y-4 text-sm">
          {/* Items */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Items</p>
            <ul className="space-y-1.5">
              {order.items.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <img src={item.image} alt="" className="h-8 w-8 rounded object-cover" />
                  <span className="flex-1 truncate">{item.name}</span>
                  <span className="text-xs text-muted-foreground">×{item.quantity}</span>
                  <span className="text-xs">{formatPrice(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer & delivery */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Customer</p>
              <p>{order.customer.firstName} {order.customer.lastName}</p>
              <p className="text-muted-foreground text-xs">{order.customer.phone}</p>
              <p className="text-muted-foreground text-xs">{order.customer.email}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Delivery</p>
              <p>{order.delivery.address}</p>
              <p className="text-muted-foreground text-xs">{order.delivery.city}, {order.delivery.region}</p>
              {order.delivery.notes && <p className="text-muted-foreground text-xs">{order.delivery.notes}</p>}
            </div>
          </div>

          {/* Payment */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Payment</p>
            <p>{order.payment === "momo" ? `Mobile Money · ${order.momoNumber ?? ""}` : "Card"}</p>
          </div>

          {/* Notification status + retry */}
          <div className="flex flex-wrap gap-3 border-t border-hairline pt-3">
            {(["email", "whatsapp"] as const).map((ch) => {
              const status = order.notifications[ch];
              const key = `${order.id}-${ch}`;
              return (
                <div key={ch} className="flex items-center gap-2">
                  <NotifBadge status={status} label={ch === "email" ? "Email" : "WhatsApp"} showLabel />
                  {(status === "failed" || status === "pending") && (
                    <button
                      type="button"
                      disabled={retrying === key}
                      onClick={() => onRetry(order, ch)}
                      className="inline-flex items-center gap-1 rounded-full border border-hairline px-2.5 py-1 text-xs transition hover:bg-surface disabled:opacity-50"
                    >
                      <RefreshCw size={10} className={retrying === key ? "animate-spin" : ""} />
                      Retry
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function NotifBadge({
  status,
  label,
  showLabel = false,
}: {
  status: "pending" | "sent" | "failed";
  label: string;
  showLabel?: boolean;
}) {
  const icons = {
    sent: <CheckCircle size={14} className="text-green-500" />,
    failed: <XCircle size={14} className="text-red-500" />,
    pending: <Clock size={14} className="text-yellow-500" />,
  };
  return (
    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
      {icons[status]}
      {showLabel && <span>{label}: <span className="capitalize text-foreground">{status}</span></span>}
      {!showLabel && <span className="sr-only">{label} {status}</span>}
    </span>
  );
}

function StatCard({ label, value, alert = false }: { label: string; value: string | number; alert?: boolean }) {
  return (
    <div className={cn("rounded-2xl border p-5", alert ? "border-red-200 bg-red-50" : "border-hairline bg-surface")}>
      <p className={cn("text-xs font-medium uppercase tracking-wider", alert ? "text-red-400" : "text-muted-foreground")}>{label}</p>
      <p className={cn("mt-1 text-2xl font-semibold tracking-tight", alert ? "text-red-600" : "text-foreground")}>{value}</p>
    </div>
  );
}

function SettingField({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-muted-foreground">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-hairline bg-background px-4 py-3 text-sm outline-none transition focus:border-foreground"
      />
    </label>
  );
}
