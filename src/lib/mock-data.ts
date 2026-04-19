// ── Lote activo (compartido entre todas las vistas) ──────────────────────────
export const loteActivo = {
  id: "LOT-2026-089",
  fecha: "2026-04-18",
  hora: "06:15",
  proveedor: "Granja El Rosal",
  responsable: "Carlos Méndez",
  totalAnimales: 48,
  estado: "En proceso",
  municipio: "Montería",
  guia: "GTS-2026-0421",
};

// ── Etapa 1 · Pesaje en Pie ───────────────────────────────────────────────────
export const pieResumen = {
  totalBruto: 6_816.5,   // kg
  totalAnimales: 48,
  promedio: 142.0,       // kg/animal
  pesoMin: 118.5,
  pesoMax: 169.0,
  basculasActivas: 2,
};

export const pieRegistros = [
  { hora: "06:18", bascula: "B-01", animales: 10, pesoKg: 1_380.0, operador: "J. Pérez" },
  { hora: "06:27", bascula: "B-02", animales: 10, pesoKg: 1_425.0, operador: "M. Torres" },
  { hora: "06:39", bascula: "B-01", animales: 8,  pesoKg: 1_104.0, operador: "J. Pérez" },
  { hora: "06:51", bascula: "B-02", animales: 10, pesoKg: 1_460.0, operador: "M. Torres" },
  { hora: "07:02", bascula: "B-01", animales: 10, pesoKg: 1_447.5, operador: "J. Pérez" },
];

export const pieDistribucion = [
  { rango: "100–119 kg", animales: 4 },
  { rango: "120–129 kg", animales: 8 },
  { rango: "130–139 kg", animales: 11 },
  { rango: "140–149 kg", animales: 13 },
  { rango: "150–159 kg", animales: 8 },
  { rango: "160–169 kg", animales: 4 },
];

// ── Etapa 2.1 · Canal & Empella ───────────────────────────────────────────────
export const canalResumen = {
  totalCanal: 4_982.5,   // kg
  totalEmpella: 648.0,   // kg
  unidades: 48,
  rendimiento: 73.1,     // % respecto al peso en pie
};

export const canalRegistros = [
  { id: "C-001", canal: 101.5, empella: 13.2, operador: "R. Suárez", hora: "08:04" },
  { id: "C-002", canal: 105.0, empella: 14.0, operador: "R. Suárez", hora: "08:09" },
  { id: "C-003", canal: 98.5,  empella: 12.8, operador: "L. Gómez",  hora: "08:14" },
  { id: "C-004", canal: 110.0, empella: 15.1, operador: "L. Gómez",  hora: "08:19" },
  { id: "C-005", canal: 103.5, empella: 13.5, operador: "R. Suárez", hora: "08:24" },
  { id: "C-006", canal: 107.0, empella: 14.8, operador: "R. Suárez", hora: "08:29" },
];

export const canalVsEmpella = [
  { canal: "C-001", Canal: 101.5, Empella: 13.2 },
  { canal: "C-002", Canal: 105.0, Empella: 14.0 },
  { canal: "C-003", Canal: 98.5,  Empella: 12.8 },
  { canal: "C-004", Canal: 110.0, Empella: 15.1 },
  { canal: "C-005", Canal: 103.5, Empella: 13.5 },
  { canal: "C-006", Canal: 107.0, Empella: 14.8 },
];

// ── Etapa 2.2 · Cabeza & Pelo ─────────────────────────────────────────────────
export const cabezaResumen = {
  totalCabeza: 518.4,  // kg
  totalPelo: 92.5,     // kg
  unidades: 48,
  promCabeza: 10.8,    // kg/animal
  promPelo: 1.9,       // kg/animal
};

export const cabezaRegistros = [
  { id: "CH-001", cabeza: 10.5, pelo: 1.8, hora: "08:06", operador: "D. Ríos" },
  { id: "CH-002", cabeza: 11.2, pelo: 2.0, hora: "08:11", operador: "D. Ríos" },
  { id: "CH-003", cabeza: 10.0, pelo: 1.7, hora: "08:16", operador: "A. Mora" },
  { id: "CH-004", cabeza: 11.8, pelo: 2.1, hora: "08:21", operador: "A. Mora" },
  { id: "CH-005", cabeza: 10.9, pelo: 1.9, hora: "08:26", operador: "D. Ríos" },
];

export const cabezaPorHora = [
  { name: "06:00–07:00", value: 78.5 },
  { name: "07:00–08:00", value: 124.8 },
  { name: "08:00–09:00", value: 168.4 },
  { name: "09:00–10:00", value: 146.7 },
];

// ── Etapa 2.3 · Cascos & Desperdicio ─────────────────────────────────────────
export const cascosResumen = {
  totalCascos: 124.8,      // kg
  totalDesperdicio: 312.4, // kg
  unidades: 48,
  pctDesperdicio: 4.58,    // % del peso en pie
};

export const tiposDesperdicio = [
  { name: "Contenido gástrico", value: 148.2 },
  { name: "Pulmones decomiso", value: 62.4 },
  { name: "Sangre / líquidos", value: 58.8 },
  { name: "Otros residuos",     value: 43.0 },
];

export const cascosRegistros = [
  { id: "CK-001", cascos: 2.5, desperdicio: 6.8, tipo: "Gástrico", hora: "08:08" },
  { id: "CK-002", cascos: 2.6, desperdicio: 7.2, tipo: "Gástrico", hora: "08:13" },
  { id: "CK-003", cascos: 2.4, desperdicio: 6.1, tipo: "Pulmones", hora: "08:18" },
  { id: "CK-004", cascos: 2.7, desperdicio: 7.5, tipo: "Sangre",   hora: "08:23" },
  { id: "CK-005", cascos: 2.5, desperdicio: 6.4, tipo: "Gástrico", hora: "08:28" },
];

// ── Etapa 2.4 · Decomisos ────────────────────────────────────────────────────
export const decomisosResumen = {
  totalKg: 18.4,
  totalItems: 6,
  pctLote: 0.27,     // % del peso en pie
  alerta: false,
};

export const decomisosRegistros = [
  { id: "DEC-001", canal: "C-007", parte: "Pulmón derecho", causa: "Neumonía", inspector: "INVIMA-03", kg: 3.2, hora: "08:22" },
  { id: "DEC-002", canal: "C-012", parte: "Hígado",         causa: "Parasiticis", inspector: "INVIMA-03", kg: 2.8, hora: "08:35" },
  { id: "DEC-003", canal: "C-019", parte: "Pulmón bilateral",causa: "Neumonía", inspector: "INVIMA-01", kg: 4.5, hora: "08:48" },
  { id: "DEC-004", canal: "C-024", parte: "Riñón izq.",     causa: "Nefritis",  inspector: "INVIMA-01", kg: 1.4, hora: "09:01" },
  { id: "DEC-005", canal: "C-031", parte: "Hígado parcial", causa: "Absceso",   inspector: "INVIMA-03", kg: 2.1, hora: "09:14" },
  { id: "DEC-006", canal: "C-038", parte: "Corazón",        causa: "Lesión",    inspector: "INVIMA-01", kg: 4.4, hora: "09:27" },
];

export const decomisoPorCausa = [
  { name: "Neumonía",    value: 7.7 },
  { name: "Parasiticis", value: 2.8 },
  { name: "Absceso",     value: 2.1 },
  { name: "Nefritis",    value: 1.4 },
  { name: "Lesión",      value: 4.4 },
];

// ── Etapa 3 · Pesaje en Frío ─────────────────────────────────────────────────
export const frioResumen = {
  // Caliente (referencia)
  canalCaliente: 4_982.5,
  empellaCaliente: 648.0,
  cabezaCaliente: 518.4,
  // Frío (post-reposo)
  canalFrio: 4_742.5,
  empellaFrio: 624.0,
  cabezaFrio: 502.8,
  // Merma
  mermaCanalKg: 240.0,
  mermaCanalPct: 4.82,
  mermaEmpellaPct: 3.70,
  mermaCabezaPct: 3.01,
};

export const mermaPorComponente = [
  { componente: "Canal",   Caliente: 4982.5, Frío: 4742.5 },
  { componente: "Empella", Caliente: 648.0,  Frío: 624.0  },
  { componente: "Cabeza",  Caliente: 518.4,  Frío: 502.8  },
];

export const frioRegistros = [
  { id: "F-001", canalRef: "C-001", canalFrio: 95.8,empellaFrio: 12.6, cabezaFrio: 10.1, hora: "14:08", operador: "P. Reyes" },
  { id: "F-002", canalRef: "C-002", canalFrio: 99.8,empellaFrio: 13.2, cabezaFrio: 10.8, hora: "14:12", operador: "P. Reyes" },
  { id: "F-003", canalRef: "C-003", canalFrio: 93.5,empellaFrio: 12.1, cabezaFrio: 9.7,  hora: "14:17", operador: "G. Soto"  },
  { id: "F-004", canalRef: "C-004", canalFrio: 104.3,empellaFrio: 14.3, cabezaFrio: 11.4, hora: "14:22", operador: "G. Soto"  },
  { id: "F-005", canalRef: "C-005", canalFrio: 98.3,empellaFrio: 12.8, cabezaFrio: 10.5, hora: "14:27", operador: "P. Reyes" },
];
