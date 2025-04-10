import React from "react";

interface MarketOverviewProps {
  price: string;
  marketCap: string;
  volume: string;
  liquidity: string;
}

const MarketOverview: React.FC<MarketOverviewProps> = ({
  price,
  marketCap,
  volume,
  liquidity,
}) => {
  return (
    <div className="bg-black border-[#F0E7A1]/20 p-6 rounded-md">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-[#F0E7A1]">
          <p className="text-sm opacity-70">Bitcoin</p>
          <p className="text-2xl font-bold">{price}</p>
        </div>
        <div className="text-[#F0E7A1]">
          <p className="text-sm opacity-70">Market Cap</p>
          <p className="text-2xl font-bold">{marketCap}</p>
        </div>
        <div className="text-[#F0E7A1]">
          <p className="text-sm opacity-70">Volume</p>
          <p className="text-2xl font-bold">{volume}</p>
        </div>
        <div className="text-[#F0E7A1]">
          <p className="text-sm opacity-70">Liquidity</p>
          <p className="text-2xl font-bold">{liquidity}</p>
        </div>
      </div>
    </div>
  );
};

export default MarketOverview;
