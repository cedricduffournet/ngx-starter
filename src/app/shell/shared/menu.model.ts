export interface Menu {
  name: string;
  route: string[];
  roles: string[];
  cssClass?: string;
  faIcon?: string[];
}

export const appMenu: Menu[] = [
  {
    name: 'HOME',
    faIcon: ['fa', 'home'],
    cssClass: 'pt-3',
    route: ['dashboard'],
    roles: ['ROLE_USER']
  },
  {
    name: 'PARAMETERS',
    faIcon: ['fa', 'sliders-h'],
    cssClass: 'pt-3 mt-3 border-top border-dark',
    route: ['parameters'],
    roles: [
      'ROLE_COMPANY_VIEW_ALL',
      'ROLE_USER_VIEW',
      'ROLE_GROUP_VIEW',
      'ROLE_CIVILITY_VIEW'
    ]
  }
];
