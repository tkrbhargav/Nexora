import { lazy } from 'react';
import { type RouteObject } from 'react-router';
import { AppRoot } from '../root';

const AdminDashboardPage = lazy(() => import('./dashboard'));
const AdminInventoryPage = lazy(() => import('./inventory'));
const AdminOrganizations = lazy(() => import('./organization'));
const AdminUsersPage     = lazy(() => import('./users'));

export const adminRoutes: RouteObject = {
    path: 'admin',
    element: <AppRoot />,
    children: [
        { index: true,           element: <AdminDashboardPage /> },
        { path: 'dashboard',     element: <AdminDashboardPage /> },
        { path: 'inventory',     element: <AdminInventoryPage /> },
        { path: 'organizations', element: <AdminOrganizations /> },
        { path: 'users',         element: <AdminUsersPage />     },
        { path: 'reports',       element: <div className="text-xl font-semibold">Reports</div> },
    ],
};
