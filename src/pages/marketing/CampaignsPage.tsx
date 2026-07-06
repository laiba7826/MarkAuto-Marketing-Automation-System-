import React, { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Modal } from '../../components/ui/Modal';
import { Label, Input, Select, Textarea } from '../../components/ui/Field';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { useCollection } from '../../hooks/useCollection';
import type { Campaign } from '../../types';

const blank = { name: '', platform: 'Instagram', budget: 0, status: 'Draft', metrics: { clicks: 0, impressions: 0, conversions: 0 } } as any;

export const CampaignsPage = () => {
  const { items, create, update, remove } = useCollection<Campaign>('/campaigns');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Campaign | null>(null);
  const [form, setForm] = useState<any>(blank);

  const openCreate = () => { setEditing(null); setForm(blank); setOpen(true); };
  const openEdit = (row: Campaign) => { setEditing(row); setForm({ ...row }); setOpen(true); };
  const save = () => { if (editing) update(editing.id, form); else create(form); setOpen(false); };

  return (
    <div className="space-y-8">
      <PageHeader title="Campaigns" subtitle="Plan, launch and track marketing campaigns."
        action={<button onClick={openCreate} className="btn-action flex items-center gap-2"><Plus size={20} /> New Campaign</button>} />
      <div className="card !p-0 overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th>Campaign</th>
              <th>Platform</th>
              <th>Budget</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(row => (
              <tr key={row.id}>
                <td>{String(row.name ?? '')}</td>
                <td>{String(row.platform ?? '')}</td>
                <td className="cell-strong">{'$' + Number(row.budget).toLocaleString()}</td>
                <td><StatusBadge status={String(row.status)} /></td>
                <td>
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => openEdit(row)} className="p-2 text-blue-300 hover:text-cyan-200 hover:bg-blue-800/40 rounded-lg transition-colors"><Pencil size={16} /></button>
                    <button onClick={() => remove(row.id)} className="p-2 text-blue-300 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && <tr><td colSpan={5} className="px-6 py-12 text-center section-muted font-medium">No records yet. Click "New Campaign" to add one.</td></tr>}
          </tbody>
        </table>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Edit' : 'New Campaign'}
        footer={<>
          <button onClick={() => setOpen(false)} className="btn-secondary">Cancel</button>
          <button onClick={save} className="btn-action">{editing ? 'Save Changes' : 'Create'}</button>
        </>}>
        <div><Label>Campaign name</Label><Input value={(form as any).name} onChange={e => setForm({ ...form, name: e.target.value as any })} /></div>
        <div><Label>Platform</Label><Input value={(form as any).platform} onChange={e => setForm({ ...form, platform: e.target.value as any })} /></div>
        <div><Label>Budget</Label><Input type="number" value={(form as any).budget} onChange={e => setForm({ ...form, budget: Number(e.target.value) as any })} /></div>
        <div><Label>Status</Label><Select value={(form as any).status} onChange={e => setForm({ ...form, status: e.target.value as any })}><option key="Draft" value="Draft">Draft</option><option key="Active" value="Active">Active</option><option key="Paused" value="Paused">Paused</option><option key="Completed" value="Completed">Completed</option></Select></div>
      </Modal>
    </div>
  );
};
