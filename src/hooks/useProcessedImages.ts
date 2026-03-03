import { useState, useEffect } from "react";
import { removeBlueTextAndWhiten } from "@/lib/processImage";

/**
 * Processes images at specified indices (removing blue text + whitening),
 * returns array of URLs where processed indices use data URLs.
 */
export function useProcessedImages(
  images: string[],
  processIndices: number[] = [0, 1, 2]
): string[] {
  const [processed, setProcessed] = useState<string[]>(images);

  useEffect(() => {
    let cancelled = false;

    async function process() {
      const result = [...images];
      await Promise.all(
        processIndices.map(async (idx) => {
          if (idx < images.length) {
            try {
              result[idx] = await removeBlueTextAndWhiten(images[idx]);
            } catch {
              // Keep original on error
            }
          }
        })
      );
      if (!cancelled) setProcessed(result);
    }

    process();
    return () => { cancelled = true; };
  }, [images.join(",")]);

  return processed;
}

