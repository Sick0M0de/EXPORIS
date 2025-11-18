
import React, { useState, useContext } from 'react';
import type { Page } from '../types';
import Card from '../components/Card';
import Button from '../components/Button';
import { BotIcon, UploadCloudIcon, MicIcon } from '../components/Icons';
import { ProductContext } from '../App';


interface ProductInputPageProps {
  setCurrentPage: (page: Page) => void;
}

const ProductInputPage: React.FC<ProductInputPageProps> = ({ setCurrentPage }) => {
    const [productDescription, setProductDescription] = useState('');
    const productContext = useContext(ProductContext);

    const handleAnalyze = () => {
        if (productContext && productDescription.trim()) {
            productContext.setProduct({ name: productDescription.trim() });
            setCurrentPage('Dashboard');
        } else {
            // Optional: show an error if no description is entered
        }
    };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-brand-gray-900 dark:text-white">Let's Analyze Your Product</h1>
        <p className="text-lg text-brand-gray-600 dark:text-brand-gray-400 mt-2">Provide details about the product you want to export.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <main className="md:col-span-3">
          <Card className="space-y-6">
            <div>
              <label className="block text-lg font-bold text-brand-gray-800 dark:text-white mb-2">Describe your product</label>
              <input 
                type="text" 
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="e.g., 'High-quality arabica coffee beans'" 
                className="w-full p-3 bg-gray-100 dark:bg-brand-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple" 
              />
            </div>
            
            <div>
              <label className="block text-lg font-bold text-brand-gray-800 dark:text-white mb-2">Or, select from a category</label>
              <select className="w-full p-3 bg-gray-100 dark:bg-brand-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple">
                <option>Agriculture</option>
                <option>Textiles & Apparel</option>
                <option>Machinery</option>
                <option>Handicrafts</option>
              </select>
            </div>
            
            <div className="text-center text-gray-400">OR</div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-brand-purple hover:bg-gray-50 dark:hover:bg-brand-gray-800/50">
                    <UploadCloudIcon className="w-12 h-12 mx-auto text-gray-400" />
                    <p className="mt-2 text-sm font-semibold">Upload an Image</p>
                    <input type="file" className="hidden" />
               </div>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-brand-purple hover:bg-gray-50 dark:hover:bg-brand-gray-800/50">
                    <MicIcon className="w-12 h-12 mx-auto text-gray-400" />
                    <p className="mt-2 text-sm font-semibold">Use Voice Input</p>
               </div>
            </div>
             <Button onClick={handleAnalyze} size="lg" className="w-full mt-4">Analyze Export Potential</Button>
          </Card>
        </main>
        <aside className="md:col-span-2">
           <Card className="sticky top-24 bg-gray-50 dark:bg-brand-gray-800">
             <div className="flex items-center gap-3 mb-4">
                <BotIcon className="w-8 h-8 text-brand-purple" />
                <h3 className="font-bold text-xl text-brand-gray-800 dark:text-gray-100">AI Guidance</h3>
            </div>
            <div className="space-y-4 text-sm text-brand-gray-600 dark:text-brand-gray-300">
               <p><strong>Be specific!</strong> Instead of "shoes", try "men's leather formal shoes".</p>
               <p><strong>Not sure?</strong> Upload an image and our AI will identify the product and suggest categories.</p>
               <p><strong>Voice Input:</strong> Just say "Analyze export potential for basmati rice from India" to get started quickly.</p>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
};

export default ProductInputPage;
