import React from 'react';
import { Order, ApiLogEntry } from '../types';
import OrderForm from './OrderForm';
import ApiLog from './ApiLog';

interface TradingTerminalProps {
  onPlaceOrder: (order: Omit<Order, 'id' | 'timestamp' | 'status'>) => void;
  apiLogs: ApiLogEntry[];
}

const TradingTerminal: React.FC<TradingTerminalProps> = ({ onPlaceOrder, apiLogs }) => {
  return (
    <div className="space-y-6">
      <OrderForm onPlaceOrder={onPlaceOrder} />
      <ApiLog logs={apiLogs} />
    </div>
  );
};

export default TradingTerminal;