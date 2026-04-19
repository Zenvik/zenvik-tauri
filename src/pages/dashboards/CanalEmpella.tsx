import { Flame, Hash, BarChart3, Clock, Percent } from "lucide-react";
import { BarChart } from "@tremor/react";
import KpiCard from "@/components/KpiCard";
import { makeTooltip } from "@/components/ChartTooltip";
import { canalResumen, canalRegistros, canalVsEmpella, loteActivo } from "@/lib/mock-data";

const ACCENT = "#F59E0B";

export default function CanalEmpella() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 rounded-lg" style={{ background: `${ACCENT}15` }}>
              <Flame size={16} style={{ color: ACCENT }} />
            </div>
            <h1 className="text-lg font-bold" style={{ color: "#0F172A" }}>
              Canal & Empella
            </h1>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: "#F59E0B15", color: "#F59E0B" }}>Etapa 2.1 · Proceso Caliente</span>
          </div>
          <p className="text-sm" style={{ color: "#64748B" }}>
            Referencia lote <span className="font-mono font-semibold">{loteActivo.id}</span> ·{" "}
            Pesaje caliente post-sacrificio
          </p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <KpiCard
          icon={Flame}
          label="Total Canal"
          value={canalResumen.totalCanal.toLocaleString("es-CO")}
          unit="kg · carcasa faenada"
          accentColor={ACCENT}
          highlight
        />
        <KpiCard
          icon={Flame}
          label="Total Empella"
          value={canalResumen.totalEmpella.toLocaleString("es-CO")}
          unit="kg · grasa subcutánea"
          accentColor="#F97316"
        />
        <KpiCard
          icon={Hash}
          label="Unidades"
          value={canalResumen.unidades}
          unit="canales pesadas"
          accentColor="#10B981"
        />
        <KpiCard
          icon={Percent}
          label="Rendimiento"
          value={`${canalResumen.rendimiento}%`}
          unit="canal / peso en pie"
          accentColor="#8B5CF6"
        />
      </div>

      {/* Chart + Table */}
      <div className="grid grid-cols-5 gap-4">
        {/* Canal vs Empella chart */}
        <div className="col-span-2 bg-white rounded-xl p-5" style={{ border: "1px solid #E2E8F0" }}>
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 size={14} style={{ color: ACCENT }} />
            <span className="text-sm font-semibold text-slate-800">Canal vs Empella</span>
          </div>
          <p className="text-xs text-slate-400 mb-4">Peso (kg) por canal registrada</p>
          <BarChart
            data={canalVsEmpella}
            index="canal"
            categories={["Canal", "Empella"]}
            colors={["amber", "orange"]}
            showLegend
            showGridLines
            showAnimation
            autoMinValue
            valueFormatter={(v: number) => `${v} kg`}
            customTooltip={makeTooltip((v) => `${v.toFixed(1)} kg`)}
            yAxisWidth={56}
            className="h-52"
          />
        </div>

        {/* Table */}
        <div className="col-span-3 bg-white rounded-xl p-5" style={{ border: "1px solid #E2E8F0" }}>
          <div className="flex items-center gap-2 mb-1">
            <Clock size={14} style={{ color: ACCENT }} />
            <span className="text-sm font-semibold text-slate-800">Registros por canal</span>
          </div>
          <p className="text-xs text-slate-400 mb-4">Captura de báscula · pesaje caliente</p>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "2px solid #F1F5F9" }}>
                {["# Canal", "Canal (kg)", "Empella (kg)", "Hora", "Operador"].map((h) => (
                  <th key={h} className="pb-2 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {canalRegistros.map((r) => (
                <tr
                  key={r.id}
                  style={{ borderBottom: "1px solid #F8FAFC" }}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="py-2.5">
                    <span
                      className="font-mono text-xs font-bold px-2 py-0.5 rounded"
                      style={{ background: `${ACCENT}15`, color: ACCENT }}
                    >
                      {r.id}
                    </span>
                  </td>
                  <td className="py-2.5 text-xs font-bold text-slate-800">
                    {r.canal.toFixed(1)} kg
                  </td>
                  <td className="py-2.5 text-xs font-semibold" style={{ color: "#F97316" }}>
                    {r.empella.toFixed(1)} kg
                  </td>
                  <td className="py-2.5 font-mono text-xs text-slate-500">{r.hora}</td>
                  <td className="py-2.5 text-xs text-slate-500">{r.operador}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ borderTop: "2px solid #F1F5F9" }}>
                <td className="pt-3 text-xs font-semibold text-slate-500">TOTAL</td>
                <td className="pt-3 text-xs font-bold" style={{ color: ACCENT }}>
                  {canalRegistros.reduce((s, r) => s + r.canal, 0).toFixed(1)} kg
                </td>
                <td className="pt-3 text-xs font-bold" style={{ color: "#F97316" }}>
                  {canalRegistros.reduce((s, r) => s + r.empella, 0).toFixed(1)} kg
                </td>
                <td colSpan={2} />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Rendimiento info strip */}
      <div
        className="grid grid-cols-3 gap-px rounded-xl overflow-hidden"
        style={{ background: "#E2E8F0" }}
      >
        {[
          {
            label: "Promedio por canal",
            value: `${(canalResumen.totalCanal / canalResumen.unidades).toFixed(1)} kg`,
            color: ACCENT,
          },
          {
            label: "Promedio por empella",
            value: `${(canalResumen.totalEmpella / canalResumen.unidades).toFixed(1)} kg`,
            color: "#F97316",
          },
          {
            label: "Relación empella / canal",
            value: `${((canalResumen.totalEmpella / canalResumen.totalCanal) * 100).toFixed(1)}%`,
            color: "#8B5CF6",
          },
        ].map((item) => (
          <div key={item.label} className="bg-white px-4 py-3">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
              {item.label}
            </div>
            <div className="text-xl font-bold" style={{ color: item.color }}>
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
