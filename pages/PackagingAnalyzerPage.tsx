
import React, { useState, useRef } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { UploadCloudIcon, CheckCircleIcon, AlertTriangleIcon } from '../components/Icons';
import { analyzePackagingImage } from '../services/geminiService';
import type { PackagingIssue } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';

const PackagingAnalyzerPage: React.FC = () => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [analysisResult, setAnalysisResult] = useState<PackagingIssue[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Reset state for new analysis
        setAnalysisResult(null);
        setError(null);

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImagePreview(reader.result as string);
        };
    };
    
    const handleAnalyzeClick = async () => {
        if (!imagePreview) {
            setError("Please upload an image first.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setAnalysisResult(null);

        try {
            const base64String = imagePreview.split(',')[1];
            // A simple way to infer mime type, might need improvement for other types
            const mimeType = imagePreview.substring(imagePreview.indexOf(':') + 1, imagePreview.indexOf(';')); 
            const resultString = await analyzePackagingImage(base64String, mimeType);
            const results = JSON.parse(resultString) as PackagingIssue[];
            setAnalysisResult(results);
        } catch (e) {
            console.error(e);
            setError("Failed to analyze the packaging. The AI model might be busy. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const triggerFileSelect = () => fileInputRef.current?.click();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" accept="image/*" />
            <header className="mb-8 text-center">
                <h1 className="text-4xl font-extrabold text-brand-gray-900 dark:text-white">AI Packaging Analyzer</h1>
                <p className="text-lg text-brand-gray-600 dark:text-brand-gray-400 mt-2">Catch costly packaging mistakes before you ship.</p>
            </header>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                    <h2 className="text-2xl font-bold mb-4">Upload Your Packaging</h2>
                    <div 
                        onClick={triggerFileSelect}
                        className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-brand-purple hover:bg-gray-50 dark:hover:bg-brand-gray-800/50 transition-all flex flex-col justify-center items-center min-h-[300px]"
                    >
                        {imagePreview ? (
                            <img src={imagePreview} alt="Packaging Preview" className="max-h-64 rounded-lg object-contain" />
                        ) : (
                            <>
                                <UploadCloudIcon className="w-16 h-16 mx-auto text-gray-400" />
                                <p className="mt-4 text-lg font-semibold">Click to upload an image</p>
                                <p className="text-sm text-gray-500">PNG, JPG, WEBP up to 10MB</p>
                            </>
                        )}
                    </div>
                    {imagePreview && (
                        <Button size="lg" className="w-full mt-6" onClick={handleAnalyzeClick} disabled={isLoading}>
                            {isLoading ? 'Analyzing...' : 'Run AI Analysis'}
                        </Button>
                    )}
                </Card>

                <Card>
                    <h2 className="text-2xl font-bold mb-4">AI Analysis Report</h2>
                    {isLoading && <LoadingSpinner />}
                    {error && <p className="text-center text-red-500">{error}</p>}
                    {!isLoading && !error && !analysisResult && (
                        <div className="text-center text-gray-500 py-20">
                            <p>Your analysis results will appear here.</p>
                        </div>
                    )}
                    {analysisResult && (
                        <div className="space-y-4">
                            {analysisResult.length === 0 ? (
                                <div className="p-4 bg-green-100 dark:bg-green-900/50 rounded-lg text-green-800 dark:text-green-300 flex items-center gap-3">
                                    <CheckCircleIcon className="w-6 h-6"/>
                                    <p className="font-semibold">No major issues found! Your packaging looks ready for export.</p>
                                </div>
                            ) : (
                                analysisResult.map((issue, index) => (
                                    <div key={index} className="p-4 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 rounded-r-lg">
                                        <div className="flex items-start gap-3">
                                            <AlertTriangleIcon className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1"/>
                                            <div>
                                                <h3 className="font-bold text-lg text-brand-gray-800 dark:text-white">{issue.finding}</h3>
                                                <p className="text-brand-gray-600 dark:text-brand-gray-300">{issue.recommendation}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default PackagingAnalyzerPage;
