import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { Check, CreditCard, Smartphone, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { formatPrice } from "@/data/products";
import { useStore } from "@/lib/store";
import { saveOrder, updateOrderNotification, generateOrderId } from "@/lib/orders";
import type { Order } from "@/lib/orders";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Business Arena" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

async function sendNotifications(order: Order) {
  // Fire both notifications in parallel — don't block the UI
  const [emailRes, waRes] = await Promise.allSettled([
    fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    }).then((r) => r.json()),
    fetch("/api/whatsapp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    }).then((r) => r.json()),
  ]);

  const emailOk =
    emailRes.status === "fulfilled" && (emailRes.value as { success: boolean }).success;
  const waOk =
    waRes.status === "fulfilled" && (waRes.value as { success: boolean }).success;

  updateOrderNotification(order.id, "email", emailOk ? "sent" : "failed");
  updateOrderNotification(order.id, "whatsapp", waOk ? "sent" : "failed");

  if (!emailOk) console.warn("Email notification failed", emailRes);
  if (!waOk) console.warn("WhatsApp notification failed", waRes);
}

function CheckoutPage() {
  const { cartDetailed, subtotal, clearCart } = useStore();
  const navigate = useNavigate();
  const [payment, setPayment] = useState<"momo" | "card">("momo");
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  if (cartDetailed.length === 0) {
    return (
      <div className="container-page py-24 text-center">
        <p className="text-sm text-muted-foreground">Your cart is empty.</p>
        <Link to="/shop" className="mt-4 inline-block text-sm underline">
          Start shopping
        </Link>
      </div>
    );
  }

  const placeOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const get = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement)?.value?.trim() ?? "";

    const order: Order = {
      id: generateOrderId(),
      createdAt: new Date().toISOString(),
      customer: {
        firstName: get("firstName"),
        lastName: get("lastName"),
        email: get("email"),
        phone: get("phone"),
      },
      delivery: {
        address: get("address"),
        city: get("city"),
        region: get("region"),
        notes: get("notes"),
      },
      payment,
      momoNumber: payment === "momo" ? get("momoNumber") : undefined,
      items: cartDetailed.map((item) => ({
        productId: item.productId,
        name: item.product.name,
        image: item.product.image,
        price: item.product.price,
        quantity: item.quantity,
        size: item.size ?? "",
        color: item.color ?? "",
      })),
      total: subtotal,
      notifications: { email: "pending", whatsapp: "pending" },
    };

    // 1. Save order to localStorage immediately — never lose an order
    saveOrder(order);

    // 2. Clear cart
    clearCart();

    // 3. Show success immediately — don't make user wait for notifications
    toast.success(`Order ${order.id} placed!`, {
      description: "We've received your order and will be in touch shortly.",
    });

    // 4. Navigate to confirmation
    navigate({ to: "/order-confirmation", search: { orderId: order.id } });

    // 5. Send notifications in background — failures won't affect customer experience
    sendNotifications(order).catch(console.error);

    setSubmitting(false);
  };

  return (
    <div className="container-page py-10 md:py-14">
      <ProgressBar step={2} />

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_400px]">
        <form ref={formRef} className="space-y-10" onSubmit={placeOrder}>
          <Section title="1. Customer information">
            <Row>
              <Field name="firstName" label="First name" required />
              <Field name="lastName" label="Last name" required />
            </Row>
            <Row>
              <Field name="email" label="Email" type="email" required />
              <Field name="phone" label="Phone" type="tel" required />
            </Row>
          </Section>

          <Section title="2. Delivery address">
            <Field name="address" label="Address" required />
            <Row>
              <Field name="city" label="City" required />
              <Field name="region" label="Region" required />
            </Row>
            <Field name="notes" label="Delivery notes (optional)" />
          </Section>

          <Section title="3. Payment method">
            <div className="grid gap-3 sm:grid-cols-2">
              <PaymentCard
                icon={Smartphone}
                title="Mobile Money"
                desc="MTN · Telecel · AirtelTigo"
                active={payment === "momo"}
                onClick={() => setPayment("momo")}
              />
              <PaymentCard
                icon={CreditCard}
                title="Card"
                desc="Visa · Mastercard"
                active={payment === "card"}
                onClick={() => setPayment("card")}
              />
            </div>

            {payment === "momo" && (
              <div className="mt-4 rounded-xl border border-hairline bg-surface p-4">
                <Field name="momoNumber" label="Mobile Money number" placeholder="e.g. 059 258 8531" required />
              </div>
            )}
            {payment === "card" && (
              <div className="mt-4 grid gap-3 rounded-xl border border-hairline bg-surface p-4">
                <Field name="cardNumber" label="Card number" placeholder="1234 5678 9012 3456" required />
                <Row>
                  <Field name="expiry" label="Expiry" placeholder="MM/YY" required />
                  <Field name="cvc" label="CVC" placeholder="123" required />
                </Row>
              </div>
            )}
          </Section>

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-4 text-sm font-medium text-background transition hover:bg-foreground/90 disabled:opacity-70"
          >
            {submitting && <Loader2 size={16} className="animate-spin" />}
            Place order · {formatPrice(subtotal)}
          </button>
        </form>

        {/* Order Summary */}
        <aside className="rounded-2xl border border-hairline bg-surface p-6 lg:sticky lg:top-24 lg:self-start">
          <h2 className="text-sm font-semibold uppercase tracking-wider">Order summary</h2>
          <ul className="mt-6 space-y-4">
            {cartDetailed.map((item) => (
              <li key={item.productId + item.size} className="flex gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-background">
                  <img src={item.product.image} alt="" className="h-full w-full object-cover" />
                  <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-foreground text-[10px] text-background">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm">{item.product.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {[item.color, item.size].filter(Boolean).join(" · ")}
                  </p>
                </div>
                <p className="text-sm">{formatPrice(item.product.price * item.quantity)}</p>
              </li>
            ))}
          </ul>
          <dl className="mt-6 space-y-2 border-t border-hairline pt-6 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="mt-3 flex justify-between border-t border-hairline pt-3 text-base font-semibold">
              <dt>Total</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}

function ProgressBar({ step }: { step: number }) {
  const steps = ["Cart", "Checkout", "Confirmation"];
  return (
    <ol className="flex items-center gap-3 text-xs">
      {steps.map((s, i) => {
        const active = i + 1 <= step;
        return (
          <li key={s} className="flex items-center gap-3">
            <span
              className={cn(
                "grid h-6 w-6 place-items-center rounded-full border text-[10px]",
                active
                  ? "border-foreground bg-foreground text-background"
                  : "border-hairline text-muted-foreground",
              )}
            >
              {i + 1 < step ? <Check size={12} /> : i + 1}
            </span>
            <span className={cn(active ? "text-foreground" : "text-muted-foreground")}>{s}</span>
            {i < steps.length - 1 && <span className="mx-1 h-px w-6 bg-hairline sm:w-10" />}
          </li>
        );
      })}
    </ol>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-3 sm:grid-cols-2">{children}</div>;
}

function Field({
  name,
  label,
  type = "text",
  required,
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-muted-foreground">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-hairline bg-background px-4 py-3 text-sm outline-none transition focus:border-foreground"
      />
    </label>
  );
}

function PaymentCard({
  icon: Icon,
  title,
  desc,
  active,
  onClick,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  title: string;
  desc: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-col items-start gap-2 rounded-xl border bg-background p-4 text-left transition",
        active ? "border-foreground" : "border-hairline hover:border-foreground/40",
      )}
    >
      <Icon size={18} strokeWidth={1.5} />
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs text-muted-foreground">{desc}</p>
    </button>
  );
}
