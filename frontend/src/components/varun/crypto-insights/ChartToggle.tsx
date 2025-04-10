import React from "react";
import { Button } from "@/components/ui/button";

interface ChartToggleProps {
  selectedChart: string;
  onChartChange: (chart: string) => void;
}

const ChartToggle: React.FC<ChartToggleProps> = ({
  selectedChart,
  onChartChange,
}) => {
  const charts = ["Price Chart", "Depth Chart"];

  return (
    <div className="flex flex-row border-[#F0E7A1]/20 bg-black p-1 rounded-md">
      {charts.map((chart) => (
        <Button
          key={chart}
          variant="ghost"
          className={`text-[#F0E7A1] hover:bg-[#F0E7A1]/20 hover:text-white ${
            selectedChart === chart ? "bg-[#F0E7A1]/20 text-white" : ""
          }`}
          onClick={() => onChartChange(chart)}
        >
          {chart}
        </Button>
      ))}
    </div>
  );
};

export default ChartToggle;
