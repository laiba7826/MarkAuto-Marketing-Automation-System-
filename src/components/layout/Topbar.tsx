import React from 'react';
import { Bell, Search, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import type { Role } from '../../types';

export const Topbar = () => {
  const { user, login, logout } = useAuth();

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const role = e.target.value as Role;
    login(role);
  };

  return (
    <header className="h-16 backdrop-blur-xl border-b fixed top-0 right-0 left-72 z-20" style={{ background: 'color-mix(in srgb, var(--surface-solid) 85%, transparent)', borderColor: 'var(--border)' }}>
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between gap-4">
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" size={18} style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search campaigns, leads..."
              className="topbar-input"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 rounded-2xl px-4 py-2 text-sm" style={{ border: '1px solid var(--border)', background: 'var(--surface-alt)', color: 'var(--text-secondary)' }}>
            <span className="font-semibold uppercase tracking-[0.24em]">Mock Role</span>
            <select
              value={user?.role || 'Visitor'}
              onChange={handleRoleChange}
              className="bg-transparent text-sm font-bold border-none focus:ring-0 cursor-pointer outline-none"
              style={{ color: 'var(--text)' }}
            >
              <option value="Visitor">Visitor</option>
              <option value="Admin">Admin</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Marketing">Marketing</option>
              <option value="Content">Content</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

          <button className="relative inline-flex items-center justify-center rounded-2xl p-2 transition" style={{ border: '1px solid var(--border)', background: 'var(--surface-alt)', color: 'var(--text-muted)' }}>
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-red-500 text-[10px] text-white font-bold px-1.5">3</span>
          </button>

          <button
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition hover:border-red-400 hover:text-red-400"
            style={{ border: '1px solid var(--border)', background: 'var(--surface-alt)', color: 'var(--text-secondary)' }}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};
