import React from "react";

interface TransactionCardProps {
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
  onClick: () => void;
}

const TransactionCard: React.FC<TransactionCardProps> = ({
  type,
  crypto,
  amount,
  recipient,
  status,
  transactionId,
  date,
  time,
  fee,
  icon,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="transaction-card border p-4 rounded-md bg-neutral-800 text-white cursor-pointer hover:bg-neutral-700"
    >
      <div className="flex items-center space-x-3">
        <div className="text-2xl">{icon}</div>
        <div className="flex-1">
          <h5 className="font-semibold">{type}</h5>
          <p>{crypto} - {amount} {recipient && `to ${recipient}`}</p>
          <p>{date.slice(0, 10)} at {time}</p>
        </div>
        <div>
          <span className="text-sm text-gray-400">{status}</span>
        </div>
      </div>
      <div className="mt-2 text-sm">
        <p>Fee: {fee}</p>
        <p>Transaction ID: {transactionId}</p>
      </div>
    </div>
  );
};

export default TransactionCard;
