
import React, { useState, useContext, useRef } from 'react';
import { ProductContext } from '../App';
import Button from './Button';

const ProductSelector: React.FC = () => {
    const productContext = useContext(ProductContext);
    const [productName, setProductName] = useState(productContext?.product.name || '');

    const handleAnalyze = () => {
        if (productContext && productName.trim()) {
            productContext.setProduct({ name: productName.trim() });
        }
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row items-stretch gap-4">
                <div className="w-full sm:w-auto flex-grow">
                    <label htmlFor="product-input" className="sr-only">Product to analyze</label>
                    <input
                        id="product-input"
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="e.g., 'Basmati Rice' or 'Leather Handbags'"
                        className="w-full px-4 py-3 bg-gray-100 dark:bg-brand-gray-800 border border-gray-300 dark:border-brand-gray-700 rounded-lg text-lg h-full focus:outline-none focus:ring-2 focus:ring-brand-purple"
                    />
                </div>
                <div className="w-full sm:w-auto">
                    <Button onClick={handleAnalyze} size="lg" className="w-full h-full">
                        Analyze Product
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductSelector;
