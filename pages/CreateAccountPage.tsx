
import React from 'react';
import type { Page } from '../types';
import Button from '../components/Button';
import { LogoIcon } from '../components/Icons';

interface CreateAccountPageProps {
  setCurrentPage: (page: Page) => void;
}

const CreateAccountPage: React.FC<CreateAccountPageProps> = ({ setCurrentPage }) => {
    
  const inputStyles = "w-full px-4 py-3 bg-gray-100 dark:bg-brand-gray-800 border border-gray-300 dark:border-brand-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple transition-colors";
  
  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center bg-gray-100 dark:bg-brand-dark py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl bg-white dark:bg-brand-gray-900 rounded-2xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        <div className="p-8 md:p-12">
          <div className="flex flex-col items-center text-center">
            <LogoIcon className="h-12 w-12 text-brand-teal mb-2" />
            <h2 className="text-3xl font-extrabold text-brand-gray-900 dark:text-white">Create Your Account</h2>
            <p className="mt-2 text-sm text-brand-gray-600 dark:text-brand-gray-400">
              And start your global export journey.
            </p>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <input placeholder="Company Name" className={inputStyles} type="text" required />
               <input placeholder="Owner Name" className={inputStyles} type="text" required />
               <input placeholder="MSME Registration Number" className={inputStyles} type="text" />
               <input placeholder="GST Number" className={inputStyles} type="text" />
               <input placeholder="Email Address" className={inputStyles} type="email" required />
               <input placeholder="Phone Number" className={inputStyles} type="tel" required />
            </div>
            <textarea placeholder="Company Address" className={`${inputStyles} h-24`} required />
            <select className={inputStyles} required>
                <option value="">Select Industry Type</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="agriculture">Agriculture</option>
                <option value="textiles">Textiles</option>
                <option value="logistics">Logistics</option>
                <option value="other">Other</option>
            </select>
            <div>
              <Button type="submit" className="w-full" size="lg">
                Create Account
              </Button>
            </div>
          </form>
           <p className="mt-6 text-center text-sm text-brand-gray-600 dark:text-brand-gray-400">
              Already have an account?{' '}
              <button onClick={() => setCurrentPage('Login')} className="font-medium text-brand-purple hover:text-brand-teal">
                Sign In
              </button>
            </p>
        </div>
        <div className="hidden md:block bg-gradient-to-br from-brand-teal to-brand-purple p-12 flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-4xl font-bold leading-tight">Unlock the World of Exports.</h1>
          <p className="mt-4 text-lg opacity-80">Join thousands of businesses finding new markets and opportunities with Exporizz.</p>
          <LogoIcon className="w-48 h-48 mt-12 opacity-20" />
        </div>
      </div>
    </div>
  );
};

export default CreateAccountPage;