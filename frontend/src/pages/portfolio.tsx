
import NavBarPortfolio from "@/components/bryan-portfolio/navbar"
import PortfolioSideBar from "@/components/bryan-portfolio/sidebar/sidebar"
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { MainContent } from "@/components/bryan-portfolio/main/main-content"
import { useSidebarCollapsedContext } from "@/hooks/sidebar-context"





export default function Portfolio() {
    const minSize = 9
    const maxSize = 20
    const {
        key,
        panelWidth,
        setIsSidebarCollapsed, 
        setPanelWidth,
    } = useSidebarCollapsedContext()

    return (
        <div className="flex flex-col h-full bg-black">
            <NavBarPortfolio />
            <div className="flex-1">
                <ResizablePanelGroup
                    direction="horizontal"
                    
                >
                    <ResizablePanel
                        key={key} // Force remount when key changes
                        defaultSize={panelWidth} // Initial size (updated on remount)
                        minSize={minSize}
                        maxSize={maxSize}
                        className="bg-black"
                        onResize={(size) => {
                            setPanelWidth(panelWidth); // Sync state with user resizing
                            setIsSidebarCollapsed(size <= 10);
                        }}
                    >
                        <PortfolioSideBar />
                    </ResizablePanel>
                    <ResizablePanel className="bg-black">
                        <MainContent />
                    </ResizablePanel>
                    
                </ResizablePanelGroup>
            </div>
        </div>
    )
}