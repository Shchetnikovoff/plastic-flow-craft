/**
 * Removes blue-ish text and whitens near-white background pixels
 * using canvas pixel manipulation.
 */
export function removeBlueTextAndWhiten(src: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas context failed"));
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Blue-dominant pixels (text/labels) → white
        if (b > r + 30 && b > g + 30 && b > 100) {
          data[i] = 255;
          data[i + 1] = 255;
          data[i + 2] = 255;
        }
        // Near-white / light gray background → pure white
        else if (r > 230 && g > 230 && b > 230) {
          data[i] = 255;
          data[i + 1] = 255;
          data[i + 2] = 255;
        }
      }

      ctx.putImageData(imageData, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}
