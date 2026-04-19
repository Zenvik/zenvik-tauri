interface RankedItem {
  name: string;
  value: number;
}

interface RankedListProps {
  data: RankedItem[];
  accentColor?: string;
  valueFormatter?: (v: number) => string;
  showRank?: boolean;
}

export default function RankedList({
  data,
  accentColor = "#10B981",
  valueFormatter,
  showRank = true,
}: RankedListProps) {
  const max = Math.max(...data.map((d) => d.value));
  const fmt = valueFormatter ?? ((v: number) => String(v));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      {data.map((item, i) => (
        <div key={item.name}>
          {/* Label row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "6px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {showRank && (
                <span
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    background: `${accentColor}18`,
                    color: accentColor,
                    fontSize: "10px",
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontFamily: "'Geist Variable', sans-serif",
                  }}
                >
                  {i + 1}
                </span>
              )}
              <span
                style={{
                  fontSize: "12px",
                  color: "#475569",
                  fontWeight: 500,
                  fontFamily: "'Geist Variable', sans-serif",
                }}
              >
                {item.name}
              </span>
            </div>
            <span
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#0F172A",
                fontFamily: "'Geist Variable', sans-serif",
                letterSpacing: "-0.01em",
              }}
            >
              {fmt(item.value)}
            </span>
          </div>

          {/* Progress bar */}
          <div
            style={{
              height: "5px",
              background: "#F1F5F9",
              borderRadius: "9999px",
              marginLeft: showRank ? "28px" : "0",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "5px",
                borderRadius: "9999px",
                width: `${(item.value / max) * 100}%`,
                background: `linear-gradient(90deg, ${accentColor} 0%, ${accentColor}CC 100%)`,
                transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
