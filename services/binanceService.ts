
import { Order, ApiLogEntry, LogType, OrderType } from '../types';

const MOCK_API_URL = 'https://testnet.binancefuture.com/fapi/v1/order';

// Helper to simulate network delay
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * This function simulates placing an order on Binance.
 * In a real app, this would make an HTTP request to the Binance API.
 * For security reasons (to not expose API keys in the frontend),
 * this logic should live on a secure backend server.
 */
export const placeOrder = async (
  order: Omit<Order, 'id' | 'timestamp' | 'status'>,
  addLog: (log: Omit<ApiLogEntry, 'id' | 'timestamp'>) => void
): Promise<{ orderId: number; symbol: string; status: string }> => {
  const requestPayload = {
    symbol: order.symbol,
    side: order.side.toUpperCase(),
    type: order.type === OrderType.STOP_LIMIT ? 'STOP_LIMIT' : order.type.toUpperCase(),
    quantity: order.amount,
    ...(order.price && { price: order.price }),
    ...(order.stopPrice && { stopPrice: order.stopPrice }),
    timeInForce: order.type === OrderType.LIMIT || order.type === OrderType.STOP_LIMIT ? 'GTC' : undefined,
  };

  addLog({
    type: LogType.REQUEST,
    method: 'POST',
    endpoint: MOCK_API_URL,
    data: requestPayload,
  });

  await sleep(1000 + Math.random() * 1000); // Simulate network latency

  // Simulate API success/failure
  if (Math.random() > 0.15) { // 85% success rate
    const responsePayload = {
      orderId: Math.floor(Math.random() * 1000000000),
      symbol: order.symbol,
      status: 'NEW',
      clientOrderId: `mock_${Date.now()}`,
      price: order.price || '0',
      avgPrice: '0.00000',
      origQty: order.amount,
      executedQty: '0.00000',
      cumQuote: '0',
      timeInForce: 'GTC',
      type: requestPayload.type,
      side: requestPayload.side,
      stopPrice: order.stopPrice || '0',
      time: Date.now(),
      updateTime: Date.now(),
      workingType: 'CONTRACT_PRICE',
      activatePrice: '0',
      priceRate: '0',
      origType: requestPayload.type,
      positionSide: 'BOTH',
    };
    addLog({
      type: LogType.RESPONSE,
      method: 'POST',
      endpoint: MOCK_API_URL,
      data: responsePayload,
    });
    return Promise.resolve(responsePayload);
  } else { // 15% failure rate
    const errorPayload = {
      code: -2011,
      msg: 'Invalid order parameters. Check price and quantity.',
    };
    addLog({
      type: LogType.ERROR,
      method: 'POST',
      endpoint: MOCK_API_URL,
      data: errorPayload,
    });
    return Promise.reject(errorPayload);
  }
};
