"use client";
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@lib/utils';
import Navigation from './Navigation';
import SidebarFooter from './SidebarFooter';
import { sidebarConfig } from './sidebarConfig';
import Image from 'next/image';

interface SidebarProps {
  className?: string;
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

const Sidebar = ({ className, menuItems }: SidebarProps) => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        'flex flex-col h-full bg-[#0077be] border-r border-gray-200 overflow-y-auto overflow-x-hidden',
        isCollapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      <div className="p-4 border-b border-gray-200">
        <Image
          src="/images/cof_logo.png"
          alt="Clean Ocean Foundation Logo"
          width={isCollapsed ? 40 : 200}
          height={isCollapsed ? 40 : 80}
          className="mx-auto"
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        <Navigation
          isCollapsed={isCollapsed}
          pathname={pathname}
          menuItems={sidebarConfig.mainNav}
        />
      </div>
      <SidebarFooter
        collapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
    </aside>
  );
};

export default Sidebar;
