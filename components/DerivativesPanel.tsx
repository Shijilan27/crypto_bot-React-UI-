import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { CircleDollarSign, Coins, Newspaper, Bot } from 'lucide-react';
import FeatureButton from './FeatureButton';

const DerivativesPanel = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Derivatives Trading</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <FeatureButton icon={CircleDollarSign} label="USDⓈ-M" />
          <FeatureButton icon={Coins} label="COIN-M" />
          <FeatureButton icon={Newspaper} label="Vanilla Options" />
          <FeatureButton icon={Bot} label="Futures Algo" isActive={true} />
        </div>
      </CardContent>
    </Card>
  );
};

export default DerivativesPanel;