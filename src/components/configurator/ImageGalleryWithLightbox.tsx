import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryWithLightboxProps {
  images: string[];
  selectedImage: number;
  onSelectedImageChange: (index: number) => void;
}

const ImageGalleryWithLightbox = ({ images, selectedImage, onSelectedImageChange }: ImageGalleryWithLightboxProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      {/* Large main image */}
      <div
        className="w-full aspect-square overflow-hidden rounded-lg border border-border bg-card mb-4 cursor-zoom-in"
        onClick={() => setLightboxOpen(true)}
      >
        <img src={images[selectedImage]} alt={`Фото ${selectedImage + 1}`} className="h-full w-full object-contain p-4 transition-all duration-300" />
      </div>

      {/* Thumbnail row */}
      {images.length > 1 && (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3 mb-8">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => onSelectedImageChange(i)}
              className={`aspect-square overflow-hidden rounded border-2 bg-card transition-all ${
                i === selectedImage ? "border-primary shadow-md" : "border-border hover:border-muted-foreground"
              }`}
            >
              <img src={src} alt={`Фото ${i + 1}`} className="h-full w-full object-contain p-2 transition-all duration-300" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-3xl p-2 bg-background">
          <div className="relative">
            <img src={images[selectedImage]} alt={`Фото ${selectedImage + 1}`} className="w-full h-auto object-contain max-h-[80vh]" />
            <Button variant="outline" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm"
              onClick={() => onSelectedImageChange((selectedImage - 1 + images.length) % images.length)}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm"
              onClick={() => onSelectedImageChange((selectedImage + 1) % images.length)}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex justify-center gap-2 pt-2">
            {images.map((src, i) => (
              <button key={i} onClick={() => onSelectedImageChange(i)}
                className={`h-14 w-14 overflow-hidden rounded border-2 transition-all ${i === selectedImage ? "border-primary" : "border-border hover:border-muted-foreground"}`}>
                <img src={src} alt={`Миниатюра ${i + 1}`} className="h-full w-full object-contain p-1 transition-all duration-300" />
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageGalleryWithLightbox;
