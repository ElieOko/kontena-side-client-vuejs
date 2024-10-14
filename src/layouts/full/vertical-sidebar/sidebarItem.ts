
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
  { header: 'Accueil' },
  {
    title: "Dashboard",
    icon: 'solar:screencast-2-linear',
    BgColor: 'primary',
    to: "/dashboard",
  },
  { header: "Achat" },
  {
    title: "Appel d'offre",
    // subCaption: "",
    icon: 'solar:settings-minimalistic-line-duotone',
    BgColor: 'secondary',
    to: '/service/achat/appel_offre/list',
    // children: [
    //   {
    //     title: 'Créer',
    //     to: '/service/achat/appel_offre/append'
    //   },
    //   {
    //     title: 'Detail',
    //     to: ''
    //   }
    // ]
  },

  {
    title: 'Commande',
    icon: 'lets-icons:order-light',
    BgColor: 'warning',
    to: '/service/achat/command/list',
    // children: [
    //   {
    //     title: 'Créer',
    //     to: '/service/achat/command/append'
    //   },
    //   {
    //     title: 'Detail',
    //     to: '/service/achat/command/list'
    //   }
    // ]
  },
  {
    title: 'Fournisseur',
    icon: 'solar:smart-speaker-minimalistic-line-duotone',
    to: '/service/achat/fournisseur/list',
    BgColor: 'indigo',
    // children: [
    //   {
    //     title: 'Create',
    //     to: '/service/achat/fournisseur/append'
    //   },
    //   {
    //     title: 'Detail',
    //     to: '/service/achat/fournisseur/list'
    //   }
    // ]
  },
  {
    title: 'Facture',
    icon: 'arcticons:zoho-invoice',
    BgColor: 'primary',
    to: '/service/achat/invoice/list',
    // children: [
    //   {
    //     title: 'Créer',
    //     to: '/service/achat/invoice/append'
    //   },
    //   {
    //     title: 'Detail',
    //     to: '/service/achat/invoice/list'
    //   },
    // ]
  },
  {
    title: 'Paiement',
    icon: 'game-icons:take-my-money',
    BgColor: 'error',
    to: '/service/achat/paiement/list',
    // children: [
    //   {
    //     title: 'Créer',
    //     to: '/service/achat/paiement/append'
    //   },
    //   {
    //     title: 'Detail',
    //     to: '/service/achat/paiement/list'
    //   },
    // ]
  },
  {
    title: 'Politique',
    subCaption :"d'achat",
    icon: 'icon-park-outline:guide-board',
    BgColor: 'secondary',
    to: '/service/achat/politique/list',
    // children: [
    //   {
    //     title: 'Créer',
    //     to: '/service/achat/politique/append'
    //   },
    //   {
    //     title: 'Detail',
    //     to: '/service/achat/politique/list'
    //   },
    // ]
  },
  {
    title: 'Rapport',
    icon: 'carbon:report-data',
    BgColor: 'info',
    to: '/service/achat/rapport/list',
    // children: [
    //   {
    //     title: 'Detail',
    //     to: ''
    //   },
    // ]
  },
  {
    title: 'Demande',
    subCaption:"d'approvisionnement",
    icon: 'fluent:branch-request-20-regular',
    BgColor: 'warning',
    to: '/service/achat/stock/request/list'
  },
  { header: 'Vente' },
  {
    title: 'Facture',
    icon: "arcticons:zoho-invoice",
    BgColor: 'warning',
    to: '/service/vente/bill/list',
    // children: [
    //   {
    //     title: 'Créer',
    //     to: '/service/vente/bill/append'
    //   },
    //   {
    //     title: 'Detail',
    //     to: '/service/vente/bill/list'
    //   },
    // ]
  },
  {
    title: 'Client',
    icon: 'f7:person-3',
    BgColor: 'error',
    to: '/service/vente/client/list',
    // children: [
    //   {
    //     title: 'Créer',
    //     to: '/service/vente/client/append'
    //   },
    //   {
    //     title: 'Detail',
    //     to: '/service/vente/client/list'
    //   },
    // ]
  },

  { header: 'Ressource Humain' },
  {
    title: 'Administration',
    icon: 'dashicons:admin-multisite',
    to: '/d',
    BgColor: 'success',
    // children: [
    //   {
    //     title: 'Archivage',
    //     icon: 'bookmark-square-minimalistic-outline',
    //     to: '/',
    //     children: [
    //       {
    //         title: 'Créer',
    //         to: '/service/grh/administration/archivage/append',
    //       },
    //       {
    //         title: 'Detail',
    //         to: '/service/grh/administration/archivage/list',
    //       },
    //       {
    //         title: 'Dossier',
    //         to: '/',
    //         children: [
    //           {
    //             title: 'Créer',
    //             to: '/service/grh/administration/archivage/dossier/append',
    //           },
    //           {
    //             title: 'Detail',
    //             to: '/service/grh/administration/archivage/dossier/list',
    //           }
    //         ]
    //       },
          
    //     ]
    //   },
    //   {
    //     title: 'Partenaire',
    //     to: '/service/grh/administration/partenaire/list'
    //   },
    //   {
    //     title: 'Subvention',
    //     to: '/service/grh/administration/subvention/list'
    //   },
    //   {
    //     title: 'Vacance',
    //     to: '/service/grh/administration/vacance/list'
    //   }
    // ]
  },
  {
    title: 'Carrière',
    icon: 'notebook-minimalistic-outline',
    to: '/',
    BgColor: 'warning',
    children: [
      {
        title: 'Promotion',
        to: '/service/grh/carriere/promotion/list'
      },
      {
        title: 'Ancienneté',
        to: '/service/grh/carriere/seniority/list'
      }
    ]
  },
  {
    title: 'Formation',
    icon: 'carbon:machine-learning-model',
    to: '/service/grh/formation/list',
    BgColor: 'error',
    // children: [
    //   {
    //     title: 'Detail',
    //     to: ''
    //   }
    // ],
  },
  {
    title: 'Autres',
    icon: 'smart-home-broken',
    BgColor: 'indigo',
    to: '/',
    children: [
      {
        title: 'Departement',
        to: '/service/grh/other/departement/list'
      },
      {
        title: 'Grade',
        to: '/service/grh/other/grade/list'
      },
      {
        title: 'Poste',
        to: '/service/grh/other/poste/list'
      },
      {
        title: 'Profession',
        to: '/service/grh/other/profession/list'
      },
      {
        title: 'Secteur',
        to: '/service/grh/other/secteur/list'
      },
    ]
  },
  {
    title: 'Performance',
    icon: 'iconoir:stat-up',
    BgColor: 'info',
    to: '/',
    // children:[
    //   {
    //     title: 'Critere',
    //     to: '/service/grh/performance/critere/list'
    //   },
    //   {
    //     title: 'Evaluation',
    //     to: '/service/grh/performance/evaluation/list'
    //   },
    // ]
  },
  {
    title: 'Personnel',
    icon: 'formkit:people',
    BgColor: 'info',
    to: '/service/grh/personnel/list',
    // children:[
    //   {
    //     title: 'Créer',
    //     to: '/service/grh/personnel/append'
    //   },
    //   {
    //     title: 'Detail',
    //     to: ''
    //   }
    // ]
  },
  {
    title: 'Recrutement',
    icon: 'fluent:people-sync-28-regular',
    BgColor: 'info',
    to: '/',
    // children:[
    //   {
    //     title: 'Candidat',
    //     to: '/service/grh/recrutement/candidat/list'
    //   },
    //   {
    //     title: 'Integration',
    //     to: '/service/grh/recrutement/integration/list'
    //   },
    // ]
  },
  {
    title: 'Salaire',
    icon: 'game-icons:cash',
    BgColor: 'primary',
    to: '/',
    // children: [
    //   {
    //     title: 'Employee',
    //     to: '/service/grh/recrutement/salaire/employee/list'
    //   },
    //   {
    //     title: 'Detail',
    //     to: '/service/grh/salaire/list'
    //   },
    // ]
    },
    {
      title: 'Temps',
      subCaption:"de travail",
      icon: 'hugeicons:time-04',
      BgColor: 'primary',
      to: '/',
      // children: [
      //   {
      //     title: 'Pointage',
      //     to: '/service/grh/temps/travail/presence/append'
      //   },
      //   {
      //     title: 'Presence',
      //     to: '/service/grh/temps/travail/presence/list'
      //   },
      // ]
      }
  ,
  { header: 'Stock & Inventaire' },
  {
    title: 'Approvisionnement',
    icon: 'fluent:branch-request-20-regular',
    BgColor: 'secondary',
    to: '/service/achat/stock/request/list',
  },
  {
    title: 'Inventaire',
    icon: 'arcticons:inventory',
    BgColor: 'secondary',
    to: '/service/stock/inventaire/list',
  },
  {
    title: 'Produit',
    icon: 'fluent-mdl2:product-variant',
    BgColor: 'secondary',
    to: '/service/stock/product/list',
  },
  {
    title: 'Stock',
    icon: 'arcticons:stock-trainer',
    BgColor: 'secondary',
    to: '/service/stock/list',
  },
  {
    title: 'Rapport',
    icon: 'game-icons:chart',
    BgColor: 'secondary',
    to: '/service/stock/rapport/list',
  },
  { header: 'Finance' },
  {
    title: 'Plan comptable',
    icon: 'game-icons:chart',
    BgColor: 'secondary',
    to: '/service/finance/chart/account/list',

  },

  {
    title: 'Budget',
    icon: 'et:wallet',
    BgColor: 'success',
    to: '/forms/',
  },
  {
    title: 'Compte',
    icon: 'material-symbols-light:account-balance-wallet-outline-sharp',
    BgColor: 'warning',
    to: '/forms/editor'
  },
  {
    title: 'Depense',
    icon: 'iconoir:dogecoin-rotate-out',
    BgColor: 'warning',
    to: '/forms/editor'
  },

  { header: 'Manufacturation' },
  {
    title: 'Basic Table',
    icon: 'solar:tablet-line-duotone',
    BgColor: 'info',
    to: '/tables/basic'
  },

  // { header: 'Authentication' },

  // {
  //   title: 'Login',
  //   icon: 'login-2-line-duotone',
  //   BgColor: 'warning',
  //   to: '#',
  //   children: [
  //     {
  //       title: 'Side Login',
  //       to: '/auth/login'
  //     },
  //     {
  //       title: 'Boxed Login',
  //       to: '/auth/login2'
  //     }
  //   ]
  // },
  // {
  //   title: 'Register',
  //   icon: 'user-plus-line-duotone',
  //   BgColor: 'error',
  //   to: '#',
  //   children: [
  //     {
  //       title: 'Side Register',
  //       to: '/auth/register'
  //     },
  //     {
  //       title: 'Boxed Register',
  //       to: '/auth/register2'
  //     }
  //   ]
  // },
  // {
  //   title: 'Forgot Password',
  //   icon: 'forbidden-line-duotone',
  //   BgColor: 'indigo',
  //   to: '#',
  //   children: [
  //     {
  //       title: 'Side Forgot Password',
  //       to: '/auth/forgot-password'
  //     },
  //     {
  //       title: 'Boxed Forgot Password',
  //       to: '/auth/forgot-password2'
  //     }
  //   ]
  // },
  // {
  //   title: 'Two Steps',
  //   icon: 'users-group-two-rounded-line-duotone',
  //   BgColor: 'info',
  //   to: '#',
  //   children: [
  //     {
  //       title: 'Side Two Steps',
  //       to: '/auth/two-step'
  //     },
  //     {
  //       title: 'Boxed Two Steps',
  //       to: '/auth/two-step2'
  //     }
  //   ]
  // },

  // {
  //   title: 'Error',
  //   icon: 'bug-line-duotone',
  //   BgColor: 'error',
  //   to: '/auth/404'
  // },
  // {
  //   title: 'Maintenance',
  //   icon: 'settings-line-duotone',
  //   BgColor: 'primary',
  //   to: '/auth/maintenance'
  // },
  // { header: "Icons" },
  // {
  //   title: "Tabler",
  //   BgColor: 'success',
  //   icon: 'airbuds-case-linear',
  //   to: "/icons/tabler",
  // },

  // { header: 'Others' },
  // {
  //   title: 'Menu Level',
  //   icon: 'double-alt-arrow-down-bold-duotone',
  //   BgColor: 'secondary',
  //   to: '#',
  //   children: [
  //     {
  //       title: 'Level 1',
  //       to: '/auth/404'
  //     },
  //     {
  //       title: 'Level 1',
  //       to: '/auth/404',
  //       children: [
  //         {
  //           title: 'Level 2',

  //           to: '/auth/404'
  //         },
  //         {
  //           title: 'Level 2',

  //           to: '/auth/404',
  //           children: [
  //             {
  //               title: 'Level 3',

  //               to: '/auth/404'
  //             },
  //             {
  //               title: 'Level 3',

  //               to: '/auth/404'
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   title: 'Disabled',
  //   icon: 'forbidden-circle-line-duotoneor: 'success',
  //   disabled: true,
  //   to: '/auth/404'
  // },
  // {
  //   title: 'Sub Caption',
  //   BgColor: 'warning',
  //   icon: 'square-academic-cap-line-duotone',
  //   subCaption: 'This is the subtitle',
  //   to: '/auth/404'
  // },
  // {
  //   title: 'Chip',
  //   icon: 'archive-check-line-duotone',
  //   chip: '9',
  //   BgColor: 'error',
  //   chipColor: 'error',
  //   chipBgColor: 'error',
  //   chipVariant: 'flat',
  //   to: '/auth/404'
  // },
  // {
  //   title: 'Outlined',
  //   icon: 'smile-circle-line-duotone',
  //   chip: 'outline',
  //   chipColor: 'indigo',
  //   chipVariant: 'outlined',
  //   BgColor: 'indigo',
  //   to: '/auth/404'
  // },
  // {
  //   title: 'External Link',
  //   icon: 'link-bold-duotone',
  //   BgColor: 'info',
  //   to: '/auth/404',
  //   type: 'external'
  // }

];

export default sidebarItem;
