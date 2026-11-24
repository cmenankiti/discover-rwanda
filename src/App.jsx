// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LearnerProvider, useLearner } from "./context/LearnerContext";
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
            path="/modules/welcome"
            element={
              <ProtectedRoute>
                <ModuleViewPage
                  moduleId="welcome"
                  title="Welcome to Rwanda"
                  summary="Orientation essentials for arriving students in Kigali."
                  badgeName="Welcome Explorer"
                >
                  <p>
                    Detailed arrival and currency guides will expand in the next module step.
                  </p>
                </ModuleViewPage>
              </ProtectedRoute>
            }
          />
          <Route
            path="/modules/kinyarwanda"
            element={
              <ProtectedRoute>
                <ModuleViewPage
                  moduleId="kinyarwanda"
                  title="Kinyarwanda Starter Pack"
                  summary="Everyday greetings and expressions for campus and city life."
                  badgeName="Muraho Speaker"
                >
                  <p>
                    Interactive phrase cards and audio pronunciation will expand next.
                  </p>
                </ModuleViewPage>
              </ProtectedRoute>
            }
          />
          <Route
            path="/modules/culture"
            element={
              <ProtectedRoute>
                <ModuleViewPage
                  moduleId="culture"
                  title="Culture & Daily Life"
                  summary="Respectful social etiquette and everyday practices in Rwanda."
                  badgeName="Culture Ally"
                >
                  <p>
                    Cultural context cards and etiquette notes will expand next.
                  </p>
                </ModuleViewPage>
              </ProtectedRoute>
            }
          />
          <Route
            path="/modules/history"
            element={
              <ProtectedRoute>
                <ModuleViewPage
                  moduleId="history"
                  title="History & Memory"
                  summary="Sourced historical overview introduced with clear context."
                  badgeName="Reflective Learner"
                >
                  <p>
                    Historical overview sections and content notice will expand next.
                  </p>
                </ModuleViewPage>
              </ProtectedRoute>
            }
          />
          <Route
            path="/modules/scenarios"
            element={
              <ProtectedRoute>
                <ModuleViewPage
                  moduleId="scenarios"
                  title="Student-Life Scenarios & Quizzes"
                  summary="Decision-based student situations with immediate feedback."
                  badgeName="Campus Navigator"
                >
                  <p>
                    Interactive scenarios and module quizzes will expand next.
                  </p>
                </ModuleViewPage>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </LearnerProvider>
  );
}