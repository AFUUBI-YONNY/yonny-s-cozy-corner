import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Twitter } from "lucide-react";

// Custom Snapchat ghost icon (SVG)
function SnapchatIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C8.5 2 6 4.5 6 8v2l-1.5 2H6c0 1 .5 2 1 2.5-.5.5-2 1-2 1.5 0 .4.8.7 2 .8.2.6.5 1.2 1 1.2.4 0 .8-.1 1.5-.3.6.4 1.5.8 3 .8s2.4-.4 3-.8c.7.2 1.1.3 1.5.3.5 0 .8-.6 1-1.2 1.2-.1 2-.4 2-.8 0-.5-1.5-1-2-1.5.5-.5 1-1.5 1-2.5h1.5L18 10V8c0-3.5-2.5-6-6-6z" />
    </svg>
  );
}

// Custom WhatsApp icon (SVG)
function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-hairline bg-surface">
      <div className="container-page py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="text-lg font-semibold tracking-tight">Business Arena</p>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Quality slippers and caps for everyday style. Made to make every look complete.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {[
                { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/1real_yonny?igsh=MWxnNGp0dms4NTV2aA%3D%3D&utm_source=qr" },
                { Icon: Facebook, label: "Facebook", href: "#" },
                { Icon: Twitter, label: "Twitter", href: "#" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-hairline text-foreground transition hover:bg-background"
                >
                  <Icon size={16} strokeWidth={1.75} />
                </a>
              ))}
              <a
                href="https://snapchat.com/t/C7lxaDDN"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Snapchat"
                className="grid h-10 w-10 place-items-center rounded-full border border-hairline text-foreground transition hover:bg-background"
              >
                <SnapchatIcon size={16} />
              </a>
              <a
                href="https://wa.me/233592588531"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="grid h-10 w-10 place-items-center rounded-full border border-hairline text-foreground transition hover:bg-background"
              >
                <WhatsAppIcon size={16} />
              </a>
            </div>
          </div>

          <FooterColumn
            title="Shop"
            links={[
              { to: "/shop", label: "All Products" },
              { to: "/shop", label: "Slippers", search: { category: "slippers" } },
              { to: "/shop", label: "Caps", search: { category: "caps" } },
              { to: "/shop", label: "Phone Covers", search: { category: "phone-covers" } },
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
          <p>Secure checkout · Mobile Money · Visa · Mastercard</p>
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
