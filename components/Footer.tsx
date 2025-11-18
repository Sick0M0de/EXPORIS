
import React from 'react';
import { LogoIcon } from './Icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-brand-gray-900 border-t border-gray-200 dark:border-brand-gray-800 mt-16">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
             <div className="flex items-center space-x-2">
                <LogoIcon className="h-10 w-10 text-brand-teal" />
                <span className="text-2xl font-bold text-brand-gray-800 dark:text-white">Exporizz</span>
            </div>
            <p className="text-brand-gray-600 dark:text-brand-gray-400 text-base">
              AI that makes exporting simple. Your intelligent partner for global trade.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-brand-gray-500 dark:text-brand-gray-300 tracking-wider uppercase">Solutions</h3>
                <ul className="mt-4 space-y-4">
                  <li><a href="#" className="text-base text-brand-gray-600 dark:text-brand-gray-400 hover:text-brand-teal">Dashboard</a></li>
                  <li><a href="#" className="text-base text-brand-gray-600 dark:text-brand-gray-400 hover:text-brand-teal">HS Code Finder</a></li>
                  <li><a href="#" className="text-base text-brand-gray-600 dark:text-brand-gray-400 hover:text-brand-teal">Pricing</a></li>
                  <li><a href="#" className="text-base text-brand-gray-600 dark:text-brand-gray-400 hover:text-brand-teal">Importers</a></li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-brand-gray-500 dark:text-brand-gray-300 tracking-wider uppercase">Company</h3>
                <ul className="mt-4 space-y-4">
                  <li><a href="#" className="text-base text-brand-gray-600 dark:text-brand-gray-400 hover:text-brand-teal">About</a></li>
                  <li><a href="#" className="text-base text-brand-gray-600 dark:text-brand-gray-400 hover:text-brand-teal">Careers</a></li>
                  <li><a href="#" className="text-base text-brand-gray-600 dark:text-brand-gray-400 hover:text-brand-teal">Press</a></li>
                  <li><a href="#" className="text-base text-brand-gray-600 dark:text-brand-gray-400 hover:text-brand-teal">Contact</a></li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-brand-gray-500 dark:text-brand-gray-300 tracking-wider uppercase">Legal</h3>
                <ul className="mt-4 space-y-4">
                  <li><a href="#" className="text-base text-brand-gray-600 dark:text-brand-gray-400 hover:text-brand-teal">Privacy</a></li>
                  <li><a href="#" className="text-base text-brand-gray-600 dark:text-brand-gray-400 hover:text-brand-teal">Terms</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 dark:border-brand-gray-800 pt-8">
          <p className="text-base text-brand-gray-500 dark:text-brand-gray-400 xl:text-center">&copy; {new Date().getFullYear()} Exporizz Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;