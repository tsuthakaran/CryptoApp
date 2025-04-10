import React from "react"
import { PieChart } from "lucide-react"
import { CryptoLabelsAttributes } from "@/data/crypto-info"
import { PortfolioPieChart } from "./pie-chart"
import { CryptoLabels } from "./crypto-labels"
import { useSidebarCollapsedContext } from "@/hooks/sidebar-context"
import { useTimeRangeContext } from "@/hooks/time-range-context"


const PortfolioSideBar: React.FC = () => {

    const { isSidebarCollapsed } = useSidebarCollapsedContext()
    const { setSelectedCrypto } = useTimeRangeContext()

    const totals = {totalCryptoValue: 0, totalCryptoChange: 0}
    for (let i = 0; i < CryptoLabelsAttributes.length; i++) {
        totals.totalCryptoValue += CryptoLabelsAttributes[i].value
        totals.totalCryptoChange += CryptoLabelsAttributes[i].change
    }
    
    return (
        <div className="bg-black text-[#F0E7A1] p-4 flex flex-col">
            <div 
                className={`bg-black border border-[#F0E7A1]/20 hover:bg-[#F0E7A1]/20 rounded-lg ${isSidebarCollapsed ? 'p-4 flex items-center justify-center' : 'p-2'} cursor-pointer hover:-translate-y-3 transition duration-300`}
                onClick={() => setSelectedCrypto('TOTAL')}
            >
                {isSidebarCollapsed ? (
                        <PieChart className="h-8 w-8 text-[#F0E7A1]" />

                ) : (
                    <>
                        <PortfolioPieChart />
                        <div className="flex justify-between text-xl text-[#F0E7A1] mt-4 px-2 ">
                            <div>${Math.round(totals.totalCryptoValue)}</div>
                            <div>
                                {totals.totalCryptoChange > 0 ? (
                                    <span className="text-green-500">+{Math.round(totals.totalCryptoChange)}%</span>
                                ) : (
                                    <span className="text-red-500">{Math.round(totals.totalCryptoChange)}%</span>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className="flex flex-col gap-2 mt-4 items-center hover:-translate-y-3 transition duration-300">
              <CryptoLabels />
            </div>
        </div>
    )
}

export default PortfolioSideBar; 