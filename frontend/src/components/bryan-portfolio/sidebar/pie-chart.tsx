import * as React from "react"
//import { TrendingUp } from "lucide-react"
import { Cell, Label, Pie, PieChart } from "recharts"

//import { Card, CardContent } from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { CryptoLabelsAttributes } from "@/data/crypto-info"
import { PieChartData } from "@/abstracts/portfolio/interfaces"



const generateGradientColor = (angle: number): string => {
  const hue = (angle % 360).toFixed(0);
  return `hsl(${hue}, 70%, 50%)`;
};

const generateChartConfig = (data: PieChartData[]): ChartConfig => {
  // Initialize the config object with the default "value" key
  const config: ChartConfig = { };

  // Use map to iterate over the data and populate the config object
  data.map((item, index) => {
    const angle = (360 / data.length) * index; // Calculate angle for gradient
    config[item.symbol] = {
      label: item.symbol,
      color: generateGradientColor(angle), // Assign gradient color
    };
  });

  return config;
};

export function PortfolioPieChart(){

  const chartDataTransformed: PieChartData[] = CryptoLabelsAttributes.slice().sort((a,b)=>b.value - a.value).map((crypto) => ({
    symbol: crypto.symbol,
    value: crypto.value,
  }));
  
  const chartConfig = generateChartConfig(chartDataTransformed);

  const total = React.useMemo(() => {
    return chartDataTransformed.reduce((acc, curr) => acc + curr.value, 0);
  }, [chartDataTransformed]);

  return (
    <div className="aspect-square p-2 ">
      <ChartContainer
        config={chartConfig}
        className="w-full h-full"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
            contentStyle={{
              backgroundColor: '#1A1A1A',
              border: '1px solid #F0E7A1',
              borderRadius: '0.5rem',
              color: '#F0E7A1'
            }}
          />
          <Pie
            data={chartDataTransformed}
            dataKey="value"
            nameKey="symbol"
            innerRadius={35}
            strokeWidth={2}
            stroke="#1A1A1A"
          >
            {chartDataTransformed.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={chartConfig[entry.symbol]?.color || "#F0E7A1"}
              />
            ))}
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={24}
                      fill="#F0E7A1"
                    >
                      {total.toLocaleString()}
                    </text>
                  )
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  )
}
