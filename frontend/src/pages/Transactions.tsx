import { useState, useEffect } from "react";
import TransactionCard from "@/components/Keeth-Transactions/TransactionCard";
import TransactionDetails from "@/components/Keeth-Transactions/TransactionDetails";
import TransactionMake from "@/components/Keeth-Transactions/TransactionMake";
import NavBarPortfolio from "@/components/bryan-portfolio/navbar";
import { getTransactionHistory } from "@/data/transaction-history";
import { FaArrowUp, FaArrowDown, FaExchangeAlt, FaWallet } from "react-icons/fa"; 

interface Transaction {
  _id: string;
  type: string;
  crypto: string;
  amount: string;
  recipient: string;
  status: string;
  transactionId: string;
  date: string;
  time: string;
  fee: string;
  icon: React.ReactNode;
}

const Transactions = () => {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const loadTransactions = async () => {
      const token = localStorage.getItem("jwtToken");
      if (token) {
        try {
          const transactionHistory = await getTransactionHistory();
          // Map the transaction details to match the required format
          const formattedTransactions = transactionHistory.map((tx: any) => {
            let icon;
            switch (tx.type) {
              case "deposit":
                icon = <FaArrowDown className="text-green-500" />;
                break;
              case "withdrawal":
                icon = <FaArrowUp className="text-red-500" />;
                break;
              case "transfer":
                icon = <FaExchangeAlt className="text-yellow-500" />;
                break;
              case "wallet":
                icon = <FaWallet className="text-blue-500" />;
                break;
              default:
                icon = <FaExchangeAlt className="text-gray-500" />;
                break;
            }

            return {
              _id: tx._id,
              type: tx.type,
              crypto: tx.currency,
              amount: tx.amount,
              recipient: tx.recipient,
              status: tx.status,
              transactionId: tx.transactionId,
              date: tx.createdAt,
              time: new Date(tx.createdAt).toLocaleTimeString(),
              fee: tx.fee || "£0.00",
              icon,
            };
          });

          setTransactions(formattedTransactions);
        } catch (error) {
          console.error("Error fetching transactions:", error);
        }
      } else {
        console.error("No token found in localStorage");
      }
    };

    loadTransactions();
  }, []); 

  return (
    <>
      <div>
        <NavBarPortfolio />
      </div>
      <div className="h-full flex relative">
        <div className="w-1/2 bg-black text-[#F0E7A1] p-6 overflow-y-auto h-[calc(100vh-4rem)]">
          <div className="flex justify-between items-center mb-6">
            <button>🔍 Filter</button>
            <button>⇅ Sort</button>
          </div>
          {transactions.map((tx) => (
            <TransactionCard
              key={tx._id}
              {...tx}
              onClick={() => setSelectedTransaction(tx)}
            />
          ))}
        </div>
        <div className="w-1/2 bg-neutral-900 text-white">
          <div className="h-full text-[#F0E7A1] p-2 flex flex-col gap-6 max-w-4xl mx-auto w-full">
            <TransactionMake />
          </div>
        </div>

        {selectedTransaction && (
          <div
            className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/40 backdrop-blur-sm z-50"
            onClick={() => setSelectedTransaction(null)}
          >
            <div onClick={(e) => e.stopPropagation()} className="z-50">
              <TransactionDetails
                type={selectedTransaction.type}
                crypto={selectedTransaction.crypto}
                amount={selectedTransaction.amount}
                recipient={selectedTransaction.recipient}
                transactionId={
                  selectedTransaction.transactionId || "000000000000"
                }
                date={selectedTransaction.date ? new Date(selectedTransaction.date).toLocaleDateString('en-GB') : "22/03/2025"}
                time={selectedTransaction.time || "11:23am"}
                fee={selectedTransaction.fee || "£0.00"}
                status={selectedTransaction.status}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Transactions;
