import React, { useState } from 'react';
import { LifeBuoy, ChevronDown, Mail, MessageCircle, BookOpen } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Label, Input, Textarea } from '../../components/ui/Field';

const FAQS = [
  { q: 'How do I create a campaign?', a: 'Go to Campaigns in the sidebar and click "New Campaign". Fill in the name, platform and budget, then save.' },
  { q: 'How do budget approvals work?', a: 'Marketing submits a request under Budget Requests. Supervisors review it under Approve Budgets and can approve, counter, or reject.' },
  { q: 'How do I upload media?', a: 'Open Upload Media under the Content section and drag files into the upload area, or click to browse.' },
  { q: 'How is my data stored?', a: 'This demo runs on in-memory mock data. Changes persist for your session and reset on reload.' },
];

export const SupportPage = () => {
  const [open, setOpen] = useState<number | null>(0);
  const [sent, setSent] = useState(false);
  return (
    <div className="space-y-8">
      <PageHeader title="Support & Help" subtitle="Find answers or get in touch with our team." />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[{ icon: BookOpen, t: 'Documentation', d: 'Browse guides and tutorials' }, { icon: MessageCircle, t: 'Live Chat', d: 'Chat with support 9-5' }, { icon: Mail, t: 'Email Us', d: 'support@markauto.com' }].map((c, i) => (
          <div key={i} className="card flex items-center gap-4">
            <div className="p-3 bg-cyan-500/15 text-cyan-300 rounded-xl"><c.icon size={22} /></div>
            <div><p className="font-black">{c.t}</p><p className="text-sm section-muted">{c.d}</p></div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <h4 className="section-title mb-4 flex items-center gap-2"><LifeBuoy size={18} className="text-cyan-400" /> Frequently Asked Questions</h4>
          <div className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
            {FAQS.map((f, i) => (
              <div key={i} className="py-3">
                <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between text-left font-bold">
                  {f.q}<ChevronDown size={18} className={`transition-transform ${open === i ? 'rotate-180' : ''}`} />
                </button>
                {open === i && <p className="text-sm section-muted mt-2 leading-relaxed">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h4 className="section-title mb-4">Submit a Ticket</h4>
          {sent ? <div className="py-12 text-center text-green-400 font-bold">Ticket submitted! We'll be in touch.</div> : (
            <div className="space-y-4">
              <div><Label>Subject</Label><Input placeholder="Briefly describe the issue" /></div>
              <div><Label>Message</Label><Textarea rows={4} placeholder="Tell us what's happening..." /></div>
              <button onClick={() => setSent(true)} className="btn-action">Submit Ticket</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
