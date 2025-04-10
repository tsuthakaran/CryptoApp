

export interface CryptoLabel {
    symbol: string;
    name: string;
    currency: string;
    value: number;
    change: number;
    icon: string; // later change this to an actual icon
}

export interface PieChartData {
    symbol: string;
    value: number;
}

export interface PortfolioHistory {
    date: string;
    totalValue: number;
    cryptoValues: {
        [key: string]: number; // symbol: value mapping
    };
}

export interface PriceData {
    timeStamp: string
    price: number
}

export interface BinanceWebSocket {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    subscribe: (symbol: string, callback: (data: any) => void) => () => void;
}


export interface HistoricalQueue {
    data: PriceData[];
    maxLength: number;
  }