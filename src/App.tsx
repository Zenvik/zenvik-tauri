import "./App.css";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import LoginPage from "@/pages/LoginPage";
import PesajeEnPie from "@/pages/dashboards/PesajeEnPie";
import CanalEmpella from "@/pages/dashboards/CanalEmpella";
import CabezaPelo from "@/pages/dashboards/CabezaPelo";
import CascosDesperdicio from "@/pages/dashboards/CascosDesperdicio";
import Decomisos from "@/pages/dashboards/Decomisos";
import PesajeEnFrio from "@/pages/dashboards/PesajeEnFrio";
import type { ReactNode } from "react";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function Dash({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <DashboardLayout>{children}</DashboardLayout>
    </ProtectedRoute>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/dashboard/en-pie"              element={<Dash><PesajeEnPie /></Dash>} />
      <Route path="/dashboard/canal-empella"        element={<Dash><CanalEmpella /></Dash>} />
      <Route path="/dashboard/cabeza-pelo"          element={<Dash><CabezaPelo /></Dash>} />
      <Route path="/dashboard/cascos-desperdicio"   element={<Dash><CascosDesperdicio /></Dash>} />
      <Route path="/dashboard/decomisos"            element={<Dash><Decomisos /></Dash>} />
      <Route path="/dashboard/en-frio"              element={<Dash><PesajeEnFrio /></Dash>} />

      {/* Default dashboard → Etapa 1 */}
      <Route path="/dashboard" element={<Navigate to="/dashboard/en-pie" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
