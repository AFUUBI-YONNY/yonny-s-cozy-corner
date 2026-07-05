import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-hairline bg-surface">
      <div className="container-page py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="text-lg font-semibold tracking-tight">Yonny&apos;s Shop</p>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Quality slippers and bedding for everyday comfort. Made to make home feel like home.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social"
                  className="grid h-10 w-10 place-items-center rounded-full border border-hairline text-foreground transition hover:bg-background"
                >
                  <Icon size={16} strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn
            title="Shop"
            links={[
              { to: "/shop", label: "All Products" },
              { to: "/shop", label: "Slippers", search: { category: "slippers" } },
              { to: "/shop", label: "Bedding", search: { category: "bedding" } },
              { to: "/wishlist", label: "Wishlist" },
            ]}
          />
          <FooterColumn
            title="Company"
            links={[
              { to: "/about", label: "About Us" },
              { to: "/contact", label: "Contact" },
              { to: "/faq", label: "FAQ" },
            ]}
          />
          <FooterColumn
            title="Support"
            links={[
              { to: "/privacy", label: "Privacy Policy" },
              { to: "/terms", label: "Terms of Service" },
              { to: "/shipping", label: "Shipping & Returns" },
            ]}
          />
        </div>

        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-hairline pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Yonny&apos;s Shop. All rights reserved.</p>
          <p>Secure checkout · Mobile Money · Visa · Mastercard · PayPal</p>
        </div>
      </div>
    </footer>
  );
}

type FooterLink = { to: string; label: string; search?: Record<string, unknown> };

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-foreground">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((l, i) => (
          <li key={i}>
            <Link
              to={l.to}
              search={l.search as never}
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
