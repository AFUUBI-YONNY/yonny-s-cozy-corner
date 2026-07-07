import cap6 from "@/assets/cap6.jpeg";
import cap7 from "@/assets/cap7.jpeg";
import image from "@/assets/image.jpeg";

const slipper1 = "https://placehold.co/800x800/e8e0d8/6b5e52?text=Slippers";
const slipper2 = "https://placehold.co/800x800/d8e0e8/526b6b?text=Slippers";
const slipper3 = "https://placehold.co/800x800/e0e8d8/5e6b52?text=Slippers";

export type Product = {
  id: string;
  name: string;
  price: number;
  compareAt?: number;
  rating: number;
  reviews: number;
  category: "slippers" | "caps";
  subcategory: string;
  image: string;
  images: string[];
  colors: string[];
  sizes: string[];
  stock: number;
  description: string;
  isNew?: boolean;
  isBestseller?: boolean;
};

export const products: Product[] = [
  {
    id: "cloud-indoor-slippers",
    name: "Cloud Indoor Slippers",
    price: 129,
    compareAt: 159,
    rating: 4.8,
    reviews: 214,
    category: "slippers",
    subcategory: "Indoor Slippers",
    image: slipper1,
    images: [slipper1, slipper2, slipper3],
    colors: ["Beige", "White", "Charcoal"],
    sizes: ["S", "M", "L", "XL"],
    stock: 42,
    description:
      "Everyday indoor slippers with a memory-foam insole and breathable felt upper. Quiet sole, warm lining, made to disappear on your feet.",
    isBestseller: true,
  },
  {
    id: "plush-memory-slippers",
    name: "Plush Memory Foam Slippers",
    price: 149,
    rating: 4.7,
    reviews: 168,
    category: "slippers",
    subcategory: "Women's Slippers",
    image: slipper2,
    images: [slipper2, slipper1],
    sizes: ["S", "M", "L"],
    stock: 30,
    description:
      "Plush faux-shearling lining wrapped around a contoured memory-foam sole. All-day comfort for cooler mornings.",
    isNew: true,
  },
  {
    id: "leather-loafer-slippers",
    name: "Leather Loafer Slippers",
    price: 219,
    rating: 4.9,
    reviews: 92,
    category: "slippers",
    subcategory: "Men's Slippers",
    image: slipper3,
    images: [slipper3, slipper1],
    colors: ["Black", "Charcoal"],
    sizes: ["M", "L", "XL", "XXL"],
    stock: 18,
    description:
      "A slipper that dresses up. Premium leather-look upper with a soft footbed and durable rubber outsole for indoor–outdoor wear.",
  },
  {
    id: "classic-snapback-cap",
    name: "Classic Snapback Cap",
    price: 80,
    compareAt: 109,
    rating: 4.9,
    reviews: 341,
    category: "caps",
    subcategory: "Snapbacks",
    image: cap6,
    images: [cap6, cap7],
    colors: ["Black", "White", "Navy"],
    sizes: ["One Size"],
    stock: 55,
    description:
      "A clean, structured snapback with a flat brim and adjustable back strap. Fits all head sizes comfortably.",
    isBestseller: true,
  },
  {
    id: "fitted-baseball-cap",
    name: "Fitted Baseball Cap",
    price: 80,
    rating: 4.8,
    reviews: 127,
    category: "caps",
    subcategory: "Baseball Caps",
    image: cap7,
    images: [cap7, cap6],
    colors: ["Beige", "Black", "Olive"],
    sizes: ["S/M", "L/XL"],
    stock: 22,
    description:
      "Premium cotton twill baseball cap with a pre-curved brim. Lightweight and breathable for all-day wear.",
    isNew: true,
  },
  {
    id: "bucket-hat",
    name: "Cotton Bucket Hat",
    price: 80,
    rating: 4.7,
    reviews: 76,
    category: "caps",
    subcategory: "Bucket Hats",
    image: image,
    images: [image, cap6],
    colors: ["Beige", "White", "Charcoal"],
    sizes: ["S/M", "L/XL"],
    stock: 40,
    description:
      "Relaxed cotton bucket hat with a wide brim for sun protection. Soft, packable, and perfect for everyday wear.",
  },
];

export const slipperSubcategories = [
  "Indoor Slippers",
  "Outdoor Slippers",
  "Bathroom Slippers",
  "Men's Slippers",
  "Women's Slippers",
  "Children's Slippers",
];

export const capsSubcategories = [
  "Snapbacks",
  "Baseball Caps",
  "Bucket Hats",
  "Fitted Caps",
  "Dad Hats",
  "Beanies",
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export function formatPrice(amount: number) {
  return `GH₵ ${amount.toLocaleString("en-GH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
