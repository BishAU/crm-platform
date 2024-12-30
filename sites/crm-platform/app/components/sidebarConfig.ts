export const sidebarConfig = {
  mainNav: [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: '📊',
      subItems: [
        { name: 'People', href: '/people', icon: '👥' },
        { name: 'Outfalls', href: '/outfalls', icon: '🌊' },
        { name: 'Water Authorities', href: '/water-authorities', icon: '🏢' },
        { name: 'Indigenous Communities', href: '/indigenous-communities', icon: '🏛️' },
        { name: 'Politicians', href: '/politicians', icon: '👔' },
        { name: 'Observations', href: '/observations', icon: '👁️' },
        { name: 'Customers', href: '/customers', icon: '🏪' },
        { name: 'Facilities', href: '/facilities', icon: '🏭' },
        { name: 'Outfall Types', href: '/outfall-types', icon: '🚰' },
      ]
    },
    {
      name: 'Marketing',
      href: '/marketing',
      icon: '📈',
      subItems: [
        { name: 'Lists', href: '/marketing/lists', icon: '📋' },
        { name: 'Campaigns', href: '/marketing/campaigns', icon: '📢' },
        { name: 'Templates', href: '/marketing/templates', icon: '📄' }
      ]
    },
    {
      name: 'Support',
      href: '/support',
      icon: '🎫',
      subItems: [
        { name: 'Tickets', href: '/support/tickets', icon: '🎫' }
      ]
    },
  ],
  footerNav: [
    {
      name: 'Clean Ocean Foundation',
      href: 'https://www.cleanocean.org/',
      icon: '',
      isExternal: true,
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: '⚙️',
      subItems: [
        { name: 'Users', href: '/users', icon: '👤' },
      ]
    },
    {
      name: 'Sign out',
      href: '#',
      icon: '🚪',
      onClick: 'signOut',
      isButton: true
    }
  ]
};
