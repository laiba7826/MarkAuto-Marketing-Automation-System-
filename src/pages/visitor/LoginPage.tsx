import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { Role } from '../../types';
import { Workflow, ArrowRight } from 'lucide-react';

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleQuickLogin = (role: Role) => {
    login(role);
    navigate(role === 'Visitor' ? '/' : '/dashboard');
  };

  return (
    <div className="min-h-screen text-white flex items-center justify-center px-6 py-12 bg-gradient-to-b from-blue-950 to-blue-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.2),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(20,184,166,0.15),_transparent_22%)] pointer-events-none" />
      <div className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-blue-700/50 bg-blue-900/80 shadow-[0_40px_120px_-45px_rgba(15,23,42,0.8)] backdrop-blur-xl">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] p-8 lg:p-12">
          <div className="space-y-6">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 text-blue-950 shadow-lg shadow-cyan-500/20">
              <Workflow size={28} />
            </div>
            <div className="space-y-3">
              <h1 className="text-5xl font-black tracking-tight">Welcome back.</h1>
              <p className="text-blue-300 leading-8">Choose a role and experience the marketing operations workspace with a polished, professional interface.</p>
            </div>
            <div className="rounded-[1.75rem] border border-cyan-500/20 bg-cyan-500/5 p-6 text-blue-200">
              <p className="text-sm uppercase tracking-[0.26em] text-cyan-300 font-semibold">Quick preview</p>
              <p className="mt-4 text-sm leading-7">Each role unlocks a tailored dashboard, approval workflow, and rich analytics built for marketing teams.</p>
            </div>
          </div>

          <div className="space-y-4">
            {(['Admin', 'Supervisor', 'Marketing', 'Content', 'Sales', 'Visitor'] as Role[]).map((role) => (
              <button
                key={role}
                onClick={() => handleQuickLogin(role)}
                className="w-full flex items-center justify-between gap-4 rounded-[1.75rem] border border-blue-700/50 bg-blue-950/60 px-5 py-4 text-left text-sm font-semibold text-blue-100 transition hover:border-cyan-500/40 hover:bg-blue-900/80"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-blue-800 text-cyan-300 font-black">{role.charAt(0)}</div>
                  <div>
                    <p className="text-base font-black text-white">{role} Account</p>
                    <p className="text-xs uppercase tracking-[0.28em] text-blue-400">Mock role access</p>
                  </div>
                </div>
                <ArrowRight size={20} className="text-blue-400" />
              </button>
            ))}
            <p className="pt-4 text-xs leading-6 text-blue-400">This screen is a preview of the login experience. Role selection is for demo and navigation purposes.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
