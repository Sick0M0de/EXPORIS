import React from 'react';

// FIX: Updated CardProps to accept a 'style' prop for inline styling and corrected
// the 'onClick' handler's type to accept a MouseEvent argument. This fixes
// multiple TypeScript errors where this component was used with styles or event handlers.
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick, style }) => {
  const cardClasses = `
    bg-white dark:bg-brand-gray-900 
    rounded-2xl 
    shadow-lg dark:shadow-2xl dark:shadow-black/20
    border border-transparent dark:border-brand-gray-800
    p-6 
    transition-all duration-300
    hover:shadow-xl hover:-translate-y-1
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `;

  return (
    <div className={cardClasses} onClick={onClick} style={style}>
      {children}
    </div>
  );
};

export default Card;
