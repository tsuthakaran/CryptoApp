// --- Market / price types ---

export interface PriceData {
  timeStamp: string;
  price: number;
}

export type Kline = [
  number, // Open time
  string, // Open price
  string, // High price
  string, // Low price
  string, // Close price
  string, // Volume
  number, // Close time
  string, // Quote asset volume
  number, // Number of trades
  string, // Taker buy base asset volume
  string, // Taker buy quote asset volume
  number, // Ignore
  number, // Close time in ms
  string, // Close price in ms
  string,  // Volume in ms
];

export type PortfolioCache = Map<string, PriceData[]>;

// --- Portfolio / crypto label types ---

export interface CryptoLabel {
  symbol: string;
  name: string;
  currency: string;
  value: number;
  change: number;
  icon: string;
}

// --- Time range types ---

export type TimeRange = '1H' | '1D' | '7D' | '14D' | '1M' | '1Y' | 'ALL';

export type TimeRangeConfig = {
  interval: string;
  limit: number;
  duration: number;
  tickInterval: number;
  tickFormatter: (date: string) => string;
};

export type TimeRangeContextType = {
  timeRange: TimeRange;
  setTimeRange: (range: TimeRange) => void;
  historicalData: PriceData[];
  realTimePrice: number | null;
  selectedCrypto: string;
  setSelectedCrypto: (crypto: string) => void;
  isLoading: boolean;
  error: string | null;
  currentConfig: TimeRangeConfig;
  yAxisDomain: number[];
};

// --- Transaction types ---

export interface TransactionDetailsProps {
  type: string;
  crypto: string;
  amount: string;
  recipient: string;
  transactionId: string;
  date: string;
  time: string;
  fee: string;
  status: string;
  onClose?: () => void;
}
