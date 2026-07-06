import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, DollarSign, Target, ArrowUpRight } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';

interface StatsData {
  activeLeads: number;
  campaigns: number;
  budgetRequests: number;
  ytdRevenue: string;
  revenueData: { name: string; amount: number }[];
}

const chartTooltip = { borderRadius: '12px', border: '1px solid rgba(59,130,246,0.3)', background: '#1e3a8a', color: '#f8fafc' };

export const RevenueStats = () => {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/dashboard/stats');
        if (!res.ok) throw new Error('Failed to fetch revenue stats');
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error(err);
        setStats({
          activeLeads: 5,
          campaigns: 3,
          budgetRequests: 2,
          ytdRevenue: '$324,500',
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

  if (loading || !stats) {
    return <div className="flex items-center justify-center min-h-[400px] section-muted font-medium">Loading revenue analytics...</div>;
  }

  const formattedYtdRevenue = stats.ytdRevenue.startsWith('$') ? stats.ytdRevenue : `$${stats.ytdRevenue}`;

  return (
    <div className="space-y-8">
      <PageHeader title="Revenue Analytics" subtitle="Monitoring financial performance and growth trends." />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="card space-y-4">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-green-500/15 text-green-300 rounded-lg"><DollarSign size={24} /></div>
            <span className="text-sm font-bold text-green-300 flex items-center gap-1">+14.5% <ArrowUpRight size={14} /></span>
          </div>
          <div>
            <p className="text-sm font-semibold section-muted uppercase tracking-widest">Year to Date Revenue</p>
            <h3 className="text-4xl font-black tracking-tight">{formattedYtdRevenue}</h3>
          </div>
        </div>

        <div className="card space-y-4">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-cyan-500/15 text-cyan-300 rounded-lg"><Target size={24} /></div>
            <span className="text-sm font-bold text-cyan-300 flex items-center gap-1">92% Goal <ArrowUpRight size={14} /></span>
          </div>
          <div>
            <p className="text-sm font-semibold section-muted uppercase tracking-widest">Monthly Target</p>
            <h3 className="text-4xl font-black tracking-tight">$65,000</h3>
          </div>
        </div>

        <div className="card space-y-4">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-violet-500/15 text-violet-300 rounded-lg"><TrendingUp size={24} /></div>
            <span className="text-sm font-bold text-violet-300 flex items-center gap-1">Premium Plan</span>
          </div>
          <div>
            <p className="text-sm font-semibold section-muted uppercase tracking-widest">Avg. Deal Size</p>
            <h3 className="text-4xl font-black tracking-tight">$8,240</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card min-h-[400px]">
          <h4 className="text-lg font-black mb-8">Revenue Growth (Monthly)</h4>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.revenueData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(59,130,246,0.25)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#93c5fd', fontSize: 12, fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#93c5fd', fontSize: 12, fontWeight: 600 }} tickFormatter={(val) => `$${val/1000}k`} />
                <Tooltip contentStyle={chartTooltip} />
                <Area type="monotone" dataKey="amount" stroke="#38bdf8" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card min-h-[400px]">
          <h4 className="text-lg font-black mb-8">Performance vs Target</h4>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(59,130,246,0.25)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#93c5fd', fontSize: 12, fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#93c5fd', fontSize: 12, fontWeight: 600 }} tickFormatter={(val) => `$${val/1000}k`} />
                <Tooltip cursor={{ fill: 'rgba(59,130,246,0.15)' }} contentStyle={chartTooltip} />
                <Bar dataKey="amount" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
