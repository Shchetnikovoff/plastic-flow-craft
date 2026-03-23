import { jsPDF } from "jspdf";

let fontCache: { regular: ArrayBuffer; bold: ArrayBuffer } | null = null;

export async function registerCyrillicFont(doc: jsPDF): Promise<void> {
  if (!fontCache) {
    const [regular, bold] = await Promise.all([
      fetch("/fonts/PTSans-Regular.ttf").then(r => r.arrayBuffer()),
      fetch("/fonts/PTSans-Bold.ttf").then(r => r.arrayBuffer()),
    ]);
    fontCache = { regular, bold };
  }

  const toBase64 = (buf: ArrayBuffer) => {
    const bytes = new Uint8Array(buf);
    let binary = "";
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  doc.addFileToVFS("PTSans-Regular.ttf", toBase64(fontCache.regular));
  doc.addFont("PTSans-Regular.ttf", "PTSans", "normal");

  doc.addFileToVFS("PTSans-Bold.ttf", toBase64(fontCache.bold));
  doc.addFont("PTSans-Bold.ttf", "PTSans", "bold");

  doc.setFont("PTSans", "normal");
}
