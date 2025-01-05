export const sidebarConfig = {
  mainNav: [
    {
      name: 'Dashboard',
      href: '/dashboard',
      subItems: [
        { name: 'People', href: '/people?view=grid' },
        { name: 'Outfalls', href: '/outfalls?view=grid' },
        { name: 'Water Authorities', href: '/water-authorities?view=grid' },
        { name: 'Indigenous Communities', href: '/indigenous-communities?view=grid' },
        { name: 'Politicians', href: '/politicians?view=grid' },
        { name: 'Observations', href: '/observations?view=grid' },
        { name: 'Customers', href: '/customers?view=grid' },
        { name: 'Facilities', href: '/facilities?view=grid' },
        { name: 'Outfall Types', href: '/outfall-types?view=grid' },
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
        { name: 'Import', href: '/import' }
      ]
    },
    {
      type: 'separator'
    },
    {
      name: 'Sign out',
      href: '/logout',
      isButton: true,
      onClick: 'signOut'
    },
    {
      type: 'separator'
    },
    {
      name: 'Clean Ocean Foundation',
      href: 'https://cleanocean.org',
      isExternal: true,
      className: 'font-bold'
    },
    {
      name: 'Visit Us Online',
      href: 'https://cleanocean.org',
      isExternal: true
    },
    {
      type: 'separator'
    }
  ]
};
