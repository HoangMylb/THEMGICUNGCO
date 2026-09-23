export type CartItem = {
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export type CartProduct = Omit<CartItem, "quantity">;

export function parseCart(value: string | null): CartItem[] {
  try {
    const parsed: unknown = JSON.parse(value || "[]");
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((item): item is CartItem =>
      typeof item === "object" && item !== null &&
      typeof item.name === "string" && typeof item.price === "number" &&
      typeof item.quantity === "number" && item.quantity > 0 &&
      typeof item.image === "string"
    );
  } catch {
    return [];
  }
}

export function addCartItem(items: readonly CartItem[], product: CartProduct): CartItem[] {
  const existing = items.find((item) => item.name === product.name);
  if (!existing) return [...items, { ...product, quantity: 1 }];

  return items.map((item) => item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item);
}

export function changeQuantity(items: readonly CartItem[], name: string, delta: number): CartItem[] {
  return items
    .map((item) => item.name === name ? { ...item, quantity: item.quantity + delta } : item)
    .filter((item) => item.quantity > 0);
}

export function cartCount(items: readonly CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function cartTotal(items: readonly CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
