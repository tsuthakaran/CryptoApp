
import React from "react";
import { TimeRangeToggle } from "./time-range-toggle";
import { PortfolioPriceGraph } from "./price-graph";




export const MainContent: React.FC = () => {
    return (
        <div className="bg-black ml-[2%]">
          <div className="flex w-full h-screen flex-col">
            <PortfolioPriceGraph />
            <TimeRangeToggle />
          </div>
        </div>
    )
  }