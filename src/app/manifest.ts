import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BatchPilot — আপনার ব্যাচ চলুক অটোপাইলট",
    short_name: "BatchPilot",
    start_url: "/",
    display: "standalone",
    background_color: "#F8F8FB",
    theme_color: "#5B21B6",
    lang: "bn",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
  };
}
