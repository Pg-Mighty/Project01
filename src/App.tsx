import React, { useState } from 'react';
import { Coins, CreditCard, ChevronDown } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  polygon,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

function App() {
  const [isWalletConnected, setIsWalletConnected] = useState(true);
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

  const handlePay = async () => {
    const url = `https://monad-testnet.g.alchemy.com/v2/${API_KEY}`;

    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };

      const body = JSON.stringify({
        id: 1,
        jsonrpc: "2.0",
        method: "alchemy_getTokenBalances",
        params: [
          "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
          "erc20"
        ]
      });

      fetch(url, {
        method: 'POST',
        headers: headers,
        body: body
      })
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error('Error:', error));
  };

  const config = getDefaultConfig({
    appName: 'App',
    projectId: '123',
    chains: [polygon, optimism, arbitrum, base],
    ssr: true, // If your dApp uses server side rendering (SSR)
  });
  const queryClient = new QueryClient();
  return (
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Crypto Payment</h1>

                {/* Wallet Connection */}
                <div className="mb-6">

                  <div className="flex justify-center">

                    <ConnectButton
                        onClick={handleConnect}
                        className={`w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all ${
                            isWalletConnected
                                ? 'bg-green-50 text-green-600 border border-green-200'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                    >
                      <Coins size={20} />
                      {isWalletConnected ? 'Wallet Connected' : 'Connect Wallet'}
                    </ConnectButton>
                  </div>
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
                    className={`w-full py-3 px-4 rounded-lg bg-blue-500 text-white hover:bg-blue-700 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed`}
                >
                  Pay with Crypto
                </button>
              </div>
            </div>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
  );
}

export default App;