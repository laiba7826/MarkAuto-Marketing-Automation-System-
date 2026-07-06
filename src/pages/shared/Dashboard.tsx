import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Megaphone, Wallet } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { PageHeader } from '../../components/ui/PageHeader';

interface DashboardStats {
  activeLeads: number;
  campaigns: number;
  budgetRequests: number;
  ytdRevenue: string;
  revenueData: { name: string; amount: number }[];
}

export const Dashboard = () => {
  const { user } = useAuth();
  const [statsData, setStatsData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/dashboard/stats');
        if (!res.ok) throw new Error('Failed to fetch dashboard stats');
        const data = await res.json();
        setStatsData(data);
      } catch (err) {
        console.error(err);
        setStatsData({
          activeLeads: 5,
          campaigns: 3,
          budgetRequests: 2,
          ytdRevenue: '$324k',
          revenueData: [
            { name: 'Jan', amount: 45000 }, { name: 'Feb', amount: 52000 }, { name: 'Mar', amount: 48000 },
            { name: 'Apr', amount: 61000 }, { name: 'May', amount: 55000 }, { name: 'Jun', amount: 67000 },
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading || !statsData) {
    return <div className="flex items-center justify-center min-h-[400px] section-muted font-medium">Loading Dashboard Overview...</div>;
  }

  const stats = [
    { label: 'Active Leads', val: statsData.activeLeads, icon: Users, color: 'text-cyan-300 bg-cyan-500/15' },
    { label: 'Campaigns', val: statsData.campaigns, icon: Megaphone, color: 'text-cyan-300 bg-cyan-500/15' },
    { label: 'Budget Requests', val: statsData.budgetRequests, icon: Wallet, color: 'text-cyan-300 bg-cyan-500/15' },
    { label: 'YTD Revenue', val: statsData.ytdRevenue, icon: TrendingUp, color: 'text-cyan-300 bg-cyan-500/15' },
  ];

  return (
    <div className="space-y-8">
      <PageHeader title={`Welcome, ${user?.name?.split(' ')[0] || 'there'}`} subtitle={`${user?.role} dashboard · overview of your workspace.`} />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="card space-y-3">
            <div className={`inline-flex p-2 rounded-lg ${s.color}`}><s.icon size={22} /></div>
            <p className="text-sm font-bold section-muted uppercase tracking-wider">{s.label}</p>
            <h3 className="text-3xl font-black tracking-tight">{s.val}</h3>
          </div>
        ))}
      </div>
      <div className="card min-h-[400px]">
        <h4 className="text-lg font-black mb-8">Revenue Trend</h4>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={statsData.revenueData}>
              <defs><linearGradient id="d" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.25}/><stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(59,130,246,0.25)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#93c5fd', fontSize: 12, fontWeight: 600 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#93c5fd', fontSize: 12, fontWeight: 600 }} tickFormatter={v => `$${v/1000}k`} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid rgba(59,130,246,0.3)', background: '#1e3a8a', color: '#f8fafc' }} />
              <Area type="monotone" dataKey="amount" stroke="#38bdf8" strokeWidth={3} fill="url(#d)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
