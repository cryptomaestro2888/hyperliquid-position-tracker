import axios from 'axios';
import { Position, WalletPositions } from '../types';

const API_URL = 'https://api.hyperliquid.xyz/info';

interface HyperliquidPosition {
  coin: string;
  position: {
    size: string;
    entryPx: string;
    leverage: string;
    liqPx: string;
    unrealizedPnl: string;
    notional: string;
    markPx: string;
  };
}

interface ApiResponse {
  assetPositions: HyperliquidPosition[];
}

const fetchWalletPositions = async (address: string): Promise<WalletPositions> => {
  try {
    const response = await axios.post<ApiResponse>(API_URL, {
      type: "userState",
      user: address
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.data || !response.data.assetPositions) {
      throw new Error('Invalid API response format');
    }

    const positions: Position[] = response.data.assetPositions
      .filter(pos => pos.position && parseFloat(pos.position.size) !== 0)
      .map(pos => {
        const size = parseFloat(pos.position.size);
        const entryPrice = parseFloat(pos.position.entryPx);
        const currentPrice = parseFloat(pos.position.markPx);
        const usdValue = Math.abs(size * currentPrice);
        const usdPnl = parseFloat(pos.position.unrealizedPnl);
        const pnl = usdValue !== 0 ? (usdPnl / (usdValue - usdPnl)) * 100 : 0;

        return {
          asset: pos.coin,
          size,
          entryPrice,
          currentPrice,
          leverage: parseFloat(pos.position.leverage),
          liquidationPrice: parseFloat(pos.position.liqPx),
          pnl,
          usdValue,
          usdPnl
        };
    });

    const totalUsdValue = positions.reduce((sum, pos) => sum + pos.usdValue, 0);
    const totalUsdPnl = positions.reduce((sum, pos) => sum + pos.usdPnl, 0);
    const totalPnl = totalUsdValue !== 0 ? (totalUsdPnl / (totalUsdValue - totalUsdPnl)) * 100 : 0;

    return {
      address,
      positions,
      totalPnl,
      totalUsdValue,
      totalUsdPnl
    };
  } catch (error) {
    console.error('Error fetching positions:', error);
    if (axios.isAxiosError(error)) {
      throw new Error(`API Error: ${error.response?.data?.message || error.message}`);
    }
    throw error;
  }
};

export const hyperliquidApi = {
  fetchWalletPositions
};