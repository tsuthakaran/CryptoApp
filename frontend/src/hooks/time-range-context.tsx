import { PriceData, Kline, TimeRange, TimeRangeContextType } from "@/types";
import { useState, createContext, useContext, useEffect, useRef, useCallback, useMemo } from "react";
import axios from "axios";
import { TIME_RANGE_CONFIG } from "@/components/portfolio/main/price-graph-config";
import { binanceWebSocketManager } from "@/services/binance-websocket";

const BINANCE_API = 'https://api.binance.com/api/v3';

const TimeRangeContext = createContext<TimeRangeContextType | undefined>(undefined);

export const TimeRangeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('7D');
  const [historicalData, setHistoricalData] = useState<PriceData[]>([]);
  const [selectedCrypto, setSelectedCrypto] = useState<string>('BTC');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [realTimePrice, setRealTimePrice] = useState<number | null>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  const currentConfig = useMemo(() => TIME_RANGE_CONFIG[timeRange], [timeRange]);

  const getRealTimePrice = useCallback(() => {
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
    }
    const symbol = selectedCrypto === 'TOTAL' ? 'BTC' : selectedCrypto;
    unsubscribeRef.current = binanceWebSocketManager.subscribeToRealTimeData(
      symbol,
      (data: PriceData) => {
        setRealTimePrice(data.price);
      }
    );
    const initialData = binanceWebSocketManager.getHistoricalData(symbol);
    if (initialData.length > 0) {
      setRealTimePrice(initialData[initialData.length - 1].price);
    }
    return unsubscribeRef.current;
  }, [selectedCrypto]);

  const fetchHistoricalData = useCallback(async (range: TimeRange, symbol: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const config = TIME_RANGE_CONFIG[range];
      const tradingPair = `${symbol}USDT`;
      const now = Date.now();
      const startTime = now - config.duration;
      const response = await axios.get(`${BINANCE_API}/klines`, {
        params: { symbol: tradingPair, interval: config.interval, limit: config.limit, startTime }
      });
      const formattedData: PriceData[] = response.data.map((kline: Kline) => ({
        timeStamp: new Date(kline[0]).toISOString(),
        price: parseFloat(kline[4])
      }));
      setHistoricalData(formattedData);
    } catch (err) {
      console.error('Error fetching Binance data:', err);
      setError('Failed to fetch historical data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistoricalData(timeRange, selectedCrypto);
  }, [timeRange, selectedCrypto, fetchHistoricalData]);

  useEffect(() => {
    if (!realTimePrice) return;
    setHistoricalData(prev => {
      const newData = [...prev];
      const lastIndex = newData.length - 1;
      if (lastIndex >= 0) {
        newData[lastIndex] = { ...newData[lastIndex], price: realTimePrice };
      }
      return newData;
    });
  }, [realTimePrice]);

  useEffect(() => {
    const cleanup = getRealTimePrice();
    return () => {
      if (cleanup) cleanup();
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, [getRealTimePrice]);

  const yAxisDomain = useMemo(() => {
    if (historicalData.length === 0) return [0, 0];
    const prices = historicalData.map(d => d.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const padding = (max - min) * 0.01;
    return [Math.max(0, min - padding), max + padding];
  }, [historicalData]);

  const value = {
    timeRange,
    setTimeRange,
    historicalData,
    realTimePrice,
    selectedCrypto,
    setSelectedCrypto,
    isLoading,
    error,
    currentConfig,
    yAxisDomain,
  };

  return (
    <TimeRangeContext.Provider value={value}>
      {children}
    </TimeRangeContext.Provider>
  );
};

export const useTimeRangeContext = () => {
  const context = useContext(TimeRangeContext);
  if (!context) throw new Error('useTimeRangeContext must be used within TimeRangeProvider');
  return context;
};
