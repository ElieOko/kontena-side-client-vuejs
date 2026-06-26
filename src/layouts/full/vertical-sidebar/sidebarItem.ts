export interface menu {
  header?: string;
  title?: string;
  icon?: any;
  to?: string;
  chip?: string;
  BgColor?: string;
  chipBgColor?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItem: menu[] = [
  {
    title: 'Tableau de bord',
    icon: 'solar:chart-2-linear',
    BgColor: 'primary',
    to: '/dashboard/chat',
  },
  {
    title: 'Utilisateurs',
    icon: 'solar:users-group-rounded-linear',
    BgColor: 'secondary',
    to: '/dashboard/users',
  },
];

export default sidebarItem;
