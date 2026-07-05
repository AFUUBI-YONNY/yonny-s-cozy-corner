import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "@/data/products";

export type CartItem = {
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
};

type StoreState = {
  cart: CartItem[];
  wishlist: string[];
};

type StoreContextValue = StoreState & {
  addToCart: (item: CartItem) => void;
  updateQty: (productId: string, qty: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  cartCount: number;
  wishlistCount: number;
  subtotal: number;
  cartDetailed: Array<CartItem & { product: Product }>;
};

const StoreContext = createContext<StoreContextValue | null>(null);

const STORAGE_KEY = "yonnys-shop-store-v1";

function loadInitial(): StoreState {
  if (typeof window === "undefined") return { cart: [], wishlist: [] };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { cart: [], wishlist: [] };
    const parsed = JSON.parse(raw);
    return {
      cart: Array.isArray(parsed.cart) ? parsed.cart : [],
      wishlist: Array.isArray(parsed.wishlist) ? parsed.wishlist : [],
    };
  } catch {
    return { cart: [], wishlist: [] };
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StoreState>({ cart: [], wishlist: [] });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(loadInitial());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state, hydrated]);

  const value = useMemo<StoreContextValue>(() => {
    const cartDetailed = state.cart
      .map((item) => {
        const product = products.find((p) => p.id === item.productId);
        return product ? { ...item, product } : null;
      })
      .filter((v): v is CartItem & { product: Product } => v !== null);

    const subtotal = cartDetailed.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

    return {
      ...state,
      cartDetailed,
      cartCount: state.cart.reduce((n, i) => n + i.quantity, 0),
      wishlistCount: state.wishlist.length,
      subtotal,
      addToCart: (item) =>
        setState((s) => {
          const existingIdx = s.cart.findIndex(
            (i) =>
              i.productId === item.productId &&
              i.size === item.size &&
              i.color === item.color,
          );
          const cart = [...s.cart];
          if (existingIdx >= 0) {
            cart[existingIdx] = {
              ...cart[existingIdx],
              quantity: cart[existingIdx].quantity + item.quantity,
            };
          } else {
            cart.push(item);
          }
          return { ...s, cart };
        }),
      updateQty: (productId, qty) =>
        setState((s) => ({
          ...s,
          cart: s.cart
            .map((i) => (i.productId === productId ? { ...i, quantity: Math.max(1, qty) } : i))
            .filter((i) => i.quantity > 0),
        })),
      removeFromCart: (productId) =>
        setState((s) => ({ ...s, cart: s.cart.filter((i) => i.productId !== productId) })),
      clearCart: () => setState((s) => ({ ...s, cart: [] })),
      toggleWishlist: (productId) =>
        setState((s) => ({
          ...s,
          wishlist: s.wishlist.includes(productId)
            ? s.wishlist.filter((id) => id !== productId)
            : [...s.wishlist, productId],
        })),
      isWishlisted: (productId) => state.wishlist.includes(productId),
    };
  }, [state]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
