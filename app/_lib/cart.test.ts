import { describe, expect, it } from "vitest";
import { addCartItem, cartCount, cartTotal, changeQuantity, parseCart, type CartItem } from "./cart";

const roll = { name: "Cuốn lòng đào", price: 45000, image: "/them-menu-roll.webp" };
const tea = { name: "Trà tắc mát lạnh", price: 22000, image: "/them-menu-drink.webp" };

describe("cart rules", () => {
  it("adds a product and increments an existing quantity", () => {
    const once = addCartItem([], roll);
    const twice = addCartItem(once, roll);
    expect(twice).toEqual([{ ...roll, quantity: 2 }]);
  });

  it("removes an item when decrementing its quantity below one", () => {
    const items: CartItem[] = [{ ...roll, quantity: 1 }, { ...tea, quantity: 2 }];
    expect(changeQuantity(items, roll.name, -1)).toEqual([{ ...tea, quantity: 2 }]);
  });

  it("calculates quantities and totals from persisted cart items", () => {
    const items: CartItem[] = [{ ...roll, quantity: 2 }, { ...tea, quantity: 1 }];
    expect(cartCount(items)).toBe(3);
    expect(cartTotal(items)).toBe(112000);
  });

  it("discards malformed persisted cart data", () => {
    expect(parseCart("not-json")).toEqual([]);
    expect(parseCart(JSON.stringify([{ name: "missing fields" }]))).toEqual([]);
  });
});
