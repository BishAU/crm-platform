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

export const sidebarConfig = {
  mainNav: [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: 'BarChart3',
      subItems: [
        { name: 'People', href: '/people', icon: 'Users' },
        { name: 'Outfalls', href: '/outfalls', icon: 'Droplet' },
        { name: 'Water Authorities', href: '/water-authorities', icon: 'Building2' },
        { name: 'Indigenous Communities', href: '/indigenous-communities', icon: 'Landmark' },
        { name: 'Politicians', href: '/politicians', icon: 'UserRound' },
        { name: 'Observations', href: '/observations', icon: 'Eye' },
        { name: 'Customers', href: '/customers', icon: 'Store' },
        { name: 'Facilities', href: '/facilities', icon: 'Factory' },
        { name: 'Outfall Types', href: '/outfall-types', icon: 'Waves' },
      ]
    },
    {
      name: 'Marketing',
      href: '/marketing',
      icon: 'BarChart3',
      subItems: [
        { name: 'Lists', href: '/marketing/lists', icon: 'List' },
        { name: 'Campaigns', href: '/marketing/campaigns', icon: 'BarChart3' },
        { name: 'Templates', href: '/marketing/templates', icon: 'FileText' }
      ]
    },
    {
      name: 'Support',
      href: '/support',
      icon: 'Ticket',
      subItems: [
        { name: 'Tickets', href: '/support/tickets', icon: 'Ticket' }
      ]
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: 'Settings',
      subItems: [
        { name: 'Users', href: '/users', icon: 'User' },
        { name: 'Import', href: '/settings/import', icon: 'Import' },
      ]
    },
    {
      name: 'Clean Ocean Foundation',
      href: 'https://www.cleanocean.org/',
      icon: 'Building',
      isExternal: true,
    },
    {
      name: 'Sign out',
      href: '/logout',
      icon: 'LogOut',
      isButton: true,
      onClick: 'signOut'
    }
  ]
};
