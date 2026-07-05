import cap1 from "@/assets/cap1.jpeg";
import cap2 from "@/assets/cap2.jpeg";
import cap5 from "@/assets/cap5.jpeg";
import cap6 from "@/assets/cap6.jpeg";
import cap7 from "@/assets/cap7.jpeg";
import image from "@/assets/image.jpeg";

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
    image: cap1,
    images: [cap1, cap2, cap5],
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
    image: cap2,
    images: [cap2, cap1],
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
    image: cap5,
    images: [cap5, cap1],
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
    image: cap6,
    images: [cap6, cap7],
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
    image: cap7,
    images: [cap7, cap6],
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
    image: image,
    images: [image, cap6],
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
