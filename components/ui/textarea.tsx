import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export function Textarea({ className = '', ...props }: TextareaProps) {
  return (
    <textarea
      className={`block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
}
