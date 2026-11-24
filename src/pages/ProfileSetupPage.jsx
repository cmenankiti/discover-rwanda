import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLearner } from "../context/LearnerContext";
import FlagEmblem from "../components/FlagEmblem";

const GOALS = [
  "Smooth campus & social adjustment",
  "Learn everyday Kinyarwanda greetings",
  "Understand Rwandan culture & etiquette",
  "Complete full student orientation",
];

function EyeIcon({ visible }) {
  return visible ? (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export default function ProfileSetupPage() {
  const {
    learner,
    pendingAuth,
    requestVerificationCode,
    verifyAndCompleteAuth,
    cancelPendingAuth,
  } = useLearner();
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [goal, setGoal] = useState(GOALS[0]);
  const [codeInput, setCodeInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (learner.isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [learner.isAuthenticated, navigate]);

  const handleCredentialSubmit = (e) => {
    e.preventDefault();
    const res = requestVerificationCode({ mode, username, email, password, goal });
    if (!res.ok) {
      setError(res.error);
      return;
    }
    setCodeInput("");
    setError("");
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    const res = verifyAndCompleteAuth(codeInput);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    setError("");
    navigate("/dashboard");
  };

  const handleResendCode = () => {
    if (!pendingAuth) return;
    const res = requestVerificationCode({
      mode: pendingAuth.mode,
      username: pendingAuth.username,
      email: pendingAuth.email,
      password: pendingAuth.password,
      goal: pendingAuth.goal,
    });
    if (res.ok) {
      setCodeInput("");
      setError("");
    }
  };

  return (
    <main className="auth-stage">
      <div className="container auth-layout">
        <section className="auth-intro">
          <p className="auth-tag">/ ACCOUNT ACCESS</p>
          <h1>
            Muraho. Step into
            <br />
            <span>Rwanda</span> with clarity.
          </h1>
          <p className="auth-desc">
            Sign in with your account or create a new one, verify with a 6-digit
            code, and track your orientation modules and badges.
          </p>

          <div className="auth-orb-preview">
            <FlagEmblem variant="hero" activeIndex={mode === "signup" ? 1 : 0} />
          </div>

          <Link to="/" className="auth-home-link">
            ← Return to Home
          </Link>
        </section>

        <section className="auth-panel" aria-labelledby="auth-form-title">
          {!pendingAuth ? (
            <>
              <div className="auth-tabs" role="tablist" aria-label="Sign up or log in">
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === "login"}
                  className={`auth-tab ${mode === "login" ? "active" : ""}`}
                  onClick={() => {
                    setMode("login");
                    setError("");
                  }}
                >
                  Log In
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === "signup"}
                  className={`auth-tab ${mode === "signup" ? "active" : ""}`}
                  onClick={() => {
                    setMode("signup");
                    setError("");
                  }}
                >
                  Sign Up
                </button>
              </div>

              <h2 id="auth-form-title">
                {mode === "login" ? "Welcome back" : "Create your account"}
              </h2>
              {mode === "signup" && (
                <p className="auth-panel-sub">
                  Choose a username, email address, password, and primary orientation goal.
                </p>
              )}

              <form onSubmit={handleCredentialSubmit} className="auth-form-fields" noValidate>
                <div className="auth-input-group">
                  <label htmlFor="auth-username">Username</label>
                  <input
                    id="auth-username"
                    type="text"
                    placeholder="e.g., chigo_kigali"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                    required
                  />
                </div>

                <div className="auth-input-group">
                  <label htmlFor="auth-email">Email address</label>
                  <input
                    id="auth-email"
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="auth-input-group">
                  <label htmlFor="auth-password">Password</label>
                  <div className="password-input-wrap">
                    <input
                      id="auth-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete={mode === "signup" ? "new-password" : "current-password"}
                      required
                    />
                    <button
                      type="button"
                      className="password-eye-btn"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      aria-pressed={showPassword}
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      <EyeIcon visible={showPassword} />
                    </button>
                  </div>
                </div>

                {mode === "signup" && (
                  <div className="auth-input-group">
                    <label htmlFor="auth-goal">Orientation Goal</label>
                    <select
                      id="auth-goal"
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                    >
                      {GOALS.map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {error && (
                  <p className="auth-error" role="alert">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="btn-pill btn-pill-yellow btn-pill-lg btn-full"
                >
                  {mode === "login" ? "Log In" : "Sign Up"}
                </button>
              </form>
            </>
          ) : (
            <>
              <p className="auth-tag">/ VERIFICATION REQUIRED</p>
              <h2 id="auth-form-title">Enter verification code</h2>
              <p className="auth-panel-sub">
                Credentials confirmed for <strong>{pendingAuth.email}</strong>. Enter your 6-digit code below.
              </p>

              <div className="verify-code-box" role="status">
                <span>Local Demo Code:</span>
                <strong>{pendingAuth.code}</strong>
              </div>

              <form onSubmit={handleVerifyCode} className="auth-form-fields" noValidate>
                <div className="auth-input-group">
                  <label htmlFor="auth-otp">6-Digit Verification Code</label>
                  <input
                    id="auth-otp"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="000000"
                    value={codeInput}
                    onChange={(e) => setCodeInput(e.target.value)}
                    required
                  />
                </div>

                {error && (
                  <p className="auth-error" role="alert">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="btn-pill btn-pill-yellow btn-pill-lg btn-full"
                >
                  {pendingAuth.mode === "signup"
                    ? "Verify & Create Account"
                    : "Verify & Log In"}
                </button>

                <div className="verify-secondary-actions">
                  <button
                    type="button"
                    className="btn-pill btn-pill-ghost btn-pill-sm"
                    onClick={handleResendCode}
                  >
                    Resend Code
                  </button>
                  <button
                    type="button"
                    className="btn-pill btn-pill-ghost btn-pill-sm"
                    onClick={() => {
                      cancelPendingAuth();
                      setError("");
                    }}
                  >
                    Change Details
                  </button>
                </div>
              </form>
            </>
          )}
        </section>
      </div>
    </main>
  );
}