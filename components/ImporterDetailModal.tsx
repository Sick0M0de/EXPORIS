import React from 'react';
import Card from './Card';
import Button from './Button';
import { XIcon } from './Icons';
import type { Importer, ImporterDetails } from '../types';

interface ImporterDetailModalProps {
  importer: Importer;
  details: ImporterDetails | null;
  isLoading: boolean;
  onClose: () => void;
}

const ImporterDetailModal: React.FC<ImporterDetailModalProps> = ({ importer, details, isLoading, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-[999] flex items-center justify-center p-4 animate-fade-in" 
      onClick={onClose}
    >
      <Card className="max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-brand-gray-800 dark:text-white">{importer.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        
        {isLoading && (
          <div className="flex justify-center items-center h-48">
            <div className="w-3 h-3 bg-brand-teal rounded-full animate-bounce delay-0"></div>
            <div className="w-3 h-3 bg-brand-teal rounded-full animate-bounce delay-150 mx-2"></div>
            <div className="w-3 h-3 bg-brand-teal rounded-full animate-bounce delay-300"></div>
          </div>
        )}

        {details && !isLoading && (
          <div className="space-y-4 animate-fade-in">
            <p className="text-brand-gray-600 dark:text-brand-gray-400">{details.bio}</p>
            <div className="border-t dark:border-brand-gray-700 mt-4 pt-4 space-y-2 text-sm">
                <p><strong>Country:</strong> {details.country}</p>
                <p><strong>Key Contact:</strong> {details.keyContact}</p>
                <p><strong>Email:</strong> <a href={`mailto:${details.email}`} className="text-brand-purple hover:underline">{details.email}</a></p>
                <p><strong>Estimated Annual Volume:</strong> {details.estimatedImportVolume}</p>
            </div>
          </div>
        )}

        <Button className="w-full mt-6" onClick={onClose}>Close</Button>
      </Card>
    </div>
  );
};

export default ImporterDetailModal;