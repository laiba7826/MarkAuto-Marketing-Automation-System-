import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { PageHeader } from '../../components/ui/PageHeader';
import type { Lead, Sale } from '../../types';

const COLORS = ['#0ea5e9', '#6366f1', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444'];
const chartTooltip = { borderRadius: '12px', border: '1px solid rgba(59,130,246,0.3)', background: '#1e3a8a', color: '#f8fafc' };

export const ReportsPage = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [leadsRes, salesRes, revRes] = await Promise.all([
          fetch('http://localhost:5000/api/leads'),
          fetch('http://localhost:5000/api/sales'),
          fetch('http://localhost:5000/api/revenue-data')
        ]);
        if (!leadsRes.ok || !salesRes.ok || !revRes.ok) {
          throw new Error('Failed to load reports data');
        }
        const leadsData = await leadsRes.json();
        const salesData = await salesRes.json();
        const revData = await revRes.json();
        setLeads(leadsData);
        setSales(salesData);
        setRevenueData(revData);
      } catch (err) {
        console.error(err);
        setLeads([
          { id: '1', name: 'John Doe', email: 'john@techcorp.com', company: 'TechCorp', status: 'New', revenue: 5000, lastContact: '2024-03-10' },
          { id: '2', name: 'Jane Smith', email: 'jane@innovate.io', company: 'Innovate', status: 'Qualified', revenue: 12000, lastContact: '2024-03-12' },
          { id: '3', name: 'Bob Wilson', email: 'bob@buildit.com', company: 'BuildIt', status: 'Proposal', revenue: 25000, lastContact: '2024-03-15' },
          { id: '4', name: 'Alice Brown', email: 'alice@dataflow.net', company: 'DataFlow', status: 'Negotiation', revenue: 45000, lastContact: '2024-03-18' },
          { id: '5', name: 'Charlie Davis', email: 'charlie@bright.com', company: 'Bright Inc', status: 'Closed', revenue: 15000, lastContact: '2024-03-20' },
        ]);
        setSales([
          { id: '1', leadName: 'Charlie Davis', service: 'SEO Package', revenue: 15000, closedAt: '2024-03-20' },
          { id: '2', leadName: 'Acme Co', service: 'Social Management', revenue: 22000, closedAt: '2024-03-22' },
        ]);
        setRevenueData([
          { name: 'Jan', amount: 45000 }, { name: 'Feb', amount: 52000 }, { name: 'Mar', amount: 48000 },
          { name: 'Apr', amount: 61000 }, { name: 'May', amount: 55000 }, { name: 'Jun', amount: 67000 },
        ]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-[400px] section-muted font-medium">Loading reports and analytics...</div>;
  }

  const byStatus = Object.entries(
    leads.reduce<Record<string, number>>((a, l) => {
      a[l.status] = (a[l.status] || 0) + 1;
      return a;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-8">
      <PageHeader title="Sales Reports" subtitle="Pipeline and revenue analytics." />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card min-h-[380px]">
          <h4 className="text-lg font-black mb-8">Monthly Revenue</h4>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(59,130,246,0.25)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#93c5fd', fontSize: 12, fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#93c5fd', fontSize: 12, fontWeight: 600 }} tickFormatter={v => `$${v/1000}k`} />
                <Tooltip cursor={{ fill: 'rgba(59,130,246,0.15)' }} contentStyle={chartTooltip} />
                <Bar dataKey="amount" fill="#0ea5e9" radius={[4, 4, 0, 0]} barSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card min-h-[380px]">
          <h4 className="text-lg font-black mb-8">Leads by Stage</h4>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={byStatus} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                  {byStatus.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={chartTooltip} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="card !p-0 overflow-hidden">
        <div className="p-4 border-b" style={{ borderColor: 'var(--border)', background: 'var(--surface-alt)' }}>
          <h4 className="font-black">Closed Sales</h4>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Service</th>
              <th>Revenue</th>
              <th>Closed</th>
            </tr>
          </thead>
          <tbody>
            {sales.map(s => (
              <tr key={s.id}>
                <td className="cell-strong">{s.leadName}</td>
                <td>{s.service}</td>
                <td className="font-bold text-green-300">${s.revenue.toLocaleString()}</td>
                <td>{s.closedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
