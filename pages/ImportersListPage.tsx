
import React, { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';

interface Importer {
  id: number;
  name: string;
  country: string;
  productType: string;
  size: 'Small' | 'Medium' | 'Large';
  contact: string;
  email: string;
}

const importersData: Importer[] = [
  { id: 1, name: 'Global Imports Inc.', country: 'USA', productType: 'Textiles', size: 'Large', contact: 'John Doe', email: 'j.doe@globalimports.com' },
  { id: 2, name: 'EuroTrade GmbH', country: 'Germany', productType: 'Auto Parts', size: 'Medium', contact: 'Helga Schmidt', email: 'h.schmidt@eurotrade.de' },
  { id: 3, name: 'Emirates Traders', country: 'UAE', productType: 'Spices', size: 'Medium', contact: 'Ali Hassan', email: 'ali.h@emirates.ae' },
  { id: 4, name: 'Britannia Goods', country: 'UK', productType: 'Tea', size: 'Small', contact: 'Emily Clark', email: 'e.clark@britgoods.co.uk' },
  { id: 5, name: 'Tokyo Trading Co.', country: 'Japan', productType: 'Electronics', size: 'Large', contact: 'Kenji Tanaka', email: 'tanaka@tokyotrading.jp' },
  { id: 6, name: 'American Food Dist.', country: 'USA', productType: 'Spices', size: 'Medium', contact: 'Maria Garcia', email: 'm.garcia@afd.com' },
];

const ImportersListPage: React.FC = () => {
  const [selectedImporter, setSelectedImporter] = useState<Importer | null>(null);

  const emailTemplates = [
    {
      name: "Initial Outreach",
      subject: "Export Partnership Opportunity: High-Quality [Your Product]",
      body: "Dear [Importer Contact Name],\n\nMy name is [Your Name] from [Your Company]. We are a leading manufacturer of high-quality [Your Product] in [Your Country] and came across your company as a prominent importer in [Importer Country].\n\nWe would be delighted to explore a potential partnership. Would you be available for a brief call next week?\n\nBest regards,\n[Your Name]"
    },
    {
      name: "Follow-up",
      subject: "Following up on [Your Product] Export Opportunity",
      body: "Dear [Importer Contact Name],\n\nI hope this email finds you well. I am writing to follow up on my previous email regarding a potential partnership for our [Your Product].\n\nWe are confident our products would be a great addition to your portfolio. Please let me know if you have any questions.\n\nBest regards,\n[Your Name]"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-brand-gray-900 dark:text-white">Importers List</h1>
        <p className="text-lg text-brand-gray-600 dark:text-brand-gray-400 mt-2">Discover and connect with potential buyers for your products.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <Card className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 dark:bg-brand-gray-800">
                  <tr>
                    <th className="p-4 font-semibold">Company Name</th>
                    <th className="p-4 font-semibold">Country</th>
                    <th className="p-4 font-semibold">Product Type</th>
                    <th className="p-4 font-semibold">Company Size</th>
                    <th className="p-4 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-brand-gray-700">
                  {importersData.map(importer => (
                    <tr key={importer.id} className="hover:bg-gray-50 dark:hover:bg-brand-gray-800/50 transition-colors">
                      <td className="p-4 font-medium">{importer.name}</td>
                      <td className="p-4">{importer.country}</td>
                      <td className="p-4"><span className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">{importer.productType}</span></td>
                      <td className="p-4">{importer.size}</td>
                      <td className="p-4"><Button size="sm" variant="outline" onClick={() => setSelectedImporter(importer)}>View Details</Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
        <aside className="lg:col-span-1 space-y-6">
          <Card>
            <h3 className="font-bold text-lg mb-4">Filters</h3>
            <div className="space-y-4">
              <input placeholder="Search by name..." className="w-full px-3 py-2 bg-gray-100 dark:bg-brand-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple" />
              <select className="w-full px-3 py-2 bg-gray-100 dark:bg-brand-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple">
                <option>Filter by Country</option>
                <option>USA</option>
                <option>Germany</option>
                <option>UAE</option>
              </select>
               <select className="w-full px-3 py-2 bg-gray-100 dark:bg-brand-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple">
                <option>Filter by Size</option>
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>
          </Card>
          <Card>
             <h3 className="font-bold text-lg mb-4">Export Outreach Templates</h3>
             <div className="space-y-2">
                {emailTemplates.map(template => (
                    <button key={template.name} className="w-full text-left p-2 rounded-md hover:bg-gray-100 dark:hover:bg-brand-gray-800 text-brand-purple font-semibold">
                        {template.name}
                    </button>
                ))}
             </div>
          </Card>
        </aside>
      </div>

      {selectedImporter && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center animate-fade-in" onClick={() => setSelectedImporter(null)}>
          <Card className="max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold">{selectedImporter.name}</h2>
            <p className="text-brand-gray-500">{selectedImporter.country}</p>
            <div className="mt-4 border-t pt-4 space-y-2">
                <p><strong>Contact Person:</strong> {selectedImporter.contact}</p>
                <p><strong>Email:</strong> <a href={`mailto:${selectedImporter.email}`} className="text-brand-purple hover:underline">{selectedImporter.email}</a></p>
                <p><strong>Company Size:</strong> {selectedImporter.size}</p>
                <p><strong>Primary Product:</strong> {selectedImporter.productType}</p>
            </div>
            <Button className="w-full mt-6" onClick={() => setSelectedImporter(null)}>Close</Button>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ImportersListPage;
