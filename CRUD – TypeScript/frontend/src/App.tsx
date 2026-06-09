import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Continents from "./pages/Continents";
import Countries from "./pages/Countries";
import Cities from "./pages/Cities";
import RegistrationPanel from "./pages/RegistrationPanel";
// Home removed from root to show Dashboard and Registration separately
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const showSidebar = Boolean(token && location.pathname !== "/login");

  return (
    <div className={showSidebar ? "app-layout" : "app-layout no-sidebar"}>
      {showSidebar && <Sidebar />}
      <main className="app-main">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/continents"
            element={
              <ProtectedRoute>
                <Continents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/countries"
            element={
              <ProtectedRoute>
                <Countries />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cities"
            element={
              <ProtectedRoute>
                <Cities />
              </ProtectedRoute>
            }
          />
          <Route
            path="/registration"
            element={
              <ProtectedRoute>
                <RegistrationPanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={<Navigate to={token ? "/" : "/login"} replace />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
