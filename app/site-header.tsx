"use client";

import { useEffect, useState } from "react";

export function SiteHeader() {
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "checkout" | "success">("cart");
  const [cartItems, setCartItems] = useState<{name:string;price:number;quantity:number;image:string}[]>([]);

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
    const syncCart = () => { const items=JSON.parse(window.localStorage.getItem("them-cart") || "[]"); setCartItems(items); setCartCount(items.reduce((sum:number,item:{quantity:number})=>sum+item.quantity,0)); };
    syncCart(); window.addEventListener("them-cart-change", syncCart);
    return () => window.removeEventListener("them-cart-change", syncCart);
  }, []);

  const saveCart = (items:{name:string;price:number;quantity:number;image:string}[]) => { setCartItems(items); setCartCount(items.reduce((sum,item)=>sum+item.quantity,0)); window.localStorage.setItem("them-cart",JSON.stringify(items)); window.localStorage.setItem("them-cart-count",String(items.reduce((sum,item)=>sum+item.quantity,0))); window.dispatchEvent(new Event("them-cart-change")); };
  const total = cartItems.reduce((sum,item)=>sum+item.price*item.quantity,0);
  const formatPrice = (value:number) => `${new Intl.NumberFormat("vi-VN").format(value)}đ`;

  return (
    <header className={`site-header${isScrolled ? " is-scrolled" : ""}${isHidden ? " is-hidden" : ""}`}>
      <a className="wordmark" href="#top" aria-label="THÈM GÌ CŨNG CÓ">
        THÈM<br />GÌ CŨNG CÓ
      </a>
      <nav aria-label="Điều hướng chính" className="primary-nav">
        <a href="/">Trang chủ</a><a href="/ve-chung-toi">Về chúng tôi</a>
        <div className="nav-cluster" onMouseEnter={() => setIsExploreOpen(true)} onMouseLeave={() => setIsExploreOpen(false)} onFocus={() => setIsExploreOpen(true)}>
          <button className="nav-trigger" type="button" aria-expanded={isExploreOpen} onClick={() => setIsExploreOpen((open) => !open)}>Menu</button>
          <div className={`nav-dropdown${isExploreOpen ? " is-open" : ""}`}>
            <a href="/menu?category=Bánh%20tráng%20cuốn">Bánh tráng cuốn</a><a href="/menu?category=Bánh%20tráng%20chấm">Bánh tráng chấm</a><a href="/menu?category=Bánh%20tráng%20trộn">Bánh tráng trộn</a><a href="/menu?category=Bánh%20tráng%20chay">Bánh tráng chay</a><a href="/menu?category=Topping">Topping</a><a href="/menu?category=Đồ%20uống">Đồ uống</a>
          </div>
        </div>
        <a href="/cua-hang">Cửa hàng</a><a href="/uu-dai-su-kien">Ưu đãi &amp; Sự kiện</a><a href="/lien-he">Liên hệ</a>
      </nav>
      <div className="header-actions"><button className="order-now" type="button" onClick={() => {setCheckoutStep("cart");setIsCartOpen(true);}}>Đặt hàng ngay</button><button className="cart-link" type="button" onClick={() => {setCheckoutStep("cart");setIsCartOpen(true);}} aria-label={`Giỏ hàng, ${cartCount} sản phẩm`}>Giỏ <b>{cartCount}</b></button></div>
      {isCartOpen && <div className="cart-backdrop" onMouseDown={() => setIsCartOpen(false)}><aside className="cart-drawer" aria-label="Giỏ hàng" onMouseDown={event=>event.stopPropagation()}><button className="cart-close" type="button" onClick={() => setIsCartOpen(false)}>Đóng</button>{checkoutStep === "success" ? <div className="checkout-success"><span>✓</span><h2>ĐÃ NHẬN ĐƠN THÈM!</h2><p>THÈM sẽ liên hệ xác nhận đơn của bạn trong ít phút.</p><button className="button button-red" type="button" onClick={() => setIsCartOpen(false)}>Tiếp tục xem món</button></div> : checkoutStep === "checkout" ? <form className="checkout-form" onSubmit={event=>{event.preventDefault();saveCart([]);setCheckoutStep("success");}}><h2>XÁC NHẬN<br/><em>ĐẶT HÀNG.</em></h2><label>Họ và tên<input required /></label><label>Số điện thoại<input required type="tel" /></label><label>Địa chỉ nhận hàng<textarea required rows={3}/></label><p>Tạm tính <strong>{formatPrice(total)}</strong></p><button className="button button-red" type="submit">Xác nhận đơn</button><button className="text-button" type="button" onClick={()=>setCheckoutStep("cart")}>Quay lại giỏ</button></form> : <div className="cart-content"><h2>GIỎ<br/><em>THÈM.</em></h2>{cartItems.length ? <><div className="cart-items">{cartItems.map(item=><article key={item.name}><img src={item.image} alt=""/><div><strong>{item.name}</strong><span>{formatPrice(item.price)}</span><div className="quantity"><button type="button" onClick={()=>saveCart(cartItems.map(x=>x.name===item.name?{...x,quantity:Math.max(1,x.quantity-1)}:x))}>−</button><b>{item.quantity}</b><button type="button" onClick={()=>saveCart(cartItems.map(x=>x.name===item.name?{...x,quantity:x.quantity+1}:x))}>+</button><button className="remove-item" type="button" onClick={()=>saveCart(cartItems.filter(x=>x.name!==item.name))}>Xóa</button></div></div></article>)}</div><div className="cart-total"><span>Tạm tính</span><strong>{formatPrice(total)}</strong></div><button className="button button-red" type="button" onClick={()=>setCheckoutStep("checkout")}>Tiến hành đặt hàng</button></> : <div className="cart-empty"><p>Giỏ đang trống. Chọn món ngon rồi quay lại đây nhé.</p><a className="button button-red" href="/menu" onClick={()=>setIsCartOpen(false)}>Xem Menu</a></div>}</div>}</aside></div>}
    </header>
  );
}
