# MarkAuto — Marketing Automation System (Frontend)

A React + TypeScript + Vite single-page interface for the Marketing Automation System.
Standalone frontend using in-memory mock data (no backend required).

## Tech stack
- React 18 + TypeScript
- Vite 5 (dev server / build)
- Tailwind CSS 3
- React Router 6 (navigation)
- Recharts (dashboards) · Lucide (icons)

## Run it
```bash
npm install
npm run dev      # start dev server (http://localhost:5173)
npm run build    # type-check + production build
npm run preview  # preview the build
```

## How to use
On the login screen, pick any role to preview that portal. You can also switch
roles live using the "Mock Role" selector in the top bar.

## Single interface — what's included
**Navigation:** role-aware sidebar; each of the 5 roles sees only its own menu.

**Dashboards & data feed:** shared Dashboard, Sales Revenue analytics, Sales Reports
(bar + pie charts), all driven by mock data.

**Data manipulation (create / edit / delete) on mock data:**
- Admin: Users & Roles, Platforms (full CRUD); Site Content, System Settings
- Marketing/Supervisor: Campaigns (CRUD), Review Content (approve/reject), Budget Requests (submit)
- Supervisor: Approve Budgets (approve / counter / reject)
- Content: Schedule (CRUD), Upload Media (drag-drop add/remove), Strategies (CRUD)
- Sales: Leads, Revenue, Reports
- Shared: Messages (send/read), Profile

**Support:** dedicated Support & Help page (FAQs, contact cards, ticket form).

## Project structure
```
src/
  components/layout/   AppShell, Sidebar, Topbar
  components/ui/        Modal, Field, StatusBadge, PageHeader (shared building blocks)
  hooks/useCollection   generic in-memory create/update/delete
  context/AuthContext   mock role-based auth
  pages/                visitor / admin / marketing / supervisor / content / sales / shared
  mocks/data.ts         seed data for every entity
  types/index.ts        domain types (Lead, Campaign, BudgetRequest, etc.)
```

## Notes
- Data is in-memory: changes persist for the session and reset on reload.
- To connect a real backend, replace `mocks/data.ts` seeds and the `useCollection`
  calls with API requests (e.g. fetch/axios) per page.
