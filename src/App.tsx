import "./App.css";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import LoginPage from "@/pages/LoginPage";
import OverviewDashboard from "@/pages/dashboards/OverviewDashboard";
import SalesDashboard from "@/pages/dashboards/SalesDashboard";
import AnalyticsDashboard from "@/pages/dashboards/AnalyticsDashboard";
import OperacionesDashboard from "@/pages/dashboards/OperacionesDashboard";
import FinanzasDashboard from "@/pages/dashboards/FinanzasDashboard";
import ReportesDashboard from "@/pages/dashboards/ReportesDashboard";
import type { ReactNode } from "react";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/dashboard/overview"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <OverviewDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/ventas"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <SalesDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/analytics"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <AnalyticsDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/operaciones"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <OperacionesDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/finanzas"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <FinanzasDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/reportes"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ReportesDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

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
