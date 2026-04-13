/**
 * Removes a white/light semi-transparent watermark from an image
 * by darkening anomalously bright pixels in the watermark region.
 * Returns a cleaned object URL.
 */
export function removeWatermark(
  imageSrc: string,
  /** Normalised region [x, y, w, h] where watermark lives (0-1) */
  region: [number, number, number, number] = [0.2, 0.55, 0.55, 0.25],
): Promise<string> {
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

      const rx = Math.round(region[0] * canvas.width);
      const ry = Math.round(region[1] * canvas.height);
      const rw = Math.round(region[2] * canvas.width);
      const rh = Math.round(region[3] * canvas.height);

      const imageData = ctx.getImageData(rx, ry, rw, rh);
      const d = imageData.data;

      // Build a local average brightness map (5×5 neighbourhood)
      const w = rw;
      const h = rh;
      const brightness = new Float32Array(w * h);
      for (let i = 0; i < w * h; i++) {
        const idx = i * 4;
        brightness[i] = (d[idx] + d[idx + 1] + d[idx + 2]) / 3;
      }

      const kernelR = 6;
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = y * w + x;
          const idx = i * 4;
          const b = brightness[i];

          // Compute local average
          let sum = 0;
          let count = 0;
          for (let dy = -kernelR; dy <= kernelR; dy++) {
            for (let dx = -kernelR; dx <= kernelR; dx++) {
              const nx = x + dx;
              const ny = y + dy;
              if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
                sum += brightness[ny * w + nx];
                count++;
              }
            }
          }
          const localAvg = sum / count;

          // If pixel is significantly brighter than neighbourhood, it's likely watermark
          const diff = b - localAvg;
          if (diff > 15 && b > 120) {
            // Blend pixel toward local average colour
            const factor = Math.min(1, diff / 60);
            // Collect average colour from neighbourhood (excluding bright outliers)
            let sr = 0, sg = 0, sb = 0, sc = 0;
            for (let dy = -kernelR; dy <= kernelR; dy++) {
              for (let dx = -kernelR; dx <= kernelR; dx++) {
                const nx = x + dx;
                const ny = y + dy;
                if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
                  const ni = (ny * w + nx) * 4;
                  const nb = (d[ni] + d[ni + 1] + d[ni + 2]) / 3;
                  if (nb - localAvg < 10) {
                    sr += d[ni];
                    sg += d[ni + 1];
                    sb += d[ni + 2];
                    sc++;
                  }
                }
              }
            }
            if (sc > 0) {
              d[idx]     = Math.round(d[idx]     * (1 - factor) + (sr / sc) * factor);
              d[idx + 1] = Math.round(d[idx + 1] * (1 - factor) + (sg / sc) * factor);
              d[idx + 2] = Math.round(d[idx + 2] * (1 - factor) + (sb / sc) * factor);
            }
          }
        }
      }

      ctx.putImageData(imageData, rx, ry);
      canvas.toBlob((blob) => {
        if (blob) resolve(URL.createObjectURL(blob));
        else reject(new Error("Failed to create blob"));
      }, "image/jpeg", 0.92);
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = imageSrc;
  });
}
