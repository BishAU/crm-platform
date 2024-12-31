import Link from 'next/link';

interface NavItemProps {
  href: string;
  icon: string;
  name: string;
  isActive: boolean;
  collapsed: boolean;
}

export default function NavItem({ href, icon, name, isActive, collapsed }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
        isActive
          ? 'bg-gray-100 text-gray-900'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <span className={`${collapsed ? 'mx-auto' : 'mr-3'}`}>
        {icon}
      </span>
      {!collapsed && (
        <span>{name}</span>
      )}
    </Link>
  );
}