import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { products, slipperSubcategories, beddingSubcategories } from "@/data/products";
import { ProductCard } from "@/components/product-card";
import { z } from "zod";
import { zodValidator, fallback } from "@tanstack/zod-adapter";

const shopSearchSchema = z.object({
  category: fallback(z.enum(["slippers", "bedding", "all"]), "all").default("all"),
  q: fallback(z.string(), "").default(""),
  sort: fallback(z.enum(["new", "price-asc", "price-desc", "popular"]), "new").default("new"),
});

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Yonny's Shop" },
      { name: "description", content: "Browse premium slippers and bedding. Filter by category, size and price." },
      { property: "og:title", content: "Shop — Yonny's Shop" },
      { property: "og:description", content: "Browse premium slippers and bedding." },
    ],
  }),
  validateSearch: zodValidator(shopSearchSchema),
  component: Shop,
});

function Shop() {
  const { category, q, sort } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = products.slice();
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(s) || p.subcategory.toLowerCase().includes(s),
      );
    }
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        list.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        list.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
    }
    return list;
  }, [category, q, sort]);

  const subcats =
    category === "slippers"
      ? slipperSubcategories
      : category === "bedding"
        ? beddingSubcategories
        : [];

  return (
    <div className="container-page py-10 md:py-14">
      <div className="mb-8">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Shop
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          {category === "slippers" ? "Slippers" : category === "bedding" ? "Bedding" : "All products"}
        </h1>
      </div>

      {/* Top controls */}
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2 rounded-full border border-hairline bg-background px-4 py-2.5">
          <Search size={16} className="text-muted-foreground" strokeWidth={1.75} />
          <input
            value={q}
            onChange={(e) => navigate({ search: (s) => ({ ...s, q: e.target.value }) })}
            placeholder="Search slippers, sheets, blankets…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowFilters((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-hairline px-4 py-2.5 text-sm sm:hidden"
          >
            <SlidersHorizontal size={14} /> Filters
          </button>
          <select
            value={sort}
            onChange={(e) =>
              navigate({ search: (s) => ({ ...s, sort: e.target.value as never }) })
            }
            className="rounded-full border border-hairline bg-background px-4 py-2.5 text-sm outline-none"
          >
            <option value="new">Newest</option>
            <option value="popular">Popular</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
        {/* Filters */}
        <aside className={`${showFilters ? "block" : "hidden"} lg:block`}>
          <FilterGroup title="Category">
            <FilterLink label="All" active={category === "all"} to="/shop" search={{ category: "all" as const }} />
            <FilterLink label="Slippers" active={category === "slippers"} to="/shop" search={{ category: "slippers" as const }} />
            <FilterLink label="Bedding" active={category === "bedding"} to="/shop" search={{ category: "bedding" as const }} />
          </FilterGroup>

          {subcats.length > 0 && (
            <FilterGroup title="Subcategory">
              {subcats.map((s: string) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => navigate({ search: (v) => ({ ...v, q: s }) })}
                  className="block py-1.5 text-left text-sm text-muted-foreground transition hover:text-foreground"
                >
                  {s}
                </button>
              ))}
            </FilterGroup>
          )}

          <FilterGroup title="Price">
            {["Under GH₵ 150", "GH₵ 150 – 300", "GH₵ 300 – 500", "GH₵ 500+"].map((p: string) => (
              <label key={p} className="flex items-center gap-2 py-1.5 text-sm text-muted-foreground">
                <input type="checkbox" className="h-3.5 w-3.5 accent-foreground" />
                {p}
              </label>
            ))}
          </FilterGroup>

          <FilterGroup title="Size">
            <div className="flex flex-wrap gap-2">
              {["S", "M", "L", "XL", "Queen", "King"].map((s: string) => (
                <button
                  key={s}
                  type="button"
                  className="rounded-full border border-hairline px-3 py-1 text-xs text-foreground transition hover:bg-foreground hover:text-background"
                >
                  {s}
                </button>
              ))}
            </div>
          </FilterGroup>
        </aside>

        {/* Grid */}
        <div>
          <p className="mb-6 text-xs text-muted-foreground">
            {filtered.length} product{filtered.length === 1 ? "" : "s"}
          </p>
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-hairline bg-surface p-16 text-center">
              <p className="text-sm text-muted-foreground">No products match your filters.</p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8 border-b border-hairline pb-6 last:border-none">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">{title}</p>
      <div className="flex flex-col">{children}</div>
    </div>
  );
}

function FilterLink({
  label,
  active,
  to,
  search,
}: {
  label: string;
  active: boolean;
  to: string;
  search: Record<string, unknown>;
}) {
  return (
    <Link
      to={to}
      search={search as never}
      className={`py-1.5 text-left text-sm transition ${
        active ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {label}
    </Link>
  );
}
