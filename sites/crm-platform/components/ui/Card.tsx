import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

const Header = ({ children, className = '' }: CardHeaderProps) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const Title = ({ children, className = '' }: CardTitleProps) => (
  <h3 className={`text-lg font-medium ${className}`}>{children}</h3>
);

const Description = ({ children, className = '' }: CardDescriptionProps) => (
  <p className={`mt-2 text-sm text-gray-600 ${className}`}>{children}</p>
);

const Content = ({ children, className = '' }: CardContentProps) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`bg-white shadow rounded-lg ${className}`}>
      {children}
    </div>
  );
};

Card.Header = Header;
Card.Title = Title;
Card.Description = Description;
Card.Content = Content;

export { Card };
