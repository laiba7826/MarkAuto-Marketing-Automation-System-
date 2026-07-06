import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { AppShell } from './components/layout/AppShell';

import { LandingPage } from './pages/visitor/LandingPage';
import { LoginPage } from './pages/visitor/LoginPage';
import { Dashboard } from './pages/shared/Dashboard';
import { MessagesPage } from './pages/shared/MessagesPage';
import { ProfilePage } from './pages/shared/ProfilePage';
import { SupportPage } from './pages/shared/SupportPage';

import { UsersPage } from './pages/admin/UsersPage';
import { PlatformsPage } from './pages/admin/PlatformsPage';
import { SiteContentPage } from './pages/admin/SiteContentPage';
import { SettingsPage } from './pages/admin/SettingsPage';

import { CampaignsPage } from './pages/marketing/CampaignsPage';
import { ReviewPage } from './pages/marketing/ReviewPage';
import { BudgetRequestsPage } from './pages/marketing/BudgetRequestsPage';
import { ApprovalsPage } from './pages/supervisor/ApprovalsPage';

import { SchedulePage } from './pages/content/SchedulePage';
import { UploadPage } from './pages/content/UploadPage';
import { StrategiesPage } from './pages/content/StrategiesPage';

import { LeadsBoard } from './pages/sales/LeadsBoard';
import { RevenueStats } from './pages/sales/RevenueStats';
import { ReportsPage } from './pages/sales/ReportsPage';

const ProtectedRoute = ({ children, roles }: { children: React.ReactNode; roles?: string[] }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <div className="flex items-center justify-center min-h-screen section-muted">Loading...</div>;
  if (!user || user.role === 'Visitor') return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/dashboard" />;
  return <>{children}</>;
};

const App = () => (
  <ThemeProvider>
  <AuthProvider>
    <BrowserRouter>
      <AppShell>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Shared (all authenticated roles) */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/messages" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/support" element={<ProtectedRoute><SupportPage /></ProtectedRoute>} />

          {/* Admin */}
          <Route path="/admin/users" element={<ProtectedRoute roles={['Admin']}><UsersPage /></ProtectedRoute>} />
          <Route path="/admin/platforms" element={<ProtectedRoute roles={['Admin']}><PlatformsPage /></ProtectedRoute>} />
          <Route path="/admin/content" element={<ProtectedRoute roles={['Admin']}><SiteContentPage /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute roles={['Admin']}><SettingsPage /></ProtectedRoute>} />

          {/* Marketing & Supervisor */}
          <Route path="/marketing/campaigns" element={<ProtectedRoute roles={['Marketing', 'Supervisor']}><CampaignsPage /></ProtectedRoute>} />
          <Route path="/marketing/review" element={<ProtectedRoute roles={['Marketing', 'Supervisor']}><ReviewPage /></ProtectedRoute>} />
          <Route path="/marketing/budget" element={<ProtectedRoute roles={['Marketing', 'Supervisor']}><BudgetRequestsPage /></ProtectedRoute>} />
          <Route path="/supervisor/approvals" element={<ProtectedRoute roles={['Supervisor']}><ApprovalsPage /></ProtectedRoute>} />

          {/* Content */}
          <Route path="/content/schedule" element={<ProtectedRoute roles={['Content']}><SchedulePage /></ProtectedRoute>} />
          <Route path="/content/upload" element={<ProtectedRoute roles={['Content']}><UploadPage /></ProtectedRoute>} />
          <Route path="/content/strategies" element={<ProtectedRoute roles={['Content']}><StrategiesPage /></ProtectedRoute>} />

          {/* Sales */}
          <Route path="/sales/leads" element={<ProtectedRoute roles={['Sales']}><LeadsBoard /></ProtectedRoute>} />
          <Route path="/sales/revenue" element={<ProtectedRoute roles={['Sales']}><RevenueStats /></ProtectedRoute>} />
          <Route path="/sales/reports" element={<ProtectedRoute roles={['Sales']}><ReportsPage /></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  </AuthProvider>
  </ThemeProvider>
);

export default App;
