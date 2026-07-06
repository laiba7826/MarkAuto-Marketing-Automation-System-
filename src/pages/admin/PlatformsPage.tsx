import React, { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Modal } from '../../components/ui/Modal';
import { Label, Input, Select, Textarea } from '../../components/ui/Field';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { useCollection } from '../../hooks/useCollection';
import type { Platform } from '../../types';

const blank = { name: '', type: 'Social', accountHandle: '', status: 'Connected' } as any;

export const PlatformsPage = () => {
  const { items, create, update, remove } = useCollection<Platform>('/platforms');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Platform | null>(null);
  const [form, setForm] = useState<any>(blank);

  const openCreate = () => { setEditing(null); setForm(blank); setOpen(true); };
  const openEdit = (row: Platform) => { setEditing(row); setForm({ ...row }); setOpen(true); };
  const save = () => { if (editing) update(editing.id, form); else create(form); setOpen(false); };

  return (
    <div className="space-y-8">
      <PageHeader title="Platforms" subtitle="Connected marketing channels and integrations."
        action={<button onClick={openCreate} className="btn-action flex items-center gap-2"><Plus size={20} /> Add Platform</button>} />
      <div className="card !p-0 overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Account</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(row => (
              <tr key={row.id}>
                <td>{String(row.name ?? '')}</td>
                <td>{String(row.type ?? '')}</td>
                <td>{String(row.accountHandle ?? '')}</td>
                <td><StatusBadge status={String(row.status)} /></td>
                <td>
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => openEdit(row)} className="p-2 text-blue-300 hover:text-cyan-200 hover:bg-blue-800/40 rounded-lg transition-colors"><Pencil size={16} /></button>
                    <button onClick={() => remove(row.id)} className="p-2 text-blue-300 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && <tr><td colSpan={5} className="px-6 py-12 text-center section-muted font-medium">No records yet. Click "Add Platform" to add one.</td></tr>}
          </tbody>
        </table>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Edit' : 'Add Platform'}
        footer={<>
          <button onClick={() => setOpen(false)} className="btn-secondary">Cancel</button>
          <button onClick={save} className="btn-action">{editing ? 'Save Changes' : 'Create'}</button>
        </>}>
        <div><Label>Name</Label><Input value={(form as any).name} onChange={e => setForm({ ...form, name: e.target.value as any })} /></div>
        <div><Label>Type</Label><Select value={(form as any).type} onChange={e => setForm({ ...form, type: e.target.value as any })}><option key="Social" value="Social">Social</option><option key="Email" value="Email">Email</option><option key="Search" value="Search">Search</option><option key="Display" value="Display">Display</option></Select></div>
        <div><Label>Account handle</Label><Input value={(form as any).accountHandle} onChange={e => setForm({ ...form, accountHandle: e.target.value as any })} /></div>
        <div><Label>Status</Label><Select value={(form as any).status} onChange={e => setForm({ ...form, status: e.target.value as any })}><option key="Connected" value="Connected">Connected</option><option key="Disconnected" value="Disconnected">Disconnected</option></Select></div>
      </Modal>
    </div>
  );
};
