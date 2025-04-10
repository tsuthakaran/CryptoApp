import React from "react";
import { TransactionDetailsProps } from "@/data/transactions";

const TransactionDetails: React.FC<TransactionDetailsProps> = ({
  type,
  crypto,
  amount,
  recipient,
  transactionId,
  date,
  time,
  fee,
  status,
}) => {
  return (
    <div className="border border-[#F0E7A1] rounded-lg text-[#F0E7A1] w-[400px] p-4 bg-[#1C1B19] z-50">
      <div className="text-center text-lg font-semibold border-b border-[#F0E7A1] pb-2 mb-2">
        {type} {crypto}
      </div>
      <div className="text-center text-2xl font-bold border-b border-[#F0E7A1] pb-2 mb-2">
        {amount}
      </div>
      <div className="text-center border-b border-[#F0E7A1] pb-2 mb-2">
        {type === "Sent" && `To ${recipient}`}
        {type === "Request" && `From ${recipient}`}
        {type === "Swap" && "Swap"}
      </div>
      <div className="text-sm space-y-2">
        <div className="flex justify-between">
          <span>Transaction ID:</span>
          <span>{transactionId}</span>
        </div>
        <div className="flex justify-between">
          <span>Date &amp; Time:</span>
          <span>
            {date} {time}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Fee Paid:</span>
          <span>{fee}</span>
        </div>
        <div className="flex justify-between">
          <span>Status:</span>
          <span>{status}</span>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
