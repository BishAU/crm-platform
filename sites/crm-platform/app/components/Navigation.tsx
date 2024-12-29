'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@lib/utils';
import MarketingSubMenu from './MarketingSubMenu';
import SupportSubMenu from './SupportSubMenu';

interface NavigationProps {
  isCollapsed: boolean;
  pathname: string;
  menuItems: {
    name: string;
    href: string;
    icon: string;
    subItems?: {
      name: string;
      href: string;
      icon: string;
    }[];
  }[];
}

export default function Navigation({ isCollapsed, pathname, menuItems }: NavigationProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <nav className="flex flex-col h-full">
      <div className="flex-1 px-2 py-2 space-y-1">
        {menuItems.map(({ name, href, icon, subItems }) => {
          const hasSubItems = subItems && subItems.length > 0;
          const isOpen = openMenu === name;
          
          return (
            <div key={name}>
              <Link
                href={href}
                className={cn(
                  'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                  'text-white transition-colors duration-200',
                  hasSubItems ? 'cursor-pointer' : '',
                  pathname === href ? 'bg-[#005f9e]' : ''
                )}
                onClick={(e) => {
                  if (hasSubItems) {
                    e.preventDefault();
                    console.log('openMenu:', openMenu, 'name:', name);
                    if (openMenu === name) {
                      setOpenMenu(null);
                    } else {
                      setOpenMenu(name);
                    }
                  }
                }}
                aria-expanded={hasSubItems ? isOpen : undefined}
                aria-haspopup={hasSubItems ? 'true' : undefined}
              >
                <span className={cn(
                  'mr-3',
                  pathname === href ? 'text-white' : 'text-white/80',
                  'hover:bg-[#005f9e] !important'
                )}>
                  {icon}
                </span>
                {!isCollapsed && (
                  <div className="flex-1 flex justify-between items-center">
                    <span>{name}</span>
                    {hasSubItems && (
                      <span className="ml-2">
                        {isOpen ? '▴' : '▾'}
                      </span>
                    )}
                  </div>
                )}
              </Link>

              {hasSubItems && isOpen && !isCollapsed && (
                <div className="pl-4">
                  {subItems.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      className={cn(
                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                        'text-white hover:bg-[#005f9e] transition-colors duration-200',
                        pathname === subItem.href ? 'bg-[#005f9e]' : ''
                      )}
                    >
                      <span className={cn(
                        'mr-3',
                        pathname === subItem.href ? 'text-white' : 'text-white/80'
                      )}>
                        {subItem.icon}
                      </span>
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
