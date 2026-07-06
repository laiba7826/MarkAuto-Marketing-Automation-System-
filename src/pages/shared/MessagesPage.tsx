import React, { useState } from 'react';
import { Send, MessageSquare } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { useCollection } from '../../hooks/useCollection';
import type { Message } from '../../types';
import { useAuth } from '../../context/AuthContext';

const TEAMS = ['Marketing', 'Supervisors', 'Sales', 'Content', 'Admin'] as const;

export const MessagesPage = () => {
  const { user } = useAuth();
  const { items, create, update } = useCollection<Message>('/messages');
  const [text, setText] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<'Marketing' | 'Supervisors' | 'Sales' | 'Content' | 'Admin'>('Marketing');

  const filteredMessages = items.filter(m => m.recipientTeam === selectedTeam);

  const send = () => {
    if (!text.trim()) return;
    create({
      senderId: user?.id || '0',
      senderName: user?.name || 'You',
      senderRole: user?.role || 'Visitor',
      content: text.trim(),
      timestamp: new Date().toISOString(),
      read: true,
      recipientTeam: selectedTeam,
    });
    setText('');
  };

  const getTeamColor = (team: string) => {
    const colors: { [key: string]: string } = {
      Marketing: 'from-cyan-500 to-blue-600',
      Supervisors: 'from-teal-500 to-cyan-600',
      Sales: 'from-amber-500 to-orange-600',
      Content: 'from-violet-500 to-purple-600',
      Admin: 'from-slate-500 to-gray-600',
    };
    return colors[team] || 'from-cyan-500 to-blue-600';
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <PageHeader title="Messages" subtitle="Send and receive team communications." />

      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare size={18} className="text-cyan-400" />
          <p className="text-sm font-semibold text-slate-300">Send to:</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {TEAMS.map(team => (
            <button
              key={team}
              onClick={() => setSelectedTeam(team)}
              className={`relative px-4 py-3 rounded-2xl font-semibold text-sm transition-all duration-200 ${
                selectedTeam === team
                  ? `bg-gradient-to-r ${getTeamColor(team)} text-white shadow-lg shadow-cyan-500/30 scale-105`
                  : 'bg-slate-800/50 text-slate-300 border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800'
              }`}
            >
              {team}
            </button>
          ))}
        </div>
      </div>

      <div className="card !p-0 overflow-hidden flex flex-col h-[550px] border border-cyan-500/20 bg-gradient-to-b from-slate-900 to-slate-950">
        {/* Team Header */}
        <div className="px-6 py-4 border-b border-cyan-500/20 bg-gradient-to-r from-slate-900/50 to-slate-950/50 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${getTeamColor(selectedTeam)} shadow-lg shadow-cyan-500/20 flex items-center justify-center`}>
              <MessageSquare size={24} className="text-white" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-300 font-semibold">Team Channel</p>
              <p className="text-lg font-bold text-white">{selectedTeam}</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {filteredMessages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-center">
              <div>
                <MessageSquare size={48} className="mx-auto text-slate-600 mb-4 opacity-50" />
                <p className="text-slate-400 text-sm font-medium">No messages yet. Start a conversation!</p>
              </div>
            </div>
          ) : (
            filteredMessages.map(m => {
              const mine = m.senderName === user?.name;
              return (
                <div key={m.id} className={`flex ${mine ? 'justify-end' : 'justify-start'}`} onMouseEnter={() => !m.read && update(m.id, { read: true })}>
                  <div className={`max-w-[70%] rounded-2xl px-5 py-3 ${
                    mine
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                      : 'bg-slate-800 text-slate-100 border border-slate-700'
                  }`}>
                    {!mine && (
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-[10px] font-black uppercase tracking-wider text-cyan-300">{m.senderName}</p>
                        <span className="text-[9px] text-slate-400 bg-slate-900/50 px-2 py-0.5 rounded-full">{m.senderRole}</span>
                      </div>
                    )}
                    <p className="text-sm font-medium leading-relaxed">{m.content}</p>
                    <p className={`text-[11px] mt-2 ${mine ? 'text-white/70' : 'text-slate-400'}`}>
                      {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    {!m.read && !mine && (
                      <span className="inline-block mt-2 text-[9px] font-bold text-cyan-300 bg-slate-900 px-2 py-0.5 rounded-full">UNREAD</span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-cyan-500/20 bg-slate-950/50 flex items-center gap-3">
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder={`Message ${selectedTeam}...`}
            className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500"
          />
          <button
            onClick={send}
            disabled={!text.trim()}
            className="p-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-2xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
