import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Account — Yonny's Shop" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <div className="container-page py-16 md:py-24">
      <div className="mx-auto max-w-md">
        <div className="mb-8 flex gap-2 rounded-full bg-surface p-1">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`flex-1 rounded-full py-2.5 text-sm transition ${
              mode === "login" ? "bg-background text-foreground shadow-card" : "text-muted-foreground"
            }`}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => setMode("register")}
            className={`flex-1 rounded-full py-2.5 text-sm transition ${
              mode === "register" ? "bg-background text-foreground shadow-card" : "text-muted-foreground"
            }`}
          >
            Create account
          </button>
        </div>

        <h1 className="text-2xl font-semibold tracking-tight">
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {mode === "login"
            ? "Sign in to view orders, addresses and your wishlist."
            : "Order faster and track deliveries."}
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast(mode === "login" ? "Signed in" : "Account created");
          }}
          className="mt-8 space-y-3"
        >
          {mode === "register" && <Field label="Full name" required />}
          <Field label="Email" type="email" required />
          <Field label="Password" type="password" required />
          {mode === "login" && (
            <div className="text-right">
              <Link to="/account" className="text-xs text-muted-foreground hover:text-foreground">
                Forgot password?
              </Link>
            </div>
          )}
          <button
            type="submit"
            className="w-full rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:bg-foreground/90"
          >
            {mode === "login" ? "Sign in" : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({
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
