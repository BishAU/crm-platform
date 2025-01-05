'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      // Close menu first
      setIsMenuOpen(false);
      
      // Clear all storage
      window.localStorage.clear();
      window.sessionStorage.clear();
      
      // Clear all cookies
      document.cookie.split(';').forEach(cookie => {
        const [name] = cookie.split('=');
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
      });

      // Sign out through NextAuth
      await signOut({ 
        redirect: false,
        callbackUrl: '/login'
      });

      // Clear any cached data
      router.refresh();
      
      // Force a complete page reload and redirect
      window.location.replace('/login');
      
    } catch (error) {
      console.error('Sign out error:', error);
      // Force reload even if there's an error
      window.location.replace('/login');
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="flex justify-end items-center px-6 py-4">
        <div className="ml-4 flex items-center md:ml-6">
          <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </button>

          <div className="ml-3 relative">
            <div>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </button>
            </div>
            
            {isMenuOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Your Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </a>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
