
export enum OrderType {
  MARKET = 'Market',
  LIMIT = 'Limit',
  STOP_LIMIT = 'Stop-Limit',
}

export enum OrderSide {
  BUY = 'Buy',
  SELL = 'Sell',
}

export enum OrderStatus {
  SUBMITTED = 'Submitted',
  FILLED = 'Filled',
  CANCELED = 'Canceled',
  FAILED = 'Failed',
}

export interface Order {
  id: string;
  symbol: string;
  type: OrderType;
  side: OrderSide;
  amount: number;
  price?: number;
  stopPrice?: number;
  timestamp: string;
  status: OrderStatus;
}

export enum LogType {
  REQUEST = 'Request',
  RESPONSE = 'Response',
  ERROR = 'Error',
}

export interface ApiLogEntry {
  id: string;
  timestamp: string;
  type: LogType;
  method: 'POST' | 'GET' | 'DELETE';
  endpoint: string;
  data: object;
}
