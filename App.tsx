import React, { useState, useCallback } from 'react';
import { Order, OrderStatus, ApiLogEntry } from './types';
import Header from './components/Header';
import TradingTerminal from './components/TradingTerminal';
import OrderLog from './components/OrderLog';
import Notification from './components/Notification';
import * as binanceService from './services/binanceService';
import DerivativesPanel from './components/DerivativesPanel';
import MarketDataPanel from './components/MarketDataPanel';

export default function App() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [apiLogs, setApiLogs] = useState<ApiLogEntry[]>([]);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
  };

  const addApiLog = useCallback((log: Omit<ApiLogEntry, 'id' | 'timestamp'>) => {
    setApiLogs(prevLogs =>
      [
        ...prevLogs,
        {
          ...log,
          id: `LOG-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          timestamp: new Date().toISOString(),
        },
      ].slice(-50) // Keep the last 50 logs
    );
  }, []);

  const handlePlaceOrder = useCallback(async (newOrderData: Omit<Order, 'id' | 'timestamp' | 'status'>) => {
    const submittedOrder: Order = {
      ...newOrderData,
      id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      timestamp: new Date().toISOString(),
      status: OrderStatus.SUBMITTED,
    };
    
    setOrders(prevOrders => [submittedOrder, ...prevOrders]);
    showNotification('Submitting order...', 'success');

    try {
      const response = await binanceService.placeOrder(newOrderData, addApiLog);
      
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === submittedOrder.id
            ? { ...order, status: OrderStatus.FILLED }
            : order
        )
      );
      showNotification(`Order #${response.orderId} placed successfully!`, 'success');

    } catch (error) {
      console.error("Failed to place order:", error);
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === submittedOrder.id
            ? { ...order, status: OrderStatus.FAILED }
            : order
        )
      );
      const errorMessage = (error as { msg?: string })?.msg || 'An unknown error occurred.';
      showNotification(`Order failed: ${errorMessage}`, 'error');
    }
  }, [addApiLog]);

  return (
    <div className="min-h-screen bg-[#181A20] text-gray-200 font-sans flex flex-col">
      <Header />
      <main className="flex-grow p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DerivativesPanel />
          <MarketDataPanel />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <TradingTerminal onPlaceOrder={handlePlaceOrder} apiLogs={apiLogs} />
          </div>
          <div className="lg:col-span-2">
            <OrderLog orders={orders} />
          </div>
        </div>
      </main>
      <footer className="w-full py-4 text-center text-gray-500 text-sm border-t border-gray-800">
        Developed by Shijilan 2025
      </footer>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}