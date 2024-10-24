import React from 'react';
import { WalletPositions } from '../types';

interface WalletListProps {
  wallets: WalletPositions[];
  onRemove: (address: string) => void;
}

export const WalletList: React.FC<WalletListProps> = ({ wallets, onRemove }) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-4">Tracked Wallets</h2>
      <div className="space-y-2">
        {wallets.map((wallet) => (
          <div key={wallet.address} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
            <span className="font-mono">
              {`${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}`}
            </span>
            <button
              onClick={() => onRemove(wallet.address)}
              className="text-red-600 hover:text-red-800 transition-colors text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};