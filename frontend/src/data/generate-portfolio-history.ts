import { PortfolioHistory } from "@/abstracts/portfolio/interfaces";
import { CryptoLabelsAttributes } from "./crypto-info";





// Generate one year of daily data
const generatePortfolioHistory = (): PortfolioHistory[] => {
    const history: PortfolioHistory[] = [];
    const today = new Date();
    
    // Initial values for each crypto
    const cryptoInitialValues: { [key: string]: number } = {};
        CryptoLabelsAttributes.forEach(crypto => {
            cryptoInitialValues[crypto.symbol] = crypto.value;
        });

    for (let i = 365; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        // Generate random changes for each crypto
        const cryptoValues: { [key: string]: number } = {};
        let totalValue = 0;
        
        Object.entries(cryptoInitialValues).forEach(([symbol, initialValue]) => {
            // Generate a random walk
            const randomChange = (Math.random() - 0.48) * 0.1; // Slight upward bias
            const previousValue = i === 365 ? initialValue : 
                history[history.length - 1].cryptoValues[symbol];
            
            cryptoValues[symbol] = previousValue * (1 + randomChange);
            totalValue += cryptoValues[symbol];
        });

        history.push({
            date: date.toISOString().split('T')[0],
            totalValue,
            cryptoValues
        });
    }

    // Update CryptoInfo changes based on 24h change
    const last24h = history[history.length - 1].cryptoValues;
    const prev24h = history[history.length - 2].cryptoValues;
    
    CryptoLabelsAttributes.forEach((crypto) => {
        const currentValue = last24h[crypto.symbol];
        const previousValue = prev24h[crypto.symbol];
    
        if (previousValue !== 0) {
            crypto.change = ((currentValue - previousValue) / previousValue) * 100;
        } else {
            crypto.change = (currentValue) * 100;
        }
    });

    return history;
};

const portfolioHistory = generatePortfolioHistory();
export default portfolioHistory; 