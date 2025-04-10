import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const sampleDepthData = {
  bids: [
    { price: 76340, volume: 100 },
    { price: 76600, volume: 300 },
    { price: 76860, volume: 600 },
    { price: 77110, volume: 1000 },
  ],
  asks: [
    { price: 77370, volume: 1000 },
    { price: 77630, volume: 700 },
    { price: 77890, volume: 400 },
    { price: 78150, volume: 100 },
  ],
};

// Generate cumulative data for bids and asks
const generateCumulativeData = (data: { price: number; volume: number }[]) => {
  let cumulativeVolume = 0;
  return data.map((entry) => {
    cumulativeVolume += entry.volume;
    return { ...entry, cumulativeVolume };
  });
};

const DepthChart: React.FC = () => {
  const bids = generateCumulativeData(sampleDepthData.bids);
  const asks = generateCumulativeData(sampleDepthData.asks);

  return (
    <div className="h-[400px] bg-black border-[#F0E7A1]/20 p-6 rounded-md">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart>
          <CartesianGrid strokeDasharray="3 3" stroke="#F0E7A1" opacity={0.1} />
          <XAxis
            dataKey="price"
            type="number"
            domain={["dataMin", "dataMax"]}
            stroke="#F0E7A1"
            tick={{ fill: "#F0E7A1" }}
            tickFormatter={(value) => `$${value}`}
          />
          <YAxis
            dataKey="cumulativeVolume"
            stroke="#F0E7A1"
            tick={{ fill: "#F0E7A1" }}
            tickFormatter={(value) => `${value}M`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1A1A1A",
              border: "1px solid #F0E7A1",
              borderRadius: "0.5rem",
            }}
            formatter={(value, name) => [
              `${value}M`,
              name === "bids" ? "Bids" : "Asks",
            ]}
            labelFormatter={(label) => `$${label}`}
            labelStyle={{ color: "#F0E7A1" }}
          />
          <Area
            type="stepAfter"
            dataKey="cumulativeVolume"
            data={bids}
            stroke="#00FF00"
            fill="rgba(0, 255, 0, 0.2)"
          />
          <Area
            type="stepAfter"
            dataKey="cumulativeVolume"
            data={asks}
            stroke="#FF0000"
            fill="rgba(255, 0, 0, 0.2)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DepthChart;
