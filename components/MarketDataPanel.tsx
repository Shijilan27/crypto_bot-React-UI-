import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card';
import { BarChart, Rss } from 'lucide-react';
import FeatureButton from './FeatureButton';

export default function MarketDataPanel() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <BarChart className="h-7 w-7 text-yellow-400" />
          <CardTitle className="text-2xl">Market Data</CardTitle>
        </div>
        <CardDescription className="pt-2">
          Market Data at your fingertips with Binance API and Websocket Services
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FeatureButton icon={BarChart} label="Market Data" />
          <FeatureButton icon={Rss} label="Websocket" />
        </div>
      </CardContent>
    </Card>
  );
}