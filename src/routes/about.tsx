import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Business Arena" },
      { name: "description", content: "About Business Arena — quality slippers and caps, thoughtfully made." },
      { property: "og:title", content: "About — Business Arena" },
      { property: "og:description", content: "About Business Arena." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="container-page py-10 md:py-14">
      <div className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">About</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Cool on top, comfy on bottom.
        </h1>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          Business Arena was built with one idea in mind: style and comfort should go together.
          We work directly with trusted makers to bring you slippers and caps that look great,
          feel great, and are priced the way things should be priced.
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Every product we ship is one we&apos;d wear ourselves. Nothing louder than that.
        </p>
      </div>

      <div className="mt-16 grid gap-8 sm:grid-cols-3">
        {[
          { n: "10k+", l: "Happy customers" },
          { n: "2 categories", l: "Slippers & Caps" },
          { n: "24/7", l: "We're always open" },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl border border-hairline bg-surface p-8">
            <p className="text-3xl font-semibold tracking-tight">{s.n}</p>
            <p className="mt-1 text-sm text-muted-foreground">{s.l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
