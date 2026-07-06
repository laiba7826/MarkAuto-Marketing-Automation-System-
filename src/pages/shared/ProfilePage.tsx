import React, { useState } from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Label, Input } from '../../components/ui/Field';
import { useAuth } from '../../context/AuthContext';

export const ProfilePage = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [saved, setSaved] = useState(false);
  return (
    <div className="space-y-8 max-w-2xl">
      <PageHeader title="Profile & Settings" subtitle="Manage your account details." />
      <div className="card space-y-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-blue-950 flex items-center justify-center text-2xl font-black">{user?.name?.charAt(0)}</div>
          <div><h3 className="font-black text-lg">{user?.name}</h3><p className="text-sm section-muted font-bold uppercase tracking-wider">{user?.role}</p></div>
        </div>
        <div><Label>Full name</Label><Input value={name} onChange={e => setName(e.target.value)} /></div>
        <div><Label>Email</Label><Input value={email} onChange={e => setEmail(e.target.value)} /></div>
        <div className="pt-2"><button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 1500); }} className="btn-action">{saved ? 'Saved!' : 'Save Changes'}</button></div>
      </div>
      <div className="card space-y-5">
        <h4 className="section-title">Change Password</h4>
        <div><Label>Current password</Label><Input type="password" placeholder="••••••••" /></div>
        <div><Label>New password</Label><Input type="password" placeholder="••••••••" /></div>
        <div className="pt-2"><button className="btn-action">Update Password</button></div>
      </div>
    </div>
  );
};
