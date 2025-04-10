/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const assetNameToCode: Record<string, string> = {
  Bitcoin: "BTC",
  Ethereum: "ETH",
  Solana: "SOL",
  Dogecoin: "DOGE",
  Cardano: "CAR",
  Polygon: "MATIC",
  "US Dollar": "USD",
  "British Pound": "GBP",
  Ripple: "XRP",
  Polkadot: "DOT",
  Litecoin: "LTC",
  Matic: "MATIC",
  "Bitcoin Cash": "BCH",
  Avalanche: "AVAX",
  Stellar: "XLM",
  Chainlink: "LINK",
  Uniswap: "UNI",
  Algorand: "ALGO",
  Fantom: "FTM",
  "Internet Computer": "ICP",
};

import { CryptoLabelsAttributes } from "@/data/crypto-info";

// Removed calculateBalances function. Balances will be fetched from backend.

const TransactionMake = () => {
  const [type, setType] = useState<TransactionType>("Send");
  const [asset, setAsset] = useState("Bitcoin");
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [swapTarget, setSwapTarget] = useState("Ethereum");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [addressConfirmed, setAddressConfirmed] = useState(false);
  const [warningAcknowledged, setWarningAcknowledged] = useState(false);
  const [balances, setBalances] = useState<Record<string, number>>({});
  const [conversionRates, setConversionRates] = useState<
    Record<string, number>
  >({});

  const assetOptions = CryptoLabelsAttributes.map((asset) => asset.name);
  const [walletId, setWalletId] = useState<string>("");

  useEffect(() => {
    const fetchBalances = async () => {
      const token = localStorage.getItem("jwtToken");
      if (!token) return;

      try {
        const decoded: any = jwtDecode(token);
        const res = await fetch(`http://localhost:3000/wallet/${decoded.sub}`);
        const data = await res.json();

        console.log("✅ Wallet data from backend:", data);
        setBalances(data.listOfCurrencies || {});
        setWalletId(data._id); // Set the wallet ID here
      } catch (err) {
        console.error("❌ Failed to fetch balances:", err);
      }
    };

    fetchBalances();
  }, []);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,dogecoin,cardano,polygon,usd,gbp,ripple,polkadot,litecoin,bitcoin-cash,avalanche,stellar,chainlink,uniswap,algorand,fantom,internet-computer&vs_currencies=gbp"
        );
        const data = await res.json();
        const rates: Record<string, number> = {
          BTC: data.bitcoin?.gbp ?? 0,
          ETH: data.ethereum?.gbp ?? 0,
          SOL: data.solana?.gbp ?? 0,
          DOGE: data.dogecoin?.gbp ?? 0,
          CAR: data.cardano?.gbp ?? 0,
          MATIC: data.polygon?.gbp ?? 0,
          USD: data.usd?.gbp ?? 0,
          GBP: 1,
          XRP: data.ripple?.gbp ?? 0,
          DOT: data.polkadot?.gbp ?? 0,
          LTC: data.litecoin?.gbp ?? 0,
          BCH: data["bitcoin-cash"]?.gbp ?? 0,
          AVAX: data.avalanche?.gbp ?? 0,
          XLM: data.stellar?.gbp ?? 0,
          LINK: data.chainlink?.gbp ?? 0,
          UNI: data.uniswap?.gbp ?? 0,
          ALGO: data.algorand?.gbp ?? 0,
          FTM: data.fantom?.gbp ?? 0,
          ICP: data["internet-computer"]?.gbp ?? 0,
        };
        setConversionRates(rates);
      } catch (err) {
        console.error("❌ Failed to fetch conversion rates:", err);
      }
    };

    fetchRates();
  }, []);

  // Removed local calculateBalances call. Using balances from state.

  const conversion = amount
    ? (
        parseFloat(amount) * (conversionRates[assetNameToCode[asset]] || 0)
      ).toFixed(2)
    : "0.00";

  const getReliabilityScore = async (input: string): Promise<number | null> => {
    try {
      const unreliableAssets: Record<string, number> = {
        Dogecoin: 25,
        Matic: 45,
        Algorand: 30,
        Fantom: 40,
        "Internet Computer": 35,
        Uniswap: 45,
        Stellar: 40,
      };

      if (input.startsWith("scam")) return 20;
      if (input.startsWith("unknown")) return null;

      // If it's an asset, return score if flagged
      if (unreliableAssets[input]) return unreliableAssets[input];

      return 85;
    } catch (err) {
      console.error("Error fetching reliability score", err);
      return null;
    }
  };

  const handleReview = async () => {
    console.log("🔍 handleReview called", { type, amount, address, asset });

    // Map asset name to code to fetch the correct balance
    const assetCode = assetNameToCode[asset];
    const assetBalance = balances[assetCode] ?? 0; // Use assetCode here
    const amountNum = parseFloat(amount);

    console.log("🔢 Parsed amount:", amountNum, "Balance:", assetBalance);

    if (
      (type === "Send" || type === "Withdraw" || type === "Swap") &&
      amountNum > assetBalance
    ) {
      console.warn("❌ Insufficient funds");
      setErrorMessage("❌ Not enough funds to complete this transaction.");
      setShowConfirmation(false);
      return;
    }

    if (
      (type === "Send" || type === "Request" || type === "Withdraw") &&
      (!address || !/^.{5,}$/.test(address))
    ) {
      console.warn("❌ Invalid address");
      setErrorMessage(
        "❌ Please enter a valid wallet address (min 5 characters)."
      );
      setShowConfirmation(false);
      return;
    }

    if (type === "Send" || type === "Withdraw") {
      const score = await getReliabilityScore(address);
      if (score === null) {
        console.warn("⚠️ Address verification failed or unreliable");
        setErrorMessage(
          "⚠️ We were unable to verify the recipient. Please ensure you trust this address."
        );
        setShowConfirmation(true);
        return;
      } else if (score < 50) {
        console.warn("⚠️ Address verification failed or unreliable");
        setErrorMessage(
          `⚠️ Warning: This address has a low reliability score (${score}/100). Proceed with caution.`
        );
        setShowConfirmation(true);
        return;
      }
    }

    if (type === "Swap") {
      const score = await getReliabilityScore(swapTarget);
      if (score === null) {
        console.warn("⚠️ Swap target verification failed or unreliable");
        setErrorMessage(
          "⚠️ We were unable to verify the reliability of the target asset. Please ensure you trust this swap."
        );
        setShowConfirmation(true);
        return;
      } else if (score < 50) {
        console.warn("⚠️ Swap target verification failed or unreliable");
        setErrorMessage(
          `⚠️ Warning: The target asset "${swapTarget}" has a low reliability score (${score}/100). Proceed with caution.`
        );
        setShowConfirmation(true);
        return;
      }
    }

    setErrorMessage("");
    console.log("✅ All checks passed. Showing confirmation.");
    setShowConfirmation(true);
  };

  return (
    <div className="h-full text-[#F0E7A1] p-10 flex flex-col gap-6 mx-auto w-full">
      {/* Tabs */}
      <div className="flex justify-center gap-4">
        {["Send", "Request", "Swap"].map((t) => (
          <button
            key={t}
            onClick={() => {
              setType(t as any);
              setShowConfirmation(false);
              setErrorMessage("");
              setAddressConfirmed(false);
              setWarningAcknowledged(false);
            }}
            className={`px-4 py-1 rounded-full ${
              type === t
                ? "bg-[#F0E7A1] text-black"
                : "bg-transparent text-[#F0E7A1] border border-[#F0E7A1]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Amount Input */}
      {(
        <div className="text-center text-4xl font-light">
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-[#2a2a2a] text-[#F0E7A1] text-6xl text-center outline-none w-full"
          />
          <p className="text-[#F0E7A1] opacity-60 text-sm mt-2">
            ≈ £{conversion}
          </p>
          <p className="text-xs text-[#F0E7A1] opacity-60">
            Your balance:{" "}
            {(balances[assetNameToCode[asset]] ?? 0)
              .toFixed(6)
              .replace(/\.?0+$/, "")}{" "}
            {asset}
          </p>
        </div>
      )}

      {/* Asset Selector */}
      <div>
        <label className="text-sm text-[#F0E7A1] opacity-70 block mb-1">
          Asset
        </label>
        <select
          value={asset}
          onChange={(e) => setAsset(e.target.value)}
          className="w-full bg-[#2a2a2a] text-[#F0E7A1] p-2 rounded"
        >
          {assetOptions.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>

      {/* Address or Swap Target */}
      {(type === "Send" || type === "Request") && (
        <div>
          <label className="text-sm text-[#F0E7A1] opacity-70 block mb-1">
            Address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter address"
            className="w-full bg-[#2a2a2a] text-[#F0E7A1] p-2 rounded"
          />
          {!address ? (
            <p className="text-red-500 text-xs mt-1">Address required</p>
          ) : (
            address.length < 5 && (
              <p className="text-yellow-400 text-xs mt-1">
                Address must be at least 5 characters long
              </p>
            )
          )}
        </div>
      )}

      {type === "Swap" ? (
        <div>
          <label className="text-sm text-[#F0E7A1] opacity-70 block mb-1">
            Swap To
          </label>
          <select
            value={swapTarget}
            onChange={(e) => setSwapTarget(e.target.value)}
            className="w-full bg-[#2a2a2a] text-[#F0E7A1] p-2 rounded"
          >
            {assetOptions
              .filter((a) => a !== asset)
              .map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
          </select>
        </div>
      ) : null}

      {/* Preview Message */}
      <div className="text-sm text-[#F0E7A1] opacity-70 mt-4 text-center">
        {type === "Send" &&
          `You're sending ${amount || "___"} ${asset} to ${address || "___"}`}
        {type === "Request" &&
          `You're requesting ${amount || "___"} ${asset} from ${
            address || "___"
          }`}
        {type === "Swap" &&
          `You're swapping ${amount || "___"} ${asset} for ${
            type === "Swap" && amount
              ? (
                  (parseFloat(amount) *
                    (conversionRates[assetNameToCode[asset]] || 0)) /
                  (conversionRates[assetNameToCode[swapTarget]] || 1)
                ).toFixed(6)
              : "___"
          } ${swapTarget}`}
      </div>

      {/* Review Button */}
      <button
        className="mt-4 bg-[#F0E7A1] text-black text-lg py-3 rounded-full w-full disabled:opacity-50"
        disabled={(type !== "Swap" && !address) || !amount}
        onClick={handleReview}
      >
        Review order
      </button>

      {showConfirmation &&
        (type === "Send" || type === "Withdraw") &&
        !addressConfirmed && (
          <div className="mb-4 flex flex-col items-center text-center">
            <p className="text-[#F0E7A1] mb-2">
              Please confirm the address below is correct:
            </p>
            <div className="bg-[#1e1e1e] p-2 rounded text-sm break-all border border-yellow-500 text-yellow-400">
              {address}
            </div>
            <button
              className="mt-3 bg-yellow-500 text-black px-4 py-2 rounded"
              onClick={() => setAddressConfirmed(true)}
            >
              Yes, this address is correct
            </button>
          </div>
        )}

      {showConfirmation &&
        ((type !== "Send" && type !== "Withdraw") || addressConfirmed) && (
          <div className="mt-4 p-4 bg-[#2a2a2a] rounded-lg text-center border border-[#F0E7A1]">
            {errorMessage && (
              <p className="mb-2 text-yellow-400 font-semibold">
                {errorMessage}
              </p>
            )}
            {(errorMessage.includes("low reliability score") ||
              errorMessage.includes("unable to verify")) && (
              <div className="flex items-center justify-center gap-2 mb-2">
                <input
                  type="checkbox"
                  id="acknowledge"
                  checked={warningAcknowledged}
                  onChange={(e) => setWarningAcknowledged(e.target.checked)}
                />
                <label
                  htmlFor="acknowledge"
                  className="text-sm text-yellow-300"
                >
                  I understand the risks and wish to proceed.
                </label>
              </div>
            )}
            {((type !== "Send" && type !== "Withdraw") || addressConfirmed) && (
              <p className="mb-3 text-[#F0E7A1]">
                {errorMessage.includes("low reliability score") ||
                errorMessage.includes("unable to verify")
                  ? "⚠️ Proceed with transaction anyway?"
                  : "✅ Transaction reviewed and ready to be submitted."}
              </p>
            )}
            {(type !== "Send" && type !== "Withdraw") || addressConfirmed ? (
              <div className="flex gap-4 justify-center">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  onClick={async () => {
                    if (
                      (errorMessage.includes("low reliability score") ||
                        errorMessage.includes("unable to verify")) &&
                      !warningAcknowledged
                    ) {
                      alert(
                        "Please acknowledge the warning before proceeding."
                      );
                      return;
                    }
                    try {
                      const sourceCode = assetNameToCode[asset];
                      const targetCode = assetNameToCode[swapTarget];
                      const amountNum = parseFloat(amount);
                      const sourceRate = conversionRates[sourceCode] || 0;
                      const targetRate = conversionRates[targetCode] || 1;
                      const gbpValue = amountNum * sourceRate;
                      const swapAmount = parseFloat(
                        (gbpValue / targetRate).toFixed(6)
                      );

                      const txId1 = "TX" + Math.floor(Math.random() * 1000000);
                      const txId2 = "TX" + Math.floor(Math.random() * 1000000);

                      const payloads =
                        type === "Swap"
                          ? [
                              {
                                wallet: walletId,
                                currency: sourceCode,
                                amount: amountNum,
                                type: "Swap",
                                recipient: swapTarget,
                                status: "completed",
                                transactionId: txId1,
                                fee: 0,
                              },
                              {
                                wallet: walletId,
                                currency: targetCode,
                                amount: swapAmount,
                                type: "Swap",
                                recipient: asset,
                                status: "completed",
                                transactionId: txId2,
                                fee: 0,
                              },
                            ]
                          : [
                              {
                                wallet: walletId,
                                currency: sourceCode,
                                amount: amountNum,
                                type: type,
                                recipient:
                                  type === "Swap" ? swapTarget : address,
                                status:
                                  type === "Request" || type === "Deposit"
                                    ? "pending"
                                    : "completed",
                                transactionId: txId1,
                                fee: 0,
                              },
                            ];

                      for (const payload of payloads) {
                        const res = await fetch(
                          "http://localhost:3000/transactions",
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify(payload),
                          }
                        );

                        if (!res.ok)
                          throw new Error("Failed to create transaction");
                      }

                      setShowConfirmation(false);
                      setAmount("");
                      setAddress("");
                      setSwapTarget("Ethereum");
                      setAsset("Bitcoin");
                      setAddressConfirmed(false);
                      setWarningAcknowledged(false);
                      window.location.reload();
                    } catch (err) {
                      console.error("Error submitting transaction", err);
                      setErrorMessage(
                        "❌ Failed to submit transaction. Please try again."
                      );
                      setShowConfirmation(false);
                    }
                  }}
                >
                  Confirm
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => {
                    setShowConfirmation(false);
                    setAddressConfirmed(false);
                    setWarningAcknowledged(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : null}
          </div>
        )}
    </div>
  );
};

export default TransactionMake;
