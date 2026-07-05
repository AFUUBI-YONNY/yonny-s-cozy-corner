import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Yonny's Shop" },
      { name: "description", content: "About Yonny's Shop — quality slippers and bedding, thoughtfully made." },
      { property: "og:title", content: "About — Yonny's Shop" },
      { property: "og:description", content: "About Yonny's Shop." },
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
          Made for the way you live.
        </h1>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          Yonny&apos;s Shop was started with a simple idea: home should feel like home. We work
          directly with mills and workshops we trust to bring you slippers and bedding that are
          soft, honest, and built to last — priced the way things should be priced.
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Every product we ship is one we&apos;d put in our own bedroom. Nothing louder than that.
        </p>
      </div>

      <div className="mt-16 grid gap-8 sm:grid-cols-3">
        {[
          { n: "10k+", l: "Happy customers" },
          { n: "4.9★", l: "Average rating" },
          { n: "1–3 days", l: "Delivery nationwide" },
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
