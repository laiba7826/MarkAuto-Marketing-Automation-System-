import React from 'react';
import { Check, X, RotateCcw } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { useCollection } from '../../hooks/useCollection';
import type { BudgetRequest } from '../../types';

export const ApprovalsPage = () => {
  const { items, update } = useCollection<BudgetRequest>('/budget-requests');
  const decide = (id: string, status: BudgetRequest['status']) => {
    const r = items.find(i => i.id === id);
    update(id, { status, approvedAmount: status === 'Approved' ? r?.amount : status === 'Countered' ? Math.round((r?.amount || 0) * 0.8) : 0 });
  };
  return (
    <div className="space-y-8">
      <PageHeader title="Approve Budgets" subtitle="Review and decide on pending budget requests." />
      <div className="space-y-4">
        {items.map(r => (
          <div key={r.id} className="card flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h3 className="font-black">{r.campaignName}</h3>
                <StatusBadge status={r.status} />
              </div>
              <p className="text-sm section-muted font-medium">{r.description}</p>
              <p className="text-xs section-muted font-bold uppercase tracking-wider">Requested by {r.requestedBy} · ${r.amount.toLocaleString()}{r.approvedAmount ? ` · approved $${r.approvedAmount.toLocaleString()}` : ''}</p>
            </div>
            {r.status === 'Pending' && (
              <div className="flex items-center gap-2">
                <button onClick={() => decide(r.id, 'Approved')} className="flex items-center gap-1.5 px-3 py-2 bg-green-500/20 text-green-300 rounded-lg font-bold text-sm hover:bg-green-500/30 transition-colors"><Check size={16} /> Approve</button>
                <button onClick={() => decide(r.id, 'Countered')} className="flex items-center gap-1.5 px-3 py-2 bg-violet-500/20 text-violet-300 rounded-lg font-bold text-sm hover:bg-violet-500/30 transition-colors"><RotateCcw size={16} /> Counter</button>
                <button onClick={() => decide(r.id, 'Rejected')} className="flex items-center gap-1.5 px-3 py-2 bg-red-500/20 text-red-300 rounded-lg font-bold text-sm hover:bg-red-500/30 transition-colors"><X size={16} /> Reject</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
