import React, { useState } from 'react';
import { Coins, CreditCard, ChevronDown } from 'lucide-react';

function App() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [amount, setAmount] = useState('');
  const [selectedChain, setSelectedChain] = useState('Ethereum');

  const chains = [
    'Ethereum',
    'Binance Smart Chain',
    'Polygon',
    'Avalanche'
  ];

  const handleConnect = () => {
    setIsWalletConnected(true);
  };

  const handlePay = () => {
    if (!amount || !selectedChain) {
      alert('Please fill in all fields');
      return;
    }
    alert(`Processing payment of ${amount} on ${selectedChain}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Crypto Payment</h1>
        
        {/* Wallet Connection */}
        <div className="mb-6">
          <button
            onClick={handleConnect}
            className={`w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all ${
              isWalletConnected
                ? 'bg-green-50 text-green-600 border border-green-200'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <Coins size={20} />
            {isWalletConnected ? 'Wallet Connected' : 'Connect Wallet'}
          </button>
        </div>

        {/* Amount Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Amount
          </label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              USD
            </span>
          </div>
        </div>

        {/* Chain Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Chain
          </label>
          <div className="relative">
            <select
              value={selectedChain}
              onChange={(e) => setSelectedChain(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              {chains.map((chain) => (
                <option key={chain} value={chain}>
                  {chain}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          </div>
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePay}
          disabled={!isWalletConnected}
          className="w-full py-3 px-4 rounded-lg bg-blue-600 text-white flex items-center justify-center gap-2 hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CreditCard size={20} />
          Pay Now
        </button>
      </div>
    </div>
  );
}

export default App;