import { createContext, useContext, useState } from "react";

const PlanContext = createContext();

export function PlanProvider({ children }) {
  // Aquí podrías guardar el plan actual (puede venir de user settings)
  const [activePlan, setActivePlan] = useState("maintain");

  return (
    <PlanContext.Provider value={{ activePlan, setActivePlan }}>
      {children}
    </PlanContext.Provider>
  );
}

export const usePlan = () => useContext(PlanContext);
