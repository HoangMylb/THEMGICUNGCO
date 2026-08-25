import { Suspense } from "react";
import { PageShell } from "../page-shell";
import { ProductCatalog } from "../product-catalog";

export default function MenuPage() {
  return (
    <PageShell
      eyebrow="THÈM GÌ CŨNG CÓ"
      title={
        <>
          CHỌN MÓN<br />
          <em>THEO CƠN THÈM.</em>
        </>
      }
      intro="Mỗi cuộn, mỗi chén chấm và mỗi ly nước đều sẵn sàng cho một cuộc hẹn ăn vặt thật vui và trọn vẹn."
    >
      <Suspense fallback={<div style={{ padding: "60px 8vw", textAlign: "center" }}>Đang tải menu THÈM...</div>}>
        <ProductCatalog />
      </Suspense>
    </PageShell>
  );
}
