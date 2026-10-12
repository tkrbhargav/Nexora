import { lazy } from "react";
import { type RouteObject } from "react-router";
import { AppRoot } from "../root";

const AdminDashboardPage = lazy(() => import("./dashboard"));
const AdminInventoryPage = lazy(() => import("./inventory"));
const AdminInventoryDetailsPage = lazy(() => import("./inventory/details"));
const AdminOrganizations = lazy(() => import("./organization"));
const AdminOrganizationDetailsPage = lazy(() => import("./organization/details"));
const AdminUsersPage = lazy(() => import("./users"));
const AdminUserDetailsPage = lazy(() => import("./users/details"));
const AdminProfilePage = lazy(() => import("./profile"));
const AdminSettingsPage = lazy(() => import("./settings"));
const AdminReportsPage = lazy(() => import("./reports"));

export const adminRoutes: RouteObject = {
	path: "admin",
	element: <AppRoot />,
	children: [
		{ index: true,                      element: <AdminDashboardPage /> },
		{ path: "dashboard",                element: <AdminDashboardPage /> },
		{ path: "inventory",                element: <AdminInventoryPage /> },
		{ path: "inventory/:itemId",        element: <AdminInventoryDetailsPage /> },
		{ path: "organizations",            element: <AdminOrganizations /> },
		{ path: "organizations/:orgId",     element: <AdminOrganizationDetailsPage /> },
		{ path: "users",                    element: <AdminUsersPage /> },
		{ path: "users/:userId",            element: <AdminUserDetailsPage /> },
		{ path: "profile",                  element: <AdminProfilePage /> },
		{ path: "reports",                  element: <AdminReportsPage /> },
		{ path: "settings",                 element: <AdminSettingsPage /> },
	],
};
