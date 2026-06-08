import { createBrowserRouter } from 'react-router';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { AppRoot } from './routes/app/root';

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
              element: <div className="text-xl font-semibold">Dashboard</div>
            },
            {
              path: "/client/dashboard",
              element: <div className="text-xl font-semibold">Client Dashboard</div>
            },
            {
              path: "/organizations",
              element: <div className="text-xl font-semibold">Organizations</div>
            },
            {
              path: "/inventory",
              element: <div className="text-xl font-semibold">Inventory</div>
            },
            {
              path: "/users",
              element: <div className="text-xl font-semibold">Users</div>
            },
            {
              path: "/activity",
              element: <div className="text-xl font-semibold">Activity</div>
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
