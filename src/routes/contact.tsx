import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Yonny's Shop" },
      { name: "description", content: "Get in touch with Yonny's Shop. We usually reply within a few hours." },
      { property: "og:title", content: "Contact — Yonny's Shop" },
      { property: "og:description", content: "Get in touch with Yonny's Shop." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="container-page py-10 md:py-14">
      <div className="max-w-xl">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Contact</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          We&apos;d love to hear from you.
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Questions about a product, an order, or a return? Send us a note and we&apos;ll reply
          within a few hours during business days.
        </p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_380px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            (e.target as HTMLFormElement).reset();
            toast.success("Message sent", { description: "We'll be in touch shortly." });
          }}
          className="space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Name" required />
            <Input label="Email" type="email" required />
          </div>
          <Input label="Subject" required />
          <label className="block">
            <span className="mb-1.5 block text-xs text-muted-foreground">Message</span>
            <textarea
              rows={6}
              required
              className="w-full resize-none rounded-xl border border-hairline bg-background px-4 py-3 text-sm outline-none transition focus:border-foreground"
            />
          </label>
          <button
            type="submit"
            className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:bg-foreground/90"
          >
            Send message
          </button>
        </form>

        <aside className="space-y-4">
          <ContactCard icon={MapPin} title="Visit us" body="12 Independence Ave, Accra, Ghana" />
          <ContactCard icon={Phone} title="Call us" body="+233 (0) 24 000 0000" />
          <ContactCard icon={Mail} title="Email" body="hello@yonnys.shop" />
          <ContactCard
            icon={Clock}
            title="Business hours"
            body={
              <>
                Mon–Fri · 9:00 – 18:00
                <br />
                Sat · 10:00 – 15:00
              </>
            }
          />
          <div className="overflow-hidden rounded-2xl border border-hairline">
            <iframe
              title="Map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-0.22%2C5.54%2C-0.15%2C5.60&amp;layer=mapnik"
              className="h-56 w-full"
              loading="lazy"
            />
          </div>
        </aside>
      </div>
    </div>
  );
}

function Input({
  label,
  type = "text",
  required,
}: {
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-muted-foreground">{label}</span>
      <input
        type={type}
        required={required}
        className="w-full rounded-xl border border-hairline bg-background px-4 py-3 text-sm outline-none transition focus:border-foreground"
      />
    </label>
  );
}

function ContactCard({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  title: string;
  body: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-hairline bg-background p-5">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-surface">
        <Icon size={16} strokeWidth={1.5} />
      </div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{body}</p>
      </div>
    </div>
  );
}
