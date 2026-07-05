import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/shop", label: "Shop" },
  { to: "/shop", search: { category: "slippers" as const }, label: "Slippers" },
  { to: "/shop", search: { category: "bedding" as const }, label: "Bedding" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const { cartCount, wishlistCount } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-background/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-6">
        {/* Logo — left */}
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span className="text-lg font-semibold tracking-tight">Yonny&apos;s Shop</span>
        </Link>

        {/* Nav — center */}
        <nav className="hidden flex-1 items-center justify-center gap-6 lg:flex">
          {NAV.map((item, i) => (
            <Link
              key={`${item.to}-${i}`}
              to={item.to}
              search={item.search as never}
              className={cn(
                "text-sm text-muted-foreground transition-colors hover:text-foreground",
                pathname === item.to && !item.search && "text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Link
            to="/shop"
            aria-label="Search"
            className="grid h-10 w-10 place-items-center rounded-full text-foreground transition hover:bg-surface"
          >
            <Search size={18} strokeWidth={1.75} />
          </Link>
          <Link
            to="/account"
            aria-label="Account"
            className="hidden h-10 w-10 place-items-center rounded-full text-foreground transition hover:bg-surface sm:grid"
          >
            <User size={18} strokeWidth={1.75} />
          </Link>
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="relative grid h-10 w-10 place-items-center rounded-full text-foreground transition hover:bg-surface"
          >
            <Heart size={18} strokeWidth={1.75} />
            {wishlistCount > 0 && (
              <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-foreground px-1 text-[10px] font-medium text-background">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link
            to="/cart"
            aria-label="Cart"
            className="relative grid h-10 w-10 place-items-center rounded-full text-foreground transition hover:bg-surface"
          >
            <ShoppingBag size={18} strokeWidth={1.75} />
            {cartCount > 0 && (
              <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-foreground px-1 text-[10px] font-medium text-background">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="ml-1 grid h-10 w-10 place-items-center rounded-full text-foreground transition hover:bg-surface lg:hidden"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-hairline bg-background lg:hidden">
          <nav className="container-page flex flex-col py-4">
            {NAV.map((item, i) => (
              <Link
                key={`m-${i}`}
                to={item.to}
                search={item.search as never}
                onClick={() => setMobileOpen(false)}
                className="border-b border-hairline py-3 text-sm text-foreground last:border-none"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/account"
              onClick={() => setMobileOpen(false)}
              className="border-b border-hairline py-3 text-sm text-foreground last:border-none"
            >
              Account
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
