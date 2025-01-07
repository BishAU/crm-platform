"use client";
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@lib/utils';
import Navigation from './NavigationTemp';
import { sidebarConfig } from './sidebarConfig';
import Image from 'next/image';
import Link from 'next/link';

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        'flex flex-col h-full bg-[#0077be] border-r border-gray-200',
        isCollapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      <div className="p-4 border-b border-gray-200">
        <Link href="/dashboard">
          <Image
            src="/images/cof_logo.png"
            alt="Clean Ocean Foundation Logo"
            width={isCollapsed ? 40 : 200}
            height={isCollapsed ? 40 : 80}
            className="mx-auto"
            priority={true}
          />
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto">
        <Navigation
          isCollapsed={isCollapsed}
          menuItems={sidebarConfig.mainNav}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
