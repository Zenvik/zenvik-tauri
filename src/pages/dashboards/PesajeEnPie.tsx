import { Scale, Users, TrendingUp, ArrowUpDown, FileText, MessageCircle, Clock } from "lucide-react";
import { BarChart } from "@tremor/react";
import KpiCard from "@/components/KpiCard";
import { makeTooltip } from "@/components/ChartTooltip";
import { pieResumen, pieRegistros, pieDistribucion, loteActivo } from "@/lib/mock-data";

const ACCENT = "#3B82F6";

export default function PesajeEnPie() {
  return (
    <div className="space-y-5">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 rounded-lg" style={{ background: `${ACCENT}15` }}>
              <Scale size={16} style={{ color: ACCENT }} />
            </div>
            <h1 className="text-lg font-bold" style={{ color: "#0F172A" }}>
              Pesaje en Pie
            </h1>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: "#3B82F615", color: "#3B82F6" }}>Etapa 1 · Recepción</span>
          </div>
          <p className="text-sm" style={{ color: "#64748B" }}>
            Lote <span className="font-mono font-semibold">{loteActivo.id}</span> ·{" "}
            {loteActivo.proveedor} · {loteActivo.fecha} {loteActivo.hora}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "#EF4444" }}
          >
            <FileText size={12} />
            Generar PDF
          </button>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "#25D366" }}
          >
            <MessageCircle size={12} />
            WhatsApp
          </button>
        </div>
      </div>

      {/* Lote info strip */}
      <div
        className="grid grid-cols-4 gap-px rounded-xl overflow-hidden"
        style={{ background: "#E2E8F0" }}
      >
        {[
          { label: "Proveedor", value: loteActivo.proveedor },
          { label: "Guía transporte", value: loteActivo.guia },
          { label: "Responsable", value: loteActivo.responsable },
          { label: "Municipio", value: loteActivo.municipio },
        ].map((item) => (
          <div key={item.label} className="bg-white px-4 py-3">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-0.5">
              {item.label}
            </div>
            <div className="text-sm font-semibold text-slate-800">{item.value}</div>
          </div>
        ))}
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <KpiCard
          icon={Scale}
          label="Peso bruto total"
          value={pieResumen.totalBruto.toLocaleString("es-CO")}
          unit="kilogramos en pie"
          accentColor={ACCENT}
          highlight
        />
        <KpiCard
          icon={Users}
          label="Animales pesados"
          value={pieResumen.totalAnimales}
          unit={`de ${loteActivo.totalAnimales} en lote`}
          accentColor={ACCENT}
        />
        <KpiCard
          icon={TrendingUp}
          label="Peso promedio"
          value={`${pieResumen.promedio.toFixed(1)}`}
          unit="kg por animal"
          accentColor="#10B981"
        />
        <KpiCard
          icon={ArrowUpDown}
          label="Rango de pesos"
          value={`${pieResumen.pesoMin}–${pieResumen.pesoMax}`}
          unit="kg (mín – máx)"
          accentColor="#F59E0B"
        />
      </div>

      {/* Chart + Table */}
      <div className="grid grid-cols-5 gap-4">
        {/* Bar chart */}
        <div className="col-span-2 bg-white rounded-xl p-5" style={{ border: "1px solid #E2E8F0" }}>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={14} style={{ color: ACCENT }} />
            <span className="text-sm font-semibold text-slate-800">
              Distribución por rango de peso
            </span>
          </div>
          <p className="text-xs text-slate-400 mb-4">Animales por intervalo (kg)</p>
          <BarChart
            data={pieDistribucion}
            index="rango"
            categories={["animales"]}
            colors={["blue"]}
            showLegend={false}
            showGridLines
            showAnimation
            valueFormatter={(v: number) => `${v} anim.`}
            customTooltip={makeTooltip((v) => `${v} animales`)}
            yAxisWidth={36}
            className="h-52"
          />
        </div>

        {/* Registros table */}
        <div className="col-span-3 bg-white rounded-xl p-5" style={{ border: "1px solid #E2E8F0" }}>
          <div className="flex items-center gap-2 mb-1">
            <Clock size={14} style={{ color: ACCENT }} />
            <span className="text-sm font-semibold text-slate-800">Registros de pesaje</span>
          </div>
          <p className="text-xs text-slate-400 mb-4">Entradas capturadas desde báscula</p>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "2px solid #F1F5F9" }}>
                {["Hora", "Báscula", "Animales", "Peso (kg)", "Operador"].map((h) => (
                  <th key={h} className="pb-2 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pieRegistros.map((r, i) => (
                <tr
                  key={i}
                  style={{ borderBottom: "1px solid #F8FAFC" }}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="py-2.5 font-mono text-xs text-slate-600">{r.hora}</td>
                  <td className="py-2.5">
                    <span
                      className="px-2 py-0.5 rounded text-xs font-bold"
                      style={{ background: `${ACCENT}15`, color: ACCENT }}
                    >
                      {r.bascula}
                    </span>
                  </td>
                  <td className="py-2.5 text-xs font-semibold text-slate-700 text-center">
                    {r.animales}
                  </td>
                  <td className="py-2.5 text-xs font-bold" style={{ color: "#0F172A" }}>
                    {r.pesoKg.toLocaleString("es-CO")} kg
                  </td>
                  <td className="py-2.5 text-xs text-slate-500">{r.operador}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ borderTop: "2px solid #F1F5F9" }}>
                <td colSpan={2} className="pt-3 text-xs font-semibold text-slate-500">
                  TOTAL
                </td>
                <td className="pt-3 text-xs font-bold text-center" style={{ color: ACCENT }}>
                  {pieResumen.totalAnimales}
                </td>
                <td className="pt-3 text-xs font-bold" style={{ color: ACCENT }}>
                  {pieResumen.totalBruto.toLocaleString("es-CO")} kg
                </td>
                <td />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
