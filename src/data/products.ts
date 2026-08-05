import cap1 from "@/assets/cap1.jpeg";
import cap2 from "@/assets/cap2.jpeg";
import cap5 from "@/assets/cap5.jpeg";
import cap6 from "@/assets/cap6.jpeg";
import cap7 from "@/assets/cap7.jpeg";
import cap8 from "@/assets/cap8.jpeg";
import cap9 from "@/assets/cap9.jpeg";
import cap10 from "@/assets/cap10.jpeg";
import cap11 from "@/assets/cap11.jpeg";
import slipper1img from "@/assets/slipper1.jpeg";
import slipper2img from "@/assets/slipper2.jpeg";
import slipper3img from "@/assets/slipper3.jpeg";
import slipper4img from "@/assets/slipper4.jpeg";
import cover1 from "@/assets/cover1.jpeg";
import cover2 from "@/assets/cover2.jpeg";
import cover3 from "@/assets/cover3.jpeg";
import cover4 from "@/assets/cover4.jpeg";
import cover5 from "@/assets/cover5.jpeg";
import cover6 from "@/assets/cover6.jpeg";
import cover7 from "@/assets/cover7.jpeg";
import cover8 from "@/assets/cover8.jpeg";
import cover9 from "@/assets/cover9.jpeg";
import shirt1 from "@/assets/shirt1.jpeg";

export type Product = {
  id: string;
  name: string;
  price: number;
  compareAt?: number;
  rating: number;
  reviews: number;
  category: "slippers" | "caps" | "phone-covers" | "shirts";
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
  // SLIPPERS
  {
    id: "cloud-indoor-slippers",
    name: "Cloud Indoor Slippers",
    price: 150,
    rating: 4.8,
    reviews: 214,
    category: "slippers",
    subcategory: "Men's Birk Slippers",
    image: slipper1img,
    images: [slipper1img, slipper2img, slipper3img, slipper4img],
    colors: ["Beige", "White", "Charcoal"],
    sizes: ["40", "41", "42", "43", "44", "45", "46"],
    stock: 42,
    description: "Everyday indoor slippers with a memory-foam insole and breathable felt upper. Quiet sole, warm lining, made to disappear on your feet.",
    isBestseller: true,
  },
  {
    id: "plush-memory-slippers",
    name: "Plush Memory Foam Slippers",
    price: 150,
    rating: 4.7,
    reviews: 168,
    category: "slippers",
    subcategory: "Men's Birk Slippers",
    image: slipper2img,
    images: [slipper2img, slipper4img],
    colors: ["White", "Beige"],
    sizes: ["40", "41", "42", "43", "44", "45", "46"],
    stock: 30,
    description: "Plush faux-shearling lining wrapped around a contoured memory-foam sole. All-day comfort for cooler mornings.",
    isNew: true,
  },
  {
    id: "leather-loafer-slippers",
    name: "Leather Loafer Slippers",
    price: 150,
    rating: 4.9,
    reviews: 92,
    category: "slippers",
    subcategory: "Men's Birk Slippers",
    image: slipper3img,
    images: [slipper3img],
    colors: ["Black", "Charcoal"],
    sizes: ["40", "41", "42", "43", "44", "45", "46"],
    stock: 18,
    description: "A slipper that dresses up. Premium leather-look upper with a soft footbed and durable rubber outsole for indoor–outdoor wear.",
  },
  {
    id: "open-toe-slippers",
    name: "Open Toe Slippers",
    price: 150,
    rating: 4.6,
    reviews: 54,
    category: "slippers",
    subcategory: "Men's Birk Slippers",
    image: slipper4img,
    images: [slipper4img],
    colors: ["Beige", "Black"],
    sizes: ["40", "41", "42", "43", "44", "45", "46"],
    stock: 35,
    description: "Lightweight open-toe slippers perfect for the bathroom or quick errands. Easy to slip on, easy to love.",
  },
  // CAPS — all sold out
  {
    id: "classic-snapback-cap",
    name: "cap",
    price: 100,
    rating: 4.9,
    reviews: 341,
    category: "caps",
    subcategory: "Snapbacks",
    image: cap1,
    images: [cap1, cap2],
    colors: ["Black", "White", "Navy"],
    sizes: [],
    stock: 0,
    description: "A clean, structured snapback with a flat brim and adjustable back strap. Fits all head sizes comfortably.",
    isBestseller: true,
  },
  {
    id: "fitted-baseball-cap",
    name: "cap",
    price: 100,
    rating: 4.8,
    reviews: 127,
    category: "caps",
    subcategory: "Baseball Caps",
    image: cap2,
    images: [cap2, cap1],
    colors: ["Beige", "Black", "Olive"],
    sizes: [],
    stock: 0,
    description: "Premium cotton twill baseball cap with a pre-curved brim. Lightweight and breathable for all-day wear.",
    isNew: true,
  },
  {
    id: "bucket-hat",
    name: "cap",
    price: 100,
    rating: 4.7,
    reviews: 76,
    category: "caps",
    subcategory: "Bucket Hats",
    image: cap5,
    images: [cap5, cap6],
    colors: ["Beige", "White", "Charcoal"],
    sizes: [],
    stock: 0,
    description: "Relaxed cotton bucket hat with a wide brim for sun protection. Soft, packable, and perfect for everyday wear.",
  },
  {
    id: "dad-hat",
    name: "cap",
    price: 100,
    rating: 4.7,
    reviews: 88,
    category: "caps",
    subcategory: "Dad Hats",
    image: cap6,
    images: [cap6, cap7],
    colors: ["Black", "Navy", "Beige"],
    sizes: [],
    stock: 0,
    description: "Unstructured low-profile dad hat with a curved brim. Casual, clean, and goes with everything.",
  },
  {
    id: "fitted-cap",
    name: "cap",
    price: 100,
    rating: 4.8,
    reviews: 65,
    category: "caps",
    subcategory: "Fitted Caps",
    image: cap7,
    images: [cap7, cap8],
    colors: ["Black", "White"],
    sizes: [],
    stock: 0,
    description: "Structured fitted cap with a flat brim. A streetwear staple built for a clean, sharp look.",
  },
  {
    id: "beanie-cap",
    name: "cap",
    price: 100,
    rating: 4.6,
    reviews: 50,
    category: "caps",
    subcategory: "Beanies",
    image: cap8,
    images: [cap8, cap9],
    colors: ["Black", "Gray", "Navy"],
    sizes: [],
    stock: 0,
    description: "Soft knit beanie for cool days. Stretchy, warm, and fits all head sizes.",
  },
  {
    id: "snapback-2",
    name: "cap",
    price: 100,
    rating: 4.9,
    reviews: 99,
    category: "caps",
    subcategory: "Snapbacks",
    image: cap9,
    images: [cap9, cap10],
    colors: ["Black", "Red", "Blue"],
    sizes: [],
    stock: 0,
    description: "Bold premium snapback with embroidered detail. Stand out from the crowd.",
    isNew: true,
  },
  {
    id: "trucker-cap",
    name: "cap",
    price: 100,
    rating: 4.7,
    reviews: 73,
    category: "caps",
    subcategory: "Baseball Caps",
    image: cap10,
    images: [cap10, cap11],
    colors: ["Black", "Beige"],
    sizes: [],
    stock: 0,
    description: "Classic trucker cap with a mesh back panel for breathability. Lightweight and perfect for outdoor wear.",
  },
  {
    id: "flat-cap",
    name: "cap",
    price: 100,
    rating: 4.8,
    reviews: 82,
    category: "caps",
    subcategory: "Fitted Caps",
    image: cap11,
    images: [cap11, cap1],
    colors: ["Black", "White", "Olive"],
    sizes: [],
    stock: 0,
    description: "Sharp flat brim cap with a structured front panel. Clean lines, bold presence.",
  },
  // PHONE COVERS
  {
    id: "iphone-clear-case",
    name: "iPhone Clear Case",
    price: 60,
    rating: 4.8,
    reviews: 120,
    category: "phone-covers",
    subcategory: "iPhone Cases",
    image: cover1,
    images: [cover1, cover2],
    colors: ["Clear", "Black", "Blue"],
    sizes: ["iPhone 13", "iPhone 14", "iPhone 15"],
    stock: 60,
    description: "Slim, crystal-clear case with shock-absorbing corners. Shows off your phone while keeping it protected.",
    isBestseller: true,
  },
  {
    id: "samsung-rugged-case",
    name: "Samsung Rugged Case",
    price: 60,
    rating: 4.7,
    reviews: 85,
    category: "phone-covers",
    subcategory: "iPhone Cases",
    image: cover2,
    images: [cover2, cover3],
    colors: ["Black", "Navy", "Red"],
    sizes: ["iPhone 13", "iPhone 14", "iPhone 15"],
    stock: 45,
    description: "Heavy-duty rugged case with dual-layer protection. Drop-tested and built to handle daily life.",
    isNew: true,
  },
  {
    id: "tecno-soft-case",
    name: "Soft Silicon Case",
    price: 60,
    rating: 4.6,
    reviews: 64,
    category: "phone-covers",
    subcategory: "iPhone Cases",
    image: cover3,
    images: [cover3, cover4],
    colors: ["Black", "Clear", "Pink"],
    sizes: ["iPhone 13", "iPhone 14", "iPhone 15"],
    stock: 50,
    description: "Soft silicone case with a smooth matte finish. Lightweight, flexible, and easy to grip.",
  },
  {
    id: "infinix-case",
    name: "Protective Case",
    price: 60,
    rating: 4.6,
    reviews: 48,
    category: "phone-covers",
    subcategory: "iPhone Cases",
    image: cover4,
    images: [cover4, cover5],
    colors: ["Black", "Clear"],
    sizes: ["iPhone 13", "iPhone 14", "iPhone 15"],
    stock: 40,
    description: "Durable protective case with full edge coverage and raised bezels.",
  },
  {
    id: "itel-case",
    name: "Slim Case",
    price: 60,
    rating: 4.5,
    reviews: 38,
    category: "phone-covers",
    subcategory: "iPhone Cases",
    image: cover5,
    images: [cover5, cover6],
    colors: ["Black", "Clear", "Blue"],
    sizes: ["iPhone 13", "iPhone 14", "iPhone 15"],
    stock: 55,
    description: "Slim and lightweight case. Affordable protection without the bulk.",
  },
  {
    id: "universal-wallet-case",
    name: "Wallet Case",
    price: 60,
    rating: 4.7,
    reviews: 72,
    category: "phone-covers",
    subcategory: "iPhone Cases",
    image: cover6,
    images: [cover6, cover7],
    colors: ["Black", "Brown", "Red"],
    sizes: ["iPhone 13", "iPhone 14", "iPhone 15"],
    stock: 35,
    description: "Multi-function wallet case with card slots and a magnetic closure.",
  },
  {
    id: "iphone-leather-case",
    name: "iPhone Leather Case",
    price: 60,
    rating: 4.8,
    reviews: 90,
    category: "phone-covers",
    subcategory: "iPhone Cases",
    image: cover7,
    images: [cover7, cover8],
    colors: ["Black", "Brown", "Tan"],
    sizes: ["iPhone 13", "iPhone 14", "iPhone 15"],
    stock: 28,
    description: "Premium leather case with a soft microfiber lining. Elegant protection for everyday carry.",
    isNew: true,
  },
  {
    id: "samsung-clear-case",
    name: "Crystal Clear Case",
    price: 60,
    rating: 4.6,
    reviews: 55,
    category: "phone-covers",
    subcategory: "iPhone Cases",
    image: cover8,
    images: [cover8, cover9],
    colors: ["Clear", "Black"],
    sizes: ["iPhone 13", "iPhone 14", "iPhone 15"],
    stock: 48,
    description: "Crystal-clear slim case. Minimal design, maximum protection.",
  },
  {
    id: "universal-shockproof-case",
    name: "Shockproof Case",
    price: 60,
    rating: 4.7,
    reviews: 61,
    category: "phone-covers",
    subcategory: "iPhone Cases",
    image: cover9,
    images: [cover9, cover1],
    colors: ["Black", "Blue", "Green"],
    sizes: ["iPhone 13", "iPhone 14", "iPhone 15"],
    stock: 42,
    description: "Military-grade shockproof case. Corner air cushions absorb impact from every angle.",
  },
  // SHIRTS
  {
    id: "classic-tee",
    name: "Classic Crew Tee",
    price: 120,
    rating: 4.8,
    reviews: 180,
    category: "shirts",
    subcategory: "T-Shirts",
    image: shirt1,
    images: [shirt1],
    colors: ["White", "Black", "Navy", "Gray"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 50,
    description: "Clean, everyday crew-neck tee made from soft 100% cotton. A wardrobe essential.",
    isBestseller: true,
  },
];

export const slipperSubcategories = [
  "Men's Birk Slippers",
];

export const capsSubcategories = [
  "Snapbacks",
  "Baseball Caps",
  "Bucket Hats",
  "Fitted Caps",
  "Dad Hats",
  "Beanies",
];

export const phoneCoversSubcategories = [
  "iPhone Cases",
];

export const shirtsSubcategories = [
  "T-Shirts",
  "Polo Shirts",
  "Casual Shirts",
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export function formatPrice(amount: number) {
  return `GH₵ ${amount.toLocaleString("en-GH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
