import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LearnerProvider } from "./context/LearnerProvider";
import { useLearner } from "./context/LearnerContext";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import ProfileSetupPage from "./pages/ProfileSetupPage";
import DashboardPage from "./pages/DashboardPage";
import ModuleViewPage from "./pages/ModuleViewPage";

function ProtectedRoute({ children }) {
  const { learner } = useLearner();
  if (!learner.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  return (
    <LearnerProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<ProfileSetupPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/modules/:moduleId"
            element={
              <ProtectedRoute>
                <ModuleViewPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </LearnerProvider>
  );
}