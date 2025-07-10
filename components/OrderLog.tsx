import React from 'react';
import { Order, OrderSide, OrderStatus } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { ScrollArea } from './ui/ScrollArea';

interface OrderLogProps {
  orders: Order[];
}

const statusColorMap: Record<OrderStatus, string> = {
  [OrderStatus.SUBMITTED]: 'text-yellow-400 bg-yellow-400/10',
  [OrderStatus.FILLED]: 'text-green-400 bg-green-400/10',
  [OrderStatus.CANCELED]: 'text-gray-400 bg-gray-400/10',
  [OrderStatus.FAILED]: 'text-red-400 bg-red-400/10',
};

const sideColorMap: Record<OrderSide, string> = {
  [OrderSide.BUY]: 'text-green-400',
  [OrderSide.SELL]: 'text-red-400',
};

const OrderLog: React.FC<OrderLogProps> = ({ orders }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Order History & Status</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-0">
        <ScrollArea className="h-[600px]">
          <div className="relative">
            <table className="w-full text-sm text-left text-gray-400">
              <thead className="text-xs text-gray-300 uppercase bg-gray-900/60 sticky top-0 backdrop-blur-sm">
                <tr>
                  <th scope="col" className="px-4 py-3">Symbol</th>
                  <th scope="col" className="px-4 py-3">Type</th>
                  <th scope="col" className="px-4 py-3">Side</th>
                  <th scope="col" className="px-4 py-3 text-right">Amount</th>
                  <th scope="col" className="px-4 py-3 text-right">Price</th>
                  <th scope="col" className="px-4 py-3">Time</th>
                  <th scope="col" className="px-4 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 && (
                    <tr>
                        <td colSpan={7} className="text-center py-10 text-gray-500">No orders placed yet.</td>
                    </tr>
                )}
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="px-4 py-3 font-medium text-gray-200">{order.symbol}</td>
                    <td className="px-4 py-3">{order.type}</td>
                    <td className={`px-4 py-3 font-semibold ${sideColorMap[order.side]}`}>{order.side}</td>
                    <td className="px-4 py-3 text-right">{order.amount.toFixed(4)}</td>
                    <td className="px-4 py-3 text-right">
                      {order.price ? order.price.toFixed(2) : 'Market'}
                    </td>
                    <td className="px-4 py-3">{new Date(order.timestamp).toLocaleTimeString()}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-1 text-xs rounded-md ${statusColorMap[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default OrderLog;