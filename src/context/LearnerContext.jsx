import { createContext, useContext } from "react";

export const LearnerContext = createContext(null);

export function useLearner() {
  const ctx = useContext(LearnerContext);
  if (!ctx) throw new Error("useLearner must be used inside LearnerProvider");
  return ctx;
}