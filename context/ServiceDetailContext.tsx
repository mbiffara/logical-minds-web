"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type ServiceView = "productDev" | "uxDesign" | "fullstack" | "qa" | "cloud" | "aiIntegration";

interface ServiceDetailContextType {
  activeService: ServiceView | null;
  openServiceDetail: (view: ServiceView) => void;
  closeServiceDetail: () => void;
}

const ServiceDetailContext = createContext<ServiceDetailContextType | undefined>(undefined);

export function ServiceDetailProvider({ children }: { children: ReactNode }) {
  const [activeService, setActiveService] = useState<ServiceView | null>(null);

  const openServiceDetail = useCallback((view: ServiceView) => setActiveService(view), []);
  const closeServiceDetail = useCallback(() => setActiveService(null), []);

  return (
    <ServiceDetailContext.Provider value={{ activeService, openServiceDetail, closeServiceDetail }}>
      {children}
    </ServiceDetailContext.Provider>
  );
}

export function useServiceDetail() {
  const context = useContext(ServiceDetailContext);
  if (!context) {
    throw new Error("useServiceDetail must be used within a ServiceDetailProvider");
  }
  return context;
}
