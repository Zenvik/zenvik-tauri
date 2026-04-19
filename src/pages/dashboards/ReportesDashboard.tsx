import {
  Card,
  Title,
  Text,
  Flex,
  Badge,
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  CategoryBar,
  BarList,
  Divider,
} from "@tremor/react";
import { reportesTabla, reportesCategorias, reportesTopAutores } from "@/lib/mock-data";

const estadoColor: Record<string, "emerald" | "amber" | "slate"> = {
  Aprobado: "emerald",
  Revisión: "amber",
  Borrador: "slate",
};

export default function ReportesDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold" style={{ color: "#0F172A" }}>
          Reportes
        </h2>
        <p className="text-sm mt-0.5" style={{ color: "#475569" }}>
          Gestión y seguimiento de informes del sistema
        </p>
      </div>

      {/* Summary + Authors */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <Title>Estado de Reportes</Title>
          <Text>Distribución por estado de aprobación</Text>
          <CategoryBar
            values={reportesCategorias.map((c) => c.value)}
            colors={["emerald", "amber", "slate"]}
            className="mt-4"
          />
          <Flex justifyContent="start" className="mt-3 gap-4">
            {reportesCategorias.map((cat, i) => {
              const colors = ["#10B981", "#F59E0B", "#475569"];
              return (
                <div key={cat.name} className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm inline-block" style={{ background: colors[i] }} />
                  <Text>{cat.name} ({cat.value})</Text>
                </div>
              );
            })}
          </Flex>
        </Card>

        <Card>
          <Title>Top Autores</Title>
          <Text>Reportes emitidos por persona</Text>
          <Divider />
          <BarList
            data={reportesTopAutores}
            className="mt-2"
            color="emerald"
            valueFormatter={(v: number) => `${v} reportes`}
          />
        </Card>
      </div>

      {/* Table */}
      <Card>
        <Flex justifyContent="between" alignItems="start">
          <div>
            <Title>Todos los Reportes</Title>
            <Text>Registro completo de documentos generados</Text>
          </div>
          <Badge color="emerald" size="sm">
            {reportesTabla.length} total
          </Badge>
        </Flex>
        <Table className="mt-4">
          <TableHead>
            <TableRow>
              <TableHeaderCell>ID</TableHeaderCell>
              <TableHeaderCell>Nombre</TableHeaderCell>
              <TableHeaderCell>Tipo</TableHeaderCell>
              <TableHeaderCell>Estado</TableHeaderCell>
              <TableHeaderCell>Autor</TableHeaderCell>
              <TableHeaderCell>Fecha</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reportesTabla.map((r) => (
              <TableRow key={r.id}>
                <TableCell>
                  <span className="font-mono text-xs" style={{ color: "#475569" }}>
                    {r.id}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-medium text-sm" style={{ color: "#0F172A" }}>
                    {r.nombre}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
                    style={{ background: "rgba(245,158,11,0.1)", color: "#F59E0B" }}
                  >
                    {r.tipo}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge color={estadoColor[r.estado]} size="xs">
                    {r.estado}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Text>{r.autor}</Text>
                </TableCell>
                <TableCell>
                  <Text>{r.fecha}</Text>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
