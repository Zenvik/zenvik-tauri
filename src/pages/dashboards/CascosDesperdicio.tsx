import { Flame, Trash2, Hash, AlertTriangle, Clock } from "lucide-react";
import { DonutChart, Legend } from "@tremor/react";
import KpiCard from "@/components/KpiCard";
import { cascosResumen, tiposDesperdicio, cascosRegistros, pieResumen, loteActivo } from "@/lib/mock-data";

const ACCENT = "#EF4444";
const ACCENT_CASCOS = "#F97316";

export default function CascosDesperdicio() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <div className="p-1.5 rounded-lg" style={{ background: `${ACCENT}15` }}>
          <Trash2 size={16} style={{ color: ACCENT }} />
        </div>
        <h1 className="text-lg font-bold" style={{ color: "#0F172A" }}>
          Cascos & Desperdicio
        </h1>
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: "#EF444415", color: "#EF4444" }}>Etapa 2.3 · Proceso Caliente</span>
        <span className="ml-2 text-sm" style={{ color: "#64748B" }}>
          Lote <span className="font-mono font-semibold">{loteActivo.id}</span>
        </span>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <KpiCard
          icon={Flame}
          label="Total Cascos"
          value={cascosResumen.totalCascos.toFixed(1)}
          unit="kg · pezuñas recuperadas"
          accentColor={ACCENT_CASCOS}
        />
        <KpiCard
          icon={Trash2}
          label="Total Desperdicio"
          value={cascosResumen.totalDesperdicio.toFixed(1)}
          unit="kg · residuos del proceso"
          accentColor={ACCENT}
          highlight
        />
        <KpiCard
          icon={Hash}
          label="Unidades"
          value={cascosResumen.unidades}
          unit="animales procesados"
          accentColor="#10B981"
        />
        <KpiCard
          icon={AlertTriangle}
          label="% Desperdicio"
          value={`${cascosResumen.pctDesperdicio}%`}
          unit="del peso en pie total"
          accentColor={cascosResumen.pctDesperdicio > 6 ? ACCENT : "#F59E0B"}
          delta={cascosResumen.pctDesperdicio > 6 ? "Alto" : "Normal"}
          deltaUp={false}
        />
      </div>

      {/* Donut + Table */}
      <div className="grid grid-cols-5 gap-4">
        {/* Donut chart tipos de desperdicio */}
        <div className="col-span-2 bg-white rounded-xl p-5" style={{ border: "1px solid #E2E8F0" }}>
          <div className="flex items-center gap-2 mb-1">
            <Trash2 size={14} style={{ color: ACCENT }} />
            <span className="text-sm font-semibold text-slate-800">Tipos de desperdicio</span>
          </div>
          <p className="text-xs text-slate-400 mb-4">Distribución por categoría (kg)</p>
          <DonutChart
            data={tiposDesperdicio}
            category="value"
            index="name"
            colors={["red", "orange", "amber", "slate"]}
            valueFormatter={(v: number) => `${v.toFixed(1)} kg`}
            showLabel
            showAnimation
            className="h-44"
          />
          <Legend
            categories={tiposDesperdicio.map((t) => t.name)}
            colors={["red", "orange", "amber", "slate"]}
            className="mt-4"
          />

          {/* Summary ratios */}
          <div
            className="mt-4 grid grid-cols-2 gap-2 pt-4"
            style={{ borderTop: "1px solid #F1F5F9" }}
          >
            <div className="text-center">
              <div className="text-xs text-slate-400 uppercase tracking-wide mb-0.5">Cascos / animal</div>
              <div className="text-base font-bold" style={{ color: ACCENT_CASCOS }}>
                {(cascosResumen.totalCascos / cascosResumen.unidades).toFixed(2)} kg
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-slate-400 uppercase tracking-wide mb-0.5">Desp. / animal</div>
              <div className="text-base font-bold" style={{ color: ACCENT }}>
                {(cascosResumen.totalDesperdicio / cascosResumen.unidades).toFixed(2)} kg
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="col-span-3 bg-white rounded-xl p-5" style={{ border: "1px solid #E2E8F0" }}>
          <div className="flex items-center gap-2 mb-1">
            <Clock size={14} style={{ color: ACCENT }} />
            <span className="text-sm font-semibold text-slate-800">Registros detallados</span>
          </div>
          <p className="text-xs text-slate-400 mb-4">Captura por animal procesado</p>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "2px solid #F1F5F9" }}>
                {["# Registro", "Cascos (kg)", "Desperdicio (kg)", "Tipo", "Hora"].map((h) => (
                  <th key={h} className="pb-2 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cascosRegistros.map((r) => (
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
                  <td className="py-2.5 text-xs font-semibold" style={{ color: ACCENT_CASCOS }}>
                    {r.cascos.toFixed(1)} kg
                  </td>
                  <td className="py-2.5 text-xs font-bold" style={{ color: ACCENT }}>
                    {r.desperdicio.toFixed(1)} kg
                  </td>
                  <td className="py-2.5">
                    <span
                      className="text-xs px-2 py-0.5 rounded font-medium"
                      style={{ background: "#F1F5F9", color: "#64748B" }}
                    >
                      {r.tipo}
                    </span>
                  </td>
                  <td className="py-2.5 font-mono text-xs text-slate-500">{r.hora}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ borderTop: "2px solid #F1F5F9" }}>
                <td className="pt-3 text-xs font-semibold text-slate-500">
                  TOTAL ({cascosRegistros.length} reg.)
                </td>
                <td className="pt-3 text-xs font-bold" style={{ color: ACCENT_CASCOS }}>
                  {cascosRegistros.reduce((s, r) => s + r.cascos, 0).toFixed(1)} kg
                </td>
                <td className="pt-3 text-xs font-bold" style={{ color: ACCENT }}>
                  {cascosRegistros.reduce((s, r) => s + r.desperdicio, 0).toFixed(1)} kg
                </td>
                <td colSpan={2} />
              </tr>
            </tfoot>
          </table>

          {/* vs total */}
          <div
            className="mt-4 rounded-lg px-4 py-3 flex items-center gap-3"
            style={{ background: "#FEF2F2", border: "1px solid #FECACA" }}
          >
            <AlertTriangle size={14} style={{ color: ACCENT }} />
            <span className="text-xs font-medium" style={{ color: "#991B1B" }}>
              Desperdicio total ({cascosResumen.totalDesperdicio.toFixed(1)} kg) representa el{" "}
              <strong>
                {((cascosResumen.totalDesperdicio / pieResumen.totalBruto) * 100).toFixed(2)}%
              </strong>{" "}
              del peso en pie del lote.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
