import DashboardNav from '@/components/shared/dashboard-nav';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { navItems, organizationNavItems } from '@/constants/data';
import { Dispatch, SetStateAction } from 'react';
import { Link, useLocation } from 'react-router-dom';

type TMobileSidebarProps = {
  className?: string;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  sidebarOpen: boolean;
};
export default function MobileSidebar({
  setSidebarOpen,
  sidebarOpen
}: TMobileSidebarProps) {
  const location = useLocation();

  // Determine which navigation items to use based on current path
  const isOrganizationRoute = location.pathname.startsWith('/organization');
  const currentNavItems = isOrganizationRoute ? organizationNavItems : navItems;

  return (
    <>
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="bg-background !px-0">
          <div className="space-y-4 py-4">
            <div className="space-y-4 px-3 py-2">
              <Link to="/" className="px-2 py-2 text-2xl font-bold text-white ">
                Logo
              </Link>
              <div className="space-y-1 px-2">
                <DashboardNav
                  items={currentNavItems}
                  setOpen={setSidebarOpen}
                />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
