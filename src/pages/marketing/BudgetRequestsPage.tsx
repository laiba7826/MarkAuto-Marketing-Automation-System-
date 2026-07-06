import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Modal } from '../../components/ui/Modal';
import { Label, Input, Select, Textarea } from '../../components/ui/Field';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { useCollection } from '../../hooks/useCollection';
import { MOCK_CAMPAIGNS } from '../../mocks/data';
import type { BudgetRequest } from '../../types';

export const BudgetRequestsPage = () => {
  const { items, create, remove } = useCollection<BudgetRequest>('/budget-requests');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ campaignName: MOCK_CAMPAIGNS[0].name, amount: 0, description: '' });
  const submit = () => {
    create({ campaignId: '0', campaignName: form.campaignName, amount: form.amount, description: form.description, status: 'Pending', requestedBy: 'Mark Marketing', requestedAt: new Date().toISOString() });
    setOpen(false); setForm({ campaignName: MOCK_CAMPAIGNS[0].name, amount: 0, description: '' });
  };
  return (
    <div className="space-y-8">
      <PageHeader title="Budget Requests" subtitle="Submit funding requests for your campaigns."
        action={<button onClick={() => setOpen(true)} className="btn-action flex items-center gap-2"><Plus size={20} /> New Request</button>} />
      <div className="card !p-0 overflow-hidden">
        <table className="data-table">
          <thead><tr>
            <th>Campaign</th><th>Amount</th><th>Description</th><th>Status</th><th className="text-right">Actions</th>
          </tr></thead>
          <tbody>
            {items.map(r => (
              <tr key={r.id}>
                <td className="cell-strong">{r.campaignName}</td>
                <td className="cell-strong">${r.amount.toLocaleString()}</td>
                <td>{r.description}</td>
                <td><StatusBadge status={r.status} /></td>
                <td className="text-right">
                  {r.status === 'Pending' && <button onClick={() => remove(r.id)} className="p-2 text-blue-300 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 size={16} /></button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title="New Budget Request"
        footer={<><button onClick={() => setOpen(false)} className="btn-secondary">Cancel</button><button onClick={submit} className="btn-action">Submit Request</button></>}>
        <div><Label>Campaign</Label><Select value={form.campaignName} onChange={e => setForm({ ...form, campaignName: e.target.value })}>{MOCK_CAMPAIGNS.map(c => <option key={c.id}>{c.name}</option>)}</Select></div>
        <div><Label>Amount ($)</Label><Input type="number" value={form.amount} onChange={e => setForm({ ...form, amount: Number(e.target.value) })} /></div>
        <div><Label>Justification</Label><Textarea rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Why is this budget needed?" /></div>
      </Modal>
    </div>
  );
};
