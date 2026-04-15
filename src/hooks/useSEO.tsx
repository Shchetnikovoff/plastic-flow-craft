import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
}

export default function useSEO({ title, description, keywords }: SEOProps) {
  useEffect(() => {
    if (title) document.title = `${title} — Пласт-Металл Про`;
    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        (meta as HTMLMetaElement).name = "description";
        document.head.appendChild(meta);
      }
      (meta as HTMLMetaElement).content = description;
    }
    if (keywords) {
      let meta = document.querySelector('meta[name="keywords"]');
      if (!meta) {
        meta = document.createElement("meta");
        (meta as HTMLMetaElement).name = "keywords";
        document.head.appendChild(meta);
      }
      (meta as HTMLMetaElement).content = keywords;
    }
  }, [title, description, keywords]);
}
