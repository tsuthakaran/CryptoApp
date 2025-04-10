import { CryptoLabel } from "@/abstracts/portfolio/interfaces";

// Helper function to generate a random number between min and max
const getRandomValue = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
const currentCurrency ="USDT"// "USDT"; // Default currency for all crypto labels
  export const CryptoLabelsAttributes: CryptoLabel[] = [
    { symbol: "BTC", currency: currentCurrency, name: "Bitcoin", value: getRandomValue(0, 10), change: getRandomValue(-10, 10), icon: "B" },
    { symbol: "ETH", currency: currentCurrency, name: "Ethereum", value: getRandomValue(1, 10), change: getRandomValue(-10, 10), icon: "E" },
    { symbol: "POL", currency: currentCurrency, name: "Polygon", value: getRandomValue(1, 10), change: getRandomValue(-10, 10), icon: "P" },
    { symbol: "USD", currency: currentCurrency, name: "US Dollar", value: getRandomValue(1, 10), change: getRandomValue(-10, 10), icon: "$" },
    { symbol: "GBP", currency: currentCurrency, name: "British Pound", value: getRandomValue(1, 10), change: getRandomValue(-10, 10), icon: "£" },
    { symbol: "ADA", currency: currentCurrency, name: "Cardano", value: getRandomValue(1, 10), change: getRandomValue(-10, 10), icon: "A" },
    { symbol: "SOL", currency: currentCurrency, name: "Solana", value: getRandomValue(1, 10), change: getRandomValue(-10, 10), icon: "S" },
    { symbol: "XRP", currency: currentCurrency, name: "Ripple", value: getRandomValue(1, 10), change: getRandomValue(-10, 10), icon: "X" },
    { symbol: "DOT", currency: currentCurrency, name: "Polkadot", value: getRandomValue(1, 10), change: getRandomValue(-10, 10), icon: "D" },
    { symbol: "LTC", currency: currentCurrency, name: "Litecoin", value: getRandomValue(1, 10), change: getRandomValue(-10, 10), icon: "L" },
    { symbol: "DOGE", currency: currentCurrency, name: "Dogecoin", value: getRandomValue(1, 10), change: getRandomValue(-10, 10), icon: "D" },
    { symbol: "MATIC", currency: currentCurrency, name: "Matic", value: getRandomValue(1, 10), change: getRandomValue(-10, 10), icon: "M" },
    { symbol: "BCH", currency: currentCurrency, name: "Bitcoin Cash", value: getRandomValue(1, 10), change: getRandomValue(-10, 10), icon: "B" },
    { symbol: "AVAX", currency: currentCurrency, name: "Avalanche", value: getRandomValue(1, 10), change: getRandomValue(-10, 10), icon: "A" },
    { symbol: "XLM", currency: currentCurrency, name: "Stellar", value: getRandomValue(1, 10), change: getRandomValue(-10, 10), icon: "X" },
    { symbol: "LINK", currency: currentCurrency, name: "Chainlink", value: getRandomValue(1, 10), change: getRandomValue(-10, 10), icon: "L" },
    { symbol: "UNI", currency: currentCurrency, name: "Uniswap", value: getRandomValue(1, 10), change: getRandomValue(-10, 10), icon: "U" },
    { symbol: "ALGO", currency: currentCurrency, name: "Algorand", value: getRandomValue(1, 10), change: getRandomValue(-10, 10), icon: "A" },
    { symbol: "FTM", currency: currentCurrency, name: "Fantom", value: getRandomValue(1, 10), change: getRandomValue(-10, 10), icon: "F" },
    { symbol: "ICP", currency: currentCurrency, name: "Internet Computer", value: getRandomValue(1, 10), change: getRandomValue(-10, 10), icon: "I" },
];