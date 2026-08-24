"use client";

import { useEffect, useState } from "react";

type MenuItem = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  highlight: string;
  image: string;
  motion: "roll" | "mix" | "dip" | "veggie" | "topping" | "drink";
};

const menuItems: MenuItem[] = [
  { id: "cuon", number: "01", title: "Bánh tráng cuốn", subtitle: "Trứng lòng đào · Tóp mỡ", description: "Bánh tráng mềm ôm trọn trứng lòng đào, rau thơm, đậu phộng và sốt đậm vị.", highlight: "Mềm, béo, cay vừa", image: "/them-menu-roll.png", motion: "roll" },
  { id: "tron", number: "02", title: "Bánh tráng trộn", subtitle: "Trứng cút · Tôm khô · Dầu ớt", description: "Từng miếng bánh tráng dẻo được trộn đều cùng vị chua cay, tôm khô và đậu phộng giòn.", highlight: "Đậm vị, giòn vui", image: "/them-menu-mix.png", motion: "mix" },
  { id: "cham", number: "03", title: "Bánh tráng chấm", subtitle: "Sốt me · Hành phi", description: "Bánh tráng Tây Ninh mỏng mềm, chấm sốt me cay ngọt và hành phi thơm nức.", highlight: "Chua cay, cuốn miệng", image: "/them-menu-dip.png", motion: "dip" },
  { id: "chay", number: "04", title: "Bánh tráng chay", subtitle: "Đậu hũ · Rau tươi · Sốt cay", description: "Một cuộn thanh mát với rau tươi, đậu hũ áp chảo và chút sốt cay vừa đủ để nhớ.", highlight: "Tươi, nhẹ, vẫn đã", image: "/them-menu-veggie.png", motion: "veggie" },
  { id: "topping", number: "05", title: "Topping", subtitle: "Đậu phộng · Tóp mỡ · Tôm khô", description: "Thêm một lớp giòn thơm để cuộn bánh tráng của bạn có nhiều tiếng vui hơn.", highlight: "Tùy chỉnh theo cơn thèm", image: "/them-menu-topping.png", motion: "topping" },
  { id: "do-uong", number: "06", title: "Đồ uống", subtitle: "Trà tắc · Đá lạnh · Bạc hà", description: "Trà tắc mát lạnh, chua ngọt và thơm để cân bằng vị cay của món bánh tráng.", highlight: "Mát lạnh, giải cay", image: "/them-menu-drink.png", motion: "drink" },
];

export function MenuExplorer() {
  const [selected, setSelected] = useState<MenuItem | null>(null);

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  return (
    <>
      <div className="menu-list">
        {menuItems.map((item) => (
          <button className="menu-card" key={item.id} type="button" onClick={() => setSelected(item)} aria-haspopup="dialog">
            <span className="menu-card-number">{item.number}</span>
            <span className="menu-card-copy">
              <strong>{item.title}</strong>
              <small>{item.subtitle}</small>
            </span>
            <img src={item.image} alt="" />
            <span className="menu-card-action">Xem món</span>
          </button>
        ))}
      </div>

      {selected && (
        <div className="menu-modal-backdrop" role="presentation" onMouseDown={() => setSelected(null)}>
          <section className={`menu-modal detail-${selected.motion}`} role="dialog" aria-modal="true" aria-labelledby={`menu-modal-${selected.id}`} onMouseDown={(event) => event.stopPropagation()}>
            <button className="menu-modal-close" type="button" onClick={() => setSelected(null)} aria-label="Đóng chi tiết món">Đóng</button>
            <div className="menu-modal-art" aria-hidden="true"><img src={selected.image} alt="" /></div>
            <div className="menu-modal-copy">
              <span>{selected.number}</span>
              <h3 id={`menu-modal-${selected.id}`}>{selected.title}</h3>
              <p className="menu-modal-subtitle">{selected.subtitle}</p>
              <p>{selected.description}</p>
              <strong>{selected.highlight}</strong>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
