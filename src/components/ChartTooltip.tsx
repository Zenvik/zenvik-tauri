import type { CustomTooltipProps } from "@tremor/react";

interface ChartTooltipWithFormatterProps extends CustomTooltipProps {
  valueFormatter?: (v: number) => string;
}

export function ChartTooltip({
  active,
  payload,
  label,
  valueFormatter,
}: ChartTooltipWithFormatterProps) {
  if (!active || !payload || payload.length === 0) return null;

  const fmt = valueFormatter ?? ((v: number) => String(v));

  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #E2E8F0",
        borderRadius: "10px",
        boxShadow: "0 8px 28px rgba(15,23,42,0.12)",
        padding: "10px 14px",
        minWidth: "150px",
        fontFamily: "'Geist Variable', sans-serif",
      }}
    >
      {/* Label header */}
      {label && (
        <div
          style={{
            fontSize: "10px",
            fontWeight: 700,
            color: "#94A3B8",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: "8px",
            paddingBottom: "7px",
            borderBottom: "1px solid #F1F5F9",
          }}
        >
          {label}
        </div>
      )}

      {/* Rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        {payload.map((item, i) => {
          const raw = Array.isArray(item.value) ? item.value[0] : item.value;
          const numVal = typeof raw === "number" ? raw : parseFloat(String(raw ?? 0));
          return (
            <div
              key={i}
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: item.color ?? "#94A3B8",
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: "12px", color: "#64748B", flex: 1, whiteSpace: "nowrap" }}>
                {String(item.name ?? "")}
              </span>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#0F172A", marginLeft: "12px" }}>
                {fmt(numVal)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Bake in a formatter → returns a component compatible with Tremor's customTooltip */
export function makeTooltip(valueFormatter?: (v: number) => string) {
  return (props: CustomTooltipProps) => (
    <ChartTooltip {...props} valueFormatter={valueFormatter} />
  );
}
