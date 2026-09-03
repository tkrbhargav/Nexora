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
		{ path: "settings",                 element: <div className="text-xl font-semibold">Settings</div> },
	],
};
