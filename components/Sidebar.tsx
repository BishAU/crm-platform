import { useState } from 'react';
import { sidebarConfig } from './sidebarConfig';
import Image from 'next/image';

interface NavItemProps {
  name: string;
  href: string;
  icon: string;
  subItems?: NavItemProps[];
}

interface SidebarProps {
  isCollapsed: boolean;
}

export default function Sidebar({ isCollapsed }: SidebarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <aside className={`bg-white w-64 p-4 ${isCollapsed ? 'hidden' : 'block'}`}>
      <div className="flex items-center justify-center mb-8">
        <Image
          src="/images/logo.png"
          alt="Clean Ocean Foundation Logo"
          width={100}
          height={100}
        />
      </div>
      <nav>
        <ul>
          {sidebarConfig.map((item) => (
            <li key={item.name}>
              <a href={item.href} className="flex items-center p-2 rounded-md hover:bg-gray-100">
                <span className="ml-2">{item.name}</span>
              </a>
              {item.subItems && (
                <ul className="ml-4">
                  {item.subItems.map((subItem) => (
                    <li key={subItem.name}>
                      <a href={subItem.href} className="flex items-center p-2 rounded-md hover:bg-gray-100">
                        <span className="ml-2">{subItem.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}