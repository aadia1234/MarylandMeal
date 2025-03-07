

export type Allergen = {
    name: string,
    symbol: string,
    color: string,
};

export const allergens: Allergen[] = [
  { name: "Dairy", symbol: "D", color: "#1f4e79" },
  { name: "Eggs", symbol: "E", color: "#d4a017" },
  { name: "Fish", symbol: "F", color: "#c73d4b" },
  { name: "Gluten", symbol: "G", color: "#c45b31" },
  { name: "Nuts", symbol: "N", color: "#b94737" },
  { name: "Sesame", symbol: "SS", color: "#e2a655" },
  { name: "Shellfish", symbol: "SF", color: "#5da89b" },
  { name: "Soy", symbol: "S", color: "#71a33d" },
  { name: "Halal Friendly", symbol: "HF", color: "#4c78a8" },
  { name: "Locally Grown", symbol: "L", color: "#8a8d91" },
  { name: "Smart Choice", symbol: "SC", color: "#ffcc5c" },
  { name: "Vegan", symbol: "VG", color: "#824e9e" },
  { name: "Vegetarian", symbol: "V", color: "#3f602b" },
];
