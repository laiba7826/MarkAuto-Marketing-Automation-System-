import React from 'react';
import { Check, X } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { useCollection } from '../../hooks/useCollection';
import type { ReviewItem } from '../../types';

export const ReviewPage = () => {
  const { items, update } = useCollection<ReviewItem>('/reviews');
  return (
    <div className="space-y-8">
      <PageHeader title="Review Content" subtitle="Approve or reject content submitted by creators." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map(r => (
          <div key={r.id} className="card space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-black">{r.title}</h3>
                <p className="text-xs section-muted font-bold uppercase tracking-wider mt-1">{r.type} · by {r.submittedBy}</p>
              </div>
              <StatusBadge status={r.status} />
            </div>
            {r.status === 'Pending' && (
              <div className="flex items-center gap-2">
                <button onClick={() => update(r.id, { status: 'Approved' })} className="flex items-center gap-1.5 px-3 py-2 bg-green-500/20 text-green-300 rounded-lg font-bold text-sm hover:bg-green-500/30 transition-colors"><Check size={16} /> Approve</button>
                <button onClick={() => update(r.id, { status: 'Rejected' })} className="flex items-center gap-1.5 px-3 py-2 bg-red-500/20 text-red-300 rounded-lg font-bold text-sm hover:bg-red-500/30 transition-colors"><X size={16} /> Reject</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
