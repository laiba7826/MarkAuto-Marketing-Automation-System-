import React from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { useAuth } from '../../context/AuthContext';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const { user } = useAuth();

  if (!user || user.role === 'Visitor') {
    return <main className="app-bg">{children}</main>;
  }

  return (
    <div className="app-bg flex">
      <Sidebar />
      <div className="flex-1 flex flex-col pl-72">
        <Topbar />
        <main className="mt-16 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
