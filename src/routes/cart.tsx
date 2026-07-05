import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/data/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Shopping Cart — Yonny's Shop" },
      { name: "description", content: "Review your cart and proceed to checkout." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { cartDetailed, updateQty, removeFromCart, subtotal } = useStore();
  const shipping = cartDetailed.length > 0 ? (subtotal > 500 ? 0 : 25) : 0;
  const total = subtotal + shipping;

  if (cartDetailed.length === 0) {
    return (
      <div className="container-page py-24 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-hairline">
          <ShoppingBag size={22} strokeWidth={1.5} />
        </div>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight">Your cart is empty</h1>
        <p className="mt-2 text-sm text-muted-foreground">Add something soft to it.</p>
        <Link
          to="/shop"
          className="mt-6 inline-flex rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:bg-foreground/90"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-10 md:py-14">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Shopping cart</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {cartDetailed.length} item{cartDetailed.length === 1 ? "" : "s"}
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        {/* Items */}
        <div className="space-y-4">
          {cartDetailed.map((item) => (
            <div
              key={item.productId + item.size + item.color}
              className="grid grid-cols-[96px_1fr] items-start gap-4 rounded-2xl border border-hairline bg-background p-4 sm:grid-cols-[112px_1fr_auto] sm:items-center"
            >
              <Link to="/product/$id" params={{ id: item.productId }} className="block overflow-hidden rounded-xl bg-surface">
                <img src={item.product.image} alt={item.product.name} className="aspect-square w-full object-cover" />
              </Link>
              <div className="min-w-0">
                <Link
                  to="/product/$id"
                  params={{ id: item.productId }}
                  className="text-sm font-medium text-foreground"
                >
                  {item.product.name}
                </Link>
                <p className="mt-1 text-xs text-muted-foreground">
                  {[item.color, item.size].filter(Boolean).join(" · ")}
                </p>
                <p className="mt-2 text-sm font-medium sm:hidden">
                  {formatPrice(item.product.price * item.quantity)}
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="inline-flex items-center rounded-full border border-hairline">
                    <button
                      type="button"
                      onClick={() => updateQty(item.productId, item.quantity - 1)}
                      className="grid h-9 w-9 place-items-center"
                      aria-label="Decrease"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-6 text-center text-sm">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQty(item.productId, item.quantity + 1)}
                      className="grid h-9 w-9 place-items-center"
                      aria-label="Increase"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.productId)}
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                  >
                    <Trash2 size={13} /> Remove
                  </button>
                </div>
              </div>
              <p className="hidden text-right text-sm font-medium sm:block">
                {formatPrice(item.product.price * item.quantity)}
              </p>
            </div>
          ))}

          <Link
            to="/shop"
            className="inline-block pt-2 text-sm text-foreground link-underline"
          >
            ← Continue shopping
          </Link>
        </div>

        {/* Summary */}
        <aside className="rounded-2xl border border-hairline bg-surface p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider">Order summary</h2>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Discount</dt>
              <dd>—</dd>
            </div>
            <div className="mt-4 flex justify-between border-t border-hairline pt-4 text-base font-semibold">
              <dt>Total</dt>
              <dd>{formatPrice(total)}</dd>
            </div>
          </dl>
          <Link
            to="/checkout"
            className="mt-6 flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:bg-foreground/90"
          >
            Proceed to Checkout
          </Link>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Secure checkout · Mobile Money · Cards · PayPal
          </p>
        </aside>
      </div>
    </div>
  );
}
