
import React, { useState, useCallback } from 'react';
import { fetchMarketAnalysis } from '../services/geminiService';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card';
import { Button } from './ui/Button';
import { BrainCircuit } from 'lucide-react';

interface MarketAnalysisProps {
  symbol: string;
}

const MarketAnalysis: React.FC<MarketAnalysisProps> = ({ symbol }) => {
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetchAnalysis = useCallback(async () => {
    setIsLoading(true);
    setError('');
    setAnalysis('');
    try {
      const result = await fetchMarketAnalysis(symbol);
      setAnalysis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [symbol]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-cyan-400" />
          <span>AI Market Analysis</span>
        </CardTitle>
        <CardDescription>Get an AI-generated analysis for {symbol}.</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleFetchAnalysis} disabled={isLoading} className="w-full">
          {isLoading ? 'Analyzing...' : `Analyze ${symbol}`}
        </Button>
        {isLoading && (
          <div className="mt-4 text-center text-gray-400">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto"></div>
            <p className="mt-2">Gemini is thinking...</p>
          </div>
        )}
        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
        {analysis && (
          <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
            <p className="text-sm text-gray-300 whitespace-pre-wrap">{analysis}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MarketAnalysis;
