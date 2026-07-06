import React from 'react';

const palette: Record<string, string> = {
  New: 'bg-blue-500/20 text-blue-300', Contacted: 'bg-cyan-500/20 text-cyan-300',
  Qualified: 'bg-teal-500/20 text-teal-300', Proposal: 'bg-amber-500/20 text-amber-300',
  Negotiation: 'bg-orange-500/20 text-orange-300', Closed: 'bg-green-500/20 text-green-300',
  Active: 'bg-green-500/20 text-green-300', Draft: 'bg-blue-500/20 text-blue-300',
  Paused: 'bg-amber-500/20 text-amber-300', Completed: 'bg-cyan-500/20 text-cyan-300',
  Pending: 'bg-amber-500/20 text-amber-300', Approved: 'bg-green-500/20 text-green-300',
  Rejected: 'bg-red-500/20 text-red-300', Countered: 'bg-violet-500/20 text-violet-300',
  Connected: 'bg-green-500/20 text-green-300', Disconnected: 'bg-red-500/20 text-red-300',
  Scheduled: 'bg-blue-500/20 text-blue-300', Published: 'bg-green-500/20 text-green-300',
  Inactive: 'bg-slate-500/20 text-slate-300', Archived: 'bg-slate-500/20 text-slate-300',
};

export const StatusBadge: React.FC<{ status: string }> = ({ status }) => (
  <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] shadow-sm ${palette[status] || 'bg-blue-500/20 text-blue-300'}`}>
    <span className="h-2 w-2 rounded-full bg-current" />
    {status}
  </span>
);
