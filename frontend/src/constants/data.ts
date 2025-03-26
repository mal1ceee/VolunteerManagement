import { NavItem } from '@/types';

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'My Events',
    href: '/dashboard/events',
    icon: 'post',
    label: 'Events'
  },
  {
    title: 'Organizations',
    href: '/dashboard/organizations',
    icon: 'settings',
    label: 'Organizations'
  },
  {
    title: 'Achievements',
    href: '/dashboard/achievements',
    icon: 'media',
    label: 'Achievements'
  },
  {
    title: 'Messages',
    href: '/dashboard/messages',
    icon: 'page',
    label: 'Messages'
  },
  {
    title: 'My Profile',
    href: '/dashboard/profile',
    icon: 'user',
    label: 'Profile'
  }
];

export const organizationNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/organization',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'Manage Events',
    href: '/organization/events',
    icon: 'post',
    label: 'Events'
  },
  {
    title: 'Volunteers',
    href: '/organization/volunteers',
    icon: 'user',
    label: 'Volunteers'
  },
  {
    title: 'Messages',
    href: '/organization/messages',
    icon: 'page',
    label: 'Messages'
  },
  {
    title: 'Analytics',
    href: '/organization/analytics',
    icon: 'settings',
    label: 'Analytics'
  },
  {
    title: 'Organization Profile',
    href: '/organization/profile',
    icon: 'profile',
    label: 'Profile'
  }
];

export const users = [
  {
    id: 1,
    name: 'Candice Schiner',
    company: 'Dell',
    role: 'Frontend Developer',
    verified: false,
    status: 'Active'
  },
  {
    id: 2,
    name: 'John Doe',
    company: 'TechCorp',
    role: 'Backend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Alice Johnson',
    company: 'WebTech',
    role: 'UI Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 4,
    name: 'David Smith',
    company: 'Innovate Inc.',
    role: 'Fullstack Developer',
    verified: false,
    status: 'Inactive'
  },
  {
    id: 5,
    name: 'Emma Wilson',
    company: 'TechGuru',
    role: 'Product Manager',
    verified: true,
    status: 'Active'
  },
  {
    id: 6,
    name: 'James Brown',
    company: 'CodeGenius',
    role: 'QA Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 7,
    name: 'Laura White',
    company: 'SoftWorks',
    role: 'UX Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 8,
    name: 'Michael Lee',
    company: 'DevCraft',
    role: 'DevOps Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 9,
    name: 'Olivia Green',
    company: 'WebSolutions',
    role: 'Frontend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 10,
    name: 'Robert Taylor',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active'
  }
];

export const dashboardCard = [
  {
    date: 'This Month',
    total: 45,
    role: 'Hours Volunteered',
    color: 'bg-[#EC4D61] bg-opacity-40'
  },
  {
    date: 'Total',
    total: 12,
    role: 'Events Joined',
    color: 'bg-[#FFEB95] bg-opacity-100'
  },
  {
    date: 'Active',
    total: 5,
    role: 'Organizations',
    color: 'bg-[#84BD47] bg-opacity-30'
  },
  {
    date: 'Earned',
    total: 8,
    role: 'Achievements',
    color: 'bg-[#D289FF] bg-opacity-30'
  }
];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

// Admin navigation
export const adminNavItems: NavItem[] = [
  {
    title: 'Admin Dashboard',
    href: '/dashboard/admin-dashboard',
    icon: 'dashboard',
    label: 'Overview'
  },
  {
    title: 'Organizations',
    href: '/dashboard/admin-dashboard/organizations',
    icon: 'settings',
    label: 'Manage'
  },
  {
    title: 'Volunteers',
    href: '/dashboard/admin-dashboard/volunteers',
    icon: 'user',
    label: 'Manage'
  },
  {
    title: 'Events',
    href: '/dashboard/admin-dashboard/events',
    icon: 'post',
    label: 'Manage'
  },
  {
    title: 'Reports',
    href: '/dashboard/admin-dashboard/reports',
    icon: 'settings',
    label: 'Analytics'
  },
  {
    title: 'Settings',
    href: '/dashboard/admin-dashboard/settings',
    icon: 'settings',
    label: 'Admin'
  }
];
