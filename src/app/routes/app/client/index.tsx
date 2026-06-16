import { lazy } from 'react';
import { type RouteObject } from 'react-router';
import { AppRoot } from '../root';

// import client pages here when ready, e.g.:
const ClientDashboardPage = lazy(() => import('./dashboard'));
const ClientInventoryPage = lazy(() => import('./inventory'));
const ClientOrganizations = lazy(() => import('./organization'));
const ClientUsersPage     = lazy(() => import('./users'));

export const clientRoutes: RouteObject = {
    path: '/',
    element: <AppRoot />,
    children: [
        // Client routes go here, e.g.:
        { index: true,           element: <ClientDashboardPage /> },
        { path: 'dashboard',     element: <ClientDashboardPage /> },
        { path: 'inventory',     element: <ClientInventoryPage /> },
        { path: 'organizations', element: <ClientOrganizations /> },
        { path: 'users',         element: <ClientUsersPage />     },
        { path: 'reports',       element: <div className="text-xl font-semibold">Reports</div> }
    ],
};
