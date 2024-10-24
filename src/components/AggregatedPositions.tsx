import React from 'react';
import { Position } from '../types';
import { PositionCard } from './PositionCard';
import { formatUSD } from '../utils/formatters';

interface AggregatedPositionsProps {
  positions: Position[];
  totalPnl: number;
  totalUsdValue: number;
  totalUsdPnl: number;
}

export const AggregatedPositions: React.FC<AggregatedPositionsProps> = ({ 
  positions, 
  totalPnl, 
  totalUsdValue,
  totalUsdPnl 
}) => {
  return (
    <div className="mb-8 bg-gray-50 p-6 rounded-xl">
      <div className="mb-4">
        <h2 className="text-xl font-bold">Aggregated Positions</h2>
        <div className="mt-2 space-y-1">
          <p className="text-gray-600">
            Total Value: <span className="font-semibold">{formatUSD(totalUsdValue)}</span>
          </p>
          <p className={`font-semibold ${totalPnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            Total PnL: {formatUSD(totalUsdPnl)} ({totalPnl >= 0 ? '+' : ''}{totalPnl.toFixed(2)}%)
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {positions.map((position) => (
          <PositionCard key={position.asset} position={position} />
        ))}
      </div>
    </div>
  );
};