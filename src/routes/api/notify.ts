import { createFileRoute } from "@tanstack/react-router";
import type { Order } from "@/lib/orders";

const RESEND_API_KEY = process.env["RESEND_API_KEY"] ?? "";
const OWNER_EMAIL = process.env["OWNER_EMAIL"] ?? "yonnyafuubi477@gmail.com";

function buildEmailHtml(order: Order): string {
  const itemRows = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding:8px;border-bottom:1px solid #eee;">${item.name}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;text-align:center;">${item.quantity}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;">${item.size || "—"}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;">${item.color || "—"}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">GH₵ ${(item.price * item.quantity).toFixed(2)}</td>
      </tr>`,
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#111;">
  <h2 style="margin:0 0 4px;">🛍️ New Order — Business Arena</h2>
  <p style="color:#666;margin:0 0 24px;">Order <strong>${order.id}</strong> · ${new Date(order.createdAt).toLocaleString("en-GH", { timeZone: "Africa/Accra" })}</p>

  <h3 style="border-bottom:2px solid #111;padding-bottom:8px;">Customer</h3>
  <table style="width:100%;border-collapse:collapse;">
    <tr><td style="padding:6px 0;color:#666;">Name</td><td>${order.customer.firstName} ${order.customer.lastName}</td></tr>
    <tr><td style="padding:6px 0;color:#666;">Phone</td><td>${order.customer.phone}</td></tr>
    <tr><td style="padding:6px 0;color:#666;">Email</td><td>${order.customer.email}</td></tr>
  </table>

  <h3 style="border-bottom:2px solid #111;padding-bottom:8px;margin-top:24px;">Delivery Address</h3>
  <table style="width:100%;border-collapse:collapse;">
    <tr><td style="padding:6px 0;color:#666;">Address</td><td>${order.delivery.address}</td></tr>
    <tr><td style="padding:6px 0;color:#666;">City</td><td>${order.delivery.city}</td></tr>
    <tr><td style="padding:6px 0;color:#666;">Region</td><td>${order.delivery.region}</td></tr>
    ${order.delivery.notes ? `<tr><td style="padding:6px 0;color:#666;">Notes</td><td>${order.delivery.notes}</td></tr>` : ""}
  </table>

  <h3 style="border-bottom:2px solid #111;padding-bottom:8px;margin-top:24px;">Items Ordered</h3>
  <table style="width:100%;border-collapse:collapse;">
    <thead>
      <tr style="background:#f5f5f5;">
        <th style="padding:8px;text-align:left;">Product</th>
        <th style="padding:8px;text-align:center;">Qty</th>
        <th style="padding:8px;text-align:left;">Size</th>
        <th style="padding:8px;text-align:left;">Color</th>
        <th style="padding:8px;text-align:right;">Price</th>
      </tr>
    </thead>
    <tbody>${itemRows}</tbody>
  </table>

  <div style="margin-top:16px;text-align:right;font-size:18px;font-weight:bold;">
    Total: GH₵ ${order.total.toFixed(2)}
  </div>

  <h3 style="border-bottom:2px solid #111;padding-bottom:8px;margin-top:24px;">Payment</h3>
  <p>${order.payment === "momo" ? `Mobile Money · ${order.momoNumber ?? ""}` : "Card Payment"}</p>

  <hr style="margin:32px 0;border:none;border-top:1px solid #eee;"/>
  <p style="color:#999;font-size:12px;">Business Arena · Abelemkpe, Afriyie Street 39, Accra · yonnyafuubi477@gmail.com</p>
</body>
</html>`;
}

export const Route = createFileRoute("/api/notify")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!RESEND_API_KEY) {
          return Response.json(
            { success: false, error: "RESEND_API_KEY not configured" },
            { status: 500 },
          );
        }

        let order: Order;
        try {
          order = (await request.json()) as Order;
        } catch {
          return Response.json({ success: false, error: "Invalid request body" }, { status: 400 });
        }

        if (!order.id || !order.customer?.email) {
          return Response.json({ success: false, error: "Missing required order fields" }, { status: 400 });
        }

        try {
          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${RESEND_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: "Business Arena <onboarding@resend.dev>",
              to: [OWNER_EMAIL],
              reply_to: order.customer.email,
              subject: `New Order ${order.id} — GH₵ ${order.total.toFixed(2)}`,
              html: buildEmailHtml(order),
            }),
          });

          if (!res.ok) {
            const err = await res.text();
            console.error("Resend error:", err);
            return Response.json({ success: false, error: err }, { status: 502 });
          }

          return Response.json({ success: true });
        } catch (err) {
          console.error("Email send failed:", err);
          return Response.json({ success: false, error: String(err) }, { status: 500 });
        }
      },
    },
  },
});
