export interface Position {
  asset: string;
  size: number;
  entryPrice: number;
  currentPrice: number;
  leverage: number;
  pnl: number;
  liquidationPrice: number;
  usdValue: number;
  usdPnl: number;
}

export interface WalletPositions {
  address: string;
  positions: Position[];
  totalPnl: number;
  totalUsdValue: number;
  totalUsdPnl: number;
}