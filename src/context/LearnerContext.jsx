import { createContext, useContext, useState, useEffect } from "react";

const ACCOUNTS_KEY = "discover_rwanda_accounts_v1";
const SESSION_KEY = "discover_rwanda_session_v1";

const USERNAME_REGEX = /^[a-zA-Z0-9._-]{3,24}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

const INITIAL_MODULES = [
  {
    id: "welcome",
    title: "Welcome to Rwanda",
    description: "Geography, RWF currency, campus basics, and everyday orientation.",
    route: "/modules/welcome",
    completed: false,
    pointsEarned: 0,
  },
  {
    id: "kinyarwanda",
    title: "Kinyarwanda Starter Pack",
    description: "Essential greetings, polite phrases, usage examples, and pronunciation.",
    route: "/modules/kinyarwanda",
    completed: false,
    pointsEarned: 0,
  },
  {
    id: "culture",
    title: "Culture & Daily Life",
    description: "Social etiquette, community values, food traditions, and daily practices.",
    route: "/modules/culture",
    completed: false,
    pointsEarned: 0,
  },
  {
    id: "history",
    title: "History & Memory",
    description: "Sourced historical overview with a clear pre-entry context note.",
    route: "/modules/history",
    completed: false,
    pointsEarned: 0,
  },
  {
    id: "scenarios",
    title: "Student-Life Scenarios & Quizzes",
    description: "Interactive campus and community decisions with respectful feedback.",
    route: "/modules/scenarios",
    completed: false,
    pointsEarned: 0,
  },
];

function createDefaultProfile(username, email, password, goal) {
  return {
    username,
    email,
    password,
    goal: goal || "Smooth campus & social adjustment",
    points: 0,
    badges: ["First Step"],
    lastVisitedRoute: "/dashboard",
    modules: INITIAL_MODULES,
  };
}

const LearnerContext = createContext(null);

export function LearnerProvider({ children }) {
  const [accounts, setAccounts] = useState(() => {
    try {
      const saved = localStorage.getItem(ACCOUNTS_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [activeUsername, setActiveUsername] = useState(() => {
    try {
      return localStorage.getItem(SESSION_KEY) || "";
    } catch {
      return "";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
    } catch (err) {
      console.error("Failed to save accounts:", err);
    }
  }, [accounts]);

  useEffect(() => {
    try {
      if (activeUsername) {
        localStorage.setItem(SESSION_KEY, activeUsername);
      } else {
        localStorage.removeItem(SESSION_KEY);
      }
    } catch (err) {
      console.error("Failed to save session:", err);
    }
  }, [activeUsername]);

  const rawAccount =
    activeUsername && accounts[activeUsername] ? accounts[activeUsername] : null;

  const learner = rawAccount
    ? {
        ...rawAccount,
        isAuthenticated: true,
      }
    : {
        isAuthenticated: false,
        username: "",
        email: "",
        goal: "Smooth campus & social adjustment",
        points: 0,
        badges: [],
        lastVisitedRoute: "/dashboard",
        modules: INITIAL_MODULES,
      };

  const signUp = ({ username, email, password, goal }) => {
    const cleanUser = (username || "").trim();
    const cleanEmail = (email || "").trim().toLowerCase();

    if (!cleanUser || !cleanEmail || !password) {
      return {
        ok: false,
        error: "Please enter your username, email address, and password.",
      };
    }
    if (!USERNAME_REGEX.test(cleanUser)) {
      return {
        ok: false,
        error:
          "Username must be 3–24 characters using letters, numbers, '.', '_', or '-'.",
      };
    }
    if (!EMAIL_REGEX.test(cleanEmail)) {
      return {
        ok: false,
        error: "Please enter a valid email address (e.g., name@example.com).",
      };
    }
    if (!PASSWORD_REGEX.test(password)) {
      return {
        ok: false,
        error:
          "Password must be at least 6 characters and include at least 1 letter and 1 number.",
      };
    }
    if (accounts[cleanUser]) {
      return {
        ok: false,
        error: "That username already exists. Try logging in instead.",
      };
    }
    const emailTaken = Object.values(accounts).some(
      (acc) => (acc.email || "").toLowerCase() === cleanEmail
    );
    if (emailTaken) {
      return {
        ok: false,
        error: "An account with that email address already exists.",
      };
    }

    const newProfile = createDefaultProfile(
      cleanUser,
      cleanEmail,
      password,
      goal
    );
    setAccounts((prev) => ({ ...prev, [cleanUser]: newProfile }));
    setActiveUsername(cleanUser);
    return { ok: true };
  };

  const signIn = ({ username, email, password }) => {
    const cleanUser = (username || "").trim();
    const cleanEmail = (email || "").trim().toLowerCase();

    if (!password || (!cleanUser && !cleanEmail)) {
      return {
        ok: false,
        error: "Please enter your username or email address and your password.",
      };
    }
    if (cleanUser && !USERNAME_REGEX.test(cleanUser)) {
      return {
        ok: false,
        error: "Please enter a valid username format.",
      };
    }
    if (cleanEmail && !EMAIL_REGEX.test(cleanEmail)) {
      return {
        ok: false,
        error: "Please enter a valid email address format.",
      };
    }
    if (!PASSWORD_REGEX.test(password)) {
      return {
        ok: false,
        error:
          "Password must be at least 6 characters and include at least 1 letter and 1 number.",
      };
    }

    let matchedEntry = null;
    if (cleanUser && accounts[cleanUser]) {
      matchedEntry = accounts[cleanUser];
    } else if (cleanEmail) {
      matchedEntry =
        Object.values(accounts).find(
          (acc) => (acc.email || "").toLowerCase() === cleanEmail
        ) || null;
    }

    if (!matchedEntry || matchedEntry.password !== password) {
      return {
        ok: false,
        error: "Invalid credentials. Please check your details and try again.",
      };
    }

    if (cleanUser && cleanEmail && matchedEntry.email) {
      if (
        matchedEntry.username !== cleanUser ||
        matchedEntry.email.toLowerCase() !== cleanEmail
      ) {
        return {
          ok: false,
          error: "Username and email address do not match the same account.",
        };
      }
    }

    setActiveUsername(matchedEntry.username);
    return { ok: true };
  };

  const signOut = () => {
    setActiveUsername("");
  };

  const resetProgress = () => {
    if (!activeUsername) return;
    setAccounts((prev) => {
      const current = prev[activeUsername];
      if (!current) return prev;
      return {
        ...prev,
        [activeUsername]: createDefaultProfile(
          current.username,
          current.email,
          current.password,
          current.goal
        ),
      };
    });
  };

  const setLastVisitedRoute = (route) => {
    if (!activeUsername) return;
    setAccounts((prev) => {
      const current = prev[activeUsername];
      if (!current || current.lastVisitedRoute === route) return prev;
      return {
        ...prev,
        [activeUsername]: { ...current, lastVisitedRoute: route },
      };
    });
  };

  const completeModule = (moduleId, earnedPoints = 25, badgeName = "") => {
    if (!activeUsername) return;
    setAccounts((prev) => {
      const current = prev[activeUsername];
      if (!current) return prev;

      const target = current.modules.find((m) => m.id === moduleId);
      const alreadyDone = target?.completed;
      const addedPoints = alreadyDone ? 0 : earnedPoints;

      const updatedModules = current.modules.map((m) =>
        m.id === moduleId
          ? {
              ...m,
              completed: true,
              pointsEarned: Math.max(m.pointsEarned, earnedPoints),
            }
          : m
      );

      const nextBadges =
        badgeName && !current.badges.includes(badgeName)
          ? [...current.badges, badgeName]
          : current.badges;

      return {
        ...prev,
        [activeUsername]: {
          ...current,
          points: current.points + addedPoints,
          badges: nextBadges,
          modules: updatedModules,
        },
      };
    });
  };

  return (
    <LearnerContext.Provider
      value={{
        learner,
        signUp,
        signIn,
        signOut,
        resetProgress,
        setLastVisitedRoute,
        completeModule,
      }}
    >
      {children}
    </LearnerContext.Provider>
  );
}

export function useLearner() {
  const ctx = useContext(LearnerContext);
  if (!ctx) throw new Error("useLearner must be used inside LearnerProvider");
  return ctx;
}