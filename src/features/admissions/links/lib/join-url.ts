/**
 * The public page a QR opens, and the QR image for it (served by the API, no login needed).
 * NEXT_PUBLIC_SITE_URL pins the QR to the real site, so a poster printed from localhost or a
 * preview domain still opens on a family's phone.
 */
export function joinUrl(code: string): string {
  const site = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || window.location.origin;
  return `${site}/join/${code}`;
}

export function qrSrc(text: string, scale = 8): string {
  return `/api/v1/public/qr.svg?scale=${scale}&text=${encodeURIComponent(text)}`;
}
