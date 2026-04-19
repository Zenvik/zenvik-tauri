import {
  Card,
  Title,
  Text,
  Metric,
  Flex,
  AreaChart,
  DonutChart,
  Legend,
  BadgeDelta,
} from "@tremor/react";
import {
  overviewKPIs,
  overviewVisits,
  overviewChannels,
} from "@/lib/mock-data";

export default function OverviewDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold" style={{ color: "#0F172A" }}>
          Panel General
        </h2>
        <p className="text-sm mt-0.5" style={{ color: "#475569" }}>
          Resumen ejecutivo del negocio
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {overviewKPIs.map((kpi) => (
          <Card key={kpi.label} className="space-y-2">
            <Flex justifyContent="between" alignItems="start">
              <Text>{kpi.label}</Text>
              <BadgeDelta deltaType={kpi.up ? "increase" : "decrease"} size="xs">
                {kpi.delta}
              </BadgeDelta>
            </Flex>
            <Metric>{kpi.value}</Metric>
          </Card>
        ))}
      </div>

      {/* Area Chart + Donut */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <Title>Visitas y Sesiones — últimos 7 días</Title>
          <Text>Tráfico diario de la plataforma</Text>
          <AreaChart
            className="mt-4 h-56"
            data={overviewVisits}
            index="fecha"
            categories={["Visitas", "Sesiones"]}
            colors={["emerald", "amber"]}
            showLegend
            showGridLines
            curveType="natural"
          />
        </Card>

        <Card>
          <Title>Distribución por Canal</Title>
          <Text>Fuente de tráfico este mes</Text>
          <DonutChart
            className="mt-6 h-40"
            data={overviewChannels}
            category="value"
            index="name"
            colors={["emerald", "amber", "slate", "cyan", "violet"]}
            showLabel
          />
          <Legend
            className="mt-4"
            categories={overviewChannels.map((c) => c.name)}
            colors={["emerald", "amber", "slate", "cyan", "violet"]}
          />
        </Card>
      </div>
    </div>
  );
}
