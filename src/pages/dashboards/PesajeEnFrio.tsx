import { Snowflake, TrendingDown, FileText, MessageCircle, ArrowRight, Clock } from "lucide-react";
import { BarChart } from "@tremor/react";
import KpiCard from "@/components/KpiCard";
import { makeTooltip } from "@/components/ChartTooltip";
import { frioResumen, mermaPorComponente, frioRegistros, loteActivo } from "@/lib/mock-data";

const ACCENT = "#06B6D4";

function MermaRow({
  label,
  caliente,
  frio,
  mermaKg,
  pct,
  color,
}: {
  label: string;
  caliente: number;
  frio: number;
  mermaKg: number;
  pct: number;
  color: string;
}) {
  return (
    <tr style={{ borderBottom: "1px solid #F8FAFC" }} className="hover:bg-slate-50 transition-colors">
      <td className="py-3">
        <span
          className="text-xs font-bold px-2 py-0.5 rounded"
          style={{ background: `${color}15`, color }}
        >
          {label}
        </span>
      </td>
      <td className="py-3 text-xs font-semibold text-slate-600">
        {caliente.toLocaleString("es-CO")} kg
      </td>
      <td className="py-3 text-xs font-bold" style={{ color: ACCENT }}>
        {frio.toLocaleString("es-CO")} kg
      </td>
      <td className="py-3 text-xs font-bold" style={{ color: "#EF4444" }}>
        -{mermaKg.toFixed(1)} kg
      </td>
      <td className="py-3">
        <div className="flex items-center gap-1.5">
          <div className="flex-1 h-1.5 rounded-full bg-slate-100">
            <div
              className="h-1.5 rounded-full"
              style={{ width: `${Math.min(pct * 10, 100)}%`, background: "#EF4444" }}
            />
          </div>
          <span className="text-xs font-bold" style={{ color: "#EF4444" }}>
            {pct.toFixed(2)}%
          </span>
        </div>
      </td>
    </tr>
  );
}

export default function PesajeEnFrio() {
  const totalCaliente = frioResumen.canalCaliente + frioResumen.empellaCaliente + frioResumen.cabezaCaliente;
  const totalFrio = frioResumen.canalFrio + frioResumen.empellaFrio + frioResumen.cabezaFrio;
  const totalMermaKg = totalCaliente - totalFrio;
  const totalMermaPct = ((totalMermaKg / totalCaliente) * 100).toFixed(2);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 rounded-lg" style={{ background: `${ACCENT}15` }}>
              <Snowflake size={16} style={{ color: ACCENT }} />
            </div>
            <h1 className="text-lg font-bold" style={{ color: "#0F172A" }}>
              Pesaje en Frío
            </h1>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: "#06B6D415", color: "#06B6D4" }}>Etapa 3 · Despacho</span>
          </div>
          <div className="flex items-center gap-2 text-sm" style={{ color: "#64748B" }}>
            <span>Lote <span className="font-mono font-semibold">{loteActivo.id}</span></span>
            <ArrowRight size={12} />
            <span>{loteActivo.proveedor}</span>
            <ArrowRight size={12} />
            <span>Post-reposo en frío · Trazado contra pesaje caliente</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white hover:opacity-90 transition-all"
            style={{ background: ACCENT }}
          >
            <FileText size={12} />
            Reporte despacho
          </button>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white hover:opacity-90 transition-all"
            style={{ background: "#25D366" }}
          >
            <MessageCircle size={12} />
            WhatsApp
          </button>
        </div>
      </div>

      {/* Trazabilidad strip */}
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-xl"
        style={{ background: `${ACCENT}08`, border: `1px solid ${ACCENT}25` }}
      >
        <Snowflake size={14} style={{ color: ACCENT }} />
        <span className="text-xs font-semibold text-slate-600">
          Trazabilidad completa · Lote{" "}
          <span className="font-mono" style={{ color: ACCENT }}>{loteActivo.id}</span>:{" "}
          En pie ({loteActivo.totalAnimales} cerdos) →{" "}
          Caliente (48 canales) →{" "}
          Frío (despacho cliente)
        </span>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <KpiCard
          icon={Snowflake}
          label="Canal en frío"
          value={frioResumen.canalFrio.toLocaleString("es-CO")}
          unit={`kg · merma ${frioResumen.mermaCanalPct}%`}
          accentColor={ACCENT}
          highlight
          delta={`${frioResumen.mermaCanalPct}%`}
          deltaUp={false}
        />
        <KpiCard
          icon={Snowflake}
          label="Empella en frío"
          value={frioResumen.empellaFrio.toLocaleString("es-CO")}
          unit={`kg · merma ${frioResumen.mermaEmpellaPct}%`}
          accentColor="#0EA5E9"
          delta={`${frioResumen.mermaEmpellaPct}%`}
          deltaUp={false}
        />
        <KpiCard
          icon={Snowflake}
          label="Cabeza en frío"
          value={frioResumen.cabezaFrio.toLocaleString("es-CO")}
          unit={`kg · merma ${frioResumen.mermaCabezaPct}%`}
          accentColor="#38BDF8"
          delta={`${frioResumen.mermaCabezaPct}%`}
          deltaUp={false}
        />
        <KpiCard
          icon={TrendingDown}
          label="Merma total"
          value={`${totalMermaPct}%`}
          unit={`${totalMermaKg.toFixed(1)} kg menos vs caliente`}
          accentColor="#EF4444"
          highlight
        />
      </div>

      {/* Chart + Merma table */}
      <div className="grid grid-cols-5 gap-4">
        {/* Bar chart comparativo */}
        <div className="col-span-2 bg-white rounded-xl p-5" style={{ border: "1px solid #E2E8F0" }}>
          <div className="flex items-center gap-2 mb-1">
            <TrendingDown size={14} style={{ color: "#EF4444" }} />
            <span className="text-sm font-semibold text-slate-800">Caliente vs Frío</span>
          </div>
          <p className="text-xs text-slate-400 mb-4">Comparativo de peso por componente (kg)</p>
          <BarChart
            data={mermaPorComponente}
            index="componente"
            categories={["Caliente", "Frío"]}
            colors={["amber", "cyan"]}
            showLegend
            showGridLines
            showAnimation
            autoMinValue
            valueFormatter={(v: number) => `${(v / 1000).toFixed(2)}t`}
            customTooltip={makeTooltip((v) => `${v.toLocaleString("es-CO")} kg`)}
            yAxisWidth={52}
            className="h-52"
          />
        </div>

        {/* Merma comparison table */}
        <div className="col-span-3 bg-white rounded-xl p-5" style={{ border: "1px solid #E2E8F0" }}>
          <div className="flex items-center gap-2 mb-1">
            <TrendingDown size={14} style={{ color: "#EF4444" }} />
            <span className="text-sm font-semibold text-slate-800">Análisis de merma por refrigeración</span>
          </div>
          <p className="text-xs text-slate-400 mb-4">Diferencia de peso entre pesaje caliente y frío</p>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "2px solid #F1F5F9" }}>
                {["Componente", "Peso caliente", "Peso frío", "Merma (kg)", "% merma"].map((h) => (
                  <th key={h} className="pb-2 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <MermaRow
                label="Canal"
                caliente={frioResumen.canalCaliente}
                frio={frioResumen.canalFrio}
                mermaKg={frioResumen.canalCaliente - frioResumen.canalFrio}
                pct={frioResumen.mermaCanalPct}
                color={ACCENT}
              />
              <MermaRow
                label="Empella"
                caliente={frioResumen.empellaCaliente}
                frio={frioResumen.empellaFrio}
                mermaKg={frioResumen.empellaCaliente - frioResumen.empellaFrio}
                pct={frioResumen.mermaEmpellaPct}
                color="#0EA5E9"
              />
              <MermaRow
                label="Cabeza"
                caliente={frioResumen.cabezaCaliente}
                frio={frioResumen.cabezaFrio}
                mermaKg={frioResumen.cabezaCaliente - frioResumen.cabezaFrio}
                pct={frioResumen.mermaCabezaPct}
                color="#38BDF8"
              />
            </tbody>
            <tfoot>
              <tr style={{ borderTop: "2px solid #F1F5F9" }}>
                <td className="pt-3 text-xs font-bold text-slate-700">TOTAL LOTE</td>
                <td className="pt-3 text-xs font-semibold text-slate-600">
                  {totalCaliente.toLocaleString("es-CO")} kg
                </td>
                <td className="pt-3 text-xs font-bold" style={{ color: ACCENT }}>
                  {totalFrio.toLocaleString("es-CO")} kg
                </td>
                <td className="pt-3 text-xs font-bold" style={{ color: "#EF4444" }}>
                  -{totalMermaKg.toFixed(1)} kg
                </td>
                <td className="pt-3 text-xs font-bold" style={{ color: "#EF4444" }}>
                  {totalMermaPct}%
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Registros frío */}
      <div className="bg-white rounded-xl p-5" style={{ border: "1px solid #E2E8F0" }}>
        <div className="flex items-center gap-2 mb-1">
          <Clock size={14} style={{ color: ACCENT }} />
          <span className="text-sm font-semibold text-slate-800">Registros de pesaje en frío</span>
        </div>
        <p className="text-xs text-slate-400 mb-4">Captura individual por canal — referencia trazada al pesaje caliente</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "2px solid #F1F5F9" }}>
                {["# Frio", "Canal ref.", "Canal frío", "Empella frío", "Cabeza frío", "Hora", "Operador"].map((h) => (
                  <th key={h} className="pb-2 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide pr-4">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {frioRegistros.map((r) => (
                <tr
                  key={r.id}
                  style={{ borderBottom: "1px solid #F8FAFC" }}
                  className="hover:bg-cyan-50/30 transition-colors"
                >
                  <td className="py-2.5 pr-4">
                    <span
                      className="font-mono text-xs font-bold px-2 py-0.5 rounded"
                      style={{ background: `${ACCENT}15`, color: ACCENT }}
                    >
                      {r.id}
                    </span>
                  </td>
                  <td className="py-2.5 pr-4 font-mono text-xs text-slate-500">{r.canalRef}</td>
                  <td className="py-2.5 pr-4 text-xs font-bold" style={{ color: ACCENT }}>
                    {r.canalFrio.toFixed(1)} kg
                  </td>
                  <td className="py-2.5 pr-4 text-xs font-semibold" style={{ color: "#0EA5E9" }}>
                    {r.empellaFrio.toFixed(1)} kg
                  </td>
                  <td className="py-2.5 pr-4 text-xs font-semibold" style={{ color: "#38BDF8" }}>
                    {r.cabezaFrio.toFixed(1)} kg
                  </td>
                  <td className="py-2.5 pr-4 font-mono text-xs text-slate-500">{r.hora}</td>
                  <td className="py-2.5 text-xs text-slate-500">{r.operador}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
