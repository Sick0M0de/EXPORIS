
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const baseStyles = 'font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-brand-dark transition-all duration-300 transform hover:scale-105';

  const variantStyles = {
    primary: 'bg-gradient-to-r from-brand-teal to-brand-purple text-white hover:shadow-lg hover:shadow-brand-purple/30 focus:ring-brand-purple',
    secondary: 'bg-brand-gray-800 dark:bg-brand-gray-200 text-white dark:text-brand-gray-900 hover:bg-brand-gray-700 dark:hover:bg-white focus:ring-brand-gray-500',
    outline: 'bg-transparent border-2 border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white focus:ring-brand-teal',
  };

  const sizeStyles = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
