
import React from 'react';
import type { Page } from '../types';
import Button from '../components/Button';
import { LogoIcon } from '../components/Icons';

interface LoginPageProps {
  setCurrentPage: (page: Page) => void;
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setCurrentPage, onLogin }) => {
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-[calc(100vh-10rem)] flex bg-gray-100 dark:bg-brand-dark">
      <div className="w-full flex flex-wrap">
        <div className="w-full md:w-1/2 flex flex-col justify-center p-12">
          <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-12">
              <LogoIcon className="h-12 w-12 text-brand-teal mx-auto mb-4" />
              <h2 className="text-3xl font-extrabold text-brand-gray-900 dark:text-white">Sign in to your account</h2>
              <p className="mt-2 text-sm text-brand-gray-600 dark:text-brand-gray-400">
                Or{' '}
                <button onClick={() => setCurrentPage('Create Account')} className="font-medium text-brand-purple hover:text-brand-teal">
                  start your 14-day free trial
                </button>
              </p>
            </div>
            <form className="space-y-6" onSubmit={handleLoginSubmit}>
              <div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-3 bg-gray-200 dark:bg-brand-gray-800 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple"
                  placeholder="Email address"
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full px-4 py-3 bg-gray-200 dark:bg-brand-gray-800 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple"
                  placeholder="Password"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <a href="#" className="font-medium text-brand-purple hover:text-brand-teal">
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div>
                <Button type="submit" className="w-full" size="lg">
                  Sign in
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className="hidden md:flex w-1/2 bg-brand-gray-900 items-center justify-center p-12">
            <div className="text-center text-white">
                <svg className="w-64 h-64 mx-auto" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M170 100H30" stroke="#00F5D4" strokeWidth="4" strokeLinecap="round"/>
                    <path d="M160 140L40 140C34.4772 140 30 135.523 30 130V90C30 84.4772 34.4772 80 40 80H160C165.523 80 170 84.4772 170 90V130C170 135.523 165.523 140 160 140Z" fill="#212529" stroke="#9B5DE5" strokeWidth="4"/>
                    <rect x="50" y="90" width="20" height="20" fill="#9B5DE5"/>
                    <rect x="90" y="90" width="20" height="20" fill="#9B5DE5"/>
                    <rect x="130" y="90" width="20" height="20" fill="#9B5DE5"/>
                    <path d="M100 80V40" stroke="#00F5D4" strokeWidth="4"/>
                    <path d="M120 40L80 40" stroke="#00F5D4" strokeWidth="4"/>
                </svg>
                <h1 className="text-3xl font-bold mt-8">Global Trade, Simplified.</h1>
                <p className="mt-2 opacity-70">Access powerful AI insights to grow your export business.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
