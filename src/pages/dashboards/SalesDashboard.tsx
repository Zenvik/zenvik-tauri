import {
  Card,
  Title,
  Text,
  Metric,
  Flex,
  BarChart,
  BarList,
  BadgeDelta,
  Divider,
} from "@tremor/react";
import { ventasKPIs, ventasPorDia, topProductos } from "@/lib/mock-data";

export default function SalesDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold" style={{ color: "#0F172A" }}>
          Ventas
        </h2>
        <p className="text-sm mt-0.5" style={{ color: "#475569" }}>
          Rendimiento comercial y métricas de venta
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {ventasKPIs.map((kpi, i) => (
          <Card key={kpi.label}>
            <Flex justifyContent="between" alignItems="start">
              <Text>{kpi.label}</Text>
              <BadgeDelta deltaType={kpi.up ? "increase" : "decrease"} size="xs">
                {kpi.delta}
              </BadgeDelta>
            </Flex>
            <Metric
              className="mt-2"
              style={{ color: i === 0 ? "#10B981" : i === 2 ? "#F59E0B" : "#0F172A" }}
            >
              {kpi.value}
            </Metric>
          </Card>
        ))}
      </div>

      {/* Bar Chart + Top Productos */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <Title>Ventas vs Meta — por día</Title>
          <Text>Comparativo de ventas diarias frente a la meta semanal</Text>
          <BarChart
            className="mt-4 h-56"
            data={ventasPorDia}
            index="dia"
            categories={["Ventas", "Meta"]}
            colors={["emerald", "amber"]}
            showLegend
            showGridLines
            valueFormatter={(v: number) => `$${v.toLocaleString()}`}
          />
        </Card>

        <Card>
          <Title>Top Productos</Title>
          <Text>Ingresos por producto este mes</Text>
          <Divider />
          <BarList
            data={topProductos.map((p) => ({
              name: p.name,
              value: p.value,
            }))}
            className="mt-2"
            color="emerald"
            valueFormatter={(v: number) => `$${v.toLocaleString()}`}
          />
        </Card>
      </div>
    </div>
  );
}
