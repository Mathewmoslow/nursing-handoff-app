import React from 'react';
import './Card.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  elevation?: 'low' | 'medium' | 'high';
  interactive?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  elevation = 'medium',
  interactive = false,
  onClick 
}) => {
  return (
    <div 
      className={`card card-${elevation} ${interactive ? 'card-interactive' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};