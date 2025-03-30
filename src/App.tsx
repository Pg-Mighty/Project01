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
  // Using useState(false) initially might be more logical,
  // assuming the user needs to connect first.
  // Let's keep it true as per your original code for now.
  const [isWalletConnected, setIsWalletConnected] = useState(true);
  const [amount, setAmount] = useState('');
  const [selectedChain, setSelectedChain] = useState('Ethereum');

  const chains = [
    'Ethereum',
    'Binance Smart Chain',
    'Polygon',
    'Avalanche'
  ];

  // Removed handleConnect as RainbowKit's ConnectButton handles connection state.
  // You can use Wagmi hooks like useAccount() to get connection status if needed.

  // Updated handlePay function as requested
  const handlePay = async () => {
    console.log("Pay button clicked. Attempting to fetch token balances...");

    // Use the specific URL provided
    const url = 'https://monad-testnet.g.alchemy.com/v2/sKloU5xuzfc9H3K3R3W1Q9p5Tt6LIf9h';

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    // Use the specific body provided
    const body = JSON.stringify({
      id: 1,
      jsonrpc: "2.0",
      method: "alchemy_getTokenBalances",
      params: [
        // This is currently a hardcoded address (Vitalik Buterin's address)
        // In a real app, you'd likely use the connected wallet's address
        "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
        "erc20" // Fetching ERC20 token balances
      ]
    });

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body
      });

      if (!response.ok) {
        // Throw an error if the response status is not OK (e.g., 4xx, 5xx)
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Successfully fetched token balances:', data);
      // ---
      // TODO: Implement actual payment logic here based on the amount,
      // selected chain, and potentially the fetched balances or user confirmation.
      // This current fetch only *reads* balances, it doesn't *send* a transaction.
      alert('Fetched token balances (see console). Actual payment logic needs implementation.');
      // ---

    } catch (error) {
      console.error('Error fetching token balances:', error);
      alert(`Error fetching data: ${error.message}`);
    }
  };

  const config = getDefaultConfig({
    appName: 'Crypto Payment App', // Changed AppName slightly
    projectId: 'YOUR_PROJECT_ID', // *** IMPORTANT: Replace with your actual WalletConnect Project ID ***
    chains: [polygon, optimism, arbitrum, base], // Added mainnet if needed later: mainnet
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
                    {/* ConnectButton manages its own state and logic */}
                    <ConnectButton />
                  </div>
                  {/* Note: Your isWalletConnected state is not directly tied to ConnectButton's status.
                      Consider using Wagmi's useAccount hook for reliable connection status:
                      import { useAccount } from 'wagmi';
                      const { isConnected } = useAccount();
                      // Then use isConnected instead of isWalletConnected
                  */}
                </div>

                {/* Amount Input */}
                <div className="mb-6">
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                    Enter Amount
                  </label>
                  <div className="relative">
                    <input
                        id="amount"
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
                  <label htmlFor="chain" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Chain
                  </label>
                  <div className="relative">
                    <select
                        id="chain"
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
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
                  </div>
                </div>

                {/* Pay Button */}
                <button
                    onClick={handlePay}
                    // It's better to disable based on actual connection status from Wagmi/RainbowKit
                    // For now, using your state variable:
                    disabled={!isWalletConnected || !amount} // Also disable if amount is empty
                    className={`w-full py-3 px-4 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-700 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                >
                  <CreditCard size={20} /> {/* Changed Icon for Pay */}
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