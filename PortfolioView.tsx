import React, { useState } from 'react';
import { Star, TrendingUp, ArrowRight, Play, CheckCircle2 } from 'lucide-react';

interface PortfolioViewProps {
  onNavigate: (view: string, extra?: any) => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({ onNavigate }) => {
  const [sliderVal, setSliderVal] = useState(65);

  const caseStudies = [
    {
      client: 'TechCorp International (B2B SaaS)',
      metrics: '+420% Organic Traffic Growth',
      roas: '5.2x ROAS',
      summary: 'Migrated legacy WordPress site to AJ AI Next.js architecture with real-time Schema markup and ABM campaign automation.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
      beforeTraffic: '15,000 / mo',
      afterTraffic: '78,000 / mo',
    },
    {
      client: 'Nexus E-Commerce Apparel',
      metrics: '$2.4M Direct Attributable Sales',
      roas: '4.6x ROAS',
      summary: 'Deployed Meta Reels creative engine & TikTok Shorts shopping automation with server-side CAPI pixel tracking.',
      image: 'https://images.unsplash.com/photo-1556742049-0a67daf40955?auto=format&fit=crop&w=600&q=80',
      beforeTraffic: '$120K / mo sales',
      afterTraffic: '$680K / mo sales',
    },
  ];

  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-black uppercase tracking-widest text-brand-500">Verified Client Case Studies</span>
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-gray-900 dark:text-white mt-2">
          Measurable <span className="text-gradient">ROI Results</span>
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 mt-2">
          Explore real-world client performance data, before & after rankings, and client revenue stories.
        </p>
      </div>

      {/* Before & After Interactive ROI Comparison Slider */}
      <div className="glass-panel p-8 rounded-3xl border border-gray-200/60 dark:border-gray-800/60 max-w-3xl mx-auto space-y-6">
        <h3 className="font-display font-bold text-xl text-center text-gray-900 dark:text-white">
          Interactive Before & After Optimization Comparison
        </h3>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20">
            <span className="text-[10px] font-bold uppercase text-rose-400">Before AJ AI Platform</span>
            <p className="font-display font-extrabold text-2xl text-gray-900 dark:text-white mt-1">1.2x ROAS</p>
            <p className="text-xs text-gray-400">High CPA & manual keyword tracking</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
            <span className="text-[10px] font-bold uppercase text-emerald-400">After AJ AI Engine Deployment</span>
            <p className="font-display font-extrabold text-2xl text-emerald-400 mt-1">4.8x ROAS</p>
            <p className="text-xs text-gray-400">+340% organic keyword rankings</p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 flex justify-between">
            <span>AJ AI Optimization Adoption Level</span>
            <span className="text-brand-400 font-extrabold">{sliderVal}% AI Automated</span>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={sliderVal}
            onChange={(e) => setSliderVal(Number(e.target.value))}
            className="w-full accent-brand-500"
          />
        </div>
      </div>

      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {caseStudies.map((cs, idx) => (
          <div key={idx} className="glass-panel rounded-3xl overflow-hidden border border-gray-200/60 dark:border-gray-800/60 flex flex-col justify-between">
            <img src={cs.image} alt={cs.client} className="w-full h-56 object-cover" />
            <div className="p-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-500/20 text-brand-400">
                  {cs.roas}
                </span>
                <span className="text-xs font-extrabold text-emerald-400">{cs.metrics}</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-gray-900 dark:text-white">{cs.client}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{cs.summary}</p>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex justify-between text-xs font-semibold">
                <span className="text-gray-400">Baseline: {cs.beforeTraffic}</span>
                <span className="text-brand-400">Current: {cs.afterTraffic}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
