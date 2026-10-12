# Nexora — Modern Admin & Client Management Dashboard

**Nexora** is a high-performance, enterprise-ready dashboard application built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, and **shadcn/ui**. Designed with a modular architecture and polished UI aesthetics, it provides multi-role support for both Administrators and Clients out of the box.

---

## 🌟 Key Features

- **Multi-Role Access Control**: Separate, dedicated workflows and views for **Admin** and **Client** roles.
- **Analytics & Interactive Reports**: Revenue charts, sales channel breakdowns, SKU catalog summaries, and valuation metrics powered by **Recharts**.
- **Inventory Management**: Complete catalog tracking with status tags, stock level indicators, search, filtering, and detail views.
- **Organizations & Users**: Multi-tenant organization directory and user role management with TanStack Table.
- **Profile & Account Controls**: Comprehensive user settings, activity logging, security toggles, and notification rules.
- **Security Controls**: Simulated Two-Factor Authentication (2FA) enforcement, session timeout controls, and API key management.
- **Theme Support**: Flawless Dark Mode and Light Mode with system preference detection powered by `next-themes`.
- **Production-Ready Architecture**: Clean feature-based code organization (`src/features/*`), type safety with TypeScript & Zod schemas, and Zustand state persistence.

---

## 🔐 Demo Credentials

Use any of the following pre-configured mock credentials to explore the dashboard:

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@gmail.com` | `admin@123` | Full admin privileges & system overview |
| **Client** | `client@gmail.com` | `client@123` | Client portal, orders, and assigned orgs |

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite 8
- **Language**: TypeScript 5+ (Strict Mode)
- **Styling**: Tailwind CSS v4 + tw-animate-css
- **UI Components**: shadcn/ui + Radix UI primitives
- **Icons**: Lucide React & Tabler Icons
- **Data Tables**: TanStack React Table v8
- **Data Fetching & Caching**: TanStack React Query v5
- **Forms & Validation**: React Hook Form + Zod 4
- **State Management**: Zustand v5 (with persistent storage)
- **Charts**: Recharts

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **Package Manager**: [pnpm](https://pnpm.io/) (recommended), npm, or yarn

### Installation

1. **Clone or extract the repository:**
   ```bash
   git clone <repository-url>
   cd Nexora
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables:**
   Copy the example environment template:
   ```bash
   cp .env.example .env
   ```

4. **Start the Development Server:**
   ```bash
   pnpm dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Scripts

| Command | Description |
| :--- | :--- |
| `pnpm dev` | Starts Vite development server with HMR |
| `pnpm run build` | Typechecks with `tsc` and builds production bundle to `dist/` |
| `pnpm preview` | Locally previews the production build |
| `pnpm lint` | Runs ESLint analysis |
| `pnpm format` | Formats code with Prettier |

---

## 📂 Project Structure

```text
Nexora/
├── public/                 # Static assets
├── src/
│   ├── app/                # Root providers, app layout, routing & navigation
│   │   ├── routes/         # Protected routes (Admin, Client, Auth)
│   │   ├── provider.tsx    # QueryClient & Theme providers
│   │   └── router.tsx      # Application route definitions
│   ├── assets/             # Vector icons & branding graphics
│   ├── components/         # Reusable UI & layout components
│   │   ├── core/           # shadcn/ui building blocks
│   │   ├── data-table/     # TanStack table primitives & toolbar
│   │   └── ui/             # Form inputs, dialogs, buttons, cards
│   ├── features/           # Modular domain features
│   │   ├── auth/           # Login, signup, authentication API hooks
│   │   ├── dashboard/      # Metrics, revenue & channel charts, recent activity
│   │   ├── inventory/      # Products table, filters, CRUD forms
│   │   ├── organization/   # Organization list, details, schemas
│   │   ├── profile/        # User profile, security tabs, personal stats
│   │   ├── reports/        # Analytics overview, exports & valuations
│   │   ├── settings/       # System settings, notifications, API keys
│   │   └── users/          # User directory, role assignment, status
│   ├── lib/                # API client (Axios) & utility helpers
│   ├── store/              # Zustand global slices (auth, theme)
│   ├── index.css           # Design tokens, color system, Tailwind imports
│   └── main.tsx            # Application entry point
├── .env.example            # Environment variables template
├── components.json         # shadcn/ui configuration
└── package.json            # Project manifest & dependencies
```

---

## 🔒 Security & Privacy Notice

- All sample user records, company data, and API keys included in this repository are **simulated placeholders** designed for demonstration and development purposes.
- Never commit actual production secrets, real API keys, or private environment files (`.env`, `.env.local`) to public version control.

---

## 📄 License

This project is prepared for commercial distribution. Refer to your purchase license agreement for distribution and modification terms.
