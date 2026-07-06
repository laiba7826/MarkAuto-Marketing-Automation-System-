import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Zap, ShieldCheck, Briefcase, Layers, Sparkles, Workflow, ArrowRight, Crown } from 'lucide-react';

const FEATURES = [
  { icon: LayoutDashboard, title: 'Unified team workspace', desc: 'Creators, marketing, supervisors, and sales share one modern operation center.' },
  { icon: Layers, title: 'Approval-first workflow', desc: 'Submitted strategies flow to marketing automatically for fast review.' },
  { icon: Zap, title: 'Meaningful analytics', desc: 'Beautiful KPI cards and charts that look polished for leadership.' },
];

const DETAILS = [
  { icon: Briefcase, title: 'Professional strategy planning', desc: 'Build a compelling campaign brief, select content type, and submit it for approval.' },
  { icon: Sparkles, title: 'Premium presentation feel', desc: 'The interface looks modern, sharp, and presentation-ready for senior reviews.' },
  { icon: ShieldCheck, title: 'Secure role control', desc: 'Only marketing and supervisors can approve or reject content workflows.' },
];

export const LandingPage = () => {
  return (
    <div className="bg-gradient-to-b from-blue-950 to-blue-900 text-white min-h-screen">
      <nav className="relative z-30 border-b border-blue-800 bg-blue-950/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-3 text-blue-950 shadow-lg shadow-cyan-500/20">
              <Workflow size={24} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-blue-400 font-semibold">MarkAuto</p>
              <p className="text-xl font-black tracking-tight">Marketing Ops</p>
            </div>
          </div>

          <div className="hidden xl:flex items-center gap-10 text-sm font-semibold text-blue-300">
            <a href="#features" className="hover:text-cyan-300 transition">Features</a>
            <a href="#details" className="hover:text-cyan-300 transition">Why MarkAuto</a>
            <a href="#signup" className="hover:text-cyan-300 transition">Launch</a>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-semibold text-blue-300 hover:text-cyan-300 transition">Sign in</Link>
            <Link to="/login" className="btn-primary px-6 py-3 text-sm font-semibold">Get started</Link>
          </div>
        </div>
      </nav>

      <main>
        <section className="relative overflow-hidden pt-20 pb-20">
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.25),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(20,184,166,0.2),_transparent_30%)]" />
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-3 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-100">
                  <Crown className="text-cyan-300" size={16} />
                  Designed for professional marketing teams
                </div>
                <div className="max-w-2xl">
                  <h1 className="text-5xl md:text-6xl xl:text-7xl font-black tracking-tight text-white leading-tight">Marketing Automation System.</h1>

                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-cyan-500/20 bg-cyan-500/5 p-6 shadow-2xl shadow-blue-950/30 backdrop-blur">
                    <p className="text-xs uppercase tracking-[0.35em] text-cyan-300 font-semibold">Submit</p>
                    <p className="mt-4 text-3xl font-black text-white">Content strategy</p>
                  </div>
                  <div className="rounded-3xl border border-teal-500/20 bg-teal-500/5 p-6 shadow-2xl shadow-blue-950/30 backdrop-blur">
                    <p className="text-xs uppercase tracking-[0.35em] text-teal-300 font-semibold">Review</p>
                    <p className="mt-4 text-3xl font-black text-white">Marketing approval</p>
                  </div>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Link to="/login" className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold">Start professional workflow <ArrowRight size={18} /></Link>
                  <a href="#features" className="inline-flex items-center justify-center rounded-3xl border border-blue-600 bg-blue-800/50 px-8 py-4 text-lg font-semibold text-blue-100 hover:bg-blue-700 transition">View features</a>
                </div>
              </div>

              <div className="relative">
                <div className="rounded-[2.5rem] bg-blue-900/90 p-1 shadow-2xl shadow-blue-950/30 backdrop-blur-lg">
                  <div className="relative overflow-hidden rounded-[2.25rem] bg-blue-950 px-8 py-10">
                    <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle,_rgba(56,189,248,0.18),_transparent_50%)]" />
                    <div className="relative space-y-8">
                      <div className="rounded-[2rem] bg-blue-900/90 p-8 border border-white/10 shadow-[0_35px_90px_-50px_rgba(15,23,42,0.8)]">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-blue-400">Approval status</p>
                            <p className="mt-3 text-2xl font-black">Pending review</p>
                          </div>
                          <div className="rounded-3xl bg-cyan-500/15 px-4 py-2 text-sm font-semibold text-cyan-200">Marketing</div>
                        </div>
                        <div className="mt-8 grid gap-4 sm:grid-cols-2">
                          <div className="rounded-3xl bg-blue-950/80 p-4 border border-white/5">
                            <p className="text-xs uppercase tracking-[0.25em] text-blue-400">Strategy type</p>
                            <p className="mt-3 text-lg font-semibold text-blue-100">Reel</p>
                          </div>
                          <div className="rounded-3xl bg-blue-950/80 p-4 border border-white/5">
                            <p className="text-xs uppercase tracking-[0.25em] text-blue-400">Owner</p>
                            <p className="mt-3 text-lg font-semibold text-blue-100">Cathy Content</p>
                          </div>
                        </div>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-[1.75rem] bg-blue-900/80 p-6 border border-white/10">
                          <p className="text-xs uppercase tracking-[0.25em] text-blue-400">Pending strategies</p>
                          <p className="mt-4 text-4xl font-black text-white">12</p>
                        </div>
                        <div className="rounded-[1.75rem] bg-blue-900/80 p-6 border border-white/10">
                          <p className="text-xs uppercase tracking-[0.25em] text-blue-400">Approval rate</p>
                          <p className="mt-4 text-4xl font-black text-white">86%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pointer-events-none absolute -bottom-12 right-0 h-36 w-64 rounded-[2rem] bg-cyan-500/15 blur-3xl" />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="pb-24 bg-blue-950/40">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300 font-semibold">Features</p>
              <h2 className="mt-4 text-4xl font-black text-white">Everything you need for professional marketing operations.</h2>
              <p className="mt-4 text-blue-300 max-w-2xl mx-auto leading-8">A unified workspace where creators, marketing, supervisors, and sales teams collaborate with clean workflows and executive-ready dashboards.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {FEATURES.map((feature, idx) => (
                <div key={idx} className="rounded-[2rem] border border-white/10 bg-blue-900/80 p-8 shadow-2xl shadow-blue-950/30 backdrop-blur-lg">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-cyan-500/15 text-cyan-300 mb-6">
                    <feature.icon size={22} />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4">{feature.title}</h3>
                  <p className="text-blue-300 leading-7">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="details" className="pb-24 bg-blue-950">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300 font-semibold">Why MarkAuto</p>
              <h2 className="mt-4 text-4xl font-black text-white">Built for professional execution.</h2>
            </div>
            <div className="grid gap-8 lg:grid-cols-3">
              {DETAILS.map((item, idx) => (
                <div key={idx} className="rounded-[2rem] border border-blue-800 bg-blue-900/80 p-8 shadow-2xl shadow-blue-950/30">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-white/10 text-cyan-300 mb-5">
                    <item.icon size={22} />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4">{item.title}</h3>
                  <p className="text-blue-300 leading-7">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="signup" className="pb-24 bg-blue-950/70">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="rounded-[2rem] border border-white/10 bg-blue-900/80 p-10 text-center shadow-2xl shadow-blue-950/20 backdrop-blur-lg">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300 font-semibold">Ready to impress your supervisor?</p>
              <h2 className="mt-4 text-4xl font-black text-white">Launch your first review-ready strategy today.</h2>
              <p className="mt-4 text-blue-300 max-w-2xl mx-auto leading-7">Sign in to start submitting content plans, get marketing approvals, and show your team a professional execution workflow.</p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link to="/login" className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold">Start now</Link>
                <a href="#features" className="inline-flex items-center justify-center rounded-3xl border border-white/15 bg-white/5 px-8 py-4 text-lg font-semibold text-blue-100 hover:bg-white/10 transition">View features</a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
