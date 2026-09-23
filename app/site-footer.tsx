import Link from "next/link";

export function SiteFooter() {
  return <footer>
    <section><Link className="wordmark" href="/">THÈM<br />GÌ CŨNG CÓ</Link><p>Bánh tráng Việt Nam, theo cách của THÈM.</p></section><section><strong>Về chúng tôi</strong><Link href="/menu">Menu</Link><Link href="/ve-chung-toi">Về chúng tôi</Link><Link href="/cua-hang">Hệ thống cửa hàng</Link></section><section><strong>Địa chỉ công ty</strong><p>Trụ sở chính: 145 Điện Biên Phủ, phường Tân Định, TP.HCM</p></section><section><strong>Liên hệ</strong><a href="mailto:themgicungco@gmail.com">themgicungco@gmail.com</a><a href="tel:19003056">1900 3056 (9:00 — 22:00)</a><div className="footer-social"><a href="https://facebook.com">Facebook</a><a href="https://instagram.com">Instagram</a><a href="https://tiktok.com">TikTok</a><a href="https://m.me/themgicungco">Messenger</a><a href="https://zalo.me">Zalo OA</a></div></section><section className="footer-bottom"><form><label>Nhận tin từ THÈM<input type="email" placeholder="Email của bạn" /></label><button type="submit">Đăng ký</button></form><div><Link href="/chinh-sach/dieu-khoan">Điều khoản sử dụng</Link><Link href="/chinh-sach/bao-mat">Chính sách bảo mật</Link><Link href="/chinh-sach/doi-tra-van-chuyen">Đổi trả / vận chuyển</Link></div></section>
  </footer>;
}
