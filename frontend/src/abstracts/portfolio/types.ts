import { PriceData } from "./interfaces";

export type CryptoLabel = {
    symbol: string;
    name: string;
    value: number;
    change: number;
    currency: string;
};

export type TimeRangeConfig = {
    interval: string;
    limit: number;
    duration: number;
    xAxisFormat: string;
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
    currentConfig: TimeRangeConfig,
    quoteAsset: string;
    setQuoteAsset: (quoteAsset: string) => void;
    yAxisDomain: number[];
};

export type SidebaCollapsedContextType = {
    isSidebarCollapsed: boolean, 
    setIsSidebarCollapsed: (newIsSidebarCollapsed: boolean) => void,
    panelWidth: number, 
    setPanelWidth: (newPanelWidth: number) => void
    key: number,
    setKey: (newKey: number) => void,
    handleToggleCollapse: () => void
}

export type TimeRange = "1H" |'1D' | '7D' | '14D' | '1M' | '1Y' | 'ALL';

export type Kline = [
    number, // // Open time
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
    number, // Close time in milliseconds
    string, // Close price in milliseconds
    string // Volume in milliseconds
];


export type PortfolioCache = Map<string, PriceData[]>;