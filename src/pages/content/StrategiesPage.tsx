import React, { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Modal } from '../../components/ui/Modal';
import { Label, Input, Select, Textarea } from '../../components/ui/Field';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { useCollection } from '../../hooks/useCollection';
import type { Strategy } from '../../types';

const blank = { title: '', objective: '', owner: 'Cathy Content', contentType: 'Reel', status: 'Pending' } as any;

export const StrategiesPage = () => {
  const { items, create, update, remove } = useCollection<Strategy>('/strategies');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Strategy | null>(null);
  const [form, setForm] = useState<any>(blank);

  const openCreate = () => { setEditing(null); setForm(blank); setOpen(true); };
  const openEdit = (row: Strategy) => { setEditing(row); setForm({ ...row }); setOpen(true); };
  const save = () => { if (editing) update(editing.id, form); else create(form); setOpen(false); };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Strategies"
        subtitle="Content creators submit strategies that marketing reviews and approves."
        action={<button onClick={openCreate} className="btn-action flex items-center gap-2"><Plus size={20} /> Submit Strategy</button>}
      />

      <div className="card !p-0 overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Owner</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(row => (
              <tr key={row.id}>
                <td className="cell-strong">{row.title}</td>
                <td>{row.contentType}</td>
                <td>{row.owner}</td>
                <td><StatusBadge status={row.status} /></td>
                <td>
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => openEdit(row)} className="p-2 text-blue-300 hover:text-cyan-200 hover:bg-blue-800/40 rounded-lg transition-colors"><Pencil size={16} /></button>
                    <button onClick={() => remove(row.id)} className="p-2 text-blue-300 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && <tr><td colSpan={5} className="px-6 py-12 text-center section-muted font-medium">No strategy requests yet. Click &quot;Submit Strategy&quot; to begin.</td></tr>}
          </tbody>
        </table>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Edit Strategy' : 'New Strategy'}
        footer={<> 
          <button onClick={() => setOpen(false)} className="btn-secondary">Cancel</button>
          <button onClick={save} className="btn-action">{editing ? 'Save changes' : 'Submit request'}</button>
        </>}>
        <div className="space-y-4">
          <div><Label>Title</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
          <div><Label>Objective</Label><Textarea rows={4} value={form.objective} onChange={e => setForm({ ...form, objective: e.target.value })} /></div>
          <div><Label>Content type</Label><Select value={form.contentType} onChange={e => setForm({ ...form, contentType: e.target.value })}>
            <option value="Reel">Reel</option>
            <option value="Post">Post</option>
            <option value="Copy">Copy</option>
          </Select></div>
          <div><Label>Owner</Label><Input value={form.owner} onChange={e => setForm({ ...form, owner: e.target.value })} /></div>
          {editing && (
            <div><Label>Status</Label><Select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Archived">Archived</option>
            </Select></div>
          )}
        </div>
      </Modal>
    </div>
  );
};
