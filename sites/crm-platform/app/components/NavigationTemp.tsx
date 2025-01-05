'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { cn } from '@lib/utils';
import React from 'react';
import {
  BarChart3,
  Building,
  Building2,
  Droplet,
  Map,
  MessageSquare,
  Users,
  List,
  FileText,
  Settings,
  User,
  Import,
  LogOut,
  UserRound,
  Landmark,
  Eye,
  Store,
  Factory,
  Waves,
  Ticket,
} from 'lucide-react';

const icons = {
  BarChart3,
  Building,
  Building2,
  Droplet,
  Map,
  MessageSquare,
  Users,
  List,
  FileText,
  Settings,
  User,
  Import,
  LogOut,
  UserRound,
  Landmark,
  Eye,
  Store,
  Factory,
  Waves,
  Ticket,
};

interface NavigationProps {
  isCollapsed: boolean;
  menuItems: {
    name: string;
    href: string;
    icon: string;
    onClick?: string;
    isButton?: boolean;
    isExternal?: boolean;
    subItems?: {
      name: string;
      href: string;
      icon: string;
    }[];
  }[];
}

export default function Navigation({ isCollapsed, menuItems }: NavigationProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const pathname = usePathname();

  // Keep parent menu open when subitems are active
  useEffect(() => {
    menuItems.forEach(item => {
      if (item.subItems?.some(subItem => pathname === subItem.href)) {
        setOpenMenu(item.name);
      }
    });
  }, [pathname, menuItems]);

  const renderIcon = (iconName: string) => {
    const IconComponent = icons[iconName as keyof typeof icons];
    return IconComponent ? <IconComponent className="w-5 h-5" /> : null;
  };

  return (
    <nav className="flex flex-col">
      <div className="px-2 py-2 space-y-1">
        {menuItems.map(({ name, href, icon, subItems, isButton, onClick, isExternal }) => {
          const hasSubItems = subItems && subItems.length > 0;
          const isOpen = openMenu === name;
          const isActive = pathname === href || subItems?.some(subItem => pathname === subItem.href);
          
          const linkProps = isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {};
          
          return (
            <div key={name}>
              {isButton ? (
                <button
                  className={cn(
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full',
                    'text-white transition-colors duration-200',
                    isActive ? 'bg-[#005f9e]' : 'hover:bg-[#005f9e]'
                  )}
                  onClick={async (e) => {
                    if (onClick === 'signOut') {
                      e.preventDefault();
                      const { signOut } = await import('next-auth/react');
                      signOut({ callbackUrl: '/login' });
                    }
                  }}
                >
                  <span className={cn(
                    'mr-3',
                    isActive ? 'text-white' : 'text-white/80'
                  )}>
                    {renderIcon(icon)}
                  </span>
                  {!isCollapsed && (
                    <div className="flex-1 flex justify-between items-center">
                      <span>{name}</span>
                    </div>
                  )}
                </button>
              ) : (
                <Link
                  href={hasSubItems ? '#' : href}
                  className={cn(
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                    'text-white transition-colors duration-200',
                    hasSubItems ? 'cursor-pointer' : '',
                    isActive ? 'bg-[#005f9e]' : 'hover:bg-[#005f9e]'
                  )}
                  onClick={(e) => {
                    if (hasSubItems) {
                      e.preventDefault();
                      setOpenMenu(openMenu === name ? null : name);
                    }
                  }}
                  aria-expanded={hasSubItems ? isOpen : undefined}
                  aria-haspopup={hasSubItems ? 'true' : undefined}
                  {...linkProps}
                >
                  <span className={cn(
                    'mr-3',
                    isActive ? 'text-white' : 'text-white/80'
                  )}>
                    {renderIcon(icon)}
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
              )}

              {hasSubItems && isOpen && !isCollapsed && (
                <div className="pl-4 mt-1">
                  {subItems.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      className={cn(
                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                        'text-white transition-colors duration-200',
                        pathname === subItem.href ? 'bg-[#005f9e]' : 'hover:bg-[#005f9e]'
                      )}
                    >
                      <span className={cn(
                        'mr-3',
                        pathname === subItem.href ? 'text-white' : 'text-white/80'
                      )}>
                        {renderIcon(subItem.icon)}
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
