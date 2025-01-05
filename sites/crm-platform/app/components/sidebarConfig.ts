export const sidebarConfig = {
  mainNav: [
    {
      name: 'Dashboard',
      href: '/dashboard',
      subItems: [
        { name: 'People', href: '/people' },
        { name: 'Outfalls', href: '/outfalls' },
        { name: 'Water Authorities', href: '/water-authorities' },
        { name: 'Indigenous Communities', href: '/indigenous-communities' },
        { name: 'Politicians', href: '/politicians' },
        { name: 'Observations', href: '/observations' },
        { name: 'Customers', href: '/customers' },
        { name: 'Facilities', href: '/facilities' },
        { name: 'Outfall Types', href: '/outfall-types' },
      ]
    },
    {
      name: 'Marketing',
      href: '/marketing',
      subItems: [
        { name: 'Lists', href: '/marketing/lists' },
        { name: 'Campaigns', href: '/marketing/campaigns' },
        { name: 'Templates', href: '/marketing/templates' }
      ]
    },
    {
      name: 'Support',
      href: '/support',
      subItems: [
        { name: 'Tickets', href: '/support/tickets' }
      ]
    },
    {
      name: 'Settings',
      href: '/settings',
      subItems: [
        { name: 'Users', href: '/users' },
        { name: 'Import', href: '/settings/import' },
      ]
    },
    {
      name: 'Clean Ocean Foundation',
      href: 'https://www.cleanocean.org/',
      isExternal: true,
    },
    {
      name: 'Sign out',
      href: '/logout',
      isButton: true,
      onClick: 'signOut'
    }
  ]
};
