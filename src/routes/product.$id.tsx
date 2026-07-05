import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Minus, Plus, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { formatPrice, getProduct, products } from "@/data/products";
import { ProductCard } from "@/components/product-card";
import { StarRating } from "@/components/star-rating";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Product not found" }] };
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} — Yonny's Shop` },
        { name: "description", content: product.description },
        { property: "og:title", content: `${product.name} — Yonny's Shop` },
        { property: "og:description", content: product.description },
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="container-page py-32 text-center">
      <p className="text-sm text-muted-foreground">Product not found.</p>
      <Link to="/shop" className="mt-4 inline-block text-sm underline">
        Back to shop
      </Link>
    </div>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(product.images[0]);
  const [tab, setTab] = useState<"desc" | "specs" | "reviews">("desc");

  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  const handleAdd = (buyNow = false) => {
    addToCart({ productId: product.id, quantity: qty, size, color });
    if (buyNow) {
      window.location.href = "/checkout";
    } else {
      toast.success("Added to cart", { description: product.name });
    }
  };

  return (
    <div className="container-page py-10 md:py-14">
      {/* Breadcrumb */}
      <div className="mb-6 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/shop" className="hover:text-foreground">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="overflow-hidden rounded-2xl bg-surface">
            <img
              src={activeImg}
              alt={product.name}
              width={1000}
              height={1000}
              className="aspect-square w-full object-cover"
            />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveImg(img)}
                className={cn(
                  "overflow-hidden rounded-lg bg-surface ring-1 ring-transparent transition",
                  activeImg === img && "ring-foreground",
                )}
              >
                <img src={img} alt="" className="aspect-square w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {product.subcategory}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{product.name}</h1>

          <div className="mt-3 flex items-center gap-3">
            <StarRating value={product.rating} />
            <span className="text-xs text-muted-foreground">
              {product.rating} · {product.reviews} reviews
            </span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-2xl font-semibold">{formatPrice(product.price)}</span>
            {product.compareAt && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.compareAt)}
              </span>
            )}
          </div>

          <p className="mt-2 text-xs text-muted-foreground">
            {product.stock > 0 ? (
              <span className="text-foreground">In stock · Ships in 24h</span>
            ) : (
              <span>Out of stock</span>
            )}
          </p>

          {/* Color */}
          <div className="mt-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider">Color · {color}</p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-xs transition",
                    color === c
                      ? "border-foreground bg-foreground text-background"
                      : "border-hairline text-foreground hover:border-foreground",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mt-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider">Size · {size}</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={cn(
                    "min-w-11 rounded-full border px-4 py-2 text-xs transition",
                    size === s
                      ? "border-foreground bg-foreground text-background"
                      : "border-hairline text-foreground hover:border-foreground",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center rounded-full border border-hairline">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid h-11 w-11 place-items-center text-foreground"
                aria-label="Decrease"
              >
                <Minus size={14} />
              </button>
              <span className="w-8 text-center text-sm">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                className="grid h-11 w-11 place-items-center text-foreground"
                aria-label="Increase"
              >
                <Plus size={14} />
              </button>
            </div>

            <button
              type="button"
              onClick={() => handleAdd(false)}
              className="flex-1 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:bg-foreground/90"
            >
              Add to Cart
            </button>
            <button
              type="button"
              onClick={() => handleAdd(true)}
              className="flex-1 rounded-full border border-foreground px-6 py-3 text-sm font-medium text-foreground transition hover:bg-foreground hover:text-background"
            >
              Buy Now
            </button>
            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              aria-label="Wishlist"
              className="grid h-11 w-11 place-items-center rounded-full border border-hairline text-foreground transition hover:bg-surface"
            >
              <Heart size={16} className={cn(isWishlisted(product.id) && "fill-foreground")} />
            </button>
          </div>

          {/* Trust */}
          <div className="mt-8 grid grid-cols-3 gap-3 border-t border-hairline pt-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Truck size={14} /> Fast delivery
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw size={14} /> 30-day returns
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} /> Secure checkout
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-10">
            <div className="flex gap-6 border-b border-hairline">
              {(["desc", "specs", "reviews"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={cn(
                    "-mb-px border-b-2 pb-3 text-sm transition",
                    tab === t
                      ? "border-foreground text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground",
                  )}
                >
                  {t === "desc" ? "Description" : t === "specs" ? "Specifications" : "Reviews"}
                </button>
              ))}
            </div>
            <div className="pt-6 text-sm leading-relaxed text-muted-foreground">
              {tab === "desc" && <p>{product.description}</p>}
              {tab === "specs" && (
                <ul className="space-y-2">
                  <li><span className="text-foreground">Category:</span> {product.subcategory}</li>
                  <li><span className="text-foreground">Available sizes:</span> {product.sizes.join(", ")}</li>
                  <li><span className="text-foreground">Colors:</span> {product.colors.join(", ")}</li>
                  <li><span className="text-foreground">Care:</span> Machine wash cold, tumble dry low.</li>
                </ul>
              )}
              {tab === "reviews" && (
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="rounded-xl border border-hairline p-4">
                      <StarRating value={5} />
                      <p className="mt-2 text-sm text-foreground">
                        Excellent quality, exactly as described. Would buy again.
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground">— Verified customer</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="mb-8 text-2xl font-semibold tracking-tight">You may also like</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
