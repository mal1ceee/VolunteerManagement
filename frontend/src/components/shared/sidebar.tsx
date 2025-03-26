'use client';
import DashboardNav from '@/components/shared/dashboard-nav';
import {
  navItems,
  organizationNavItems,
  adminNavItems
} from '@/constants/data';
import { useSidebar } from '@/hooks/use-sidebar';
import { cn } from '@/lib/utils';
import { ChevronsLeft } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const { isMinimized, toggle } = useSidebar();
  const [status, setStatus] = useState(false);
  const location = useLocation();

  // Determine which navigation items to use based on current path
  const isOrganizationRoute = location.pathname.startsWith('/organization');
  const isAdminRoute = location.pathname.includes('/admin-dashboard');

  let currentNavItems = navItems; // Default to volunteer nav items

  if (isOrganizationRoute) {
    currentNavItems = organizationNavItems;
  } else if (isAdminRoute) {
    currentNavItems = adminNavItems;
  }

  const handleToggle = () => {
    setStatus(true);
    toggle();
    setTimeout(() => setStatus(false), 500);
  };
  return (
    <nav
      className={cn(
        `relative z-10 hidden h-screen flex-none  px-3 md:block`,
        status && 'duration-500',
        !isMinimized ? 'w-72' : 'w-[80px]',
        className
      )}
    >
      <div
        className={cn(
          'flex items-center px-0 py-5 md:px-2',
          isMinimized ? 'justify-center ' : 'justify-between'
        )}
      >
        {!isMinimized && <h1 className="text-2xl font-bold">Logo</h1>}
        <ChevronsLeft
          className={cn(
            'size-8 cursor-pointer rounded-full border bg-background text-foreground',
            isMinimized && 'rotate-180'
          )}
          onClick={handleToggle}
        />
      </div>
      <div className="space-y-4 py-4">
        <div className="px-2 py-2">
          <div className="mt-3 space-y-1">
            <DashboardNav items={currentNavItems} />
          </div>
        </div>
      </div>
    </nav>
  );
}
