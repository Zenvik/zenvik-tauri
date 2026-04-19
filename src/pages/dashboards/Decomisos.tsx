import { AlertOctagon, ShieldAlert, Hash, BarChart3, Clock } from "lucide-react";
import KpiCard from "@/components/KpiCard";
import RankedList from "@/components/RankedList";
import { decomisosResumen, decomisosRegistros, decomisoPorCausa, loteActivo } from "@/lib/mock-data";

const ACCENT = "#DC2626";

export default function Decomisos() {
  const pctLote = ((decomisosResumen.totalKg / 6816.5) * 100).toFixed(3);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 rounded-lg" style={{ background: `${ACCENT}15` }}>
              <AlertOctagon size={16} style={{ color: ACCENT }} />
            </div>
            <h1 className="text-lg font-bold" style={{ color: "#0F172A" }}>
              Decomisos
            </h1>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: "#DC262615", color: "#DC2626" }}>Etapa 2.4 · Inspección INVIMA</span>
          </div>
          <p className="text-sm" style={{ color: "#64748B" }}>
            Lote <span className="font-mono font-semibold">{loteActivo.id}</span> ·{" "}
            Registro de piezas no aptas para consumo
          </p>
        </div>

        {/* Alert banner */}
        {decomisosResumen.totalKg > 0 && (
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg"
            style={{ background: "#FEF2F2", border: "1px solid #FECACA" }}
          >
            <ShieldAlert size={14} style={{ color: ACCENT }} />
            <span className="text-xs font-bold" style={{ color: "#991B1B" }}>
              {decomisosResumen.totalItems} items decomisados · {decomisosResumen.totalKg.toFixed(1)} kg
            </span>
          </div>
        )}
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <KpiCard
          icon={AlertOctagon}
          label="Total decomisado"
          value={`${decomisosResumen.totalKg.toFixed(1)}`}
          unit="kg no aptos para consumo"
          accentColor={ACCENT}
          highlight
        />
        <KpiCard
          icon={Hash}
          label="Items registrados"
          value={decomisosResumen.totalItems}
          unit="piezas rechazadas"
          accentColor="#F97316"
        />
        <KpiCard
          icon={ShieldAlert}
          label="% del lote"
          value={`${pctLote}%`}
          unit="sobre peso en pie total"
          accentColor={parseFloat(pctLote) > 0.5 ? ACCENT : "#10B981"}
          delta={parseFloat(pctLote) > 0.5 ? "Alto" : "Normal"}
          deltaUp={false}
        />
        <KpiCard
          icon={ShieldAlert}
          label="Inspectores"
          value={[...new Set(decomisosRegistros.map((r) => r.inspector))].length}
          unit="inspectores INVIMA activos"
          accentColor="#8B5CF6"
        />
      </div>

      {/* Content */}
      <div className="grid grid-cols-5 gap-4">
        {/* RankedList causa */}
        <div className="col-span-2 bg-white rounded-xl p-5" style={{ border: "1px solid #E2E8F0" }}>
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 size={14} style={{ color: ACCENT }} />
            <span className="text-sm font-semibold text-slate-800">Decomisos por causa</span>
          </div>
          <p className="text-xs text-slate-400 mb-5">Kg rechazados agrupados por motivo</p>
          <RankedList
            data={decomisoPorCausa}
            accentColor={ACCENT}
            valueFormatter={(v) => `${v.toFixed(1)} kg`}
          />

          {/* Inspector summary */}
          <div
            className="mt-6 pt-4"
            style={{ borderTop: "1px solid #F1F5F9" }}
          >
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
              Por inspector
            </div>
            {[...new Set(decomisosRegistros.map((r) => r.inspector))].map((insp) => {
              const items = decomisosRegistros.filter((r) => r.inspector === insp);
              const total = items.reduce((s, r) => s + r.kg, 0);
              return (
                <div key={insp} className="flex items-center justify-between py-1.5">
                  <span className="text-xs font-mono text-slate-600">{insp}</span>
                  <div className="text-right">
                    <span className="text-xs font-bold" style={{ color: ACCENT }}>
                      {total.toFixed(1)} kg
                    </span>
                    <span className="text-xs text-slate-400 ml-1">
                      ({items.length} items)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Table */}
        <div className="col-span-3 bg-white rounded-xl p-5" style={{ border: "1px solid #E2E8F0" }}>
          <div className="flex items-center gap-2 mb-1">
            <Clock size={14} style={{ color: ACCENT }} />
            <span className="text-sm font-semibold text-slate-800">Registro de decomisos</span>
          </div>
          <p className="text-xs text-slate-400 mb-4">Detalle por pieza rechazada e inspector</p>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "2px solid #F1F5F9" }}>
                {["ID", "Canal ref.", "Parte", "Causa", "Inspector", "Kg", "Hora"].map((h) => (
                  <th key={h} className="pb-2 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {decomisosRegistros.map((r) => (
                <tr
                  key={r.id}
                  style={{ borderBottom: "1px solid #F8FAFC" }}
                  className="hover:bg-red-50/40 transition-colors"
                >
                  <td className="py-2.5">
                    <span
                      className="font-mono text-xs font-bold px-1.5 py-0.5 rounded"
                      style={{ background: "#FEE2E2", color: ACCENT }}
                    >
                      {r.id}
                    </span>
                  </td>
                  <td className="py-2.5 font-mono text-xs text-slate-500">{r.canal}</td>
                  <td className="py-2.5 text-xs text-slate-700">{r.parte}</td>
                  <td className="py-2.5">
                    <span
                      className="text-xs px-1.5 py-0.5 rounded font-medium"
                      style={{ background: "#FEF2F2", color: "#991B1B" }}
                    >
                      {r.causa}
                    </span>
                  </td>
                  <td className="py-2.5 font-mono text-xs text-slate-500">{r.inspector}</td>
                  <td className="py-2.5 text-xs font-bold" style={{ color: ACCENT }}>
                    {r.kg.toFixed(1)} kg
                  </td>
                  <td className="py-2.5 font-mono text-xs text-slate-500">{r.hora}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ borderTop: "2px solid #F1F5F9" }}>
                <td colSpan={5} className="pt-3 text-xs font-semibold text-slate-500">
                  TOTAL · {decomisosResumen.totalItems} piezas
                </td>
                <td className="pt-3 text-xs font-bold" style={{ color: ACCENT }}>
                  {decomisosResumen.totalKg.toFixed(1)} kg
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
