import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  Scale,
  Flame,
  Snowflake,
  LogOut,
  ChevronRight,
  Wifi,
  Package,
} from "lucide-react";
import type { ReactNode } from "react";
import { loteActivo } from "@/lib/mock-data";

const NAV_GROUPS = [
  {
    label: "RECEPCIÓN",
    etapaColor: "#3B82F6",
    items: [
      { path: "/dashboard/en-pie", label: "Pesaje en Pie", sub: "Etapa 1", icon: Scale, index: 1 },
    ],
  },
  {
    label: "PROCESO CALIENTE",
    etapaColor: "#F59E0B",
    items: [
      { path: "/dashboard/canal-empella",       label: "Canal & Empella",      sub: "Etapa 2.1", icon: Flame, index: 2 },
      { path: "/dashboard/cabeza-pelo",         label: "Cabeza & Pelo",         sub: "Etapa 2.2", icon: Flame, index: 3 },
      { path: "/dashboard/cascos-desperdicio",  label: "Cascos & Desperdicio",  sub: "Etapa 2.3", icon: Flame, index: 4 },
      { path: "/dashboard/decomisos",           label: "Decomisos",             sub: "Etapa 2.4", icon: Flame, index: 5 },
    ],
  },
  {
    label: "DESPACHO",
    etapaColor: "#06B6D4",
    items: [
      { path: "/dashboard/en-frio", label: "Pesaje en Frío", sub: "Etapa 3", icon: Snowflake, index: 6 },
    ],
  },
];

const ALL_ITEMS = NAV_GROUPS.flatMap((g) => g.items);

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const current = ALL_ITEMS.find((item) => location.pathname === item.path);
  const currentGroup = NAV_GROUPS.find((g) =>
    g.items.some((i) => i.path === location.pathname)
  );

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initials = user?.name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase() ?? "U";

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#F1F5F9" }}>
      {/* ── Sidebar ── */}
      <aside
        className="w-56 flex flex-col flex-shrink-0 h-full"
        style={{ background: "#0F172A" }}
      >
        {/* Brand */}
        <div
          className="flex items-center gap-2.5 px-4 py-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "#10B981" }}
          >
            <Scale size={14} color="white" strokeWidth={2.5} />
          </div>
          <div>
            <div className="text-white text-sm font-bold leading-none">Zenvik</div>
            <div className="text-xs mt-0.5" style={{ color: "#475569" }}>
              Porcinos · Trazabilidad
            </div>
          </div>
        </div>

        {/* Lote activo */}
        <div
          className="mx-3 mt-3 rounded-lg px-3 py-2.5"
          style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <Package size={10} style={{ color: "#10B981" }} />
            <span className="text-xs font-semibold" style={{ color: "#10B981" }}>
              LOTE ACTIVO
            </span>
          </div>
          <div className="text-white text-xs font-mono font-bold">{loteActivo.id}</div>
          <div className="text-xs mt-0.5 truncate" style={{ color: "#64748B" }}>
            {loteActivo.proveedor}
          </div>
          <div className="flex items-center gap-1 mt-1">
            <span
              className="text-xs font-semibold"
              style={{ color: "#F59E0B" }}
            >
              {loteActivo.totalAnimales} cerdos
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-3 overflow-y-auto space-y-4">
          {NAV_GROUPS.map((group) => (
            <div key={group.label}>
              <div
                className="px-2 pb-1.5 text-xs font-bold tracking-widest"
                style={{ color: "#334155" }}
              >
                {group.label}
              </div>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all"
                      style={{
                        background: active
                          ? `${group.etapaColor}18`
                          : "transparent",
                        color: active ? group.etapaColor : "#64748B",
                        borderLeft: active
                          ? `2px solid ${group.etapaColor}`
                          : "2px solid transparent",
                      }}
                    >
                      <Icon size={13} strokeWidth={2} />
                      <span className="flex-1 text-xs font-medium leading-tight">
                        {item.label}
                      </span>
                      <span
                        className="text-xs font-mono opacity-60"
                        style={{ fontSize: "10px" }}
                      >
                        {item.index}/6
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User */}
        <div
          className="px-3 pb-4 pt-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-2 px-2 py-1.5 mb-1">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
              style={{ background: "#F59E0B" }}
            >
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">{user?.name}</p>
              <p className="text-xs truncate" style={{ color: "#475569", fontSize: "10px" }}>
                {user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-2 py-1.5 rounded-lg text-xs transition-all hover:bg-white/5"
            style={{ color: "#475569" }}
          >
            <LogOut size={12} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header
          className="flex items-center justify-between px-6 py-3 flex-shrink-0"
          style={{ background: "#ffffff", borderBottom: "1px solid #E2E8F0" }}
        >
          {/* Breadcrumb + stage badge */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs" style={{ color: "#94A3B8" }}>
              <span className="font-semibold" style={{ color: "#0F172A" }}>
                Sistema Porcino
              </span>
              <ChevronRight size={12} />
              {currentGroup && (
                <span style={{ color: "#64748B" }}>{currentGroup.label}</span>
              )}
              <ChevronRight size={12} />
              {current && (
                <span className="font-semibold" style={{ color: "#0F172A" }}>
                  {current.label}
                </span>
              )}
            </div>
            {current && (
              <span
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ml-1"
                style={{
                  background: `${currentGroup?.etapaColor}15`,
                  color: currentGroup?.etapaColor,
                }}
              >
                Vista {current.index} / 6
              </span>
            )}
          </div>

          {/* Right side: MQTT + user */}
          <div className="flex items-center gap-4">
            {/* MQTT status */}
            <div className="flex items-center gap-1.5">
              <div className="relative">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: "#10B981" }}
                />
                <div
                  className="w-2 h-2 rounded-full absolute inset-0 animate-ping opacity-60"
                  style={{ background: "#10B981" }}
                />
              </div>
              <Wifi size={12} style={{ color: "#10B981" }} />
              <span className="text-xs font-semibold" style={{ color: "#10B981" }}>
                MQTT · Conectado
              </span>
            </div>

            <div
              className="h-4 w-px"
              style={{ background: "#E2E8F0" }}
            />

            {/* Lot pill */}
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
              style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}
            >
              <Package size={11} style={{ color: "#475569" }} />
              <span className="text-xs font-mono font-semibold" style={{ color: "#0F172A" }}>
                {loteActivo.id}
              </span>
              <span className="text-xs" style={{ color: "#94A3B8" }}>
                · {loteActivo.totalAnimales} cerdos
              </span>
            </div>

            <div
              className="h-4 w-px"
              style={{ background: "#E2E8F0" }}
            />

            {/* User */}
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: "#64748B" }}>
                {user?.name?.split(" ")[0]}
              </span>
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ background: "#F59E0B" }}
              >
                {initials}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
