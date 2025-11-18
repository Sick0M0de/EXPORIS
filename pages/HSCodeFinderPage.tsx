
import React, { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { SearchIcon, CheckCircleIcon, AlertTriangleIcon } from '../components/Icons';
import { getHSCodeSuggestions } from '../services/geminiService';
import LoadingSpinner from '../components/LoadingSpinner';

interface HSCodeSuggestion {
    code: string;
    description: string;
    dutyUSA: string;
    dutyEU: string;
    restrictions: string;
}

const HSCodeFinderPage: React.FC = () => {
  const [productDescription, setProductDescription] = useState('');
  const [suggestedCodes, setSuggestedCodes] = useState<HSCodeSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFindCode = async () => {
    if (!productDescription.trim()) {
        setError("Please enter a product description.");
        return;
    }
    setIsLoading(true);
    setError(null);
    setSuggestedCodes([]);

    try {
        const resultString = await getHSCodeSuggestions(productDescription);
        const results = JSON.parse(resultString) as HSCodeSuggestion[];
        setSuggestedCodes(results);
    } catch (e) {
        console.error(e);
        setError("Failed to fetch HS code suggestions. Please try again.");
    } finally {
        setIsLoading(false);
    }
  };


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-brand-gray-900 dark:text-white">HS Code Finder</h1>
        <p className="text-lg text-brand-gray-600 dark:text-brand-gray-400 mt-2">Find the right Harmonized System code for your products instantly.</p>
      </header>

      <Card className="max-w-3xl mx-auto">
        <div className="relative">
          <input
            type="text"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="Describe your product, e.g., 'roasted coffee beans'"
            className="w-full pl-12 pr-4 py-4 bg-gray-100 dark:bg-brand-gray-800 border border-gray-300 dark:border-brand-gray-700 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-brand-purple"
          />
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
        </div>
        <div className="text-center mt-4">
          <Button size="lg" onClick={handleFindCode} disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Find HS Code'}
          </Button>
        </div>
      </Card>
      
      <div className="mt-12">
        {isLoading && <LoadingSpinner />}
        {error && <p className="text-center text-red-500">{error}</p>}
        
        {suggestedCodes.length > 0 && (
          <>
            <h2 className="text-2xl font-bold text-center mb-6">AI Suggested Codes for "{productDescription}"</h2>
            <div className="space-y-4">
              {suggestedCodes.map((code, index) => (
                <Card key={index} className={index === 0 ? "border-2 border-brand-teal shadow-brand-teal/20" : ""}>
                  <div className="flex flex-col md:flex-row justify-between items-start">
                    <div>
                      {index === 0 && <span className="text-xs font-semibold uppercase text-brand-teal">Top Match</span>}
                      <h3 className={`font-mono font-bold text-brand-gray-800 dark:text-white mt-1 ${index === 0 ? 'text-3xl' : 'text-2xl'}`}>{code.code}</h3>
                      <p className="text-brand-gray-600 dark:text-brand-gray-400">{code.description}</p>
                    </div>
                    <div className="mt-4 md:mt-0 text-left md:text-right">
                      <p className="font-semibold">Duty Preview (USA): <span className={code.dutyUSA === '0%' ? 'text-green-500' : 'text-red-500'}>{code.dutyUSA}</span></p>
                      <p className="font-semibold">Duty Preview (EU): <span className={code.dutyEU === '0%' ? 'text-green-500' : 'text-red-500'}>{code.dutyEU}</span></p>
                       {code.restrictions && code.restrictions.toLowerCase() !== 'none' && code.restrictions.toLowerCase() !== 'no special restrictions' ? (
                          <div className="flex items-center gap-2 mt-2 justify-start md:justify-end text-yellow-500">
                            <AlertTriangleIcon className="w-5 h-5"/>
                            <span className="font-semibold">{code.restrictions}</span>
                          </div>
                       ) : (
                          <div className="flex items-center gap-2 mt-2 justify-start md:justify-end text-green-500">
                              <CheckCircleIcon className="w-5 h-5"/>
                              <span className="font-semibold">No special restrictions</span>
                          </div>
                       )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>

    </div>
  );
};

export default HSCodeFinderPage;
