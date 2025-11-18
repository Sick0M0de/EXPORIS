
import React, { useState, useRef } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { CheckCircleIcon, AlertTriangleIcon, XCircleIcon, DownloadIcon } from '../components/Icons';

type Status = 'Ready' | 'Pending' | 'Rejected';

interface Document {
  name: string;
  description: string;
  status: Status;
}

const initialDocuments: Document[] = [
  { name: 'Commercial Invoice', description: 'A legal document between the supplier and the customer.', status: 'Ready' },
  { name: 'Bill of Lading', description: 'A detailed list of a shipment of goods in the form of a receipt.', status: 'Ready' },
  { name: 'Packing List', description: 'An itemized list of articles in a container or package.', status: 'Pending' },
  { name: 'Certificate of Origin', description: 'Certifies that goods in a particular export shipment are wholly obtained.', status: 'Ready' },
  { name: 'Export License', description: 'A government document that authorizes the export of specific goods.', status: 'Rejected' },
  { name: 'Insurance Certificate', description: 'Proves that insurance coverage has been arranged for the shipment.', status: 'Pending' },
];

const StatusBadge: React.FC<{ status: Status }> = ({ status }) => {
  const styles = {
    Ready: { icon: <CheckCircleIcon className="w-5 h-5 text-green-500" />, text: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/50' },
    Pending: { icon: <AlertTriangleIcon className="w-5 h-5 text-yellow-500" />, text: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/50' },
    Rejected: { icon: <XCircleIcon className="w-5 h-5 text-red-500" />, text: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/50' },
  };
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${styles[status].bg} ${styles[status].text}`}>
      {styles[status].icon}
      <span>{status}</span>
    </div>
  );
};


const DocumentChecklistPage: React.FC = () => {
  const [documents, setDocuments] = useState(initialDocuments);
  const [selectedCountry, setSelectedCountry] = useState('USA');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingDocName, setUploadingDocName] = useState<string | null>(null);
  
  const handleUploadClick = (docName: string) => {
    setUploadingDocName(docName);
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0] && uploadingDocName) {
        setDocuments(docs => docs.map(doc => 
            doc.name === uploadingDocName ? { ...doc, status: 'Pending' } : doc
        ));
        event.target.value = ''; 
    }
    setUploadingDocName(null);
  };
  
  const handleDownload = () => {
    const content = `Export Document Checklist for ${selectedCountry}\n\n` +
                    documents.map(doc => `[${doc.status}] ${doc.name}: ${doc.description}`).join('\n\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `export-checklist-${selectedCountry}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-brand-gray-900 dark:text-white">Document Checklist</h1>
        <p className="text-lg text-brand-gray-600 dark:text-brand-gray-400 mt-2">Ensure compliance for your international shipments.</p>
      </header>
      
      <Card className="mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <label htmlFor="country" className="block text-sm font-medium text-brand-gray-700 dark:text-brand-gray-300 mb-1">Select Destination Country</label>
            <select
              id="country"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 dark:bg-brand-gray-800 border border-gray-300 dark:border-brand-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple"
            >
              <option>USA</option>
              <option>Germany</option>
              <option>UAE</option>
              <option>United Kingdom</option>
            </select>
          </div>
          <div className="flex-shrink-0 mt-4 md:mt-0">
            <Button size="lg" className="flex items-center gap-2" onClick={handleDownload}>
              <DownloadIcon className="w-5 h-5" />
              Download Checklist
            </Button>
          </div>
        </div>
      </Card>
      
      <div className="space-y-4">
        {documents.map((doc, index) => (
          <Card key={index} className="transition-all duration-300 animate-slide-up" style={{animationDelay: `${index*100}ms`}}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-brand-gray-800 dark:text-gray-100">{doc.name}</h3>
                <p className="text-brand-gray-600 dark:text-gray-400 mt-1">{doc.description}</p>
                 {doc.status === 'Rejected' && (
                  <div className="mt-2 text-sm text-red-500 bg-red-100 dark:bg-red-900/50 p-2 rounded-md">
                    <strong>AI Tip:</strong> The provided document was blurry. Please re-upload a clear, high-resolution scan.
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <StatusBadge status={doc.status} />
                <Button variant="outline" size="sm" onClick={() => handleUploadClick(doc.name)}>Upload</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DocumentChecklistPage;