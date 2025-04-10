
import { CryptoLabel } from "@/abstracts/portfolio/interfaces";
import { Button } from "../../ui/button";

import { ScrollArea } from "../../ui/scroll-area";
import { CryptoLabelsAttributes } from "@/data/crypto-info";
import { useSidebarCollapsedContext } from "@/hooks/sidebar-context";
import { useTimeRangeContext } from "@/hooks/time-range-context";



export const CryptoLabels = () => {
  const {isSidebarCollapsed} = useSidebarCollapsedContext()
  const {selectedCrypto, setSelectedCrypto} = useTimeRangeContext()

  return (
    <ScrollArea className={` rounded-md border border-[#F0E7A1]/20 ${isSidebarCollapsed? "h-180 w-20": "h-100"}`}>
      <div className="flex flex-col gap-2 mt-4">
        
        {CryptoLabelsAttributes.slice().sort((a: CryptoLabel,b: CryptoLabel)=>
          b.value - a.value).map((crypto: CryptoLabel) => (

              <Button
                key={crypto.symbol}
                variant={selectedCrypto === crypto.symbol ? "default" : "ghost"}
                className={`
                  ${isSidebarCollapsed ? 'justify-center px10' : 'justify-between px-4'} 
                  text-[#F0E7A1] hover:text-white
                  ${selectedCrypto === crypto.symbol ? 'bg-[#F0E7A1]/20' : ''}
                  h-10
                  !bg-black hover:!bg-[#F0E7A1]/20
                  whitespace-nowrap
                  
                `}
                onClick={() => setSelectedCrypto(crypto.symbol)}
              >
                {isSidebarCollapsed ? (
                  <span>{crypto.symbol}</span>
                  ) : (
                  <div className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-2">
                      <span>{crypto.symbol}</span>
                      <span className="text-sm text-[#F0E7A1]/60">{crypto.name}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span>{Math.round(crypto.value)}</span>
                      <span className={crypto.change >= 0 ? "text-green-500" : "text-red-500"}>
                        {crypto.change >= 0 ? "+" : ""}{crypto.change.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                )}
              </Button>
          ))}
      </div>
    </ScrollArea>
  )
}

export default CryptoLabels;

