import type { LucideIcon } from "lucide-react";

interface KpiCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  unit?: string;
  accentColor?: string;
  delta?: string;
  deltaUp?: boolean;
  highlight?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function KpiCard({
  icon: Icon,
  label,
  value,
  unit,
  accentColor = "#10B981",
  delta,
  deltaUp,
  highlight = false,
  size = "md",
}: KpiCardProps) {
  const valueSize =
    size === "lg" ? "text-4xl" : size === "sm" ? "text-2xl" : "text-3xl";

  return (
    <div
      className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-3"
      style={{
        borderLeft: `4px solid ${accentColor}`,
        border: `1px solid #E2E8F0`,
        borderLeftWidth: "4px",
        borderLeftColor: accentColor,
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="p-2 rounded-lg"
            style={{ background: `${accentColor}18` }}
          >
            <Icon size={14} style={{ color: accentColor }} strokeWidth={2.5} />
          </div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider leading-none">
            {label}
          </span>
        </div>
        {delta !== undefined && (
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{
              background: deltaUp ? "#DCFCE7" : "#FEE2E2",
              color: deltaUp ? "#15803D" : "#DC2626",
            }}
          >
            {deltaUp ? "▲" : "▼"} {delta}
          </span>
        )}
      </div>

      <div>
        <div
          className={`${valueSize} font-bold tracking-tight leading-none`}
          style={{ color: highlight ? accentColor : "#0F172A" }}
        >
          {value}
        </div>
        {unit && (
          <div className="text-xs text-slate-400 mt-1.5 font-medium">{unit}</div>
        )}
      </div>
    </div>
  );
}
