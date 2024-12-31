import Link from 'next/link';
import { signOut } from 'next-auth/react';

import { Dispatch, SetStateAction } from 'react';

interface SidebarFooterProps {
  collapsed: boolean;
  setIsCollapsed: Dispatch<SetStateAction<boolean>>;
}

export default function SidebarFooter({ collapsed, setIsCollapsed }: SidebarFooterProps) {
  return (
    <div className="p-4 border-t border-gray-200 space-y-2">
      <div className="text-sm text-gray-400 text-center">
        Clean Ocean Foundation Since 2001
      </div>
      <Link
        href="/settings"
        className={`flex items-center text-sm text-gray-400 hover:text-gray-900 ${
          collapsed ? 'justify-center' : ''
        }`}
      >
        <span className="mr-2">⚙️</span>
        {!collapsed && 'Settings'}
      </Link>
      <button
        onClick={() => signOut({ callbackUrl: '/login' })}
        className={`flex items-center text-sm text-gray-400 hover:text-gray-900 w-full ${
          collapsed ? 'justify-center' : ''
        }`}
        role="button"
        aria-label="Sign out"
      >
        <span className="mr-2">🚪</span>
        {!collapsed && 'Sign Out'}
      </button>
    </div>
  );
}
