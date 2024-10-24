import { Position, WalletPositions } from '../types';

export const aggregatePositions = (wallets: WalletPositions[]): {
  positions: Position[];
  totalPnl: number;
  totalUsdValue: number;
  totalUsdPnl: number;
} => {
  const positionMap = new Map<string, Position>();
  
  wallets.forEach(wallet => {
    wallet.positions.forEach(position => {
      const existing = positionMap.get(position.asset);
      
      if (existing) {
        // Weighted average for entry price
        const totalSize = existing.size + position.size;
        const newEntryPrice = (existing.entryPrice * existing.size + position.entryPrice * position.size) / totalSize;
        const newUsdValue = existing.usdValue + position.usdValue;
        const newUsdPnl = existing.usdPnl + position.usdPnl;
        
        positionMap.set(position.asset, {
          asset: position.asset,
          size: totalSize,
          entryPrice: newEntryPrice,
          currentPrice: position.currentPrice, // Use latest price
          leverage: Math.max(existing.leverage, position.leverage),
          pnl: (newUsdPnl / (newUsdValue - newUsdPnl)) * 100, // Recalculate percentage PnL
          liquidationPrice: Math.min(existing.liquidationPrice, position.liquidationPrice),
          usdValue: newUsdValue,
          usdPnl: newUsdPnl
        });
      } else {
        positionMap.set(position.asset, { ...position });
      }
    });
  });

  const aggregatedPositions = Array.from(positionMap.values());
  const totalUsdValue = aggregatedPositions.reduce((sum, pos) => sum + pos.usdValue, 0);
  const totalUsdPnl = aggregatedPositions.reduce((sum, pos) => sum + pos.usdPnl, 0);
  const totalPnl = (totalUsdPnl / (totalUsdValue - totalUsdPnl)) * 100;

  return {
    positions: aggregatedPositions,
    totalPnl,
    totalUsdValue,
    totalUsdPnl,
  };
};