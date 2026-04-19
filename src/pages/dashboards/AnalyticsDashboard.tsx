import {
  Card,
  Title,
  Text,
  Metric,
  Flex,
  LineChart,
  Tracker,
  BadgeDelta,
  Grid,
} from "@tremor/react";
import { analyticsMetrics, analyticsTendencias, uptimeTracker } from "@/lib/mock-data";

export default function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold" style={{ color: "#0F172A" }}>
          Analytics
        </h2>
        <p className="text-sm mt-0.5" style={{ color: "#475569" }}>
          Comportamiento de usuarios y tendencias de uso
        </p>
      </div>

      {/* Metrics row */}
      <Grid numItemsMd={2} numItemsLg={4} className="gap-4">
        {analyticsMetrics.map((m) => (
          <Card key={m.label}>
            <Flex justifyContent="between" alignItems="start">
              <Text>{m.label}</Text>
              <BadgeDelta deltaType={m.up ? "increase" : "decrease"} size="xs">
                {m.delta}
              </BadgeDelta>
            </Flex>
            <Metric className="mt-2">{m.value}</Metric>
          </Card>
        ))}
      </Grid>

      {/* Line chart */}
      <Card>
        <Title>Tendencias — últimas 8 semanas</Title>
        <Text>Usuarios únicos y páginas vistas por semana</Text>
        <LineChart
          className="mt-4 h-56"
          data={analyticsTendencias}
          index="semana"
          categories={["Usuarios", "Pág.vistas"]}
          colors={["emerald", "amber"]}
          showLegend
          showGridLines
          curveType="natural"
          yAxisWidth={60}
        />
      </Card>

      {/* Uptime tracker */}
      <Card>
        <Flex justifyContent="between" alignItems="start">
          <div>
            <Title>Uptime — últimos 30 días</Title>
            <Text>Estado operativo diario del sistema</Text>
          </div>
          <div className="text-right">
            <Metric style={{ color: "#10B981" }}>93.3%</Metric>
            <Text>disponibilidad</Text>
          </div>
        </Flex>
        <Tracker
          data={uptimeTracker}
          className="mt-4"
        />
        <Flex justifyContent="start" className="mt-3 gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm inline-block" style={{ background: "#10B981" }} />
            <Text>Operativo</Text>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm inline-block" style={{ background: "#F87171" }} />
            <Text>Incidente (2 días)</Text>
          </div>
        </Flex>
      </Card>
    </div>
  );
}
