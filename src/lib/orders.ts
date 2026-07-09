export type OrderItem = {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
};

export type NotificationStatus = {
  email: "pending" | "sent" | "failed";
  whatsapp: "pending" | "sent" | "failed";
};

export type Order = {
  id: string;
  createdAt: string; // ISO string
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  delivery: {
    address: string;
    city: string;
    region: string;
    notes: string;
  };
  payment: "momo" | "card";
  momoNumber?: string;
  items: OrderItem[];
  total: number;
  notifications: NotificationStatus;
};

const STORAGE_KEY = "business-arena-orders-v1";

export function getOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Order[]) : [];
  } catch {
    return [];
  }
}

export function saveOrder(order: Order): void {
  if (typeof window === "undefined") return;
  const orders = getOrders();
  orders.unshift(order); // newest first
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export function updateOrderNotification(
  orderId: string,
  channel: keyof NotificationStatus,
  status: NotificationStatus[keyof NotificationStatus],
): void {
  if (typeof window === "undefined") return;
  const orders = getOrders();
  const order = orders.find((o) => o.id === orderId);
  if (!order) return;
  order.notifications[channel] = status;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export function generateOrderId(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `BA-${ts}-${rand}`;
}
