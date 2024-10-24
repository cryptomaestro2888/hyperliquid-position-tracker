import React, { useState } from 'react';
import { ethers } from 'ethers';

interface WalletInputProps {
  onAddWallet: (address: string) => void;
}

export const WalletInput: React.FC<WalletInputProps> = ({ onAddWallet }) => {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (ethers.isAddress(address)) {
        onAddWallet(address);
        setAddress('');
        setError('');
      } else {
        setError('Invalid Ethereum address');
      }
    } catch {
      setError('Invalid address format');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter wallet address"
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Wallet
        </button>
      </div>
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </form>
  );
};