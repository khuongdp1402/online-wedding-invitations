"use client";

export function DressCode() {
  const colors = [
    { name: "Sage Green", hex: "#8A9A5B" },
    { name: "Forest", hex: "#3D5A45" },
    { name: "Warm Cream", hex: "#F5EFEB" },
    { name: "Sand Beige", hex: "#D4C7B8" },
  ];

  return (
    <section className="py-12 px-6 bg-white border-b border-[#DCE4D8]">
      <div className="max-w-md mx-auto text-center">
        <p className="text-[11px] uppercase tracking-[0.25em] text-[#8A9A5B] font-semibold mb-2">
          DRESS CODE
        </p>
        <h2 className="text-xl font-serif text-[#3D5A45] mb-3 font-medium">Trang Phục Gợi Ý</h2>
        <p className="text-xs text-stone-500 mb-6 max-w-xs mx-auto leading-relaxed">
          Chúng tôi trân trọng mời quý khách mặc trang phục mang tông màu nhẹ nhàng để hòa cùng thiên nhiên.
        </p>

        <div className="flex items-center justify-center gap-4">
          {colors.map((c, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1.5">
              <div
                className="w-9 h-9 rounded-full shadow-xs border-2 border-white ring-1 ring-stone-200 transition-transform hover:scale-110"
                style={{ backgroundColor: c.hex }}
              />
              <span className="text-[10px] text-stone-500 font-medium">{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
