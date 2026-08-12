import React from 'react';
import { Sparkles, Target, Eye, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface AboutViewProps {
  onNavigate: (view: string, extra?: any) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-black uppercase tracking-widest text-brand-500">Corporate Overview</span>
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-gray-900 dark:text-white">
          Architecting the Future of <span className="text-gradient">AI Marketing</span>
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
          Founded in 2024, AJ Digital Marketing empowers 10,000+ brands with autonomous AI agents, real-time search trends radar, and high-converting performance engineering.
        </p>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel p-8 rounded-3xl border border-gray-200/60 dark:border-gray-800/60 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-2xl text-gray-900 dark:text-white">Our Mission</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            To eliminate manual guesswork in digital marketing by giving every business access to enterprise-grade AI algorithms that turn search queries into predictable revenue streams.
          </p>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-gray-200/60 dark:border-gray-800/60 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-accent-purple flex items-center justify-center font-bold">
            <Eye className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-2xl text-gray-900 dark:text-white">Our Vision</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            To define the global standard for autonomous marketing automation, combining the human strategic excellence of CMOs with sub-second AI execution.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-8">
        <h2 className="font-display font-bold text-2xl text-center text-gray-900 dark:text-white">Company Growth Timeline</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { year: '2024', title: 'Platform Launch', desc: 'Released core AI SEO engine & multi-channel ad connector.' },
            { year: '2025', title: '$100M Milestone', desc: 'Crossed $100M client attributed revenue threshold.' },
            { year: '2026', title: 'Agentic AI 3.0', desc: 'Deployed autonomous 24/7 sales bots & vector RAG engines.' },
            { year: 'Beyond', title: 'Global Scale', desc: 'Expanding enterprise AI hubs across US, Europe & APAC.' },
          ].map((item, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-3xl border border-gray-200/60 dark:border-gray-800/60 text-center space-y-2">
              <span className="font-display font-black text-3xl text-gradient">{item.year}</span>
              <h4 className="font-bold text-sm text-gray-900 dark:text-white">{item.title}</h4>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
