import { ImageResponse } from "next/og";
import { SITE } from "@/constants/site";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          backgroundImage:
            "radial-gradient(circle at 30% 30%, rgba(59,130,246,0.35), transparent 60%)",
          fontFamily: "-apple-system, Helvetica, Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", color: "#f5f7ff", fontSize: 96, fontWeight: 700 }}>
          {initial}
          <span style={{ color: "#06b6d4" }}>.</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
