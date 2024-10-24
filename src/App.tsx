import React, { useState } from 'react';
import { WalletInput } from './components/WalletInput';
import { WalletList } from './components/WalletList';
import { AggregatedPositions } from './components/AggregatedPositions';
import { WalletPositions } from './types';
import { aggregatePositions } from './utils/aggregatePositions';
import { hyperliquidApi } from './api/hyperliquid';
import { LoadingSpinner } from './components/LoadingSpinner';

function App() {
  const [wallets, setWallets] = useState<WalletPositions[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddWallet = async (address: string) => {
    if (wallets.some(w => w.address.toLowerCase() === address.toLowerCase())) {
      setError('This wallet is already being tracked');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const walletData = await hyperliquidApi.fetchWalletPositions(address);
      setWallets(prev => [...prev, walletData]);
    } catch (err) {
      setError('Failed to fetch wallet positions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveWallet = (address: string) => {
    setWallets(prev => prev.filter(wallet => wallet.address !== address));
  };

  const aggregatedData = aggregatePositions(wallets);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Hyperliquid Position Tracker</h1>
        <WalletInput onAddWallet={handleAddWallet} />
        
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {loading && <LoadingSpinner />}
        
        {!loading && wallets.length > 0 && (
          <>
            <AggregatedPositions 
              positions={aggregatedData.positions}
              totalPnl={aggregatedData.totalPnl}
              totalUsdValue={aggregatedData.totalUsdValue}
              totalUsdPnl={aggregatedData.totalUsdPnl}
            />
            <WalletList 
              wallets={wallets}
              onRemove={handleRemoveWallet}
            />
          </>
        )}

        {!loading && wallets.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            Add a wallet address to view positions
          </p>
        )}
      </div>
    </div>
  );
}

export default App;