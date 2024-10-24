import React from 'react';
import { Position } from '../types';
import { formatUSD } from '../utils/formatters';

interface PositionCardProps {
  position: Position;
}

export const PositionCard: React.FC<PositionCardProps> = ({ position }) => {
  const pnlColor = position.pnl >= 0 ? 'text-green-600' : 'text-red-600';

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{position.asset}</h3>
        <div className="text-right">
          <span className={`font-bold ${pnlColor} block`}>
            {formatUSD(position.usdPnl)}
          </span>
          <span className={`text-sm ${pnlColor}`}>
            ({position.pnl >= 0 ? '+' : ''}{position.pnl.toFixed(2)}%)
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="text-gray-600">Size</p>
          <p className="font-medium">{position.size.toFixed(4)} ({formatUSD(position.usdValue)})</p>
        </div>
        <div>
          <p className="text-gray-600">Entry Price</p>
          <p className="font-medium">{formatUSD(position.entryPrice)}</p>
        </div>
        <div>
          <p className="text-gray-600">Current Price</p>
          <p className="font-medium">{formatUSD(position.currentPrice)}</p>
        </div>
        <div>
          <p className="text-gray-600">Leverage</p>
          <p className="font-medium">{position.leverage}x</p>
        </div>
        <div className="col-span-2">
          <p className="text-gray-600">Liquidation Price</p>
          <p className="font-medium">{formatUSD(position.liquidationPrice)}</p>
        </div>
      </div>
    </div>
  );
};