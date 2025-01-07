'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { cn } from '@lib/utils';
import * as React from 'react';

interface SubItem {
    name: string;
    href: string;
}

interface MenuItem {
    name?: string;
    href?: string;
    subItems?: SubItem[];
    isButton?: boolean;
    onClick?: string;
    isExternal?: boolean;
    type?: string;
    className?: string;
}

interface NavigationProps {
    isCollapsed: boolean;
    menuItems: MenuItem[];
}

const Navigation = ({ isCollapsed, menuItems }: NavigationProps) => {
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const pathname = usePathname();
    
    useEffect(() => {
        menuItems.forEach((item) => {
            if (item.subItems?.some((subItem) => pathname === subItem.href)) {
                setOpenMenu(item.name || null);
            }
        });
    }, [pathname, menuItems]);
    
    return (
        <nav className="flex flex-col h-full">
            <div className="flex-1 px-2 py-2 space-y-1">
                {menuItems.map((item) => {
                    if (item.type === 'separator') {
                        return (
                            <div key={`separator-${Math.random()}`} className="my-4 border-t border-white/10" style={{ borderWidth: '0.5px' }} />
                        );
                    }

                    const { name, href = '#', subItems, isButton, onClick, isExternal, className } = item;
                    const hasSubItems = subItems && subItems.length > 0;
                    const isOpen = openMenu === name;
                    
                    if (isButton) {
                        return (
                            <button
                                key={name}
                                className={cn(
                                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                                    'text-white transition-colors duration-200 w-full text-left',
                                    pathname === href ? 'bg-[#005f9e]' : ''
                                )}
                                onClick={async (e) => {
                                    if (onClick === 'signOut') {
                                        e.preventDefault();
                                        const { signOut } = await import('next-auth/react');
                                        signOut({ callbackUrl: '/login' });
                                    }
                                }}
                            >
                                {!isCollapsed && (
                                    <div className="flex-1 flex justify-between items-center">
                                        <span className={className}>{name}</span>
                                    </div>
                                )}
                            </button>
                        );
                    }

                    const linkProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};

                    return (
                        <div key={name || href}>
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
                                        setOpenMenu(isOpen ? null : name || null);
                                    }
                                }}
                                {...linkProps}
                            >
                                {!isCollapsed && (
                                    <div className="flex-1 flex justify-between items-center">
                                        <span className={className}>{name}</span>
                                        {hasSubItems && (
                                            <span className="ml-2 text-white/80">
                                                ▾
                                            </span>
                                        )}
                                    </div>
                                )}
                            </Link>

                            {hasSubItems && isOpen && !isCollapsed && (
                                <div className="pl-8">
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
};

export default Navigation;
