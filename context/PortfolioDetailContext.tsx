"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type ProjectView = "neuralCommerce" | "mediScan" | "autoFlow" | "dataPulse" | "designForge" | "qualityShield";

interface PortfolioDetailContextType {
  activeProject: ProjectView | null;
  openPortfolioDetail: (view: ProjectView) => void;
  closePortfolioDetail: () => void;
}

const PortfolioDetailContext = createContext<PortfolioDetailContextType | undefined>(undefined);

export function PortfolioDetailProvider({ children }: { children: ReactNode }) {
  const [activeProject, setActiveProject] = useState<ProjectView | null>(null);

  const openPortfolioDetail = useCallback((view: ProjectView) => setActiveProject(view), []);
  const closePortfolioDetail = useCallback(() => setActiveProject(null), []);

  return (
    <PortfolioDetailContext.Provider value={{ activeProject, openPortfolioDetail, closePortfolioDetail }}>
      {children}
    </PortfolioDetailContext.Provider>
  );
}

export function usePortfolioDetail() {
  const context = useContext(PortfolioDetailContext);
  if (!context) {
    throw new Error("usePortfolioDetail must be used within a PortfolioDetailProvider");
  }
  return context;
}
