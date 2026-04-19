import {
  Card,
  Title,
  Text,
  Metric,
  Flex,
  ProgressBar,
  CategoryBar,
  Badge,
  Divider,
} from "@tremor/react";
import { operacionesProyectos, recursosCategoria, recursosValores } from "@/lib/mock-data";

const estadoColor: Record<string, "emerald" | "amber" | "slate" | "rose"> = {
  Completado: "emerald",
  "En curso": "amber",
  Pendiente: "slate",
};

export default function OperacionesDashboard() {
  const completados = operacionesProyectos.filter((p) => p.estado === "Completado").length;
  const enCurso = operacionesProyectos.filter((p) => p.estado === "En curso").length;
  const pendientes = operacionesProyectos.filter((p) => p.estado === "Pendiente").length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold" style={{ color: "#0F172A" }}>
          Operaciones
        </h2>
        <p className="text-sm mt-0.5" style={{ color: "#475569" }}>
          Estado de proyectos y distribución de recursos
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Completados", value: completados, color: "#10B981" },
          { label: "En curso", value: enCurso, color: "#F59E0B" },
          { label: "Pendientes", value: pendientes, color: "#475569" },
        ].map((s) => (
          <Card key={s.label} className="text-center">
            <Text>{s.label}</Text>
            <Metric className="mt-1" style={{ color: s.color }}>
              {s.value}
            </Metric>
          </Card>
        ))}
      </div>

      {/* Projects progress */}
      <Card>
        <Title>Progreso de Proyectos</Title>
        <Text>Avance actual por proyecto y equipo</Text>
        <Divider />
        <div className="space-y-5 mt-2">
          {operacionesProyectos.map((p) => (
            <div key={p.nombre}>
              <Flex justifyContent="between" className="mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium" style={{ color: "#0F172A" }}>
                    {p.nombre}
                  </span>
                  <Badge color={estadoColor[p.estado]} size="xs">
                    {p.estado}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs" style={{ color: "#475569" }}>
                    {p.equipo}
                  </span>
                  <span className="text-sm font-semibold" style={{ color: "#0F172A" }}>
                    {p.progreso}%
                  </span>
                </div>
              </Flex>
              <ProgressBar
                value={p.progreso}
                color={p.estado === "Completado" ? "emerald" : p.estado === "En curso" ? "amber" : "slate"}
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Resource distribution */}
      <Card>
        <Title>Distribución de Recursos por Equipo</Title>
        <Text>Porcentaje de carga de trabajo por área</Text>
        <CategoryBar
          values={recursosValores}
          colors={["emerald", "amber", "slate", "cyan", "violet", "orange"]}
          className="mt-4"
        />
        <Flex justifyContent="start" className="mt-3 flex-wrap gap-x-4 gap-y-2">
          {recursosCategoria.map((cat, i) => {
            const colors = ["#10B981", "#F59E0B", "#475569", "#06B6D4", "#8B5CF6", "#F97316"];
            return (
              <div key={cat} className="flex items-center gap-1.5">
                <span
                  className="w-3 h-3 rounded-sm inline-block"
                  style={{ background: colors[i] }}
                />
                <Text>{cat} ({recursosValores[i]}%)</Text>
              </div>
            );
          })}
        </Flex>
      </Card>
    </div>
  );
}
