import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle, ShoppingBag } from "lucide-react";
import { z } from "zod";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { getOrders } from "@/lib/orders";
import { formatPrice } from "@/data/products";

const schema = z.object({
  orderId: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/order-confirmation")({
  validateSearch: zodValidator(schema),
  head: () => ({
    meta: [
      { title: "Order Confirmed — Business Arena" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ConfirmationPage,
});

function ConfirmationPage() {
  const { orderId } = Route.useSearch();
  const order = getOrders().find((o) => o.id === orderId);

  if (!order) {
    return (
      <div className="container-page py-24 text-center">
        <ShoppingBag size={32} className="mx-auto mb-4 text-muted-foreground" strokeWidth={1.5} />
        <p className="text-sm text-muted-foreground">Order not found.</p>
        <Link to="/shop" className="mt-4 inline-block text-sm underline">
          Back to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page max-w-2xl py-16">
      <div className="flex flex-col items-center text-center">
        <CheckCircle size={48} strokeWidth={1.5} className="text-foreground" />
        <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">Order confirmed!</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Thank you, {order.customer.firstName}. Your order <strong>{order.id}</strong> has been received.
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          We'll reach out to you at {order.customer.phone} to arrange delivery.
        </p>
      </div>

      <div className="mt-10 rounded-2xl border border-hairline bg-surface p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider">Order summary</h2>
        <ul className="mt-4 space-y-3">
          {order.items.map((item, i) => (
            <li key={i} className="flex items-center gap-3">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-background">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  {[item.color, item.size].filter(Boolean).join(" · ")} · Qty {item.quantity}
                </p>
              </div>
              <p className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</p>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between border-t border-hairline pt-4 text-base font-semibold">
          <span>Total</span>
          <span>{formatPrice(order.total)}</span>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-hairline bg-surface p-6">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider">Delivery details</h2>
        <p className="text-sm text-muted-foreground">
          {order.delivery.address}, {order.delivery.city}, {order.delivery.region}
        </p>
        {order.delivery.notes && (
          <p className="mt-1 text-xs text-muted-foreground">Notes: {order.delivery.notes}</p>
        )}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          to="/shop"
          className="flex-1 rounded-full bg-foreground px-6 py-3 text-center text-sm font-medium text-background transition hover:bg-foreground/90"
        >
          Continue shopping
        </Link>
        <Link
          to="/"
          className="flex-1 rounded-full border border-hairline px-6 py-3 text-center text-sm font-medium text-foreground transition hover:bg-surface"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
