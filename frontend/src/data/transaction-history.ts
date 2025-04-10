import axios from 'axios';


const fetchUserProfile = async () => {
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    console.error("No token found");
    return null;
  }
  try {
    const res = await fetch("http://localhost:3000/profile/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    if (!res.ok) {
      console.error("Failed to fetch profile", res.status);
      return null;
    }
    const user = await res.json();
    return user;
  } catch (err) {
    console.error("Error fetching profile:", err);
    return null;
  }
};

export const getTransactionHistory = async () => {
  try {

    const user = await fetchUserProfile();
    if (!user || !user.wAddress) {
      console.error('No wallet address found for user.');
      return [];
    }

    const walletAddress = user.wAddress;
    console.log('Wallet Address retrieved:', walletAddress);

    const transactionObjectIds = await getTransactionsForWallet(walletAddress);
    console.log('Transaction ObjectIds:', transactionObjectIds);

    const transactionDetails = await Promise.all(
      transactionObjectIds.map((transactionId: string) => getTransactionDetails(transactionId))
    );
    console.log('Transaction Details:', transactionDetails);

    const formattedTransactionHistory = transactionDetails.map((transaction: any) => ({
      _id: transaction._id,
      transactionId: transaction.transactionId,
      type: transaction.type,
      currency: transaction.currency,
      amount: transaction.amount,
      wallet: transaction.wallet,
      recipient: transaction.recipient,
      sender: transaction.sender,
      exchangeUsed: transaction.exchangeUsed,
      fee: transaction.fee,
      status: transaction.status,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
      __v: transaction.__v,
    }));

    console.log('Formatted Transaction History:', formattedTransactionHistory);

    return formattedTransactionHistory;
  } catch (error) {
    console.error('Error fetching transaction history:', error);
    return [];
  }
};

const getTransactionsForWallet = async (walletId: string) => {
  try {
    const response = await axios.get(`http://localhost:3000/transactions/by-wallet/${walletId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions for wallet:', error);
    throw new Error('Failed to fetch transactions');
  }
};

const getTransactionDetails = async (transactionId: string) => {
  try {
    const response = await axios.get(`http://localhost:3000/transactions/${transactionId}`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching transaction details:', error);
    throw new Error('Failed to fetch transaction details');
  }
};

getTransactionHistory().then((history) => {
  console.log('Transaction History:', history);
});
