import React from "react";
import { Currency } from "../types";

interface CurrencyInputProps {
  amount: string;
  setAmount: (value: string) => void;
  selectedCurrency: Currency;
  setSelectedCurrency: (currency: Currency) => void;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  amount,
  setAmount,
  selectedCurrency,
  setSelectedCurrency,
}) => {
  const currencies = [Currency.GBP, Currency.MYR, Currency.EUR];

  // Debug: Log the currencies array
  console.log("Available currencies:", currencies);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and a single decimal point
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  return (
    <div>
      <label
        htmlFor="amount"
        className="block text-sm font-medium text-gray-400 mb-2"
      >
        Enter Amount
      </label>
      <div className="relative">
        <input
          type="text"
          id="amount"
          name="amount"
          value={amount}
          onChange={handleAmountChange}
          className="w-full pl-4 pr-44 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200"
          placeholder="0.00"
        />
        <div className="absolute inset-y-0 right-0 flex items-center p-1.5">
          <div className="flex bg-gray-600 rounded-md p-1 space-x-1 min-w-fit">
            {currencies.map((currency) => (
              <button
                key={currency}
                onClick={() => setSelectedCurrency(currency)}
                className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors duration-200 ${
                  selectedCurrency === currency
                    ? "bg-cyan-500 text-white shadow"
                    : "text-gray-300 hover:bg-gray-500"
                }`}
              >
                {currency}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyInput;
