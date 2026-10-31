import { toPng } from "html-to-image";
import { qrSrc } from "../../links/lib/join-url";

function save(href: string, filename: string) {
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  a.click();
}

/** The poster sheet as a sharp PNG (for WhatsApp, Facebook or the print shop). */
export async function downloadSheetPng(node: HTMLElement, filename: string) {
  const data = await toPng(node, { pixelRatio: 3, cacheBust: true, backgroundColor: "#FFFFFF" });
  save(data, filename);
}

/** Just the QR, as the vector SVG — scales to any size in Canva, Illustrator or the print shop. */
export async function downloadQrSvg(url: string, filename: string) {
  const svg = await fetch(qrSrc(url, 10)).then((r) => r.blob());
  const href = URL.createObjectURL(svg);
  save(href, filename);
  setTimeout(() => URL.revokeObjectURL(href), 1000);
}

/** Just the QR, as a 1200px PNG with a white quiet zone — for teachers who design their own poster. */
export async function downloadQrPng(url: string, filename: string, size = 1200) {
  const svg = await fetch(qrSrc(url, 10)).then((r) => r.blob());
  const src = URL.createObjectURL(svg);
  try {
    const img = new Image();
    img.src = src;
    await img.decode();
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, size, size);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, 0, 0, size, size);
    save(canvas.toDataURL("image/png"), filename);
  } finally {
    URL.revokeObjectURL(src);
  }
}
