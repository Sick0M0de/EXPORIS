
import React from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { LogoIcon } from '../components/Icons';

const ExportAnalysisPDFPage: React.FC = () => {
  return (
    <div className="bg-gray-100 dark:bg-brand-dark py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="mb-8 text-center">
                <h1 className="text-4xl font-extrabold text-brand-gray-900 dark:text-white">Export Analysis Report</h1>
                <p className="text-lg text-brand-gray-600 dark:text-brand-gray-400 mt-2">Preview and export your complete analysis.</p>
            </header>

            <div className="flex justify-center mb-8">
                 <Button size="lg" variant="primary">Export as PDF</Button>
            </div>
            
            <Card className="p-0 overflow-hidden">
                <div className="bg-gradient-to-r from-brand-teal to-brand-purple h-4 w-full"></div>
                <div className="p-8 md:p-12">
                    <header className="flex justify-between items-start mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-brand-gray-800 dark:text-white">Export Potential Analysis</h2>
                            <p className="text-brand-gray-500 dark:text-brand-gray-400">Product: Arabica Coffee Beans</p>
                            <p className="text-brand-gray-500 dark:text-brand-gray-400">Date: {new Date().toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                             <LogoIcon className="h-10 w-10 text-brand-teal" />
                            <span className="text-2xl font-bold text-brand-gray-800 dark:text-white">Exporizz</span>
                        </div>
                    </header>

                    <section className="mb-8">
                        <h3 className="text-xl font-bold border-b-2 border-brand-teal pb-2 mb-4">Executive Summary</h3>
                        <p className="text-brand-gray-600 dark:text-brand-gray-300">
                            This report indicates a strong export potential for Arabica Coffee Beans to the United States and Germany, with moderate logistical challenges and favorable pricing margins. Key documentation, including the Certificate of Origin, is critical for compliance.
                        </p>
                    </section>
                    
                    <section className="mb-8">
                        <h3 className="text-xl font-bold border-b-2 border-brand-teal pb-2 mb-4">Market Analysis</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="bg-gray-100 dark:bg-brand-gray-800 p-4 rounded-lg">
                               <h4 className="font-semibold">Top Country: USA</h4>
                               <p className="text-sm text-brand-gray-600 dark:text-brand-gray-400">Market Size: $18.2B</p>
                               <p className="text-sm text-brand-gray-600 dark:text-brand-gray-400">Demand Growth: +4.5% YoY</p>
                           </div>
                           <div className="bg-gray-100 dark:bg-brand-gray-800 p-4 rounded-lg">
                               <h4 className="font-semibold">HS Code: 0901.11.90</h4>
                               <p className="text-sm text-brand-gray-600 dark:text-brand-gray-400">Import Duty (USA): 0%</p>
                               <p className="text-sm text-brand-gray-600 dark:text-brand-gray-400">Restrictions: FDA Prior Notice required.</p>
                           </div>
                        </div>
                    </section>

                    <section>
                         <h3 className="text-xl font-bold border-b-2 border-brand-teal pb-2 mb-4">Document Checklist</h3>
                         <ul className="list-disc list-inside space-y-2 text-brand-gray-600 dark:text-brand-gray-300">
                            <li>Commercial Invoice: <span className="font-semibold text-green-500">Completed</span></li>
                            <li>Bill of Lading: <span className="font-semibold text-green-500">Completed</span></li>
                            <li>Packing List: <span className="font-semibold text-yellow-500">Pending</span></li>
                         </ul>
                    </section>
                </div>
                 <div className="bg-gradient-to-r from-brand-teal to-brand-purple h-2 w-full mt-8"></div>
            </Card>
        </div>
    </div>
  );
};

export default ExportAnalysisPDFPage;