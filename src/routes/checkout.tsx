import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, CreditCard, Smartphone, Wallet } from "lucide-react";
import { toast } from "sonner";
import { formatPrice } from "@/data/products";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Yonny's Shop" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { cartDetailed, subtotal, clearCart } = useStore();
  const navigate = useNavigate();
  const [payment, setPayment] = useState<"momo" | "card">("momo");

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

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    toast.success("Order placed", { description: "You'll receive a confirmation shortly." });
    navigate({ to: "/" });
  };

  return (
    <div className="container-page py-10 md:py-14">
      <ProgressBar step={2} />

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_400px]">
        <form className="space-y-10" onSubmit={placeOrder}>
          <Section title="1. Customer information">
            <Row>
              <Field label="First name" required />
              <Field label="Last name" required />
            </Row>
            <Row>
              <Field label="Email" type="email" required />
              <Field label="Phone" type="tel" required />
            </Row>
          </Section>

          <Section title="2. Shipping address">
            <Field label="Address" required />
            <Row>
              <Field label="City" required />
              <Field label="Region" required />
            </Row>
            <Field label="Delivery notes (optional)" />
          </Section>

          <Section title="3. Payment method">
            <div className="grid gap-3 sm:grid-cols-3">
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
                <Field label="Mobile Money number" placeholder="e.g. 024 000 0000" required />
              </div>
            )}
            {payment === "card" && (
              <div className="mt-4 grid gap-3 rounded-xl border border-hairline bg-surface p-4">
                <Field label="Card number" placeholder="1234 5678 9012 3456" required />
                <Row>
                  <Field label="Expiry" placeholder="MM/YY" required />
                  <Field label="CVC" placeholder="123" required />
                </Row>
              </div>
            )}
          </Section>

          <button
            type="submit"
            className="w-full rounded-full bg-foreground px-6 py-4 text-sm font-medium text-background transition hover:bg-foreground/90"
          >
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
  const steps = ["Cart", "Checkout", "Payment", "Confirmation"];
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
  label,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-muted-foreground">{label}</span>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-hairline bg-background px-4 py-3 text-sm outline-none transition focus:border-foreground"
      />
    </label>
  );
}

function OptionCard({
  title,
  desc,
  selected,
}: {
  title: string;
  desc: string;
  selected?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4 text-sm",
        selected ? "border-foreground bg-background" : "border-hairline bg-background",
      )}
    >
      <p className="font-medium">{title}</p>
      <p className="text-xs text-muted-foreground">{desc}</p>
    </div>
  );
}

function PaymentCard({
  icon: Icon,
  title,
  desc,
  active,
  onClick,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
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
