

import { SidebaCollapsedContextType } from "@/abstracts/portfolio/types";
import { useState, createContext, useContext } from "react";



const maxSize = 20
const minSize = 9

export const SidebarCollapsedContext = createContext<SidebaCollapsedContextType | undefined>(undefined);

export const SidebarCollapsedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
    const [panelWidth, setPanelWidth] = useState(maxSize)
    const [key, setKey] = useState(0); // Used to force remount
    const handleToggleCollapse = () => {
        setPanelWidth(panelWidth => panelWidth > minSize ? minSize : maxSize);
        setKey(prev => prev + 1); // Force remount to apply new defaultSize
     };

    const values = {
        isSidebarCollapsed, 
        setIsSidebarCollapsed,
        panelWidth, 
        setPanelWidth,
        key,
        setKey,
        handleToggleCollapse
    }

    return (
        <SidebarCollapsedContext.Provider value={values}>
            {children}
        </SidebarCollapsedContext.Provider>
    );
  }; 


export const useSidebarCollapsedContext = () => {
    const context = useContext(SidebarCollapsedContext);
    if (!context) {
        throw new Error("useSidebarCollapsedContext must be used within a SidebarCollapsedProvider");
    }
    return context;
};