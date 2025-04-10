import React, { useState } from "react";
import MarketOverview from "./crypto-insights/MarketOverview";
import PriceChart from "./crypto-insights/PriceChart";
import DepthChart from "./crypto-insights/DepthChart";
import TimeRangeSelector from "./crypto-insights/TimeRangeSelector";
import ChartToggle from "./crypto-insights/ChartToggle";
import { CryptoLabelsAttributes } from "@/data/crypto-info";
import NavBarPortfolio from "../bryan-portfolio/navbar";


const CryptoInsights: React.FC = () => {
  
  const bitcoinData = CryptoLabelsAttributes.find((crypto) => crypto.symbol === "BTC");

  const [selectedChart, setSelectedChart] = useState("Price Chart");

  return (
    <div className="flex flex-col h-screen bg-black">
      <NavBarPortfolio />
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-3xl font-bold text-[#F0E7A1] mb-6">
          Crypto Insights
        </h1>

        {bitcoinData ? (
          <MarketOverview
            price={`$${bitcoinData.value.toLocaleString()}`}
            marketCap="$1.669 T"
            volume="$10.283 B"
            liquidity="$1.6740"
          />
        ) : (
          <p className="text-[#F0E7A1]">Loading market data...</p>
        )}

        <div className="bg-black border-[#F0E7A1]/20 p-6 mt-6 rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-[#F0E7A1]">
              {selectedChart === "Price Chart"
                ? "Bitcoin Price History"
                : "BTC Depth Chart"}
            </h2>
            <div className="flex gap-4">
              {selectedChart === "Price Chart" && (
                <TimeRangeSelector />
              )}
              <ChartToggle
                selectedChart={selectedChart}
                onChartChange={setSelectedChart}
              />
            </div>
          </div>
          {selectedChart === "Price Chart" ? (
            <PriceChart />
          ) : (
            <DepthChart />
          )}
        </div>
      </div>
    </div>
  );
};

export default CryptoInsights;
