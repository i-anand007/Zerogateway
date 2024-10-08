import { IconType } from 'react-icons/lib';
import {
 
  PiShieldCheckered,
  PiTable,
  PiUser,
  PiUserGear,
  PiMoney,
  PiFolderLock,
  PiCurrencyCircleDollar,
  PiHouse,
  PiGridFour,
  PiMapTrifold,
  PiNewspaper,
  PiGearSix,
  PiCurrencyInrFill,
} from 'react-icons/pi';
import { atom } from 'jotai';
import Cookies from 'js-cookie';
import FileStackIcon from '@/components/icons/file-stack';

export interface SubMenuItemType {
  name: string;
  description?: string;
  href: string;
  badge?: string;
}

export interface ItemType {
  name: string;
  icon: IconType;
  href?: string;
  description?: string;
  badge?: string;
  subMenuItems?: SubMenuItemType[];
}

export interface MenuItemsType {
  id: string;
  name: string;
  title: string;
  icon: IconType;
  menuItems: ItemType[];
}



const adminMenuItems = {
  id: '0',
  name: 'Admin',
  title: 'Admin',
  icon: PiShieldCheckered,
  menuItems: [
    {
      name: 'Users Management',
      icon: PiFolderLock,
      href: "/dashboard/admin/users-management"
    },
    {
      name: 'Plans',
      icon: PiCurrencyCircleDollar,
      href: "/dashboard/admin/plans"
    },
    {
      name: 'KYC',
      icon: PiTable,
      href: "/dashboard/admin/kyc"
    },
    {
      name: 'Smart Route',
      icon: FileStackIcon,
      href: "/dashboard/admin/smart-route"
    },
    {
      name: 'Plan Purchase',
      icon: PiCurrencyInrFill,
      href: "/dashboard/admin/plan-purchase"
    },
  ],
};

const baseMenuItems = [
  {
    id: '1',
    name: 'Home',
    title: 'Home',
    icon: PiHouse,
    href: '/',
    menuItems: [
      {
        name: 'Dashboard',
        href: '/dashboard/',
        icon: PiFolderLock,
      },
    ],
  },
  {
    id: '2',
    name: 'Plans',
    title: 'Plans',
    icon: PiNewspaper,
    menuItems: [
      {
        name: 'Plans',
        href: '/dashboard/plans',
        icon: PiNewspaper,
      },
    ],
  },
  {
    id: '3',
    name: 'Smart Route',
    title: 'Smart Route',
    icon: PiMapTrifold,
    menuItems: [
      {
        name: 'UPI',
        href: '/dashboard/smart-route',
        icon: PiUserGear,
      },
      {
        name: 'BANKS',
        href: '/dashboard/smart-route/bank',
        icon: PiGridFour,
      },
    ],
  },
  {
    id: '4',
    name: 'Checkout Setting',
    title: 'Checkout Setting',
    icon: PiGearSix ,
    menuItems: [
      {
        name: 'Checkout Setting',
        href: '/dashboard/checkout-settings',
        icon: PiGearSix,
      },
    ],
  },
  {
    id: '4',
    name: 'Profile',
    title: 'Profile',
    icon: PiUser,
    menuItems: [
      {
        name: 'Profile Setting',
        href: '/dashboard/profile-settings',
        icon: PiUserGear,
      },
      {
        name: 'KYC',
        href: '/dashboard/profile-settings/submit-kyc',
        icon: PiGridFour,
      },
      {
        name: 'Plan Purchases',
        href: '/dashboard/profile-settings/plan-purchase',
        icon: PiMoney ,
      },
    ],
  },
];


export const berylliumMenuItems = [  
  ...(Cookies.get('user_labels')?.includes('Administrator') ? [adminMenuItems] : baseMenuItems)
];

// export const berylliumMenuItems: MenuItemsType[] = [
//   {
//     id: '8',
//     name: 'Auth',
//     title: 'Authentication',
//     icon: PiShieldCheckered,
//     menuItems: [
//       {
//         name: 'Sign Up',
//         icon: PiUserPlus,
//         description: '"Shop Smart, Click Quick: Your One-Stop Solution!"',
//         subMenuItems: [
//           {
//             name: 'Modern Sign Up',
//             href: "/admin/users-management",
//           },
//         ],
//       },

//     ],
//   },
//   {
//     id: '1',
//     name: 'Home',
//     title: 'Overview',
//     icon: PiHouse,
//     menuItems: [
//       {
//         name: 'File Manager',
//         href: '/',
//         icon: PiFolderLock,
//       },
//       // {
//       //   name: 'Appointment',
//       //   href: routes.appointment.dashboard,
//       //   icon: PiCalendarDuotone,
//       // },
//       // {
//       //   name: 'Executive',
//       //   href: routes.executive.dashboard,
//       //   icon: PiBriefcase,
//       // },
//       // {
//       //   name: 'Job Board',
//       //   href: routes.jobBoard.dashboard,
//       //   icon: PiShapes,
//       //   badge: 'NEW',
//       // },
//       // {
//       //   name: 'Financial',
//       //   href: routes.financial.dashboard,
//       //   icon: PiCurrencyCircleDollar,
//       // },
//       // {
//       //   name: 'Logistics',
//       //   href: routes.logistics.dashboard,
//       //   icon: PiPackage,
//       // },
//       // {
//       //   name: 'E-Commerce',
//       //   href: routes.eCommerce.dashboard,
//       //   icon: PiShoppingCart,
//       // },
//       // {
//       //   name: 'Analytics',
//       //   href: routes.analytics,
//       //   icon: PiChartBar,
//       // },
//       // {
//       //   name: 'Support',
//       //   href: routes.support.dashboard,
//       //   icon: PiHeadset,
//       // },
//     ],
//   },
//   // {
//   //   id: '2',
//   //   name: 'Apps',
//   //   title: 'Apps Kit',
//   //   icon: PiLightning,
//   //   menuItems: [
//   //     {
//   //       name: 'E-Commerce',
//   //       description: '"Shop Smart, Click Quick: Your One-Stop Solution!"',
//   //       icon: PiShoppingCart,
//   //       subMenuItems: [
//   //         {
//   //           name: 'Products',
//   //           href: routes.eCommerce.products,
//   //           badge: '',
//   //         },
//   //         {
//   //           name: 'Product Details',
//   //           href: routes.eCommerce.productDetails(DUMMY_ID),
//   //           badge: '',
//   //         },
//   //         {
//   //           name: 'Create Product',
//   //           href: routes.eCommerce.createProduct,
//   //         },
//   //         {
//   //           name: 'Edit Product',
//   //           href: routes.eCommerce.ediProduct(DUMMY_ID),
//   //         },
//   //         {
//   //           name: 'Categories',
//   //           href: routes.eCommerce.categories,
//   //         },
//   //         {
//   //           name: 'Create Category',
//   //           href: routes.eCommerce.createCategory,
//   //         },
//   //         {
//   //           name: 'Edit Category',
//   //           href: routes.eCommerce.editCategory(DUMMY_ID),
//   //         },
//   //         {
//   //           name: 'Orders',
//   //           href: routes.eCommerce.orders,
//   //         },
//   //         {
//   //           name: 'Order Details',
//   //           href: routes.eCommerce.orderDetails(DUMMY_ID),
//   //         },
//   //         {
//   //           name: 'Create Order',
//   //           href: routes.eCommerce.createOrder,
//   //         },
//   //         {
//   //           name: 'Edit Order',
//   //           href: routes.eCommerce.editOrder(DUMMY_ID),
//   //         },
//   //         {
//   //           name: 'Reviews',
//   //           href: routes.eCommerce.reviews,
//   //         },
//   //         {
//   //           name: 'Shop',
//   //           href: routes.eCommerce.shop,
//   //         },
//   //         {
//   //           name: 'Cart',
//   //           href: routes.eCommerce.cart,
//   //         },
//   //         {
//   //           name: 'Checkout & Payment',
//   //           href: routes.eCommerce.checkout,
//   //         },
//   //       ],
//   //     },
//   //     {
//   //       name: 'Support',
//   //       description: '"Effortless Assistance at your Fingertips!"',
//   //       icon: PiHeadset,
//   //       subMenuItems: [
//   //         {
//   //           name: 'Inbox',
//   //           href: routes.support.inbox,
//   //         },
//   //         {
//   //           name: 'Snippets',
//   //           href: routes.support.snippets,
//   //         },
//   //         {
//   //           name: 'Templates',
//   //           href: routes.support.templates,
//   //         },
//   //       ],
//   //     },
//   //     {
//   //       name: 'Invoice',
//   //       description: 'Professional-looking invoices for each customer order',
//   //       icon: PiCurrencyDollar,
//   //       subMenuItems: [
//   //         {
//   //           name: 'List',
//   //           href: routes.invoice.home,
//   //         },
//   //         {
//   //           name: 'Details',
//   //           href: routes.invoice.details(DUMMY_ID),
//   //         },
//   //         {
//   //           name: 'Create',
//   //           href: routes.invoice.create,
//   //         },
//   //         {
//   //           name: 'Edit',
//   //           href: routes.invoice.edit(DUMMY_ID),
//   //         },
//   //       ],
//   //     },
//   //     {
//   //       name: 'Logistics',
//   //       description:
//   //         '"Streamline Shipments: Discover Efficiency with our Logistics!"',
//   //       icon: PiPackage,
//   //       subMenuItems: [
//   //         {
//   //           name: 'Shipment List',
//   //           href: routes.logistics.shipmentList,
//   //         },
//   //         {
//   //           name: 'Shipment Details',
//   //           href: routes.logistics.shipmentDetails(DUMMY_ID),
//   //         },
//   //         {
//   //           name: 'Create Shipment',
//   //           href: routes.logistics.createShipment,
//   //         },
//   //         {
//   //           name: 'Edit Shipment',
//   //           href: routes.logistics.editShipment(DUMMY_ID),
//   //         },
//   //         {
//   //           name: 'Customer Profile',
//   //           href: routes.logistics.customerProfile,
//   //         },
//   //         {
//   //           name: 'Tracking',
//   //           href: routes.logistics.tracking(DUMMY_ID),
//   //         },
//   //       ],
//   //     },
//   //     {
//   //       name: 'File Manager',
//   //       description:
//   //         '"Organize, Access, and Share: Simplify your Digital World with us!"',
//   //       icon: PiFileImage,
//   //       subMenuItems: [
//   //         {
//   //           name: 'Files',
//   //           href: routes.file.dashboard,
//   //         },
//   //         {
//   //           name: 'Manage Files',
//   //           href: routes.file.manager,
//   //         },
//   //       ],
//   //     },
//   //     {
//   //       name: 'Appointment',
//   //       href: routes.appointment.appointmentList,
//   //       icon: PiCalendarDuotone,
//   //     },
//   //     {
//   //       name: 'Event Calendar',
//   //       href: routes.eventCalendar,
//   //       icon: PiCalendarPlus,
//   //     },
//   //     {
//   //       name: 'Roles & Permissions',
//   //       href: routes.rolesPermissions,
//   //       icon: PiFolderLock,
//   //     },
//   //     {
//   //       name: 'Point of Sell',
//   //       href: routes.pos.index,
//   //       icon: PiCreditCard,
//   //     },
//   //     {
//   //       name: 'Invoice Builder',
//   //       href: routes.invoice.builder,
//   //       icon: PiNewspaperClippingDuotone,
//   //       badge: 'NEW',
//   //     },
//   //   ],
//   // },
//   // {
//   //   id: '3',
//   //   name: 'Search',
//   //   title: 'Search & Filter',
//   //   icon: PiUserCircle,
//   //   menuItems: [
//   //     {
//   //       name: 'Real Estate',
//   //       href: routes.searchAndFilter.realEstate,
//   //       icon: PiHouseLine,
//   //       badge: '',
//   //     },
//   //     {
//   //       name: 'Flight Booking',
//   //       href: routes.searchAndFilter.flight,
//   //       icon: PiAirplaneTilt,
//   //     },
//   //     {
//   //       name: 'NFT',
//   //       href: routes.searchAndFilter.nft,
//   //       icon: PiPokerChip,
//   //       badge: '',
//   //     },
//   //   ],
//   // },
//   // {
//   //   id: '4',
//   //   name: 'Widgets',
//   //   title: 'Widgets',
//   //   icon: PiPackage,
//   //   menuItems: [
//   //     {
//   //       name: 'Cards',
//   //       href: routes.widgets.cards,
//   //       icon: PiSquaresFour,
//   //     },
//   //     {
//   //       name: 'Icons',
//   //       href: routes.widgets.icons,
//   //       icon: PiFeather,
//   //     },
//   //     {
//   //       name: 'Charts',
//   //       href: routes.widgets.charts,
//   //       icon: PiChartLineUp,
//   //     },
//   //     {
//   //       name: 'Maps',
//   //       href: routes.widgets.maps,
//   //       icon: PiMapPinLine,
//   //     },
//   //   ],
//   // },
//   // {
//   //   id: '5',
//   //   name: 'Forms',
//   //   title: 'Forms',
//   //   icon: PiNotePencil,
//   //   menuItems: [
//   //     {
//   //       name: 'Account Settings',
//   //       href: routes.forms.profileSettings,
//   //       icon: PiUserGear,
//   //     },
//   //     {
//   //       name: 'Notification Preference',
//   //       href: routes.forms.notificationPreference,
//   //       icon: PiBellSimpleRinging,
//   //     },
//   //     {
//   //       name: 'Personal Information',
//   //       href: routes.forms.personalInformation,
//   //       icon: PiUser,
//   //     },
//   //     {
//   //       name: 'Newsletter',
//   //       href: routes.forms.newsletter,
//   //       icon: PiEnvelopeSimpleOpen,
//   //     },
//   //     {
//   //       name: 'Multi Step',
//   //       href: routes.multiStep,
//   //       icon: PiSteps,
//   //     },
//   //     {
//   //       name: 'Payment Checkout',
//   //       href: routes.eCommerce.checkout,
//   //       icon: PiCreditCard,
//   //     },
//   //   ],
//   // },
//   // {
//   //   id: '6',
//   //   name: 'Tables',
//   //   title: 'Tables',
//   //   icon: PiTable,
//   //   menuItems: [
//   //     {
//   //       name: 'Basic',
//   //       href: routes.tables.basic,
//   //       icon: PiGridFour,
//   //     },
//   //     {
//   //       name: 'Collapsible',
//   //       href: routes.tables.collapsible,
//   //       icon: PiCaretCircleUpDown,
//   //     },
//   //     {
//   //       name: 'Enhanced',
//   //       href: routes.tables.enhanced,
//   //       icon: PiTable,
//   //     },
//   //     {
//   //       name: 'Sticky Header',
//   //       href: routes.tables.stickyHeader,
//   //       icon: PiBrowser,
//   //     },
//   //     {
//   //       name: 'Pagination',
//   //       href: routes.tables.pagination,
//   //       icon: PiListNumbers,
//   //     },
//   //     {
//   //       name: 'Search',
//   //       href: routes.tables.search,
//   //       icon: PiHourglassSimple,
//   //     },
//   //   ],
//   // },
//   // {
//   //   id: '7',
//   //   name: 'Pages',
//   //   title: 'Pages',
//   //   icon: PiCards,
//   //   menuItems: [
//   //     {
//   //       name: 'Profile',
//   //       href: routes.profile,
//   //       icon: PiMagicWand,
//   //     },
//   //     {
//   //       name: 'Welcome',
//   //       href: routes.welcome,
//   //       icon: PiShootingStar,
//   //     },
//   //     {
//   //       name: 'Coming Soon',
//   //       href: routes.comingSoon,
//   //       icon: PiRocketLaunch,
//   //     },
//   //     {
//   //       name: 'Access Denied',
//   //       href: routes.accessDenied,
//   //       icon: PiFolderLock,
//   //     },
//   //     {
//   //       name: 'Not Found',
//   //       href: routes.notFound,
//   //       icon: PiBinoculars,
//   //     },
//   //     {
//   //       name: 'Maintenance',
//   //       href: routes.maintenance,
//   //       icon: PiHammer,
//   //     },
//   //     {
//   //       name: 'Blank',
//   //       href: routes.blank,
//   //       icon: PiNoteBlank,
//   //     },
//   //   ],
//   // },

// ];
export const berylliumMenuItemAtom = atom(berylliumMenuItems[0]);
