import React, { createContext, useContext, useState } from "react";
type LayoutType = "Vertical" | "Horizontal";
interface LayoutContextProps {
  layout: LayoutType;
  setLayout: (layout: LayoutType) => void;
}
const LayoutContext = createContext<LayoutContextProps | undefined>(undefined);
export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [layout, setLayoutState] = useState<LayoutType>(
    (localStorage.getItem("layout") as LayoutType) || "Vertical",
  );
  const setLayout = (newLayout: LayoutType) => {
    setLayoutState(newLayout);
    localStorage.setItem("layout", newLayout);
  };
  return (
    <LayoutContext.Provider value={{ layout, setLayout }}>
      {" "}
      {children}{" "}
    </LayoutContext.Provider>
  );
};
export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) throw new Error("useLayout must be used within LayoutProvider");
  return context;
};
