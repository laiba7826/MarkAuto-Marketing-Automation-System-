import React, { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Modal } from '../../components/ui/Modal';
import { Label, Input, Select } from '../../components/ui/Field';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { useCollection } from '../../hooks/useCollection';
import type { User, Role } from '../../types';

const ROLES: Role[] = ['Admin', 'Supervisor', 'Marketing', 'Content', 'Sales'];
const blank: Omit<User, 'id'> = { name: '', email: '', role: 'Marketing', status: 'Active', phone: '' };

export const UsersPage = () => {
  const { items, create, update, remove } = useCollection<User>('/users');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [form, setForm] = useState<Omit<User, 'id'>>(blank);

  const openCreate = () => { setEditing(null); setForm(blank); setOpen(true); };
  const openEdit = (u: User) => { setEditing(u); setForm({ name: u.name, email: u.email, role: u.role, status: u.status || 'Active', phone: u.phone || '' }); setOpen(true); };
  const save = () => {
    if (!form.name || !form.email) return;
    if (editing) update(editing.id, form); else create(form);
    setOpen(false);
  };

  return (
    <div className="space-y-8">
      <PageHeader title="Users & Roles" subtitle="Manage accounts and access across the platform."
        action={<button onClick={openCreate} className="btn-action flex items-center gap-2"><Plus size={20} /> Add User</button>} />

      <div className="card !p-0 overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th><th>Email</th>
              <th>Role</th><th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(u => (
              <tr key={u.id}>
                <td className="cell-strong">{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td><StatusBadge status={u.status || 'Active'} /></td>
                <td>
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => openEdit(u)} className="p-2 text-blue-300 hover:text-cyan-200 hover:bg-blue-800/40 rounded-lg transition-colors"><Pencil size={16} /></button>
                    <button onClick={() => remove(u.id)} className="p-2 text-blue-300 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Edit User' : 'Add User'}
        footer={<>
          <button onClick={() => setOpen(false)} className="btn-secondary">Cancel</button>
          <button onClick={save} className="btn-action">{editing ? 'Save Changes' : 'Create User'}</button>
        </>}>
        <div><Label>Full name</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Jane Doe" /></div>
        <div><Label>Email</Label><Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="jane@company.com" /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><Label>Role</Label><Select value={form.role} onChange={e => setForm({ ...form, role: e.target.value as Role })}>{ROLES.map(r => <option key={r} value={r}>{r}</option>)}</Select></div>
          <div><Label>Status</Label><Select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as User['status'] })}><option>Active</option><option>Inactive</option></Select></div>
        </div>
        <div><Label>Phone</Label><Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="0300-0000000" /></div>
      </Modal>
    </div>
  );
};
