import { useState } from "react";
import { productImages } from "@/data/products";

const ProductGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="overflow-hidden rounded-lg border bg-card">
        <img
          src={productImages[activeIndex]}
          alt={`Отвод 90° — фото ${activeIndex + 1}`}
          className="aspect-square w-full object-contain p-4"
        />
      </div>
      {/* Thumbnails */}
      <div className="flex gap-2">
        {productImages.map((src, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`overflow-hidden rounded-md border-2 transition-all ${
              i === activeIndex ? "border-primary ring-2 ring-primary/30" : "border-border hover:border-muted-foreground"
            }`}
          >
            <img
              src={src}
              alt={`Миниатюра ${i + 1}`}
              className="h-16 w-16 object-contain p-1"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
