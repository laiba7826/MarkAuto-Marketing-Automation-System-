import React, { useState } from 'react';
import { useCollection } from '../../hooks/useCollection';
import type { Lead } from '../../types';
import { Plus, MoreHorizontal, Filter, Search, Download, Users, X } from 'lucide-react';

export const LeadsBoard = () => {
  const { items: leads, create, remove } = useCollection<Lead>('/leads');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    status: 'New' as Lead['status'],
    revenue: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.company) return;

    await create({
      name: formData.name,
      email: formData.email || `${formData.name.toLowerCase().replace(' ', '')}@example.com`,
      company: formData.company,
      status: formData.status,
      revenue: Number(formData.revenue),
      lastContact: new Date().toISOString().split('T')[0],
    });

    setFormData({ name: '', email: '', company: '', status: 'New', revenue: 0 });
    setIsModalOpen(false);
  };

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRevenue = leads.reduce((sum, lead) => sum + lead.revenue, 0);
  const avgValue = leads.length > 0 ? Math.round(totalRevenue / leads.length) : 0;
  const qualifiedLeads = leads.filter(lead => lead.status === 'Qualified').length;
  const closedLeads = leads.filter(lead => lead.status === 'Closed').length;
  const conversionRate = leads.length > 0 ? ((closedLeads / leads.length) * 100).toFixed(1) : '0.0';

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Leads Management</h1>
          <p className="text-blue-300 font-medium">Track and nurture your sales pipeline.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 btn-action"
        >
          <Plus size={20} />
          Create Lead
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Leads', val: leads.length, change: '+12%' },
          { label: 'Qualified Stage', val: qualifiedLeads, change: '+8%' },
          { label: 'Avg. Value', val: `$${avgValue.toLocaleString()}`, change: '+5%' },
          { label: 'Conversion', val: `${conversionRate}%`, change: '+2%' },
        ].map((stat, i) => (
          <div key={i} className="card bg-blue-900/50 border-blue-800 hover:border-blue-700">
            <p className="text-sm font-bold text-blue-300 uppercase tracking-wider mb-2">{stat.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-black text-white">{stat.val}</h3>
              <span className="text-sm font-bold text-blue-200 bg-blue-800/50 px-2 py-0.5 rounded-md">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="card !p-0 overflow-hidden border-blue-800">
        <div className="p-4 border-b border-blue-800 bg-blue-900/50 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" size={16} />
              <input 
                type="text" 
                placeholder="Search leads..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-blue-800/30 border border-blue-700 rounded-lg text-sm text-blue-50 placeholder-blue-400 focus:ring-2 focus:ring-blue-500 transition-all" 
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-blue-300 border border-blue-700 rounded-lg hover:bg-blue-800/50">
              <Filter size={16} />
              Filters
            </button>
          </div>
          <button className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-blue-300 hover:text-blue-100">
            <Download size={16} />
            Export
          </button>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-blue-800/50 text-blue-300 text-[11px] font-black uppercase tracking-[0.1em] border-b border-blue-800">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Est. Revenue</th>
              <th className="px-6 py-4">Last Contact</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-800/50">
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-blue-800/30">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center font-bold text-blue-200 text-xs">
                      {lead.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-black text-white">{lead.name}</p>
                      <p className="text-xs text-blue-400">{lead.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-blue-200">{lead.company}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                    lead.status === 'Closed' ? 'bg-blue-700 text-blue-100' : 
                    lead.status === 'New' ? 'bg-blue-800 text-blue-200' : 'bg-blue-700 text-blue-100'
                  }`}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-black text-white">${lead.revenue.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-blue-400">{lead.lastContact}</td>
                <td className="px-6 py-4 text-right flex justify-end gap-2">
                  <button 
                    onClick={() => remove(lead.id)}
                    className="text-red-400 hover:text-red-300 text-xs font-bold px-2 py-1 rounded hover:bg-red-500/10"
                  >
                    Delete
                  </button>
                  <button className="text-blue-400 hover:text-cyan-300">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-950/60 backdrop-blur-sm">
          <div className="bg-blue-900 rounded-xl shadow-2xl w-full max-w-md border border-blue-800">
            <div className="flex items-center justify-between px-6 py-4 border-b border-blue-800 bg-blue-800/50">
              <h3 className="font-black text-white text-lg">Create New Lead</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-blue-300 hover:text-blue-100">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="Full Name"
                className="w-full px-3 py-2 bg-blue-800/30 border border-blue-700 rounded-lg text-sm text-white placeholder-blue-500"
              />
              <input 
                type="email" 
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email"
                className="w-full px-3 py-2 bg-blue-800/30 border border-blue-700 rounded-lg text-sm text-white placeholder-blue-500"
              />
              <input 
                type="text" 
                required
                value={formData.company}
                onChange={e => setFormData({ ...formData, company: e.target.value })}
                placeholder="Company"
                className="w-full px-3 py-2 bg-blue-800/30 border border-blue-700 rounded-lg text-sm text-white placeholder-blue-500"
              />
              <select 
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value as Lead['status'] })}
                className="w-full px-3 py-2 bg-blue-800/30 border border-blue-700 rounded-lg text-sm text-white"
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal">Proposal</option>
                <option value="Negotiation">Negotiation</option>
                <option value="Closed">Closed</option>
              </select>
              <input 
                type="number" 
                value={formData.revenue}
                onChange={e => setFormData({ ...formData, revenue: Number(e.target.value) })}
                placeholder="Revenue"
                className="w-full px-3 py-2 bg-blue-800/30 border border-blue-700 rounded-lg text-sm text-white placeholder-blue-500"
              />
              <div className="flex justify-end gap-3 pt-4 border-t border-blue-700">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-blue-700 rounded-lg text-sm font-bold text-blue-300 hover:bg-blue-800/50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-lg text-sm font-bold"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
