import React from 'react';
import { WalletPositions } from '../types';
import { PositionCard } from './PositionCard';
import { formatUSD } from '../utils/formatters';

interface WalletSummaryProps {
  walletData: WalletPositions;
  onRemove: (address: string) => void;
}

export const WalletSummary: React.FC<WalletSummaryProps> = ({ walletData, onRemove }) => {
  return (
    <div className="mb-8 bg-gray-50 p-6 rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">{`${walletData.address.slice(0, 6)}...${walletData.address.slice(-4)}`}</h2>
          <div>
            <p className="text-gray-600">
              Total Value: <span className="font-semibold">{formatUSD(walletData.totalUsdValue)}</span>
            </p>
            <p className={`font-semibold ${walletData.totalPnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              Total PnL: {formatUSD(walletData.totalUsdPnl)} ({walletData.totalPnl >= 0 ? '+' : ''}{walletData.totalPnl.toFixed(2)}%)
            </p>
          </div>
        </div>
        <button
          onClick={() => onRemove(walletData.address)}
          className="text-red-600 hover:text-red-800 transition-colors"
        >
          Remove Wallet
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {walletData.positions.map((position, index) => (
          <PositionCard key={`${walletData.address}-${position.asset}-${index}`} position={position} />
        ))}
      </div>
    </div>
  );
};