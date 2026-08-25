"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  kind: "mặn" | "chay";
  image: string;
  description: string;
};

const products: Product[] = [
  {
    id: "cuon-long-dao",
    name: "Cuốn lòng đào",
    category: "Bánh tráng cuốn",
    price: 45000,
    kind: "mặn",
    image: "/them-menu-roll.webp",
    description: "Trứng lòng đào béo ngậy, tóp mỡ giòn, hành phi sốt riêng đậm vị.",
  },
  {
    id: "tron-trung-cut",
    name: "Trộn trứng cút",
    category: "Bánh tráng trộn",
    price: 39000,
    kind: "mặn",
    image: "/them-menu-mix.webp",
    description: "Trộn đều tay cùng tôm khô, bò khô cay nhẹ, rau răm và xoài chua.",
  },
  {
    id: "cham-sot-me",
    name: "Chấm sốt me",
    category: "Bánh tráng chấm",
    price: 29000,
    kind: "mặn",
    image: "/them-menu-dip.webp",
    description: "Bánh tráng phơi sương mỏng dẻo, sốt me chua cay mặn ngọt bùng nổ.",
  },
  {
    id: "cuon-rau-dau-hu",
    name: "Cuốn rau đậu hũ",
    category: "Bánh tráng chay",
    price: 35000,
    kind: "chay",
    image: "/them-menu-veggie.webp",
    description: "Đậu hũ áp chảo vàng giòn, rau tươi mát cùng nước sốt chay đậm đà.",
  },
  {
    id: "topping-gion-thom",
    name: "Topping giòn thơm",
    category: "Topping",
    price: 15000,
    kind: "mặn",
    image: "/them-menu-topping.webp",
    description: "Tóp mỡ tươi giòn tan, hành phi nguyên chất, đậu phộng rang giòn.",
  },
  {
    id: "tra-tac-mat-lanh",
    name: "Trà tắc mát lạnh",
    category: "Đồ uống",
    price: 22000,
    kind: "chay",
    image: "/them-menu-drink.webp",
    description: "Trà tắc thơm lừng, chua thanh ngọt dịu, giải nhiệt và giải ngấy tức thì.",
  },
];

const categoryList = [
  "Tất cả",
  "Bánh tráng cuốn",
  "Bánh tráng chấm",
  "Bánh tráng trộn",
  "Bánh tráng chay",
  "Topping",
  "Đồ uống",
];

const price = (value: number) => `${new Intl.NumberFormat("vi-VN").format(value)}đ`;

export function ProductCatalog() {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<string>("Tất cả");
  const [kind, setKind] = useState<string>("Tất cả");
  const [sort, setSort] = useState<string>("featured");
  const [cartMap, setCartMap] = useState<Record<string, number>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync category from URL query parameters on load and changes
  useEffect(() => {
    const catParam = searchParams.get("category");
    if (catParam) {
      const matched = categoryList.find(
        (c) => c.toLowerCase() === decodeURIComponent(catParam).trim().toLowerCase()
      );
      if (matched) {
        setCategory(matched);
      }
    } else {
      setCategory("Tất cả");
    }
  }, [searchParams]);

  // Sync cart from localStorage and window events
  const syncCart = () => {
    try {
      const current = JSON.parse(window.localStorage.getItem("them-cart") || "[]");
      const map: Record<string, number> = {};
      current.forEach((item: { name: string; quantity: number }) => {
        map[item.name] = (map[item.name] || 0) + (item.quantity || 1);
      });
      setCartMap(map);
    } catch {
      setCartMap({});
    }
  };

  useEffect(() => {
    syncCart();
    window.addEventListener("them-cart-change", syncCart);
    return () => window.removeEventListener("them-cart-change", syncCart);
  }, []);

  const handleCategorySelect = (selected: string) => {
    setCategory(selected);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (selected === "Tất cả") {
        url.searchParams.delete("category");
      } else {
        url.searchParams.set("category", selected);
      }
      window.history.pushState({}, "", url.toString());
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  };

  const addToCart = (product: Product, openCheckout = false) => {
    try {
      const current = JSON.parse(window.localStorage.getItem("them-cart") || "[]");
      const foundIndex = current.findIndex((item: { name: string }) => item.name === product.name);

      let next;
      if (foundIndex >= 0) {
        next = [...current];
        next[foundIndex] = {
          ...next[foundIndex],
          quantity: (next[foundIndex].quantity || 1) + 1,
        };
      } else {
        next = [
          ...current,
          {
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image,
          },
        ];
      }

      window.localStorage.setItem("them-cart", JSON.stringify(next));
      window.localStorage.setItem(
        "them-cart-count",
        String(next.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0))
      );
      window.dispatchEvent(new Event("them-cart-change"));

      if (openCheckout) {
        window.dispatchEvent(new Event("them-open-checkout"));
      } else {
        showToast(`Đã thêm "${product.name}" vào giỏ!`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const items = useMemo(() => {
    return products
      .filter(
        (p) =>
          (category === "Tất cả" || p.category.toLowerCase() === category.toLowerCase()) &&
          (kind === "Tất cả" || p.kind === kind)
      )
      .sort((a, b) => (sort === "low" ? a.price - b.price : sort === "high" ? b.price - a.price : 0));
  }, [category, kind, sort]);

  const totalCartUnits = Object.values(cartMap).reduce((a, b) => a + b, 0);

  return (
    <section className="catalog-section">
      {/* Category Pills / Chips Filter for instant click */}
      <div className="category-pills" role="tablist" aria-label="Phân loại món">
        {categoryList.map((cat) => {
          const isActive = category === cat;
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`category-pill${isActive ? " is-active" : ""}`}
              onClick={() => handleCategorySelect(cat)}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div className="catalog-toolbar">
        <label>
          Danh mục
          <select value={category} onChange={(e) => handleCategorySelect(e.target.value)}>
            {categoryList.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </select>
        </label>

        <label>
          Mức giá
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="featured">Nổi bật</option>
            <option value="low">Giá thấp đến cao</option>
            <option value="high">Giá cao đến thấp</option>
          </select>
        </label>

        <label>
          Khẩu vị
          <select value={kind} onChange={(e) => setKind(e.target.value)}>
            <option value="Tất cả">Tất cả</option>
            <option value="chay">Chay</option>
            <option value="mặn">Mặn</option>
          </select>
        </label>

        <div className="catalog-cart-badge">
          <button
            type="button"
            className="cart-badge-button"
            onClick={() => window.dispatchEvent(new Event("them-open-cart"))}
          >
            🛒 Giỏ hàng: <strong>{totalCartUnits} món</strong>
          </button>
        </div>
      </div>

      <div className="product-grid">
        {items.map((p) => {
          const inCartCount = cartMap[p.name] || 0;
          return (
            <article className="product-card" key={p.name}>
              <div className="product-card-img-wrap">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  decoding="async"
                  width={320}
                  height={240}
                />
                {inCartCount > 0 && (
                  <span className="product-incart-tag">Đã chọn: {inCartCount}</span>
                )}
              </div>
              <div className="product-card-info">
                <span className="product-category-label">{p.category}</span>
                <h2>{p.name}</h2>
                <p>{p.description || (p.kind === "chay" ? "Lựa chọn chay thanh nhẹ" : "Đậm vị đặc trưng THÈM")}</p>
                <div className="product-card-bottom">
                  <strong className="product-price">{price(p.price)}</strong>
                  <div className="product-card-actions">
                    <button
                      type="button"
                      className="btn-add-cart"
                      onClick={() => addToCart(p, false)}
                      title="Thêm món này vào giỏ"
                    >
                      {inCartCount > 0 ? `+ Thêm (${inCartCount})` : "+ Giỏ"}
                    </button>
                    <button
                      type="button"
                      className="btn-order-now"
                      onClick={() => addToCart(p, true)}
                      title="Đặt món này và chuyển sang xác nhận đơn"
                    >
                      Đặt ngay
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {items.length === 0 && (
        <div className="no-products-found">
          <p>Không tìm thấy món phù hợp với bộ lọc hiện tại.</p>
          <button
            type="button"
            className="button button-red"
            onClick={() => {
              handleCategorySelect("Tất cả");
              setKind("Tất cả");
              setSort("featured");
            }}
          >
            Xem tất cả món
          </button>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <aside className="toast-notification" role="status" aria-live="polite">
          <span>✓ {toastMessage}</span>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("them-open-cart"))}
          >
            Xem giỏ →
          </button>
        </aside>
      )}
    </section>
  );
}
