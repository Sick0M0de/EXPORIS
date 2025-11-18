
import React from 'react';
import type { Page } from '../types';
import ThemeToggle from './ThemeToggle';
import Button from './Button';

interface NavbarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Logo: React.FC = () => (
    <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 via-purple-500 to-teal-400">
            <span className="text-xl font-bold text-white">EB</span>
        </div>
        <span className="text-2xl font-bold text-gray-800 dark:text-white">Exporizz</span>
    </div>
);

const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage, isLoggedIn, onLogout }) => {
  const navLinks: Page[] = ['Dashboard', 'HS Code Finder', 'Pricing', 'Documents', 'Importers', 'Packaging Analyzer'];

  const handleNavClick = (link: Page) => {
    if (!isLoggedIn) {
      setCurrentPage('Login');
    } else {
      setCurrentPage(link);
    }
  };
  
  const publicLinks: Page[] = ['Home'];

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 dark:bg-brand-dark/80 backdrop-blur-md border-b border-brand-gray-200 dark:border-brand-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <div className="flex items-center">
            <button onClick={() => setCurrentPage(isLoggedIn ? 'Dashboard' : 'Home')} className="flex-shrink-0">
              <Logo />
            </button>
          </div>

          <div className="hidden md:block">
            <div className="flex items-baseline space-x-1 bg-gray-100 dark:bg-brand-gray-900/50 p-1 rounded-xl">
              {(isLoggedIn ? navLinks : publicLinks).map((link) => (
                <button
                  key={link}
                  onClick={() => handleNavClick(link)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-300 ${
                    currentPage === link
                      ? 'bg-cyan-400 text-white shadow-md'
                      : 'text-brand-gray-600 dark:text-brand-gray-300 hover:text-brand-gray-900 dark:hover:text-white'
                  }`}
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {isLoggedIn ? (
              <Button 
                onClick={onLogout} 
                variant="outline" 
                size="sm" 
                className="!border-brand-gray-300 dark:!border-brand-gray-700 !text-brand-gray-600 dark:!text-brand-gray-300 hover:!bg-brand-gray-100 dark:hover:!bg-brand-gray-800 hover:!text-brand-gray-800 dark:hover:!text-white"
              >
                Logout
              </Button>
            ) : (
              <div className="hidden md:flex items-center">
                 <button 
                  onClick={() => setCurrentPage('Login')}
                  className="px-5 py-2 rounded-lg text-sm font-semibold transition-colors duration-300 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
