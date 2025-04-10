import { TimeRange } from "@/abstracts/portfolio/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useTimeRangeContext } from "@/hooks/time-range-context";
import React from "react";


const TimeRangeSelector: React.FC = () => {
  const ranges: TimeRange[] = ["1D", "7D", "14D", "1M", "1Y"];
  const { timeRange, setTimeRange } = useTimeRangeContext();

  return (
    <Card className="flex flex-col lg:flex-row border border-black bg-black">
        {ranges.map((range) => (
          <React.Fragment key={range}>
            <Button 
              className={`text-[#F0E7A1] hover:bg-[#F0E7A1]/20 transition duration-300 ${
                timeRange === range 
                  ? 'bg-[#F0E7A1]/20 border border-[#F0E7A1]' 
                  : ''
              }`}
              onClick={() => setTimeRange(range)}
            >
              {range}
            </Button>
            {range !== "1Y" && <Separator orientation="vertical" className="bg-[#F0E7A1]" />}
          </React.Fragment>
        ))}
      </Card>
  );
};

export default TimeRangeSelector;
