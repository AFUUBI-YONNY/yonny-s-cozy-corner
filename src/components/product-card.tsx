import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { formatPrice, type Product } from "@/data/products";
import { StarRating } from "./star-rating";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const wished = isWishlisted(product.id);

  return (
    <div className="group flex flex-col">
      <div className="relative overflow-hidden rounded-xl bg-surface">
        <Link
          to="/product/$id"
          params={{ id: product.id }}
          className="block aspect-square"
          aria-label={product.name}
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={1000}
            height={1000}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Badges */}
        <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="rounded-full bg-foreground px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-background">
              New
            </span>
          )}
          {product.compareAt && (
            <span className="rounded-full bg-background px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-foreground">
              Sale
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          type="button"
          onClick={() => {
            toggleWishlist(product.id);
            toast(wished ? "Removed from wishlist" : "Added to wishlist");
          }}
          aria-label="Toggle wishlist"
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 text-foreground shadow-card backdrop-blur transition hover:bg-background"
        >
          <Heart size={16} className={cn("transition", wished && "fill-foreground")} strokeWidth={1.5} />
        </button>

        {/* Quick add */}
        <button
          type="button"
          onClick={() => {
            addToCart({
              productId: product.id,
              quantity: 1,
              size: product.sizes[0],
              color: product.colors[0],
            });
            toast.success("Added to cart", { description: product.name });
          }}
          className="absolute inset-x-3 bottom-3 flex translate-y-2 items-center justify-center gap-2 rounded-full bg-foreground py-2.5 text-xs font-medium uppercase tracking-wider text-background opacity-0 shadow-elevated transition-all duration-300 hover:bg-foreground/90 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <ShoppingBag size={14} strokeWidth={1.75} />
          Add to Cart
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-3">
          <Link
            to="/product/$id"
            params={{ id: product.id }}
            className="truncate text-sm font-medium text-foreground"
          >
            {product.name}
          </Link>
        </div>
        <p className="text-xs text-muted-foreground">{product.subcategory}</p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-sm font-semibold text-foreground">{formatPrice(product.price)}</span>
          {product.compareAt && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.compareAt)}
            </span>
          )}
        </div>
        <div className="mt-1 flex items-center gap-2">
          <StarRating value={product.rating} />
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>
      </div>
    </div>
  );
}
