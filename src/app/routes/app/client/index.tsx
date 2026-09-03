import { lazy } from 'react';
import { type RouteObject } from 'react-router';
import { AppRoot } from '../root';

// import client pages here when ready, e.g.:
const ClientDashboardPage = lazy(() => import('./dashboard'));
const ClientInventoryPage = lazy(() => import('./inventory'));
const ClientInventoryDetailsPage = lazy(() => import('./inventory/details'));
const ClientOrganizations = lazy(() => import('./organization'));
const ClientOrganizationDetailsPage = lazy(() => import('./organization/details'));
const ClientUsersPage     = lazy(() => import('./users'));
const ClientUserDetailsPage = lazy(() => import('./users/details'));

export const clientRoutes: RouteObject = {
    path: '/',
    element: <AppRoot />,
    children: [
        // Client routes go here, e.g.:
        { index: true,                   element: <ClientDashboardPage /> },
        { path: 'dashboard',             element: <ClientDashboardPage /> },
        { path: 'inventory',             element: <ClientInventoryPage /> },
        { path: 'inventory/:itemId',     element: <ClientInventoryDetailsPage /> },
        { path: 'organizations',         element: <ClientOrganizations /> },
        { path: 'organizations/:orgId',  element: <ClientOrganizationDetailsPage /> },
        { path: 'users',                 element: <ClientUsersPage />     },
        { path: 'users/:userId',         element: <ClientUserDetailsPage /> },
        { path: 'reports',               element: <div className="text-xl font-semibold">Reports</div> },
        { path: 'settings',              element: <div className="text-xl font-semibold">Settings</div> }
    ],
};
