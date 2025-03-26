import FormPage from '@/pages/form/index';
import NotFound from '@/pages/not-found/index';
import { Suspense, lazy } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';

const DashboardLayout = lazy(
  () => import('@/components/layout/dashboard-layout')
);
const SignInPage = lazy(() => import('@/pages/auth/signin'));
const DashboardPage = lazy(() => import('@/pages/dashboard'));
const StudentPage = lazy(() => import('@/pages/students'));
const StudentDetailPage = lazy(
  () => import('@/pages/students/StudentDetailPage')
);
const EventsPage = lazy(() => import('@/pages/events'));
const OrganizationsPage = lazy(() => import('@/pages/organizations'));
const AchievementsPage = lazy(() => import('@/pages/achievements'));
const MessagesPage = lazy(() => import('@/pages/messages'));
const ProfilePage = lazy(() => import('@/pages/profile'));

// Organization dashboard pages
const OrganizationDashboard = lazy(
  () => import('@/pages/organization-dashboard')
);
const OrganizationEvents = lazy(
  () => import('@/pages/organization-dashboard/events')
);
const OrganizationVolunteers = lazy(
  () => import('@/pages/organization-dashboard/volunteers')
);
const OrganizationMessages = lazy(
  () => import('@/pages/organization-dashboard/messages')
);
const OrganizationAnalytics = lazy(
  () => import('@/pages/organization-dashboard/analytics')
);
const OrganizationProfile = lazy(
  () => import('@/pages/organization-dashboard/profile')
);

// Admin Dashboard Pages
const AdminDashboard = lazy(() => import('@/pages/admin-dashboard'));
const AdminOrganizations = lazy(
  () => import('@/pages/admin-dashboard/organizations')
);
const AdminVolunteers = lazy(
  () => import('@/pages/admin-dashboard/volunteers')
);
const AdminEvents = lazy(() => import('@/pages/admin-dashboard/events'));
const AdminReports = lazy(() => import('@/pages/admin-dashboard/reports'));
const AdminSettings = lazy(() => import('@/pages/admin-dashboard/settings'));

// ----------------------------------------------------------------------

export default function AppRouter() {
  // Public routes that don't require authentication
  const publicRoutes = [
    {
      path: '/',
      element: <SignInPage />
    },
    {
      path: '/login',
      element: <Navigate to="/" replace />
    },
    {
      path: '/404',
      element: <NotFound />
    }
  ];

  // Dashboard routes that require authentication
  const dashboardRoutes = [
    {
      path: '/dashboard',
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        {
          element: <DashboardPage />,
          index: true
        },
        {
          path: 'events',
          element: <EventsPage />
        },
        {
          path: 'organizations',
          element: <OrganizationsPage />
        },
        {
          path: 'achievements',
          element: <AchievementsPage />
        },
        {
          path: 'messages',
          element: <MessagesPage />
        },
        {
          path: 'profile',
          element: <ProfilePage />
        },
        {
          path: 'student',
          element: <StudentPage />
        },
        {
          path: 'student/details',
          element: <StudentDetailPage />
        },
        {
          path: 'form',
          element: <FormPage />
        },
        {
          path: 'admin-dashboard',
          element: <AdminDashboard />
        },
        {
          path: 'admin-dashboard/organizations',
          element: <AdminOrganizations />
        },
        {
          path: 'admin-dashboard/volunteers',
          element: <AdminVolunteers />
        },
        {
          path: 'admin-dashboard/events',
          element: <AdminEvents />
        },
        {
          path: 'admin-dashboard/reports',
          element: <AdminReports />
        },
        {
          path: 'admin-dashboard/settings',
          element: <AdminSettings />
        }
      ]
    },
    // Organization Dashboard Routes
    {
      path: '/organization',
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        {
          element: <OrganizationDashboard />,
          index: true
        },
        {
          path: 'events',
          element: <OrganizationEvents />
        },
        {
          path: 'volunteers',
          element: <OrganizationVolunteers />
        },
        {
          path: 'messages',
          element: <OrganizationMessages />
        },
        {
          path: 'analytics',
          element: <OrganizationAnalytics />
        },
        {
          path: 'profile',
          element: <OrganizationProfile />
        }
        // Add more organization routes here as needed
      ]
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    }
  ];

  const routes = useRoutes([...publicRoutes, ...dashboardRoutes]);

  return routes;
}
