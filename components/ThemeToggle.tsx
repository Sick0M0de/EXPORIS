
import React, { useContext } from 'react';
import { ThemeContext } from '../App';
import { SunIcon, MoonIcon } from './Icons';
import type { ThemeContextType } from '../types';

const ThemeToggle: React.FC = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    return null; 
  }

  const { theme, toggleTheme } = context;

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-brand-gray-500 dark:text-brand-gray-400 hover:bg-brand-gray-200 dark:hover:bg-brand-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-purple dark:focus:ring-offset-brand-dark"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <MoonIcon className="w-6 h-6" />
      ) : (
        <SunIcon className="w-6 h-6" />
      )}
    </button>
  );
};

export default ThemeToggle;
