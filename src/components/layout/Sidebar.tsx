import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard,
  Users,
  Globe,
  Settings,
  Megaphone,
  CheckCircle,
  Wallet,
  Calendar,
  Upload,
  BarChart3,
  MessageSquare,
  UserCircle,
  TrendingUp,
  FileText,
  Workflow,
  LifeBuoy
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import type { Role } from '../../types';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  roles: Role[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['Admin', 'Supervisor', 'Marketing', 'Content', 'Sales'] },
  { label: 'Users & Roles', href: '/admin/users', icon: Users, roles: ['Admin'] },
  { label: 'Platforms', href: '/admin/platforms', icon: Workflow, roles: ['Admin'] },
  { label: 'Site Content', href: '/admin/content', icon: Globe, roles: ['Admin'] },
  { label: 'System Settings', href: '/admin/settings', icon: Settings, roles: ['Admin'] },
  { label: 'Campaigns', href: '/marketing/campaigns', icon: Megaphone, roles: ['Marketing', 'Supervisor'] },
  { label: 'Strategy Review', href: '/marketing/review', icon: CheckCircle, roles: ['Marketing', 'Supervisor'] },
  { label: 'Budget Requests', href: '/marketing/budget', icon: Wallet, roles: ['Marketing', 'Supervisor'] },
  { label: 'Approve Budgets', href: '/supervisor/approvals', icon: TrendingUp, roles: ['Supervisor'] },
  { label: 'Schedule', href: '/content/schedule', icon: Calendar, roles: ['Content'] },
  { label: 'Upload Media', href: '/content/upload', icon: Upload, roles: ['Content'] },
  { label: 'Strategies', href: '/content/strategies', icon: FileText, roles: ['Content'] },
  { label: 'Leads', href: '/sales/leads', icon: Users, roles: ['Sales'] },
  { label: 'Revenue Tracking', href: '/sales/revenue', icon: TrendingUp, roles: ['Sales'] },
  { label: 'Reports', href: '/sales/reports', icon: BarChart3, roles: ['Sales'] },
  { label: 'Messages', href: '/messages', icon: MessageSquare, roles: ['Admin', 'Supervisor', 'Marketing', 'Content', 'Sales'] },
  { label: 'Profile', href: '/profile', icon: UserCircle, roles: ['Admin', 'Supervisor', 'Marketing', 'Content', 'Sales'] },
  { label: 'Support', href: '/support', icon: LifeBuoy, roles: ['Admin', 'Supervisor', 'Marketing', 'Content', 'Sales'] },
];

export const Sidebar = () => {
  const { user } = useAuth();
  
  if (!user || user.role === 'Visitor') return null;

  const filteredNavItems = navItems.filter(item => item.roles.includes(user.role));

  return (
    <aside className="w-72 h-screen flex flex-col fixed left-0 top-0 overflow-y-auto border-r backdrop-blur-xl" style={{ background: 'color-mix(in srgb, #0c1a3a 95%, transparent)', borderColor: 'var(--border)', boxShadow: '8px 0 40px -30px rgba(15,23,42,0.8)' }}>
      <div className="px-6 py-6 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="inline-flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 text-blue-950 shadow-lg shadow-cyan-500/20">
            <Workflow size={22} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] font-semibold" style={{ color: 'var(--text-muted)' }}>MarkAuto</p>
            <h1 className="text-lg font-black" style={{ color: 'var(--text)' }}>Marketing Ops</h1>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {filteredNavItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-4 py-3 rounded-3xl transition ${
                isActive
                  ? 'text-cyan-100 shadow-[0_10px_30px_-20px_rgba(56,189,248,0.6)] bg-cyan-500/10'
                  : 'text-blue-300 hover:text-white hover:bg-blue-800/30'
              }`
            }
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-3xl bg-blue-950/50 text-blue-400 group-hover:text-cyan-300 transition">
              <item.icon size={18} />
            </div>
            <span className="text-sm font-semibold">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="px-6 py-5 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="rounded-[1.75rem] p-4" style={{ background: 'var(--surface-alt)' }}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 text-blue-950 font-black">{user.name.charAt(0)}</div>
            <div className="min-w-0">
              <p className="text-sm font-bold truncate" style={{ color: 'var(--text)' }}>{user.name}</p>
              <p className="text-[11px] uppercase tracking-[0.25em]" style={{ color: 'var(--text-muted)' }}>{user.role}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
