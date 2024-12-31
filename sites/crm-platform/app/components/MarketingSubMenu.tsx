'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface MarketingSubMenuProps {
  isOpen: boolean;
}

export default function MarketingSubMenu({ isOpen }: MarketingSubMenuProps) {
  const [isExpanded, setIsExpanded] = useState(isOpen);

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="space-y-1">
      <button
        onClick={toggleMenu}
        className="group flex items-center w-full px-2 py-2 text-sm font-medium rounded-md text-ocean-100 hover:bg-ocean-700 hover:text-ocean-50"
      >
        <span className="flex-1 text-left">Marketing</span>
        {isExpanded ? (
          <ChevronUpIcon className="h-4 w-4 text-ocean-300 group-hover:text-ocean-200" />
        ) : (
          <ChevronDownIcon className="h-4 w-4 text-ocean-300 group-hover:text-ocean-200" />
        )}
      </button>
      {isExpanded && (
        <div className="pl-4 space-y-1">
          <Link
            href="/marketing/campaigns"
            className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-ocean-100 hover:bg-ocean-700 hover:text-ocean-50"
          >
            EDM Campaigns
          </Link>
          <Link
            href="/marketing/templates"
            className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-ocean-100 hover:bg-ocean-700 hover:text-ocean-50"
          >
            Templates
          </Link>
          <Link
            href="/marketing/lists"
            className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-ocean-100 hover:bg-ocean-700 hover:text-ocean-50"
          >
            Lists
          </Link>
          <Link
            href="/marketing/analytics"
            className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-ocean-100 hover:bg-ocean-700 hover:text-ocean-50"
          >
            Analytics
          </Link>
        </div>
      )}
    </div>
  );
}