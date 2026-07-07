import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Truck, HeadphonesIcon, BadgeCheck, Sparkles } from "lucide-react";
import hero from "@/assets/cap1.jpeg";
import catSlippers from "@/assets/cap5.jpeg";
import catCaps from "@/assets/cap6.jpeg";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product-card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yonny's Shop — Comfort Starts at Home" },
      {
        name: "description",
        content:
          "Shop premium slippers and quality caps at affordable prices. Free delivery on qualifying orders.",
      },
      { property: "og:title", content: "Yonny's Shop — Comfort Starts at Home" },
      {
        property: "og:description",
        content: "Premium slippers and quality caps for everyday style.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = products.slice(0, 4);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-surface">
        <div className="container-page grid gap-10 py-16 md:grid-cols-2 md:py-24 lg:py-28">
          <div className="flex flex-col justify-center">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              New Season · 2026
            </span>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Cool on top, <br className="hidden sm:block" />
              comfy on bottom.
            </h1>
            <p className="mt-5 max-w-md text-base text-muted-foreground">
              Shop premium slippers and quality caps at affordable prices. Made for the way you
              live, priced for the way you shop.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:bg-foreground/90"
              >
                Shop Now <ArrowRight size={16} strokeWidth={1.75} />
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-full border border-foreground px-6 py-3 text-sm font-medium text-foreground transition hover:bg-foreground hover:text-background"
              >
                View Categories
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span>4.9 avg from 1,200+ customers</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl bg-background">
              <img
                src={hero}
                alt="Bed with white bedding, gray throw and beige slippers"
                width={1920}
                height={1280}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container-page py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Shop by category</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Everything you need for restful mornings and quiet nights.
            </p>
          </div>
          <Link
            to="/shop"
            className="hidden text-sm text-foreground link-underline sm:inline-block"
          >
            View all
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <CategoryCard
            to="/shop"
            search={{ category: "slippers" }}
            title="Slippers"
            subtitle="Indoor · Outdoor · For everyone"
            image={catSlippers}
          />
          <CategoryCard
            to="/shop"
            search={{ category: "caps" }}
            title="Caps"
            subtitle="Snapbacks · Baseball · Bucket"
            image={catCaps}
          />
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="container-page py-10">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Featured</h2>
            <p className="mt-2 text-sm text-muted-foreground">Handpicked bestsellers this month.</p>
          </div>
          <Link to="/shop" className="text-sm text-foreground link-underline">
            View all
          </Link>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} hideDetails />
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="mt-20 bg-surface">
        <div className="container-page py-20">
          <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">
            Why Yonny&apos;s
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-sm text-muted-foreground">
            The little things we insist on so you don&apos;t have to think about them.
          </p>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Perk icon={BadgeCheck} title="High Quality" desc="Tested, trusted materials only." />
            <Perk icon={Truck} title="Fast Delivery" desc="Nationwide shipping in 1–3 days." />
            <Perk icon={ShieldCheck} title="Secure Payments" desc="Mobile Money, Visa, PayPal." />
            <Perk icon={HeadphonesIcon} title="Real Support" desc="Humans, not scripts." />
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="container-page pb-24">
        <div className="rounded-2xl bg-foreground px-6 py-14 text-background sm:px-12">
          <div className="mx-auto max-w-xl text-center">
            <Sparkles size={20} className="mx-auto opacity-80" strokeWidth={1.5} />
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              Get 10% off your first order
            </h2>
            <p className="mt-2 text-sm text-background/70">
              Sign up for early drops, restocks and quiet sales.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row"
            >
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="flex-1 rounded-full border border-background/20 bg-transparent px-5 py-3 text-sm text-background placeholder:text-background/50 focus:border-background focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition hover:bg-background/90"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

function CategoryCard({
  to,
  search,
  title,
  subtitle,
  image,
}: {
  to: string;
  search?: Record<string, unknown>;
  title: string;
  subtitle: string;
  image: string;
}) {
  return (
    <Link
      to={to}
      search={search as never}
      className="group relative block overflow-hidden rounded-2xl bg-surface"
    >
      <div className="aspect-[4/3] w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
        <div className="rounded-xl bg-background/90 px-4 py-3 backdrop-blur">
          <p className="text-lg font-semibold tracking-tight">{title}</p>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
        <div className="grid h-11 w-11 place-items-center rounded-full bg-foreground text-background transition group-hover:scale-105">
          <ArrowRight size={18} strokeWidth={1.75} />
        </div>
      </div>
    </Link>
  );
}

function Perk({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex flex-col items-start">
      <div className="grid h-11 w-11 place-items-center rounded-full border border-hairline bg-background text-foreground">
        <Icon size={18} strokeWidth={1.5} />
      </div>
      <p className="mt-4 text-sm font-medium text-foreground">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}


