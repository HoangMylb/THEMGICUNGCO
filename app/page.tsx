import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

const categories = [
  ["Bánh tráng cuốn","Cuốn tay từng lớp, đầy đủ topping, ăn là ghiền ngay miếng đầu tiên.","/them-menu-roll.png","Bánh tráng%20cuốn"],
  ["Bánh tráng chấm","Vị chua cay mặn ngọt hòa quyện trong từng miếng bánh tráng phơi sương.","/them-menu-dip.png","Bánh tráng%20chấm"],
  ["Bánh tráng trộn","Trộn đều tay, đậm đà giữ vị bánh tráng truyền thống.","/them-menu-mix.png","Bánh tráng%20trộn"],
  ["Bánh tráng chay","Giữ trọn hương vị đặc trưng.","/them-menu-veggie.png","Bánh tráng%20chay"],
  ["Topping","Thêm topping, thêm vị — tự do biến tấu phần ăn theo sở thích.","/them-menu-topping.png","Topping"],
  ["Đồ uống","Giải khát đúng lúc, làm tròn vị cho bữa ăn thêm trọn vẹn.","/them-menu-drink.png","Đồ%20uống"],
];

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title">CUỐN MỘT<br /><em>MIẾNG,</em><br />THÈM NHIỀU <br className="mobile-break" />VỊ.</h1>
          <p className="hero-note">Trứng lòng đào, sốt riêng, tóp mỡ tươi.</p>
          <div className="hero-actions">
            <a className="button button-red" href="#menu">Xem menu <span aria-hidden="true">↘</span></a>
          </div>
        </div>

        <div className="hero-object" aria-label="Ảnh minh họa bánh tráng cuốn trứng lòng đào">
          <div className="sauce-orbit orbit-one" />
          <div className="food-frame">
            <img src="/them-hero-yellow.png" alt="Bánh tráng cuốn trứng lòng đào trên nền vàng THÈM" />
          </div>
        </div>
      </section>

      <section className="taste-strip" aria-label="Những thành phần của THÈM">
        <span>BÁNH TRÁNG</span><i />
        <span>TRỨNG LÒNG ĐÀO</span><i />
        <span>TÓP MỠ TƯƠI</span><i />
        <span>SỐT ĐẬM VỊ</span><i />
      </section>

      <section className="home-about" aria-labelledby="about-title"><div><img src="/them-signature-placeholder.png" alt="Bánh tráng cuốn trứng lòng đào" /></div><div><h2 id="about-title">VỀ THÈM<br/><em>GÌ CŨNG CÓ.</em></h2><p>Thèm Gì Cũng Có theo đuổi sứ mệnh mang đến các món bánh tráng mới, ngon đậm vị cùng chất lượng dịch vụ tận tâm, tận tình. Được thành lập vào năm 2021, THÈM giữ phong cách đơn giản, đậm nét truyền thống Việt Nam.</p><a className="button button-cream" href="/ve-chung-toi">Xem thêm <span>↗</span></a></div></section>

      <section className="experience-section"><div><h2>TRẢI NGHIỆM<br/><em>BÁNH TRÁNG CHUẨN VỊ.</em></h2><p>Nguyên liệu tươi, sốt làm riêng và từng cuộn bánh được chuẩn bị để mỗi miếng ăn đều đậm đà, vui miệng.</p><a href="/ve-chung-toi">Xem thêm</a></div><div className="experience-gallery"><img src="/them-hero-yellow.png" alt="Nguyên liệu bánh tráng THÈM"/><img src="/them-menu-roll.png" alt="Cuốn bánh tráng THÈM"/><img src="/them-menu-topping.png" alt="Topping THÈM"/><img src="/them-menu-drink.png" alt="Đồ uống THÈM"/></div></section>

      <section className="home-menu" id="menu" aria-labelledby="menu-title"><div className="home-section-title"><h2 id="menu-title">THÈM GÌ<br/><em>CŨNG CÓ.</em></h2><p>Sáu cách để chiều cơn thèm hôm nay.</p></div><div className="category-grid">{categories.map(([title,description,image,category])=><a href={`/menu?category=${category}`} key={title}><img src={image} alt=""/><h3>{title}</h3><p>{description}</p><span>Xem món</span></a>)}</div><a className="button button-red" href="/menu">Xem tất cả Menu <span>↗</span></a></section>

      <section className="home-offers"><div className="home-section-title"><h2>ƯU ĐÃI<br/><em>ĐANG DIỄN RA.</em></h2></div><div className="home-offer-grid"><a href="/uu-dai-su-kien"><img src="/them-menu-roll.png" alt=""/><h3>Phiếu Lương Thực</h3><p>Tặng 01 bánh tráng cuốn trứng lòng đào khi mua kèm bánh tráng.</p></a><a href="/uu-dai-su-kien"><img src="/them-menu-drink.png" alt=""/><h3>Combo Hòa Bình</h3><p>Đất nước trọn niềm vui — ngon hơn khi đi cùng nhau.</p></a></div><a href="/uu-dai-su-kien">Xem tất cả ưu đãi</a></section>

      <section className="home-news"><div className="home-section-title"><h2>TIN TỨC<br/><em>TỪ THÈM.</em></h2></div><div>{["Bánh tráng Tây Ninh và những điều làm nên vị ngon","Một chiều cuốn bánh cùng THÈM","Gợi ý món ngon cho cuộc hẹn cuối tuần"].map((title,index)=><article key={title}><span>0{index+1}.08.2026</span><h3>{title}</h3><a href="/ve-chung-toi">Đọc thêm</a></article>)}</div></section>

      <section className="home-stores" id="cua-hang"><div className="home-section-title"><h2>HỆ THỐNG<br/><em>CỬA HÀNG.</em></h2><p>Ghé điểm THÈM gần bạn, gọi món rồi cuốn theo cơn thèm.</p></div><div>{["24 Bình Giã, P13 Tân Bình","327 Phan Đình Phùng, P15 Phú Nhuận","42 Ngô Tất Tố, P19 Bình Thạnh","90 Tôn Đản, P10 Quận 4","350 Thống Nhất, P16 Gò Vấp","703 Nguyễn Văn Quá, P. Đông Hưng Thuận, Q12","36 Rạch Bùng Binh, Quận 3","253 Tân Hương, Quận Tân Phú"].map((address,index)=><article key={address}><span>CN{index+1}</span><strong>{address}</strong><small>09:00 — 22:00</small><a target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}>Chỉ đường</a></article>)}</div><a className="button button-cream" href="/cua-hang">Xem toàn bộ cửa hàng <span>↗</span></a></section>

      <SiteFooter />
    </main>
  );
}
