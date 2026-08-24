"use client";
import { useMemo, useState } from "react";

const products = [
  { name:"Cuốn lòng đào", category:"Bánh tráng cuốn", price:45000, kind:"mặn", image:"/them-menu-roll.png" },
  { name:"Trộn trứng cút", category:"Bánh tráng trộn", price:39000, kind:"mặn", image:"/them-menu-mix.png" },
  { name:"Chấm sốt me", category:"Bánh tráng chấm", price:29000, kind:"mặn", image:"/them-menu-dip.png" },
  { name:"Cuốn rau đậu hũ", category:"Bánh tráng chay", price:35000, kind:"chay", image:"/them-menu-veggie.png" },
  { name:"Topping giòn thơm", category:"Topping", price:15000, kind:"mặn", image:"/them-menu-topping.png" },
  { name:"Trà tắc mát lạnh", category:"Đồ uống", price:22000, kind:"chay", image:"/them-menu-drink.png" },
];
const price = (value:number) => `${new Intl.NumberFormat("vi-VN").format(value)}đ`;

export function ProductCatalog() {
  const [category,setCategory] = useState("Tất cả"); const [kind,setKind] = useState("Tất cả"); const [sort,setSort] = useState("featured"); const [cart,setCart] = useState<string[]>([]);
  const addToCart = (product:(typeof products)[number]) => { const current=JSON.parse(window.localStorage.getItem("them-cart") || "[]"); const found=current.find((item:{name:string})=>item.name===product.name); const next=found?current.map((item:{name:string;quantity:number})=>item.name===product.name?{...item,quantity:item.quantity+1}:item):[...current,{name:product.name,price:product.price,quantity:1,image:product.image}]; setCart(next.map((item:{name:string})=>item.name)); window.localStorage.setItem("them-cart",JSON.stringify(next)); window.localStorage.setItem("them-cart-count",String(next.reduce((sum:number,item:{quantity:number})=>sum+item.quantity,0))); window.dispatchEvent(new Event("them-cart-change")); };
  const items = useMemo(() => products.filter(p => (category === "Tất cả" || p.category === category) && (kind === "Tất cả" || p.kind === kind)).sort((a,b) => sort === "low" ? a.price-b.price : sort === "high" ? b.price-a.price : 0),[category,kind,sort]);
  return <section className="catalog-section"><div className="catalog-toolbar"><label>Danh mục<select value={category} onChange={e=>setCategory(e.target.value)}><option>Tất cả</option>{[...new Set(products.map(p=>p.category))].map(x=><option key={x}>{x}</option>)}</select></label><label>Mức giá<select value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Nổi bật</option><option value="low">Giá thấp đến cao</option><option value="high">Giá cao đến thấp</option></select></label><label>Khẩu vị<select value={kind} onChange={e=>setKind(e.target.value)}><option>Tất cả</option><option value="chay">Chay</option><option value="mặn">Mặn</option></select></label><strong>Giỏ: {cart.length}</strong></div><div className="product-grid">{items.map(p=><article className="product-card" key={p.name}><img src={p.image} alt={p.name}/><div><span>{p.category}</span><h2>{p.name}</h2><p>{p.kind === "chay" ? "Lựa chọn chay" : "Đậm vị THÈM"}</p><div className="product-card-bottom"><strong>{price(p.price)}</strong><button type="button" onClick={()=>addToCart(p)}>{cart.includes(p.name)?"Đã thêm":"Thêm vào giỏ"}</button></div></div></article>)}</div></section>;
}
