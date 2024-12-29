'use client';

import React from 'react';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Dialog({ open, onClose, children }: DialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        {children}
      </div>
    </div>
  );
}

export function DialogTrigger({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4">
      {children}
    </button>
  );
}

export function DialogContent({ children }: { children: React.ReactNode }) {
  return <div className="relative">{children}</div>;
}

export function DialogHeader({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col space-y-1.5 text-center sm:text-left mb-4">{children}</div>;
}

export function DialogTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-semibold leading-none tracking-tight">{children}</h2>;
}
