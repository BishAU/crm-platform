'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { 
  HomeIcon, BuildingOfficeIcon, MapPinIcon, UsersIcon,
  UserGroupIcon, DocumentTextIcon, ClipboardDocumentCheckIcon,
  BuildingLibraryIcon, WrenchIcon, ChartBarIcon
} from '@heroicons/react/24/outline';
import {
  LayoutDashboard,
  Users,
  Building2,
  Ticket,
  Map,
  Droplet,
  MessageSquare,
  BarChart3,
  Mail
} from 'lucide-react';

interface SubRoute {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

interface MenuItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  subroutes?: SubRoute[];
}

const menuItems: MenuItem[] = [
  { name: 'Dashboard', icon: HomeIcon, href: '/' },
  { name: 'Outfalls', icon: Droplet, href: '/outfalls' },
  { name: 'Observations', icon: MapPinIcon, href: '/observations' },
  { name: 'Indigenous Communities', icon: BuildingLibraryIcon, href: '/indigenous-communities' },
  { name: 'Water Authorities', icon: BuildingOfficeIcon, href: '/water-authorities' },
  { name: 'People', icon: UsersIcon, href: '/people' },
  { name: 'Politicians', icon: UserGroupIcon, href: '/politicians' },
  { name: 'Support Tickets', icon: ClipboardDocumentCheckIcon, href: '/tickets' },
    { name: 'Customers', icon: UsersIcon, href: '/customers' },
    { name: 'Facilities', icon: Building2, href: '/facilities' },
    { name: 'Outfall Types', icon: Droplet, href: '/outfall-types' },
  {
    name: 'Marketing',
    icon: BarChart3,
    subroutes: [
      {
        name: 'Email Analytics',
        icon: Mail,
        href: '/marketing/email-analytics'
      }
    ]
  },
];

export default function Sidebar({ children }: { children?: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`bg-gray-900 ${collapsed ? 'w-20' : 'w-64'} transition-all duration-300`}>
      {children}
      <div className="p-4">
        <div className="flex items-center justify-between">
          {!collapsed ? (
            <Logo variant="light" className="scale-90" />
          ) : (
            <div className="w-full flex justify-center">
              <Logo variant="light" className="scale-50 -ml-4" />
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`p-2 rounded-lg hover:bg-gray-800 text-gray-400 ${collapsed ? 'absolute right-2' : ''}`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={collapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"}
              />
            </svg>
          </button>
        </div>
      </div>

      <nav className="mt-8">
        <div className="px-4 space-y-1">
          {menuItems.map((item) => (
            <div key={item.name}>
              {item.href ? (
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg
                    ${collapsed ? 'justify-center' : 'space-x-3'}`}
                >
                  <item.icon className="w-6 h-6" />
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              ) : (
                <div className={`flex items-center px-4 py-3 text-gray-300 rounded-lg
                  ${collapsed ? 'justify-center' : 'space-x-3'}`}>
                  <item.icon className="w-6 h-6" />
                  {!collapsed && <span>{item.name}</span>}
                </div>
              )}
              {item.subroutes && (
                <div className="pl-4">
                  {item.subroutes.map((subroute) => (
                    <Link
                      key={subroute.name}
                      href={subroute.href}
                      className={`flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg
                        ${collapsed ? 'justify-center' : 'space-x-3'}`}
                    >
                      <subroute.icon className="w-6 h-6" />
                      {!collapsed && <span>{subroute.name}</span>}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
}
