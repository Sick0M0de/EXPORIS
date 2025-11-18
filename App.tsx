
import React, { useState, createContext, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import AIAssistant from './components/AIAssistant';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CreateAccountPage from './pages/CreateAccountPage';
import DashboardPage from './pages/DashboardPage';
import HSCodeFinderPage from './pages/HSCodeFinderPage';
import PricingInsightsPage from './pages/PricingInsightsPage';
import DocumentChecklistPage from './pages/DocumentChecklistPage';
import ImportersListPage from './pages/ImportersListPage';
import ExportAnalysisPDFPage from './pages/ExportAnalysisPDFPage';
import PackagingAnalyzerPage from './pages/PackagingAnalyzerPage';


import type { Page, Theme, ThemeContextType, Product, ProductContextType } from './types';

export const ThemeContext = createContext<ThemeContextType | null>(null);
export const ProductContext = createContext<ProductContextType | null>(null);

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const [currentPage, setCurrentPage] = useState<Page>('Home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [product, setProduct] = useState<Product>({ name: 'Coffee Beans' });

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme;
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const themeContextValue = useMemo(() => ({ theme, toggleTheme }), [theme]);
  const productContextValue = useMemo(() => ({ product, setProduct }), [product]);


  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('Dashboard');
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setProduct({ name: 'Coffee Beans' });
    setCurrentPage('Home');
  };

  const renderPage = () => {
    if (!isLoggedIn) {
        switch (currentPage) {
            case 'Home':
                return <HomePage setCurrentPage={setCurrentPage} />;
            case 'Login':
                return <LoginPage setCurrentPage={setCurrentPage} onLogin={handleLogin} />;
            case 'Create Account':
                return <CreateAccountPage setCurrentPage={setCurrentPage} />;
            default:
                // If logged out and trying to access another page, show login
                return <LoginPage setCurrentPage={setCurrentPage} onLogin={handleLogin} />;
        }
    }

    // Logged-in routes
    switch (currentPage) {
      case 'Dashboard':
        return <DashboardPage />;
      case 'HS Code Finder':
        return <HSCodeFinderPage />;
      case 'Pricing':
        return <PricingInsightsPage />;
      case 'Documents':
        return <DocumentChecklistPage />;
      case 'Importers':
        return <ImportersListPage />;
      case 'Packaging Analyzer':
        return <PackagingAnalyzerPage />;
      case 'Export Analysis PDF':
        return <ExportAnalysisPDFPage />;
      case 'Home':
        return <DashboardPage />; // If logged in, home is dashboard
      default:
        return <DashboardPage />;
    }
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <ProductContext.Provider value={productContextValue}>
        <div className="min-h-screen flex flex-col font-sans bg-gray-100 dark:bg-brand-dark text-brand-gray-800 dark:text-brand-gray-200">
          <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          <main className="flex-grow">
            {renderPage()}
          </main>
          <AIAssistant />
          <Footer />
        </div>
      </ProductContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
