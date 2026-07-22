import { ImageResponse } from "next/og";
import { SITE } from "@/constants/site";
import { OgCard } from "@/lib/og-card";

export const alt = `${SITE.name} — ${SITE.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(<OgCard />, { ...size });
}
