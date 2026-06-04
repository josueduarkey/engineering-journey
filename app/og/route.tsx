import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "Engineering Journey";
  const description = searchParams.get("description") ?? "";
  const short = title.length > 45;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.06) 1.5px, transparent 1.5px)",
          backgroundSize: "30px 30px",
          padding: "64px 72px",
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          position: "relative",
        }}
      >
        {/* Top-left accent */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "48px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "4px",
              backgroundColor: "#006DFF",
              borderRadius: "2px",
            }}
          />
          <span
            style={{
              color: "#006DFF",
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Engineering Journey
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            color: "#ffffff",
            fontSize: short ? "56px" : "72px",
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: "920px",
            flex: 1,
          }}
        >
          {title}
        </div>

        {/* Description */}
        {description && (
          <div
            style={{
              color: "#9ca3af",
              fontSize: "22px",
              lineHeight: 1.5,
              maxWidth: "820px",
              marginBottom: "36px",
            }}
          >
            {description.length > 110
              ? description.slice(0, 110) + "…"
              : description}
          </div>
        )}

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "28px",
          }}
        >
          {/* Avatar + name */}
          <div
            style={{ display: "flex", alignItems: "center", gap: "14px" }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #006DFF 0%, #31E083 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 800,
                fontSize: "16px",
              }}
            >
              JG
            </div>
            <span
              style={{ color: "#e5e7eb", fontSize: "20px", fontWeight: 600 }}
            >
              Josué García
            </span>
            <span style={{ color: "#4b5563", fontSize: "20px" }}>·</span>
            <span style={{ color: "#6b7280", fontSize: "18px" }}>
              Engineering Student & Developer
            </span>
          </div>

          {/* Domain */}
          <span
            style={{
              color: "#31E083",
              fontSize: "18px",
              fontWeight: 600,
              letterSpacing: "0.02em",
            }}
          >
            josueduardo.dev
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
