
import React, { useState, useEffect, useContext } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../components/Card';
import Button from '../components/Button';
import { BotIcon } from '../components/Icons';
import { getAIPriceInsights, getLogisticsCost, getProfitMarginAnalysis } from '../services/geminiService';
import { ProductContext } from '../App';
import type { CostEstimate } from '../types';

const initialMarketPriceData = [
  { month: 'Jan', 'Market Avg': 4000, 'Your Price': 3900 },
  { month: 'Feb', 'Market Avg': 4100, 'Your Price': 4000 },
  { month: 'Mar', 'Market Avg': 3900, 'Your Price': 3950 },
  { month: 'Apr', 'Market Avg': 4200, 'Your Price': 4100 },
  { month: 'May', 'Market Avg': 4300, 'Your Price': 4250 },
  { month: 'Jun', 'Market Avg': 4500, 'Your Price': 4400 },
];

interface AIInsights {
    opportunity?: string;
    warning?: string;
    suggestion?: string;
    marketPriceData?: { month: string; 'Market Avg': number; 'Your Price': number }[];
}

const PricingInsightsPage: React.FC = () => {
    const productContext = useContext(ProductContext);
    const [insights, setInsights] = useState<AIInsights | null>(null);
    const [isLoadingInsights, setIsLoadingInsights] = useState(true);
    const [marketPriceData, setMarketPriceData] = useState(initialMarketPriceData);

    // State for calculators
    const [sellingPrice, setSellingPrice] = useState('');
    const [costOfGoods, setCostOfGoods] = useState('');
    const [profitMargin, setProfitMargin] = useState<number | null>(null);
    const [marginAnalysis, setMarginAnalysis] = useState<string | null>(null);
    const [isCalculatingMargin, setIsCalculatingMargin] = useState(false);

    const [shippingTo, setShippingTo] = useState('USA');
    const [shippingWeight, setShippingWeight] = useState('');
    const [estimatedCost, setEstimatedCost] = useState<CostEstimate | null>(null);
    const [isEstimatingCost, setIsEstimatingCost] = useState(false);

    useEffect(() => {
        if (!productContext?.product.name) return;

        const fetchInsights = async () => {
            setIsLoadingInsights(true);
            try {
                const resultString = await getAIPriceInsights(productContext.product.name, 'USA');
                const result = JSON.parse(resultString) as AIInsights;
                setInsights(result);
                if (result.marketPriceData && result.marketPriceData.length > 0) {
                    setMarketPriceData(result.marketPriceData);
                }

            } catch (error) {
                console.error("Failed to fetch AI insights:", error);
                setInsights({
                    warning: "Could not retrieve AI insights at this time."
                });
            } finally {
                setIsLoadingInsights(false);
            }
        };

        fetchInsights();
    }, [productContext?.product.name]);

    const handleCalculateMargin = async () => {
        const selling = parseFloat(sellingPrice);
        const cost = parseFloat(costOfGoods);

        if (isNaN(selling) || isNaN(cost) || selling <= 0 || selling < cost) {
            setMarginAnalysis("Please enter valid selling price and cost of goods.");
            setProfitMargin(null);
            return;
        }

        const margin = ((selling - cost) / selling) * 100;
        setProfitMargin(margin);
        
        setIsCalculatingMargin(true);
        setMarginAnalysis(null);
        try {
            if (productContext?.product.name) {
                const analysis = await getProfitMarginAnalysis(productContext.product.name, margin, shippingTo);
                setMarginAnalysis(analysis);
            }
        } catch (e) {
            console.error("Failed to get margin analysis", e);
            setMarginAnalysis("Could not analyze margin at this time.");
        } finally {
            setIsCalculatingMargin(false);
        }
    };
    
    const handleEstimateCost = async () => {
        if (!shippingWeight || !shippingTo || !productContext?.product.name) return;
        
        setIsEstimatingCost(true);
        setEstimatedCost(null);
        try {
             const resultString = await getLogisticsCost(productContext.product.name, "Mumbai, India", shippingTo, parseInt(shippingWeight));
            setEstimatedCost(JSON.parse(resultString));
        } catch (e) {
            console.error("Failed to estimate logistics cost", e);
        } finally {
            setIsEstimatingCost(false);
        }
    };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-brand-gray-900 dark:text-white">Pricing Insights</h1>
        <p className="text-lg text-brand-gray-600 dark:text-brand-gray-400 mt-2">
            Pricing analysis for <span className="font-semibold text-brand-teal">{productContext?.product.name || 'your product'}</span>.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <h3 className="font-bold text-xl mb-4 text-brand-gray-800 dark:text-gray-100">Market Price Comparison (USD per Ton)</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={marketPriceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
                <XAxis dataKey="month" stroke="currentColor" />
                <YAxis stroke="currentColor" />
                <Tooltip 
                    contentStyle={{
                        backgroundColor: 'rgba(33, 37, 41, 0.8)',
                        borderColor: '#00F5D4',
                        color: 'white'
                    }}
                />
                <Legend />
                <Line type="monotone" dataKey="Market Avg" stroke="#00F5D4" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Your Price" stroke="#9B5DE5" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <Card>
              <h3 className="font-bold text-lg mb-4">Profit Margin Calculator</h3>
              <div className="space-y-4">
                <input type="number" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} placeholder="Selling Price ($)" className="w-full p-2 bg-gray-100 dark:bg-brand-gray-800 rounded-md" />
                <input type="number" value={costOfGoods} onChange={(e) => setCostOfGoods(e.target.value)} placeholder="Cost of Goods ($)" className="w-full p-2 bg-gray-100 dark:bg-brand-gray-800 rounded-md" />
                <Button onClick={handleCalculateMargin} disabled={isCalculatingMargin} className="w-full">{isCalculatingMargin ? 'Analyzing...' : 'Calculate & Analyze'}</Button>
                <div className="text-center pt-2">
                    <p className="text-brand-gray-500">Profit Margin</p>
                    <p className="text-3xl font-bold text-brand-teal h-10">{profitMargin !== null ? `${profitMargin.toFixed(1)}%` : '-'}</p>
                </div>
                {marginAnalysis && (
                    <div className="text-sm p-2 bg-gray-100 dark:bg-brand-gray-800 rounded-md">{marginAnalysis}</div>
                )}
              </div>
            </Card>
            <Card>
              <h3 className="font-bold text-lg mb-4">Logistics Cost Estimator</h3>
              <div className="space-y-4">
                <select value={shippingTo} onChange={(e) => setShippingTo(e.target.value)} className="w-full p-2 bg-gray-100 dark:bg-brand-gray-800 rounded-md">
                    <option>USA</option>
                    <option>Germany</option>
                    <option>UAE</option>
                </select>
                <input value={shippingWeight} onChange={(e) => setShippingWeight(e.target.value)} type="number" placeholder="Weight (kg)" className="w-full p-2 bg-gray-100 dark:bg-brand-gray-800 rounded-md" />
                <Button onClick={handleEstimateCost} disabled={isEstimatingCost} className="w-full">{isEstimatingCost ? 'Estimating...' : 'Estimate'}</Button>
                <div className="text-center pt-2">
                    <p className="text-brand-gray-500">Estimated Cost</p>
                    <p className="text-3xl font-bold text-brand-purple h-10">{estimatedCost ? `${estimatedCost.currency} ${estimatedCost.low} - ${estimatedCost.high}`: '-'}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <aside className="lg:col-span-1">
          <Card className="sticky top-24">
             <div className="flex items-center gap-3 mb-4">
                <BotIcon className="w-8 h-8 text-brand-purple" />
                <h3 className="font-bold text-xl text-brand-gray-800 dark:text-gray-100">AI Insights</h3>
            </div>
            {isLoadingInsights ? (
                <div className="flex justify-center items-center h-48">
                    <div className="w-4 h-4 bg-brand-teal rounded-full animate-bounce delay-0"></div>
                    <div className="w-4 h-4 bg-brand-teal rounded-full animate-bounce delay-150 mx-2"></div>
                    <div className="w-4 h-4 bg-brand-teal rounded-full animate-bounce delay-300"></div>
                </div>
            ) : (
                <div className="space-y-4 text-sm">
                    {insights?.opportunity && (
                        <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-lg text-green-800 dark:text-green-300">
                            <strong>Opportunity:</strong> {insights.opportunity}
                        </div>
                    )}
                    {insights?.warning && (
                        <div className="p-3 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg text-yellow-800 dark:text-yellow-300">
                            <strong>Warning:</strong> {insights.warning}
                        </div>
                    )}
                    {insights?.suggestion && (
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg text-blue-800 dark:text-blue-300">
                            <strong>Suggestion:</strong> {insights.suggestion}
                        </div>
                    )}
                </div>
            )}
          </Card>
        </aside>
      </div>
    </div>
  );
};

export default PricingInsightsPage;