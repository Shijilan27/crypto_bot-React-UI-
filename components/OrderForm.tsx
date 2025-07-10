import React, { useState } from 'react';
import { OrderType, OrderSide, Order } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Label } from './ui/Label';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/Select';

interface OrderFormProps {
  onPlaceOrder: (order: Omit<Order, 'id' | 'timestamp' | 'status'>) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ onPlaceOrder }) => {
  const [symbol, setSymbol] = useState('BTCUSDT');
  const [orderType, setOrderType] = useState<OrderType>(OrderType.MARKET);
  const [side, setSide] = useState<OrderSide>(OrderSide.BUY);
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [stopPrice, setStopPrice] = useState('');
  const [leverage, setLeverage] = useState(10);

  const handleSubmit = (e: React.FormEvent, selectedSide: OrderSide) => {
    e.preventDefault();
    const orderAmount = parseFloat(amount);
    if (isNaN(orderAmount) || orderAmount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    const newOrder: Omit<Order, 'id' | 'timestamp' | 'status'> = {
      symbol,
      type: orderType,
      side: selectedSide,
      amount: orderAmount,
      ...(orderType === OrderType.LIMIT && { price: parseFloat(price) }),
      ...(orderType === OrderType.STOP_LIMIT && { price: parseFloat(price), stopPrice: parseFloat(stopPrice) }),
    };

    onPlaceOrder(newOrder);
    
    // Reset fields after submission
    setAmount('');
    setPrice('');
    setStopPrice('');
  };

  const handleOrderTypeChange = (value: string) => {
    setOrderType(value as OrderType);
    setPrice('');
    setStopPrice('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Place Order</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <Button variant={side === OrderSide.BUY ? 'success' : 'secondary'} onClick={() => setSide(OrderSide.BUY)}>Buy / Long</Button>
          <Button variant={side === OrderSide.SELL ? 'destructive' : 'secondary'} onClick={() => setSide(OrderSide.SELL)}>Sell / Short</Button>
        </div>

        <div>
          <Label htmlFor="symbol">Symbol</Label>
          <Input id="symbol" value={symbol} onChange={(e) => setSymbol(e.target.value.toUpperCase())} placeholder="e.g., BTCUSDT" />
        </div>

        <div>
          <Label htmlFor="orderType">Order Type</Label>
          <Select onValueChange={handleOrderTypeChange} value={orderType}>
            <SelectTrigger id="orderType">
              <SelectValue placeholder="Select order type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={OrderType.MARKET}>Market</SelectItem>
              <SelectItem value={OrderType.LIMIT}>Limit</SelectItem>
              <SelectItem value={OrderType.STOP_LIMIT}>Stop-Limit</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {orderType === OrderType.STOP_LIMIT && (
          <div>
            <Label htmlFor="stopPrice">Stop Price (USDT)</Label>
            <Input id="stopPrice" type="number" value={stopPrice} onChange={(e) => setStopPrice(e.target.value)} placeholder="e.g., 60000" />
          </div>
        )}

        {orderType !== OrderType.MARKET && (
          <div>
            <Label htmlFor="price">Limit Price (USDT)</Label>
            <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g., 60500" />
          </div>
        )}

        <div>
          <Label htmlFor="amount">Amount ({symbol.replace('USDT', '')})</Label>
          <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g., 0.01" />
        </div>

        <div>
            <Label htmlFor="leverage">Leverage ({leverage}x)</Label>
            <input
                id="leverage"
                type="range"
                min="1"
                max="125"
                value={leverage}
                onChange={(e) => setLeverage(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
        </div>

        <div className="pt-2">
          {side === OrderSide.BUY ? (
            <Button onClick={(e) => handleSubmit(e, OrderSide.BUY)} className="w-full" variant="success">Buy / Long</Button>
          ) : (
            <Button onClick={(e) => handleSubmit(e, OrderSide.SELL)} className="w-full" variant="destructive">Sell / Short</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderForm;