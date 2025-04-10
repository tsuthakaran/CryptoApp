export interface TransactionEntry {
    type: string;
    crypto: string;
    amount: string;
    recipient: string;
    status: string;
    transactionId?: string;
    date?: string;
    time?: string;
    fee?: string;
  }
  
  export interface TransactionGroup {
    date: string;
    entries: TransactionEntry[];
  }
  
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
  }
  
  export interface TransactionCardProps {
    type: string;
    crypto: string;
    amount: string;
    recipient: string;
    status: string;
    onClick?: () => void;
  }
  
  export type TransactionType = "Send" | "Request" | "Swap" | "Withdraw" | "Deposit" ;