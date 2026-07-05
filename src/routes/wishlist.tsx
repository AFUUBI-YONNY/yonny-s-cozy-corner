import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, X } from "lucide-react";
import { toast } from "sonner";
import { formatPrice, products } from "@/data/products";
import { StarRating } from "@/components/star-rating";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist — Yonny's Shop" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const items = products.filter((p) => wishlist.includes(p.id));

  if (items.length === 0) {
    return (
      <div className="container-page py-24 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-hairline">
          <Heart size={22} strokeWidth={1.5} />
        </div>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight">Your wishlist is empty</h1>
        <p className="mt-2 text-sm text-muted-foreground">Save items you love for later.</p>
        <Link
          to="/shop"
          className="mt-6 inline-flex rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:bg-foreground/90"
        >
          Browse shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-10 md:py-14">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Wishlist</h1>
      <p className="mt-2 text-sm text-muted-foreground">{items.length} saved</p>

      <div className="mt-10 space-y-3">
        {items.map((p) => (
          <div
            key={p.id}
            className="grid grid-cols-[96px_1fr_auto] items-center gap-4 rounded-2xl border border-hairline p-4"
          >
            <Link to="/product/$id" params={{ id: p.id }} className="block overflow-hidden rounded-xl bg-surface">
              <img src={p.image} alt={p.name} className="aspect-square w-full object-cover" />
            </Link>
            <div className="min-w-0">
              <Link to="/product/$id" params={{ id: p.id }} className="text-sm font-medium">
                {p.name}
              </Link>
              <p className="mt-1 text-xs text-muted-foreground">{p.subcategory}</p>
              <div className="mt-2 flex items-center gap-3">
                <StarRating value={p.rating} />
                <span className="text-sm font-medium">{formatPrice(p.price)}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  addToCart({ productId: p.id, quantity: 1, size: p.sizes[0], color: p.colors[0] });
                  toast.success("Added to cart");
                }}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background transition hover:bg-foreground/90"
              >
                <ShoppingBag size={14} /> Add to cart
              </button>
              <button
                type="button"
                onClick={() => toggleWishlist(p.id)}
                aria-label="Remove"
                className="inline-flex items-center gap-1 rounded-full border border-hairline px-3 py-2 text-xs text-muted-foreground hover:text-foreground"
              >
                <X size={14} /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
