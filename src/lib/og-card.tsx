import { SITE } from "@/constants/site";

export function OgCard() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "#050816",
        backgroundImage:
          "radial-gradient(circle at 15% 15%, rgba(59,130,246,0.35), transparent 45%), radial-gradient(circle at 85% 85%, rgba(139,92,246,0.3), transparent 45%)",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 40,
        }}
      >
        <div
          style={{
            display: "flex",
            width: 10,
            height: 10,
            borderRadius: 999,
            background: "#06b6d4",
          }}
        />
        <div style={{ display: "flex", color: "#8b93ad", fontSize: 24 }}>
          {SITE.domain}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          color: "#f5f7ff",
          fontSize: 72,
          fontWeight: 600,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          maxWidth: 980,
        }}
      >
        <span>{SITE.name}</span>
      </div>

      <div
        style={{
          display: "flex",
          marginTop: 24,
          fontSize: 34,
          color: "#06b6d4",
          fontFamily: "monospace",
        }}
      >
        {SITE.role} · AI Engineer · Full-Stack Developer
      </div>

      <div
        style={{
          display: "flex",
          marginTop: 32,
          fontSize: 26,
          color: "#8b93ad",
          maxWidth: 860,
          lineHeight: 1.4,
        }}
      >
        {SITE.tagline}
      </div>
    </div>
  );
}
