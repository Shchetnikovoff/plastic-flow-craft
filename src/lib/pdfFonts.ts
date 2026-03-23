import { jsPDF } from "jspdf";

let fontCache: { regular: string; bold: string } | null = null;

async function fetchFontAsBase64(url: string): Promise<string> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = (reader.result as string).split(",")[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function registerCyrillicFont(doc: jsPDF): Promise<void> {
  if (!fontCache) {
    const [regular, bold] = await Promise.all([
      fetchFontAsBase64(
        "https://fonts.gstatic.com/s/ptsans/v17/jizaRExUiTo99u79D0KExQ.ttf"
      ),
      fetchFontAsBase64(
        "https://fonts.gstatic.com/s/ptsans/v17/jizfRExUiTo99u79B_mh0O6tKA.ttf"
      ),
    ]);
    fontCache = { regular, bold };
  }

  doc.addFileToVFS("PTSans-Regular.ttf", fontCache.regular);
  doc.addFont("PTSans-Regular.ttf", "PTSans", "normal");

  doc.addFileToVFS("PTSans-Bold.ttf", fontCache.bold);
  doc.addFont("PTSans-Bold.ttf", "PTSans", "bold");

  doc.setFont("PTSans", "normal");
}
