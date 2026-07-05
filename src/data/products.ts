import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";

export type Product = {
  id: string;
  name: string;
  price: number;
  compareAt?: number;
  rating: number;
  reviews: number;
  category: "slippers" | "bedding";
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
    image: p1,
    images: [p1, p2, p3],
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
    image: p2,
    images: [p2, p1],
    colors: ["White", "Beige"],
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
    image: p3,
    images: [p3, p1],
    colors: ["Black", "Charcoal"],
    sizes: ["M", "L", "XL", "XXL"],
    stock: 18,
    description:
      "A slipper that dresses up. Premium leather-look upper with a soft footbed and durable rubber outsole for indoor–outdoor wear.",
  },
  {
    id: "pure-white-sheet-set",
    name: "Pure White Cotton Sheet Set",
    price: 289,
    compareAt: 329,
    rating: 4.9,
    reviews: 341,
    category: "bedding",
    subcategory: "Bedsheets",
    image: p4,
    images: [p4, p5],
    colors: ["White", "Beige"],
    sizes: ["Twin", "Full", "Queen", "King"],
    stock: 55,
    description:
      "400 thread-count long-staple cotton. Crisp, cool, and softer with every wash. Includes flat sheet, fitted sheet and two pillowcases.",
    isBestseller: true,
  },
  {
    id: "linen-duvet-set",
    name: "Washed Linen Duvet Set",
    price: 449,
    rating: 4.8,
    reviews: 127,
    category: "bedding",
    subcategory: "Duvets",
    image: p5,
    images: [p5, p4],
    colors: ["Beige", "White"],
    sizes: ["Queen", "King"],
    stock: 22,
    description:
      "Stonewashed European linen duvet cover with two shams. Naturally breathable, gets better with time.",
    isNew: true,
  },
  {
    id: "wool-throw-blanket",
    name: "Merino Wool Throw Blanket",
    price: 199,
    rating: 4.7,
    reviews: 76,
    category: "bedding",
    subcategory: "Blankets",
    image: p6,
    images: [p6, p5],
    colors: ["Gray", "Beige"],
    sizes: ["Throw", "Queen"],
    stock: 40,
    description:
      "Lightweight merino wool throw with hand-tied fringe. Warm enough for the couch, elegant enough for the foot of the bed.",
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

export const beddingSubcategories = [
  "Bedsheets",
  "Pillowcases",
  "Duvets",
  "Comforters",
  "Blankets",
  "Mattress Protectors",
  "Bed Covers",
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export function formatPrice(amount: number) {
  return `GH₵ ${amount.toLocaleString("en-GH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
