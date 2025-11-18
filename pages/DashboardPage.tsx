
import React, { useContext, useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Card from '../components/Card';
import { CheckCircleIcon, AlertTriangleIcon } from '../components/Icons';
import Button from '../components/Button';
import { ProductContext } from '../App';
import { getDashboardData, getImporterDetails, getLogisticsCost } from '../services/geminiService';
import type { DashboardData, Importer, ImporterDetails, CostEstimate } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import ProductSelector from '../components/ProductSelector';
import ImporterDetailModal from '../components/ImporterDetailModal';


const COLORS = ['#00F5D4', '#9B5DE5', '#F15BB5', '#FEE440'];

const DashboardPage: React.FC = () => {
    const productContext = useContext(ProductContext);
    const [data, setData] = useState<DashboardData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // State for importer details modal
    const [selectedImporter, setSelectedImporter] = useState<Importer | null>(null);
    const [importerDetails, setImporterDetails] = useState<ImporterDetails | null>(null);
    const [isLoadingDetails, setIsLoadingDetails] = useState(false);

    // State for logistics estimator
    const [logisticsFrom, setLogisticsFrom] = useState('');
    const [logisticsTo, setLogisticsTo] = useState('');
    const [logisticsWeight, setLogisticsWeight] = useState('');
    const [estimatedCost, setEstimatedCost] = useState<CostEstimate | null>(null);
    const [isEstimating, setIsEstimating] = useState(false);

    useEffect(() => {
        if (!productContext?.product.name) return;
        
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const resultString = await getDashboardData(productContext.product.name);
                const result = JSON.parse(resultString) as DashboardData;
                setData(result);
            } catch (e) {
                console.error(e);
                setError("Failed to fetch dashboard data. The AI might be busy. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [productContext?.product.name]);
    
    const handleViewDetails = async (importer: Importer) => {
        setSelectedImporter(importer);
        setIsLoadingDetails(true);
        try {
            const resultString = await getImporterDetails(importer.name, importer.country, importer.product);
            setImporterDetails(JSON.parse(resultString));
        } catch (e) {
            console.error(e);
            // Handle error state in modal if necessary
        } finally {
            setIsLoadingDetails(false);
        }
    };

    const handleEstimateCost = async () => {
        if (!logisticsFrom || !logisticsTo || !logisticsWeight || !productContext?.product.name) {
            // Basic validation
            return;
        }
        setIsEstimating(true);
        setEstimatedCost(null);
        try {
            const resultString = await getLogisticsCost(productContext.product.name, logisticsFrom, logisticsTo, parseInt(logisticsWeight));
            setEstimatedCost(JSON.parse(resultString));
        } catch(e) {
            console.error("Failed to estimate cost", e);
        } finally {
            setIsEstimating(false);
        }
    };

    const renderContent = () => {
        if (isLoading) {
            return <div className="flex justify-center items-center h-[calc(100vh-350px)]"><LoadingSpinner /></div>;
        }
        
        if (error || !data) {
            return <div className="text-center py-20 text-red-500">{error || "No data available."}</div>;
        }

        const riskColor = data.overallRisk.level === 'Low' ? 'text-green-500' : data.overallRisk.level === 'Moderate' ? 'text-yellow-500' : 'text-red-500';

        return (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
                {/* Top Row */}
                <Card className="lg:col-span-1 animate-slide-up" style={{ animationDelay: '100ms' }}>
                    <h3 className="font-bold text-lg text-brand-gray-800 dark:text-gray-100">HS Code</h3>
                    <p className="text-brand-gray-600 dark:text-gray-400 text-sm mb-4">For "{productContext?.product.name}"</p>
                    <div className="bg-gray-100 dark:bg-brand-gray-800 p-4 rounded-lg text-center">
                        <p className="text-2xl font-mono font-bold text-brand-teal">{data.hsCode}</p>
                    </div>
                </Card>
                <Card className="lg:col-span-1 animate-slide-up" style={{ animationDelay: '200ms' }}>
                    <h3 className="font-bold text-lg text-brand-gray-800 dark:text-gray-100">Overall Risk Score</h3>
                    <div className="flex items-center justify-center mt-4">
                        <div className={`text-5xl font-extrabold ${riskColor}`}>{data.overallRisk.score}</div>
                        <AlertTriangleIcon className={`w-10 h-10 ml-4 ${riskColor}`}/>
                    </div>
                    <p className={`text-center ${riskColor} text-sm mt-2`}>{data.overallRisk.level} Risk</p>
                </Card>
                <Card className="lg:col-span-1 animate-slide-up" style={{ animationDelay: '300ms' }}>
                    <h3 className="font-bold text-lg text-brand-gray-800 dark:text-gray-100">Document Status</h3>
                    <div className="flex items-center justify-center mt-4">
                        <div className="text-5xl font-extrabold text-green-500">{data.documentStatus}%</div>
                        <CheckCircleIcon className="w-10 h-10 ml-4 text-green-500"/>
                    </div>
                    <p className="text-center text-green-500 text-sm mt-2">Ready for Export</p>
                </Card>

                {/* Second Row */}
                <Card className="lg:col-span-2 animate-slide-up" style={{ animationDelay: '400ms' }}>
                <h3 className="font-bold text-xl mb-4 text-brand-gray-800 dark:text-gray-100">Top 5 Export Countries</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data.topCountries} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00F5D4" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#9B5DE5" stopOpacity={0.8}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
                    <XAxis dataKey="name" stroke="currentColor" />
                    <YAxis stroke="currentColor" />
                    <Tooltip
                        contentStyle={{
                        backgroundColor: 'rgba(33, 37, 41, 0.8)',
                        borderColor: '#00F5D4',
                        color: 'white'
                        }}
                    />
                    <Bar dataKey="value" fill="url(#colorUv)" />
                    </BarChart>
                </ResponsiveContainer>
                </Card>
                <Card className="lg:col-span-1 animate-slide-up" style={{ animationDelay: '500ms' }}>
                <h3 className="font-bold text-xl mb-4 text-brand-gray-800 dark:text-gray-100">Risk Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                    <Pie data={data.riskDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
                        {data.riskDistribution.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(33, 37, 41, 0.8)', borderColor: '#00F5D4' }} />
                    </PieChart>
                </ResponsiveContainer>
                </Card>
                
                {/* Third row */}
                <Card className="lg:col-span-3 animate-slide-up" style={{ animationDelay: '600ms' }}>
                    <h3 className="font-bold text-xl mb-4 text-brand-gray-800 dark:text-gray-100">Potential Importers</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b dark:border-brand-gray-700">
                                    <th className="p-3">Company Name</th>
                                    <th className="p-3">Country</th>
                                    <th className="p-3">Product Interest</th>
                                    <th className="p-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.importers.map(importer => (
                                <tr key={importer.id} className="border-b dark:border-brand-gray-800 hover:bg-gray-50 dark:hover:bg-brand-gray-800/50">
                                    <td className="p-3 font-medium">{importer.name}</td>
                                    <td className="p-3">{importer.country}</td>
                                    <td className="p-3"><span className="bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">{importer.product}</span></td>
                                    <td className="p-3"><Button size="sm" variant="outline" onClick={() => handleViewDetails(importer)}>View Details</Button></td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {/* Bottom row */}
                <Card className="lg:col-span-2 animate-slide-up" style={{ animationDelay: '700ms' }}>
                    <h3 className="font-bold text-xl mb-4 text-brand-gray-800 dark:text-gray-100">Logistics Cost Estimator</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input value={logisticsFrom} onChange={(e) => setLogisticsFrom(e.target.value)} placeholder="From (City, Country)" className="w-full px-4 py-3 bg-gray-100 dark:bg-brand-gray-800 border-gray-300 dark:border-brand-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple" />
                        <input value={logisticsTo} onChange={(e) => setLogisticsTo(e.target.value)} placeholder="To (City, Country)" className="w-full px-4 py-3 bg-gray-100 dark:bg-brand-gray-800 border-gray-300 dark:border-brand-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple" />
                        <input value={logisticsWeight} onChange={(e) => setLogisticsWeight(e.target.value)} placeholder="Weight (kg)" type="number" className="w-full px-4 py-3 bg-gray-100 dark:bg-brand-gray-800 border-gray-300 dark:border-brand-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple" />
                        <Button onClick={handleEstimateCost} disabled={isEstimating} className="w-full">{isEstimating ? 'Estimating...' : 'Estimate Cost'}</Button>
                    </div>
                    {estimatedCost && (
                         <p className="text-center mt-4 text-2xl font-bold">{`${estimatedCost.currency} ${estimatedCost.low} - ${estimatedCost.high}`} <span className="text-sm font-normal text-gray-500">(estimated)</span></p>
                    )}
                </Card>
                <Card className="lg:col-span-1 flex flex-col items-center justify-center text-center animate-slide-up" style={{ animationDelay: '800ms' }}>
                    <h3 className="font-bold text-xl mb-4 text-brand-gray-800 dark:text-gray-100">Generate Report</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">Compile all your dashboard insights into a single, shareable PDF document.</p>
                    <Button size="lg" variant="primary">Export PDF</Button>
                </Card>
            </div>
        );
    }
    
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-brand-gray-900 dark:text-white">Live Export Intelligence</h1>
        <p className="text-lg text-brand-gray-600 dark:text-brand-gray-400 mt-2">
            Analyze any product to uncover global opportunities.
        </p>
      </header>

      <Card className="mb-8">
        <ProductSelector />
      </Card>
      
      {renderContent()}

      {selectedImporter && (
        <ImporterDetailModal
          importer={selectedImporter}
          details={importerDetails}
          isLoading={isLoadingDetails}
          onClose={() => {
            setSelectedImporter(null);
            setImporterDetails(null);
          }}
        />
      )}

    </div>
  );
};

export default DashboardPage;