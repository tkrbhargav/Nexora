import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { AppRoot } from './routes/app/root';

const DashboardPage  = lazy(() => import("./routes/app/admin/dashboard"));
const InventoryPage  = lazy(() => import("./routes/app/admin/inventory"));
const Organizations  = lazy(() => import("./routes/app/admin/organization"));
const UsersPage      = lazy(() => import("./routes/app/admin/users"));
const ActivityPage   = lazy(() => import("./routes/app/admin/activity"));

export const router = createBrowserRouter([
    {
      path: "/login",
      element: <div>Login</div>
    },
    {
      path: "/signup",
      element: <div>Signup</div>
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          element: <AppRoot />,
          children: [
            {
              path: "/",
              element: <DashboardPage />
            },
            {
              path: "/client/dashboard",
              element: <div className="text-xl font-semibold">Client Dashboard</div>
            },
            {
              path: "/organizations",
              element: <Organizations/>
            },
            {
              path: "/inventory",
              element: <InventoryPage />
            },
            {
              path: "/users",
              element: <UsersPage />
            },
            {
              path: "/activity",
              element: <ActivityPage />
            },
            {
              path: "/reports",
              element: <div className="text-xl font-semibold">Reports</div>
            },
          ]
        }
      ]
    },
    {
      path: "*",
      element: <div>Not Found</div>
    }
])
