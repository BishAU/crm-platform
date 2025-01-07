import { cn } from '@lib/utils';

export const sidebarConfig = [
  {
    name: 'People',
    href: '/people?view=grid',
    icon: 'users',
  },
  {
    name: 'Facilities',
    href: '/facilities?view=grid',
    icon: 'building',
  },
  {
    name: 'Outfalls',
    href: '/outfalls?view=grid',
    icon: 'water',
  },
  {
    name: 'Observations',
    href: '/observations?view=grid',
    icon: 'eye',
  },
    {
    name: 'Land Councils',
    href: '/land-councils?view=grid',
    icon: 'map',
  },
  {
    name: 'Indigenous Communities',
    href: '/indigenous-communities?view=grid',
    icon: 'home',
  },
  {
    name: 'Educational Facilities',
    href: '/educational-facilities?view=grid',
    icon: 'school',
  },
  {
    name: 'Water Authorities',
    href: '/water-authorities?view=grid',
    icon: 'local_drink',
  },
  {
    name: 'Marketing',
    href: '/marketing',
    icon: 'speaker',
    subItems: [
      { name: 'Lists', href: '/marketing/lists' },
      { name: 'Templates', href: '/marketing/templates' },
    ],
  },
  {
    name: 'Support',
    href: '/support',
    icon: 'support',
    subItems: [
      { name: 'Tickets', href: '/support/tickets' }
    ],
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: 'settings',
    subItems: [
      { name: 'Users', href: '/users' },
    ],
  },
];