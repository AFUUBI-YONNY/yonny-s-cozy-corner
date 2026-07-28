import { createFileRoute } from "@tanstack/react-router";
import type { Order } from "@/lib/orders";

// CallMeBot — free WhatsApp API. Register at https://www.callmebot.com/blog/free-api-whatsapp-messages/
// Set these in your .env file:
// CALLMEBOT_PHONE=233592588531   (no + prefix)
// CALLMEBOT_APIKEY=your_api_key
const CALLMEBOT_PHONE = process.env["CALLMEBOT_PHONE"] ?? "233592588531";
const CALLMEBOT_APIKEY = process.env["CALLMEBOT_APIKEY"] ?? "";

function buildWhatsAppMessage(order: Order): string {
  const date = new Date(order.createdAt).toLocaleString("en-GH", {
    timeZone: "Africa/Accra",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const itemLines = order.items
    .map((i) => `  • ${i.name} x${i.quantity} = GH₵${(i.price * i.quantity).toFixed(2)}`)
    .join("\n");

  return (
    `🛍️ *NEW ORDER — Business Arena*\n` +
    `Order ID: *${order.id}*\n` +
    `Date: ${date}\n\n` +
    `👤 *Customer*\n` +
    `Name: ${order.customer.firstName} ${order.customer.lastName}\n` +
    `Phone: ${order.customer.phone}\n` +
    `Email: ${order.customer.email}\n\n` +
    `📦 *Items*\n${itemLines}\n\n` +
    `💰 *Total: GH₵${order.total.toFixed(2)}*\n\n` +
    `📍 *Delivery Address*\n` +
    `${order.delivery.address}, ${order.delivery.city}, ${order.delivery.region}` +
    (order.delivery.notes ? `\nNotes: ${order.delivery.notes}` : "") +
    `\n\n💳 Payment: ${order.payment === "momo" ? `Mobile Money (${order.momoNumber ?? ""})` : "Card"}`
  );
}

export const Route = createFileRoute("/api/whatsapp")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!CALLMEBOT_APIKEY) {
          return Response.json(
            {
              success: false,
              error:
                "CALLMEBOT_APIKEY not configured. See https://www.callmebot.com/blog/free-api-whatsapp-messages/ to get your free API key.",
            },
            { status: 500 },
          );
        }

        let order: Order;
        try {
          order = (await request.json()) as Order;
        } catch {
          return Response.json({ success: false, error: "Invalid request body" }, { status: 400 });
        }

        if (!order.id) {
          return Response.json({ success: false, error: "Missing order ID" }, { status: 400 });
        }

        const message = buildWhatsAppMessage(order);
        const encoded = encodeURIComponent(message);
        const url = `https://api.callmebot.com/whatsapp.php?phone=${CALLMEBOT_PHONE}&text=${encoded}&apikey=${CALLMEBOT_APIKEY}`;

        try {
          const res = await fetch(url);
          const body = await res.text();

          if (!res.ok || body.toLowerCase().includes("error")) {
            console.error("CallMeBot error:", body);
            return Response.json({ success: false, error: body }, { status: 502 });
          }

          return Response.json({ success: true });
        } catch (err) {
          console.error("WhatsApp send failed:", err);
          return Response.json({ success: false, error: String(err) }, { status: 500 });
        }
      },
    },
  },
});
