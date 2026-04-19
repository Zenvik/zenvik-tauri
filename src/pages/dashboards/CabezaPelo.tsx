import { Flame, Hash, Clock } from "lucide-react";
import KpiCard from "@/components/KpiCard";
import RankedList from "@/components/RankedList";
import { cabezaResumen, cabezaRegistros, cabezaPorHora, loteActivo } from "@/lib/mock-data";

const ACCENT = "#F97316";

export default function CabezaPelo() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <div className="p-1.5 rounded-lg" style={{ background: `${ACCENT}15` }}>
          <Flame size={16} style={{ color: ACCENT }} />
        </div>
        <h1 className="text-lg font-bold" style={{ color: "#0F172A" }}>
          Cabeza & Pelo
        </h1>
        {/* Custom badge — no Tremor Badge (underline issue) */}
        <span
          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold"
          style={{ background: `${ACCENT}15`, color: ACCENT }}
        >
          Etapa 2.2 · Proceso Caliente
        </span>
        <span className="ml-2 text-sm" style={{ color: "#64748B" }}>
          Lote <span className="font-mono font-semibold">{loteActivo.id}</span>
        </span>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <KpiCard
          icon={Flame}
          label="Total Cabeza"
          value={cabezaResumen.totalCabeza.toFixed(1)}
          unit="kg · cabezas faenadas"
          accentColor={ACCENT}
          highlight
        />
        <KpiCard
          icon={Flame}
          label="Total Pelo"
          value={cabezaResumen.totalPelo.toFixed(1)}
          unit="kg · pelo recuperado"
          accentColor="#EAB308"
        />
        <KpiCard
          icon={Hash}
          label="Unidades"
          value={cabezaResumen.unidades}
          unit="registros procesados"
          accentColor="#10B981"
        />
        <KpiCard
          icon={Hash}
          label="Promedio cabeza"
          value={`${cabezaResumen.promCabeza.toFixed(1)}`}
          unit={`kg/animal · pelo: ${cabezaResumen.promPelo.toFixed(1)} kg`}
          accentColor="#8B5CF6"
        />
      </div>

      {/* Content */}
      <div className="grid grid-cols-5 gap-4">
        {/* Ranked list por hora */}
        <div
          className="col-span-2 bg-white rounded-xl p-5"
          style={{ border: "1px solid #E2E8F0" }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Clock size={14} style={{ color: ACCENT }} />
            <span className="text-sm font-semibold text-slate-800">
              Cabeza pesada por franja horaria
            </span>
          </div>
          <p className="text-xs text-slate-400 mb-5">
            Kilogramos acumulados por hora de proceso
          </p>

          <RankedList
            data={cabezaPorHora}
            accentColor={ACCENT}
            valueFormatter={(v) => `${v.toFixed(1)} kg`}
          />

          {/* Summary totals */}
          <div
            className="mt-6 grid grid-cols-2 gap-3 pt-5"
            style={{ borderTop: "1px solid #F1F5F9" }}
          >
            {[
              { label: "Total cabeza", value: `${cabezaResumen.totalCabeza.toFixed(1)} kg`, color: ACCENT },
              { label: "Total pelo", value: `${cabezaResumen.totalPelo.toFixed(1)} kg`, color: "#EAB308" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div
                  className="text-xl font-bold tracking-tight"
                  style={{ color: s.color }}
                >
                  {s.value}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Table */}
        <div
          className="col-span-3 bg-white rounded-xl p-5"
          style={{ border: "1px solid #E2E8F0" }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Clock size={14} style={{ color: ACCENT }} />
            <span className="text-sm font-semibold text-slate-800">
              Registros detallados
            </span>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Captura de peso por animal procesado
          </p>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "2px solid #F1F5F9" }}>
                {["# Registro", "Cabeza (kg)", "Pelo (kg)", "Hora", "Operador"].map(
                  (h) => (
                    <th
                      key={h}
                      className="pb-2 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {cabezaRegistros.map((r) => (
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
                  <td
                    className="py-2.5 text-xs font-bold text-slate-800"
                  >
                    {r.cabeza.toFixed(1)} kg
                  </td>
                  <td
                    className="py-2.5 text-xs font-semibold"
                    style={{ color: "#EAB308" }}
                  >
                    {r.pelo.toFixed(1)} kg
                  </td>
                  <td className="py-2.5 font-mono text-xs text-slate-500">
                    {r.hora}
                  </td>
                  <td className="py-2.5 text-xs text-slate-500">
                    {r.operador}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ borderTop: "2px solid #F1F5F9" }}>
                <td className="pt-3 text-xs font-semibold text-slate-500">
                  TOTAL ({cabezaRegistros.length} reg.)
                </td>
                <td
                  className="pt-3 text-xs font-bold"
                  style={{ color: ACCENT }}
                >
                  {cabezaRegistros.reduce((s, r) => s + r.cabeza, 0).toFixed(1)} kg
                </td>
                <td
                  className="pt-3 text-xs font-bold"
                  style={{ color: "#EAB308" }}
                >
                  {cabezaRegistros.reduce((s, r) => s + r.pelo, 0).toFixed(1)} kg
                </td>
                <td colSpan={2} />
              </tr>
            </tfoot>
          </table>

          {/* Stats row */}
          <div
            className="mt-4 grid grid-cols-2 gap-3 pt-4"
            style={{ borderTop: "1px solid #F1F5F9" }}
          >
            <div
              className="rounded-lg p-3"
              style={{ background: `${ACCENT}08`, border: `1px solid ${ACCENT}20` }}
            >
              <div className="text-xs text-slate-400 uppercase tracking-wide mb-1">
                Cabeza más pesada
              </div>
              <div className="text-lg font-bold" style={{ color: ACCENT }}>
                {Math.max(...cabezaRegistros.map((r) => r.cabeza)).toFixed(1)} kg
              </div>
            </div>
            <div
              className="rounded-lg p-3"
              style={{ background: "#EAB30808", border: "1px solid #EAB30820" }}
            >
              <div className="text-xs text-slate-400 uppercase tracking-wide mb-1">
                Pelo promedio
              </div>
              <div className="text-lg font-bold" style={{ color: "#EAB308" }}>
                {(
                  cabezaRegistros.reduce((s, r) => s + r.pelo, 0) /
                  cabezaRegistros.length
                ).toFixed(1)}{" "}
                kg
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
