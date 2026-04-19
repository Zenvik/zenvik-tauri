import {
  Card,
  Title,
  Text,
  Metric,
  Flex,
  AreaChart,
  BadgeDelta,
  Divider,
  Grid,
} from "@tremor/react";
import { finanzasKPIs, finanzasMensuales } from "@/lib/mock-data";

export default function FinanzasDashboard() {
  const utilidadTotal = 142200;
  const ingresoTotal = 284500;
  const margen = ((utilidadTotal / ingresoTotal) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold" style={{ color: "#0F172A" }}>
          Finanzas
        </h2>
        <p className="text-sm mt-0.5" style={{ color: "#475569" }}>
          Estado financiero y flujo de caja acumulado
        </p>
      </div>

      {/* KPI Cards */}
      <Grid numItemsMd={2} numItemsLg={4} className="gap-4">
        {finanzasKPIs.map((kpi, i) => (
          <Card key={kpi.label}>
            <Flex justifyContent="between" alignItems="start">
              <Text>{kpi.label}</Text>
              <BadgeDelta deltaType={kpi.up ? "increase" : "decrease"} size="xs">
                {kpi.delta}
              </BadgeDelta>
            </Flex>
            <Metric
              className="mt-2"
              style={{
                color: i === 0 ? "#10B981" : i === 1 ? "#F59E0B" : i === 2 ? "#10B981" : "#0F172A",
              }}
            >
              {kpi.value}
            </Metric>
          </Card>
        ))}
      </Grid>

      {/* Area Chart */}
      <Card>
        <Flex justifyContent="between" alignItems="start">
          <div>
            <Title>Ingresos vs Gastos — 2025</Title>
            <Text>Comparativo mensual acumulado</Text>
          </div>
          <div className="text-right">
            <Text>Margen neto</Text>
            <Metric style={{ color: "#10B981" }}>{margen}%</Metric>
          </div>
        </Flex>
        <AreaChart
          className="mt-4 h-64"
          data={finanzasMensuales}
          index="mes"
          categories={["Ingresos", "Gastos"]}
          colors={["emerald", "amber"]}
          showLegend
          showGridLines
          curveType="natural"
          valueFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          stack={false}
        />
      </Card>

      {/* Balance summary */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <Title>Resumen de Balance</Title>
          <Divider />
          {[
            { label: "Ingresos totales YTD", value: "$284,500", color: "#10B981" },
            { label: "Gastos totales YTD", value: "$142,300", color: "#F59E0B" },
            { label: "Utilidad neta", value: "$142,200", color: "#10B981" },
            { label: "Impuestos estimados (30%)", value: "$42,660", color: "#475569" },
            { label: "Utilidad después de impuestos", value: "$99,540", color: "#0F172A" },
          ].map((row) => (
            <Flex key={row.label} justifyContent="between" className="py-2.5 border-b border-slate-100 last:border-0">
              <Text>{row.label}</Text>
              <span className="text-sm font-semibold" style={{ color: row.color }}>
                {row.value}
              </span>
            </Flex>
          ))}
        </Card>

        <Card>
          <Title>Proyección Q3 2025</Title>
          <Divider />
          {[
            { label: "Ingresos proyectados", value: "$195,000", delta: "+15%", up: true },
            { label: "Gastos proyectados", value: "$98,000", delta: "+5%", up: false },
            { label: "Utilidad proyectada", value: "$97,000", delta: "+22%", up: true },
          ].map((row) => (
            <div key={row.label} className="py-3 border-b border-slate-100 last:border-0">
              <Flex justifyContent="between">
                <Text>{row.label}</Text>
                <BadgeDelta deltaType={row.up ? "increase" : "moderateDecrease"} size="xs">
                  {row.delta}
                </BadgeDelta>
              </Flex>
              <Metric className="mt-1 text-xl">{row.value}</Metric>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
