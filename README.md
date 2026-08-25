# 🥢 THÈM GÌ CŨNG CÓ — Bánh Tráng Theo Cách THÈM

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

> **"Cuốn một miếng, thèm nhiều vị."**  
> Nền tảng website thương hiệu và thực đơn trực tuyến cho chuỗi bánh tráng **THÈM GÌ CŨNG CÓ** — nơi mang đến những món bánh tráng đậm đà, trứng lòng đào béo ngậy, sốt riêng đặc trưng và tóp mỡ tươi giòn rụm.

---

## 📖 Giới Thiệu

**THÈM GÌ CŨNG CÓ** (thành lập từ năm 2021) là thương hiệu ẩm thực đường phố hiện đại, chuyên phục vụ các món bánh tráng chuẩn vị Tây Ninh kết hợp phong cách biến tấu độc đáo. 

Dự án này là website chính thức của thương hiệu, được xây dựng với trải nghiệm người dùng mượt mà, giao diện mang đậm bản sắc thương hiệu (Tone vàng **#FFDE1F**, đỏ ớt, màu sốt đậm và màu kem bánh tráng), tối ưu hóa SEO và hiệu năng hiển thị cao trên mọi thiết bị.

---

## ✨ Tính Năng Nổi Bật

- 🌯 **Khám Phá Menu & Danh Mục Phong Phú**:
  - Bánh tráng cuốn (Signature: Cuốn trứng lòng đào)
  - Bánh tráng chấm (Sốt me chua cay bùng nổ)
  - Bánh tráng trộn (Đậm vị truyền thống)
  - Bánh tráng chay (Thanh nhẹ, trọn vị)
  - Topping giòn thơm & Đồ uống giải nhiệt.
- 🔍 **Bộ Lọc & Tìm Kiếm Món Ăn Tiện Lợi**:
  - Lọc theo danh mục, chế độ ăn (Mặn / Chay).
  - Sắp xếp theo mức giá và độ phổ biến.
  - Tích hợp chọn món, quản lý giỏ hàng nhanh trực tiếp trên giao diện.
- 📍 **Hệ Thống Cửa Hàng & Tích Hợp Bản Đồ**:
  - Tra cứu các chi nhánh trên toàn TP.HCM.
  - Tích hợp nút chỉ đường trực tiếp qua Google Maps.
- 🎁 **Chương Trình Ưu Đãi & Tin Tức**:
  - Cập nhật các voucher, combo ưu đãi mới nhất (Phiếu Lương Thực, Combo Hòa Bình,...).
  - Góc tin tức, câu chuyện ẩm thực và văn hóa bánh tráng.
- 📱 **Trải Nghiệm Đa Nền Tảng (Mobile-first & Responsive)**:
  - Tối ưu chạm lướt mượt mà trên smartphone, tablet và máy tính để bàn.
- ⚡ **Tối Ưu SEO & Tốc Độ Tải Trang**:
  - Metadata Open Graph, Twitter Cards, Semantic HTML chuẩn SEO.
  - Tải trước ảnh quan trọng (Preload Critical Hero Assets) và nén định dạng WebP hiện đại.

---

## 🛠️ Công Nghệ Sử Dụng

- **Frontend Core**: [Next.js 15](https://nextjs.org/) (App Router), [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling & Design System**: [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS tối ưu
- **ORM & Database**: [Drizzle ORM](https://orm.drizzle.team/) (sẵn sàng tích hợp Cloudflare D1 / SQLite)
- **Code Quality**: ESLint 9, TypeScript ESLint, Prettier
- **Assets Optimization**: Modern WebP Image Format, Responsive Viewport Support

---

## 📂 Cấu Trúc Thư Mục

```text
THEMGICUNGCO/
├── app/                      # Next.js App Router
│   ├── chinh-sach/           # Trang chính sách & điều khoản
│   ├── cua-hang/             # Danh sách và hệ thống chi nhánh
│   ├── lien-he/              # Trang liên hệ và biểu mẫu hỗ trợ
│   ├── menu/                 # Trang thực đơn chi tiết
│   ├── tuyen-dung/           # Thông tin tuyển dụng
│   ├── uu-dai-su-kien/       # Trang ưu đãi & sự kiện
│   ├── ve-chung-toi/         # Câu chuyện thương hiệu THÈM
│   ├── layout.tsx            # Root layout & SEO Metadata
│   ├── page.tsx              # Trang chủ (Homepage)
│   ├── product-catalog.tsx   # Component danh mục sản phẩm & giỏ hàng
│   ├── site-header.tsx       # Header & Menu điều hướng
│   ├── site-footer.tsx       # Chân trang (Footer)
│   └── globals.css           # Design Tokens & Global Styles
├── db/                       # Cấu hình CSDL & Drizzle Schema
├── public/                   # Hình ảnh, biểu tượng (WebP, SVG)
├── package.json              # Khai báo phụ thuộc và scripts
├── next.config.ts            # Cấu hình Next.js
└── tsconfig.json             # Cấu hình TypeScript
```

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Cục Bộ

### 1. Yêu Cầu Môi Trường
- **Node.js**: Phiên bản `>= 22.13.0`
- **npm** (hoặc `yarn`, `pnpm`)

### 2. Cài Đặt

1. **Clone repository về máy**:
   ```bash
   git clone https://github.com/HoangMylb/THEMGICUNGCO.git
   cd THEMGICUNGCO
   ```

2. **Cài đặt các gói phụ thuộc**:
   ```bash
   npm install
   ```

### 3. Chạy Ứng Dụng

- **Chạy môi trường phát triển (Development)**:
  ```bash
  npm run dev
  ```
  Mở trình duyệt và truy cập: [http://localhost:3000](http://localhost:3000)

- **Kiểm tra và biên dịch sản phẩm (Production Build)**:
  ```bash
  npm run build
  npm run start
  ```

- **Kiểm tra chuẩn mã nguồn (Linting)**:
  ```bash
  npm run lint
  ```

- **Sinh migration cơ sở dữ liệu (nếu dùng Drizzle)**:
  ```bash
  npm run db:generate
  ```

---

## 🎨 Màu Sắc Nhận Diện Thương Hiệu

| Màu | Mã Hex | Ý nghĩa |
| :--- | :--- | :--- |
| **THÈM Yellow** | `#FFDE1F` | Màu nền chủ đạo, rực rỡ, kích thích vị giác |
| **Chili Red** | `#E52E25` | Điểm nhấn món cay nồng, nút kêu gọi hành động (CTA) |
| **Dark Sauce** | `#2B1810` | Màu sốt riêng đặc trưng, dùng cho text và viền |
| **Rice Cream** | `#FFF9EA` | Màu bánh tráng phơi sương, nền các khối nội dung phụ |

---

## 📞 Liên Hệ & Bản Quyền

- **Thương hiệu**: THÈM GÌ CŨNG CÓ
- **Website**: [https://themgicungco.vn](https://themgicungco.vn)
- **Fanpage**: [facebook.com/themgicungco](https://facebook.com/themgicungco)
- **Hotline**: 090 999 9999
- **Email**: lienhe@themgicungco.vn

*© 2026 THÈM GÌ CŨNG CÓ. All rights reserved.*
