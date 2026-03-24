"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type AgentView = "specializedAgents" | "orchestration" | "ecosystem";

interface AgentDetailContextType {
  activeView: AgentView | null;
  openAgentDetail: (view: AgentView) => void;
  closeAgentDetail: () => void;
}

const AgentDetailContext = createContext<AgentDetailContextType | undefined>(undefined);

export function AgentDetailProvider({ children }: { children: ReactNode }) {
  const [activeView, setActiveView] = useState<AgentView | null>(null);

  const openAgentDetail = useCallback((view: AgentView) => setActiveView(view), []);
  const closeAgentDetail = useCallback(() => setActiveView(null), []);

  return (
    <AgentDetailContext.Provider value={{ activeView, openAgentDetail, closeAgentDetail }}>
      {children}
    </AgentDetailContext.Provider>
  );
}

export function useAgentDetail() {
  const context = useContext(AgentDetailContext);
  if (!context) {
    throw new Error("useAgentDetail must be used within an AgentDetailProvider");
  }
  return context;
}
