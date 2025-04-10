import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts"
import { Button } from "@/components/ui/button"
import { PanelLeft } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import TransactionButton from "./transaction-button"
import { useSidebarCollapsedContext } from "@/hooks/sidebar-context"
import { useTimeRangeContext } from "@/hooks/time-range-context"
import { CryptoLabelsAttributes } from "@/data/crypto-info"
import { ShowWalletAdress } from "./wallet-address"

export function PortfolioPriceGraph() {
  const { handleToggleCollapse, isSidebarCollapsed } = useSidebarCollapsedContext();
  const { 
    historicalData, 
    realTimePrice,
    selectedCrypto,
    error,
    currentConfig,
    yAxisDomain,
    timeRange,
  } = useTimeRangeContext();

  const currentCrypto = CryptoLabelsAttributes.find(c => c.symbol === selectedCrypto)!;

  // Format data for Recharts with proper date formatting
  const chartData = historicalData.map(d => ({
    ...d,
    date: d.timeStamp,
    formattedDate: currentConfig.tickFormatter(d.timeStamp)
  }));

  // Custom tick formatter for XAxis
  const formatXAxisTick = (date: string) => {
    return currentConfig.tickFormatter(date);
  };

  // Custom tooltip content
  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black border border-[#F0E7A1]/20 p-2 rounded-md">
          <p className="text-[#F0E7A1]">{formatXAxisTick(label || '')}</p>
          <p className="text-[#F0E7A1]">${payload[0].value.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  if (error) {
    return (
      <Card className="p-7 bg-black border-[#F0E7A1]/20">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </Card>
    );
  }

  return (
    <Card className="p-7 bg-black border-[#F0E7A1]/20">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleToggleCollapse}
            className="hover:bg-[#F0E7A1] hover:-translate-y-0.5 transition duration-300 fill-[#F0E7A1] text-[#F0E7A1] rounded-md"
          >
            <PanelLeft className={`h-4 transition-transform duration-200 ${isSidebarCollapsed ? 'rotate-180' : ''}`} />
          </Button>
          <h2 className="text-2xl font-semibold text-[#F0E7A1]">
            {selectedCrypto === 'TOTAL' ? 'Portfolio Value' : `${selectedCrypto} Price Chart`}
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <ShowWalletAdress />
          <TransactionButton />
          {timeRange && realTimePrice && (
            <div className="real-time-price text-[#F0E7A1]">
              Current {currentCrypto.name} Price: ${realTimePrice.toFixed(2)}
            </div>
          )}
        </div>
      </div>
      
      <div className="h-120">
        <ResponsiveContainer width="100%" height="100%" className="object-contain">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F0E7A1" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#F0E7A1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0E7A1" opacity={0.1} />
            <XAxis 
              dataKey="date" 
              stroke="#F0E7A1"
              tick={{ fill: '#F0E7A1' }}
              tickFormatter={formatXAxisTick}
              interval={currentConfig.tickInterval}
            />
            <YAxis
              stroke="#F0E7A1"
              tick={{ fill: '#F0E7A1' }}
              tickFormatter={(value) => `$${value.toFixed(2)}`}
              domain={yAxisDomain}
              allowDataOverflow={false}
              scale="linear"
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#F0E7A1"
              fillOpacity={1}
              fill="url(#colorPrice)"
              activeDot={{ r: 4, fill: "#F0E7A1" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

