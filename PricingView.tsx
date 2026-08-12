import React, { useState } from 'react';
import { CheckCircle2, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';

interface PricingViewProps {
  onNavigate: (view: string, extra?: any) => void;
}

export const PricingView: React.FC<PricingViewProps> = ({ onNavigate }) => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: 'Starter AI',
      monthlyPrice: 999,
      annualPrice: 799,
      desc: 'Ideal for early-stage startups and small businesses scaling organic SEO and Google search ads.',
      features: [
        'Up to 50 SEO Keywords Monitored',
        'Google & Meta Ads Management',
        '24/7 AI Chatbot Sales Assistant',
        'Monthly Technical SEO Audit',
        'Standard Email Support',
      ],
      popular: false,
    },
    {
      name: 'Professional Scale',
      monthlyPrice: 2499,
      annualPrice: 1999,
      desc: 'Built for fast-growing mid-market brands seeking full multi-channel automation & live search trends.',
      features: [
        'Up to 300 SEO Keywords Monitored',
        'Full Paid Ads Suite (Google, FB, IG, LinkedIn)',
        '90-Day AI Strategy & Ad Copy Generator',
        'Real-time Google Trends & Competitor Radar',
        'Custom Looker Studio Analytics Board',
        'Dedicated Account Growth Strategist',
      ],
      popular: true,
    },
    {
      name: 'Enterprise Custom',
      monthlyPrice: 4999,
      annualPrice: 3999,
      desc: 'Tailored for Fortune 500 brands requiring dedicated engineering, custom vector RAG models, and SOC2 SLA compliance.',
      features: [
        'Unlimited SEO Keywords & Technical Monitoring',
        'Custom LLM Fine-Tuning & Vector RAG Setup',
        'Server-Side GA4 Tagging & CAPI Guarantee',
        'Dedicated Senior CMO Advisory Lead',
        '1-Hour Emergency SLA Response Time',
        'Custom API & Webhook Connectors',
      ],
      popular: false,
    },
  ];

  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-black uppercase tracking-widest text-brand-500">Transparent Enterprise Billing</span>
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-gray-900 dark:text-white">
          Predictable Pricing for <span className="text-gradient">Unlimited Growth</span>
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400">
          No hidden setup fees. Change or upgrade your plan anytime with zero lock-in contracts.
        </p>

        {/* Toggle */}
        <div className="pt-4 flex items-center justify-center space-x-4 text-xs font-bold">
          <span className={!isAnnual ? 'text-gray-900 dark:text-white' : 'text-gray-400'}>Monthly Billing</span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-14 h-8 rounded-full bg-brand-500 p-1 transition duration-300 relative"
          >
            <div className={`w-6 h-6 rounded-full bg-dark-bg transition transform ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`}></div>
          </button>
          <span className={isAnnual ? 'text-brand-400' : 'text-gray-400'}>
            Annual Billing <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold text-[10px]">SAVE 20%</span>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {plans.map((p, idx) => {
          const price = isAnnual ? p.annualPrice : p.monthlyPrice;
          return (
            <div
              key={idx}
              className={`glass-panel p-8 rounded-3xl border flex flex-col justify-between relative transition duration-300 ${
                p.popular
                  ? 'border-brand-500 shadow-2xl shadow-brand-500/20 scale-105 z-10'
                  : 'border-gray-200/60 dark:border-gray-800/60'
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-black uppercase bg-gradient-to-r from-brand-500 to-accent-blue text-dark-bg shadow">
                  Most Popular Enterprise Choice
                </span>
              )}

              <div>
                <h3 className="font-display font-bold text-2xl text-gray-900 dark:text-white">{p.name}</h3>
                <p className="text-xs text-gray-500 mt-2 min-h-[36px]">{p.desc}</p>

                <div className="my-6">
                  <span className="font-display font-black text-4xl sm:text-5xl text-gray-900 dark:text-white">${price}</span>
                  <span className="text-xs text-gray-400 font-normal"> / month</span>
                </div>

                <ul className="space-y-2.5 text-xs text-gray-600 dark:text-gray-300 pt-4 border-t border-gray-200 dark:border-gray-800">
                  {p.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onNavigate('contact', { plan: p.name })}
                className={`mt-8 w-full py-4 rounded-2xl font-bold text-xs transition flex items-center justify-center space-x-2 ${
                  p.popular
                    ? 'bg-brand-500 hover:bg-brand-400 text-dark-bg shadow-lg shadow-brand-500/30'
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-brand-500 hover:text-dark-bg text-gray-800 dark:text-gray-200'
                }`}
              >
                <span>Get Started with {p.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

    </div>
  );
};
