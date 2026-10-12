import { lazy } from 'react';
import { type RouteObject } from 'react-router';
import { AppRoot } from '../root';

const ClientDashboardPage = lazy(() => import('./dashboard'));
const ClientInventoryPage = lazy(() => import('./inventory'));
const ClientInventoryDetailsPage = lazy(() => import('./inventory/details'));
const ClientOrganizations = lazy(() => import('./organization'));
const ClientOrganizationDetailsPage = lazy(() => import('./organization/details'));
const ClientUsersPage     = lazy(() => import('./users'));
const ClientUserDetailsPage = lazy(() => import('./users/details'));
const ClientProfilePage = lazy(() => import('./profile'));
const ClientReportsPage = lazy(() => import('./reports'));
const ClientSettingsPage = lazy(() => import('./settings'));

export const clientRoutes: RouteObject = {
    path: '/',
    element: <AppRoot />,
    children: [
        { index: true,                   element: <ClientDashboardPage /> },
        { path: 'dashboard',             element: <ClientDashboardPage /> },
        { path: 'inventory',             element: <ClientInventoryPage /> },
        { path: 'inventory/:itemId',     element: <ClientInventoryDetailsPage /> },
        { path: 'organizations',         element: <ClientOrganizations /> },
        { path: 'organizations/:orgId',  element: <ClientOrganizationDetailsPage /> },
        { path: 'users',                 element: <ClientUsersPage />     },
        { path: 'users/:userId',         element: <ClientUserDetailsPage /> },
        { path: 'profile',               element: <ClientProfilePage /> },
        { path: 'reports',               element: <ClientReportsPage /> },
        { path: 'settings',              element: <ClientSettingsPage /> }
    ],
};
