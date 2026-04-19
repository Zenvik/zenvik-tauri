// ── Overview ─────────────────────────────────────────────────────────────────
export const overviewKPIs = [
  { label: "Usuarios activos", value: "12,480", delta: "+8.2%", up: true },
  { label: "Ingresos totales", value: "$94,210", delta: "+12.5%", up: true },
  { label: "Tasa de conversión", value: "3.74%", delta: "-0.3%", up: false },
  { label: "Sesiones hoy", value: "4,320", delta: "+5.1%", up: true },
];

export const overviewVisits = [
  { fecha: "Lun", Visitas: 3200, Sesiones: 2800 },
  { fecha: "Mar", Visitas: 4100, Sesiones: 3600 },
  { fecha: "Mié", Visitas: 3800, Sesiones: 3100 },
  { fecha: "Jue", Visitas: 5200, Sesiones: 4700 },
  { fecha: "Vie", Visitas: 6100, Sesiones: 5400 },
  { fecha: "Sáb", Visitas: 4900, Sesiones: 4200 },
  { fecha: "Dom", Visitas: 3700, Sesiones: 3000 },
];

export const overviewChannels = [
  { name: "Orgánico", value: 40 },
  { name: "Directo", value: 25 },
  { name: "Social", value: 20 },
  { name: "Email", value: 10 },
  { name: "Referido", value: 5 },
];

// ── Ventas ────────────────────────────────────────────────────────────────────
export const ventasKPIs = [
  { label: "Ventas hoy", value: "$8,420", delta: "+14%", up: true },
  { label: "Esta semana", value: "$42,180", delta: "+9%", up: true },
  { label: "Este mes", value: "$163,500", delta: "+21%", up: true },
];

export const ventasPorDia = [
  { dia: "Lun", Ventas: 12400, Meta: 11000 },
  { dia: "Mar", Ventas: 15800, Meta: 11000 },
  { dia: "Mié", Ventas: 9200, Meta: 11000 },
  { dia: "Jue", Ventas: 18300, Meta: 11000 },
  { dia: "Vie", Ventas: 21000, Meta: 11000 },
  { dia: "Sáb", Ventas: 17500, Meta: 11000 },
  { dia: "Dom", Ventas: 8400, Meta: 11000 },
];

export const topProductos = [
  { name: "Plan Pro", value: 48320 },
  { name: "Plan Enterprise", value: 37100 },
  { name: "Add-on Analytics", value: 22400 },
  { name: "Plan Starter", value: 18900 },
  { name: "Consultoría", value: 12300 },
];

// ── Analytics ────────────────────────────────────────────────────────────────
export const analyticsMetrics = [
  { label: "Bounce rate", value: "38.4%", delta: "-2.1%", up: true },
  { label: "Sesión promedio", value: "4m 32s", delta: "+18s", up: true },
  { label: "Págs / sesión", value: "6.8", delta: "+0.4", up: true },
  { label: "Nuevos usuarios", value: "3,210", delta: "+7%", up: true },
];

export const analyticsTendencias = [
  { semana: "S1", Usuarios: 3200, "Pág.vistas": 18000 },
  { semana: "S2", Usuarios: 4100, "Pág.vistas": 22400 },
  { semana: "S3", Usuarios: 3700, "Pág.vistas": 19800 },
  { semana: "S4", Usuarios: 5300, "Pág.vistas": 28100 },
  { semana: "S5", Usuarios: 4800, "Pág.vistas": 25600 },
  { semana: "S6", Usuarios: 6200, "Pág.vistas": 33000 },
  { semana: "S7", Usuarios: 5900, "Pág.vistas": 31200 },
  { semana: "S8", Usuarios: 7100, "Pág.vistas": 38400 },
];

export const uptimeTracker = Array.from({ length: 30 }, (_, i) => ({
  key: `D${i + 1}`,
  color: i === 12 || i === 21 ? ("rose" as const) : ("emerald" as const),
  tooltip: i === 12 || i === 21 ? "Incidente detectado" : "Operativo",
}));

// ── Operaciones ──────────────────────────────────────────────────────────────
export const operacionesProyectos = [
  { nombre: "Migración de datos", progreso: 82, estado: "En curso", equipo: "Backend" },
  { nombre: "Rediseño UI", progreso: 65, estado: "En curso", equipo: "Frontend" },
  { nombre: "API v3", progreso: 100, estado: "Completado", equipo: "Backend" },
  { nombre: "QA Automation", progreso: 45, estado: "En curso", equipo: "QA" },
  { nombre: "Infraestructura k8s", progreso: 30, estado: "Pendiente", equipo: "DevOps" },
  { nombre: "Dashboard Mobile", progreso: 90, estado: "En curso", equipo: "Mobile" },
];

export const recursosCategoria = [
  "Backend",
  "Frontend",
  "DevOps",
  "QA",
  "Mobile",
  "Diseño",
];

export const recursosValores = [28, 22, 18, 12, 11, 9];

// ── Finanzas ─────────────────────────────────────────────────────────────────
export const finanzasKPIs = [
  { label: "Ingresos", value: "$284,500", delta: "+18%", up: true },
  { label: "Gastos", value: "$142,300", delta: "+4%", up: false },
  { label: "Utilidad neta", value: "$142,200", delta: "+34%", up: true },
  { label: "Flujo de caja", value: "$98,400", delta: "+11%", up: true },
];

export const finanzasMensuales = [
  { mes: "Ene", Ingresos: 42000, Gastos: 28000 },
  { mes: "Feb", Ingresos: 38000, Gastos: 25000 },
  { mes: "Mar", Ingresos: 51000, Gastos: 31000 },
  { mes: "Abr", Ingresos: 47000, Gastos: 29000 },
  { mes: "May", Ingresos: 58000, Gastos: 33000 },
  { mes: "Jun", Ingresos: 62000, Gastos: 35000 },
  { mes: "Jul", Ingresos: 54000, Gastos: 30000 },
  { mes: "Ago", Ingresos: 71000, Gastos: 38000 },
];

// ── Reportes ─────────────────────────────────────────────────────────────────
export const reportesTabla = [
  { id: "RPT-001", nombre: "Informe Q2 2025", tipo: "Trimestral", estado: "Aprobado", fecha: "2025-06-30", autor: "Ana García" },
  { id: "RPT-002", nombre: "Análisis de Ventas Mayo", tipo: "Mensual", estado: "Revisión", fecha: "2025-05-31", autor: "Luis Mora" },
  { id: "RPT-003", nombre: "KPIs Semana 28", tipo: "Semanal", estado: "Aprobado", fecha: "2025-07-14", autor: "María López" },
  { id: "RPT-004", nombre: "Forecast Q3", tipo: "Proyección", estado: "Borrador", fecha: "2025-07-01", autor: "Carlos Ruiz" },
  { id: "RPT-005", nombre: "Auditoría Financiera", tipo: "Anual", estado: "Aprobado", fecha: "2025-01-15", autor: "Sofia Chen" },
  { id: "RPT-006", nombre: "Satisfacción del Cliente", tipo: "Mensual", estado: "Revisión", fecha: "2025-07-08", autor: "Pedro Vega" },
  { id: "RPT-007", nombre: "Performance Infraestructura", tipo: "Semanal", estado: "Aprobado", fecha: "2025-07-10", autor: "Ana García" },
];

export const reportesCategorias = [
  { name: "Aprobado", value: 4 },
  { name: "Revisión", value: 2 },
  { name: "Borrador", value: 1 },
];

export const reportesTopAutores = [
  { name: "Ana García", value: 12 },
  { name: "Luis Mora", value: 9 },
  { name: "María López", value: 8 },
  { name: "Carlos Ruiz", value: 6 },
  { name: "Sofia Chen", value: 5 },
];
