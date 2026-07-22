import { ImageResponse } from "next/og";
import { SITE } from "@/constants/site";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  const initial = SITE.shortName.charAt(0);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#050816",
          borderRadius: 8,
          fontFamily: "-apple-system, Helvetica, Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", color: "#f5f7ff", fontSize: 20, fontWeight: 700 }}>
          {initial}
          <span style={{ color: "#06b6d4" }}>.</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
