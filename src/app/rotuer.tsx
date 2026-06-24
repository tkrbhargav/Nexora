import { createBrowserRouter } from 'react-router';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { adminRoutes } from './routes/app/admin';
import { clientRoutes } from './routes/app/client';
import LoginPage from './routes/auth/login';
import NotFoundPage from './routes/not-found';

export const router = createBrowserRouter([
    // ── Auth ──────────────────────────────────────────────────
    { path: '/login',  element: <LoginPage />  },
    { path: '/signup', element: <div>Signup</div> },

    // ── Protected ─────────────────────────────────────────────
    {
        element: <ProtectedRoute />,
        children: [
            adminRoutes, 
            clientRoutes, 
        ],
    },

    // ── Fallback ──────────────────────────────────────────────
    { path: '*', element: <NotFoundPage /> },
]);
