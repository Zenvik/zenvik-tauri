import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  TrendingUp,
  BarChart3,
  Settings2,
  DollarSign,
  FileText,
  LogOut,
  ChevronRight,
} from "lucide-react";
import type { ReactNode } from "react";

const NAV_ITEMS = [
  { path: "/dashboard/overview",    label: "Overview",      icon: LayoutDashboard, index: 1 },
  { path: "/dashboard/ventas",      label: "Ventas",        icon: TrendingUp,      index: 2 },
  { path: "/dashboard/analytics",   label: "Analytics",     icon: BarChart3,       index: 3 },
  { path: "/dashboard/operaciones", label: "Operaciones",   icon: Settings2,       index: 4 },
  { path: "/dashboard/finanzas",    label: "Finanzas",      icon: DollarSign,      index: 5 },
  { path: "/dashboard/reportes",    label: "Reportes",      icon: FileText,        index: 6 },
];

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const current = NAV_ITEMS.find((item) => location.pathname === item.path);

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
    <div className="flex h-screen overflow-hidden" style={{ background: "#F8FAFC" }}>
      {/* ── Sidebar ── */}
      <aside
        className="w-60 flex flex-col flex-shrink-0 h-full"
        style={{ background: "#0F172A", borderRight: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Brand */}
        <div className="flex items-center gap-3 px-5 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "#10B981" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M3 9L12 3L21 9V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V9Z" fill="white" />
            </svg>
          </div>
          <span className="text-white font-semibold text-base tracking-tight">Zenvik</span>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group"
                style={{
                  background: active ? "rgba(16,185,129,0.12)" : "transparent",
                  color: active ? "#10B981" : "#94A3B8",
                  borderLeft: active ? "2px solid #10B981" : "2px solid transparent",
                }}
              >
                <Icon size={16} />
                <span className="flex-1">{item.label}</span>
                <span
                  className="text-xs font-mono opacity-50"
                  style={{ color: active ? "#10B981" : "#475569" }}
                >
                  {item.index}/6
                </span>
              </Link>
            );
          })}
        </nav>

        {/* User + logout */}
        <div className="px-3 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
              style={{ background: "#F59E0B" }}
            >
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name}</p>
              <p className="text-xs truncate" style={{ color: "#475569" }}>{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm transition-all hover:bg-white/5"
            style={{ color: "#475569" }}
          >
            <LogOut size={14} />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header
          className="flex items-center justify-between px-6 py-4 flex-shrink-0"
          style={{ background: "#ffffff", borderBottom: "1px solid #E2E8F0" }}
        >
          <div className="flex items-center gap-2 text-sm" style={{ color: "#475569" }}>
            <span className="font-medium" style={{ color: "#0F172A" }}>Zenvik</span>
            <ChevronRight size={14} />
            {current && (
              <>
                <span>{current.label}</span>
                <span
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ml-1"
                  style={{ background: "rgba(16,185,129,0.1)", color: "#10B981" }}
                >
                  Vista {current.index} de 6
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm" style={{ color: "#475569" }}>
              Hola,{" "}
              <span className="font-semibold" style={{ color: "#0F172A" }}>
                {user?.name?.split(" ")[0]}
              </span>
            </span>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: "#F59E0B" }}
            >
              {initials}
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
