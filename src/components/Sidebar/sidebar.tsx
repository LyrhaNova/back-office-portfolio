
  import routes from '@routes'
  
  interface SideBarItem {
    name: string
    path?: string
    type: 'link' | 'category'
    icon?: () => JSX.Element
    children?: SideBarItem[]
  }
  
  const sidebar: SideBarItem[] = [
    {
      name: 'Dashboard',
      type: 'link',
      path: routes.DASHBOARD,
      icon: () => <i className='pi pi-home' />
    },
    {
      name: 'Gestion des projets',
      type: 'category',
        icon: () => <i className='pi pi-th-large' />,
      children: [
        {
          name: 'Projets',
          type: 'link',
          path: routes.PROJECTS.LIST
        },
      ]
    },
  ]
  
  export default sidebar
  