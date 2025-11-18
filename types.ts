
export type Page = 
  | 'Home' 
  | 'Dashboard' 
  | 'HS Code Finder' 
  | 'Pricing' 
  | 'Documents' 
  | 'Importers' 
  | 'Packaging Analyzer'
  | 'Login' 
  | 'Create Account' 
  | 'Export Analysis PDF';

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export interface Product {
    name: string;
}

export interface ProductContextType {
    product: Product;
    setProduct: (product: Product) => void;
}

export interface Importer {
    id: number;
    name: string;
    country: string;
    product: string;
}

export interface DashboardData {
    hsCode: string;
    overallRisk: {
        score: number;
        level: 'Low' | 'Moderate' | 'High';
    };
    documentStatus: number;
    topCountries: { name: string; value: number }[];
    riskDistribution: { name: 'Political' | 'Economic' | 'Logistical' | 'Compliance'; value: number }[];
    importers: Importer[];
}

export interface ImporterDetails {
    name: string;
    country: string;
    bio: string;
    keyContact: string;
    email: string;
    estimatedImportVolume: string;
}

export interface CostEstimate {
    low: number;
    high: number;
    currency: string;
}

export interface PackagingIssue {
    finding: string;
    recommendation: string;
}
