"use client";

import { useEffect, useState } from "react";

export type CartItem = {
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export function SiteHeader() {
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "checkout" | "success">("cart");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderInfo, setOrderInfo] = useState<{
    id: string;
    fullName: string;
    phone: string;
    address: string;
    note: string;
    paymentMethod: string;
    total: number;
    items: CartItem[];
  } | null>(null);

  // Form states
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");

  useEffect(() => {
    let previousY = window.scrollY;
    let frame = 0;

    const updateHeader = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 24);

      if (currentY < 96 || currentY < previousY - 8) {
        setIsHidden(false);
      } else if (currentY > previousY + 8) {
        setIsHidden(true);
      }

      previousY = currentY;
      frame = 0;
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateHeader);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const syncCart = () => {
      try {
        const items: CartItem[] = JSON.parse(window.localStorage.getItem("them-cart") || "[]");
        setCartItems(items);
        setCartCount(items.reduce((sum, item) => sum + item.quantity, 0));
      } catch {
        setCartItems([]);
        setCartCount(0);
      }
    };

    const handleOpenCheckout = () => {
      syncCart();
      setCheckoutStep("checkout");
      setIsCartOpen(true);
    };

    const handleOpenCart = () => {
      syncCart();
      setCheckoutStep("cart");
      setIsCartOpen(true);
    };

    syncCart();
    window.addEventListener("them-cart-change", syncCart);
    window.addEventListener("them-open-checkout", handleOpenCheckout);
    window.addEventListener("them-open-cart", handleOpenCart);

    return () => {
      window.removeEventListener("them-cart-change", syncCart);
      window.removeEventListener("them-open-checkout", handleOpenCheckout);
      window.removeEventListener("them-open-cart", handleOpenCart);
    };
  }, []);

  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalCount);
    window.localStorage.setItem("them-cart", JSON.stringify(items));
    window.localStorage.setItem("them-cart-count", String(totalCount));
    window.dispatchEvent(new Event("them-cart-change"));
  };

  const updateQuantity = (name: string, delta: number) => {
    const next = cartItems
      .map((item) => {
        if (item.name === name) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter((item): item is CartItem => item !== null);
    saveCart(next);
  };

  const removeItem = (name: string) => {
    saveCart(cartItems.filter((item) => item.name !== name));
  };

  const addSignatureItem = () => {
    const signature: CartItem = {
      name: "Cuốn lòng đào",
      price: 45000,
      quantity: 1,
      image: "/them-menu-roll.webp",
    };
    const found = cartItems.find((x) => x.name === signature.name);
    const next = found
      ? cartItems.map((x) => (x.name === signature.name ? { ...x, quantity: x.quantity + 1 } : x))
      : [...cartItems, signature];
    saveCart(next);
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const formatPrice = (value: number) => `${new Intl.NumberFormat("vi-VN").format(value)}đ`;

  const handleOrderNowClick = () => {
    if (cartItems.length > 0) {
      setCheckoutStep("checkout");
    } else {
      setCheckoutStep("cart");
    }
    setIsCartOpen(true);
  };

  const handleCartClick = () => {
    setCheckoutStep("cart");
    setIsCartOpen(true);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cartItems.length) return;

    const orderId = `THEM-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderInfo({
      id: orderId,
      fullName,
      phone,
      address,
      note,
      paymentMethod: paymentMethod === "cod" ? "Tiền mặt khi nhận hàng (COD)" : "Chuyển khoản VietQR",
      total,
      items: [...cartItems],
    });

    saveCart([]);
    setCheckoutStep("success");
  };

  return (
    <header className={`site-header${isScrolled ? " is-scrolled" : ""}${isHidden ? " is-hidden" : ""}`}>
      <a className="wordmark" href="/#top" aria-label="THÈM GÌ CŨNG CÓ">
        THÈM<br />GÌ CŨNG CÓ
      </a>

      <nav aria-label="Điều hướng chính" className="primary-nav">
        <a href="/">Trang chủ</a>
        <a href="/ve-chung-toi">Về chúng tôi</a>
        <div
          className="nav-cluster"
          onMouseEnter={() => setIsExploreOpen(true)}
          onMouseLeave={() => setIsExploreOpen(false)}
          onFocus={() => setIsExploreOpen(true)}
        >
          <button
            className="nav-trigger"
            type="button"
            aria-expanded={isExploreOpen}
            onClick={() => setIsExploreOpen((open) => !open)}
          >
            Menu
          </button>
          <div className={`nav-dropdown${isExploreOpen ? " is-open" : ""}`}>
            <a href="/menu?category=Bánh%20tráng%20cuốn">Bánh tráng cuốn</a>
            <a href="/menu?category=Bánh%20tráng%20chấm">Bánh tráng chấm</a>
            <a href="/menu?category=Bánh%20tráng%20trộn">Bánh tráng trộn</a>
            <a href="/menu?category=Bánh%20tráng%20chay">Bánh tráng chay</a>
            <a href="/menu?category=Topping">Topping</a>
            <a href="/menu?category=Đồ%20uống">Đồ uống</a>
          </div>
        </div>
        <a href="/cua-hang">Cửa hàng</a>
        <a href="/uu-dai-su-kien">Ưu đãi &amp; Sự kiện</a>
        <a href="/lien-he">Liên hệ</a>
      </nav>

      <div className="header-actions">
        <button
          className="order-now"
          type="button"
          onClick={handleOrderNowClick}
          aria-label="Đặt hàng ngay"
        >
          Đặt hàng ngay
        </button>
        <button
          className="cart-link"
          type="button"
          onClick={handleCartClick}
          aria-label={`Giỏ hàng, ${cartCount} sản phẩm`}
        >
          <span className="cart-text">Giỏ</span> <b>{cartCount}</b>
        </button>
      </div>

      {isCartOpen && (
        <div className="cart-backdrop" onMouseDown={() => setIsCartOpen(false)}>
          <aside
            className="cart-drawer"
            aria-label="Giỏ hàng và Đặt hàng"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="cart-close"
              type="button"
              onClick={() => setIsCartOpen(false)}
              aria-label="Đóng cửa sổ"
            >
              Đóng ✕
            </button>

            {checkoutStep === "success" && orderInfo ? (
              <div className="checkout-success">
                <span>✓</span>
                <h2>ĐÃ NHẬN ĐƠN THÈM!</h2>
                <div className="order-summary-box">
                  <p className="order-id">
                    Mã đơn hàng: <strong>#{orderInfo.id}</strong>
                  </p>
                  <p>
                    Khách hàng: <strong>{orderInfo.fullName}</strong> ({orderInfo.phone})
                  </p>
                  <p>
                    Địa chỉ: <strong>{orderInfo.address}</strong>
                  </p>
                  <p>
                    Thanh toán: <strong>{orderInfo.paymentMethod}</strong>
                  </p>
                  <p>
                    Tổng thanh toán: <strong>{formatPrice(orderInfo.total)}</strong>
                  </p>
                </div>
                <p className="success-note">
                  THÈM đang chuẩn bị đơn và sẽ liên hệ xác nhận trong ít phút. Dự kiến giao sau 20-30 phút!
                </p>
                <div className="success-actions">
                  <button
                    className="button button-red"
                    type="button"
                    onClick={() => {
                      setIsCartOpen(false);
                      setCheckoutStep("cart");
                    }}
                  >
                    Tiếp tục xem món
                  </button>
                  <a className="hotline-link" href="tel:19008888">
                    Hotline: 1900 8888
                  </a>
                </div>
              </div>
            ) : checkoutStep === "checkout" ? (
              <form className="checkout-form" onSubmit={handleCheckoutSubmit}>
                <h2>
                  XÁC NHẬN<br />
                  <em>ĐẶT HÀNG.</em>
                </h2>

                <div className="checkout-items-preview">
                  <span>
                    Đơn hàng ({cartItems.length} món): <strong>{formatPrice(total)}</strong>
                  </span>
                  <button
                    type="button"
                    className="text-link-small"
                    onClick={() => setCheckoutStep("cart")}
                  >
                    Xem lại giỏ
                  </button>
                </div>

                <label>
                  Họ và tên *
                  <input
                    required
                    placeholder="Nguyễn Văn A"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </label>

                <label>
                  Số điện thoại nhận hàng *
                  <input
                    required
                    type="tel"
                    placeholder="09xx xxx xxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </label>

                <label>
                  Địa chỉ nhận hàng chi tiết *
                  <textarea
                    required
                    rows={2}
                    placeholder="Số nhà, tên đường, phường, quận..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </label>

                <label>
                  Ghi chú cho THÈM (tuỳ chọn)
                  <input
                    placeholder="Ví dụ: Ít cay, nhiều sốt, nhiều tóp mỡ..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </label>

                <div className="payment-options">
                  <span className="payment-label">Hình thức thanh toán</span>
                  <label className="payment-radio">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                    />
                    <span>Tiền mặt khi nhận hàng (COD)</span>
                  </label>
                  <label className="payment-radio">
                    <input
                      type="radio"
                      name="payment"
                      value="qr"
                      checked={paymentMethod === "qr"}
                      onChange={() => setPaymentMethod("qr")}
                    />
                    <span>Chuyển khoản VietQR / MoMo</span>
                  </label>
                </div>

                <div className="checkout-total-row">
                  <span>Tổng tiền thanh toán</span>
                  <strong>{formatPrice(total)}</strong>
                </div>

                <button className="button button-red" type="submit">
                  Xác nhận đặt hàng ngay
                </button>

                <button
                  className="text-button"
                  type="button"
                  onClick={() => setCheckoutStep("cart")}
                >
                  ← Quay lại giỏ hàng
                </button>
              </form>
            ) : (
              <div className="cart-content">
                <h2>
                  GIỎ<br />
                  <em>THÈM.</em>
                </h2>
                {cartItems.length ? (
                  <>
                    <div className="cart-items">
                      {cartItems.map((item) => (
                        <article key={item.name}>
                          <img src={item.image} alt={item.name} />
                          <div>
                            <strong>{item.name}</strong>
                            <span>{formatPrice(item.price)}</span>
                            <div className="quantity">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.name, -1)}
                                aria-label="Giảm 1"
                              >
                                −
                              </button>
                              <b>{item.quantity}</b>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.name, 1)}
                                aria-label="Tăng 1"
                              >
                                +
                              </button>
                              <button
                                className="remove-item"
                                type="button"
                                onClick={() => removeItem(item.name)}
                                aria-label={`Xóa ${item.name}`}
                              >
                                Xóa
                              </button>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                    <div className="cart-total">
                      <span>Tạm tính</span>
                      <strong>{formatPrice(total)}</strong>
                    </div>
                    <div className="cart-actions">
                      <button
                        className="button button-red"
                        type="button"
                        onClick={() => setCheckoutStep("checkout")}
                      >
                        Tiến hành đặt hàng <span>→</span>
                      </button>
                      <button
                        className="clear-cart-btn"
                        type="button"
                        onClick={() => saveCart([])}
                      >
                        Xóa toàn bộ giỏ
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="cart-empty">
                    <p>Giỏ đang trống. Hãy chọn món ngon đậm vị để chiều cơn thèm hôm nay nhé!</p>
                    <div className="empty-cart-suggestion">
                      <span>Gợi ý món bán chạy nhất:</span>
                      <button
                        type="button"
                        className="suggest-item-btn"
                        onClick={addSignatureItem}
                      >
                        + Thêm Bánh tráng cuốn lòng đào (45.000đ)
                      </button>
                    </div>
                    <a
                      className="button button-red"
                      href="/menu"
                      onClick={() => setIsCartOpen(false)}
                    >
                      Xem toàn bộ Menu <span>↗</span>
                    </a>
                  </div>
                )}
              </div>
            )}
          </aside>
        </div>
      )}
    </header>
  );
}
