import React from 'react';

interface LegalViewProps {
  type: 'privacy' | 'terms' | 'refund' | 'cookie';
  onNavigate: (view: string, extra?: any) => void;
}

export const LegalView: React.FC<LegalViewProps> = ({ type }) => {
  const titles = {
    privacy: 'Privacy Policy & Data Security Protocols',
    terms: 'Enterprise Terms & Conditions of Service',
    refund: 'Service Guarantee & Refund Policy',
    cookie: 'Cookie Preferences & Consent Management',
  };

  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-xs font-black uppercase tracking-widest text-brand-500">Legal & Governance</span>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-gray-900 dark:text-white">
          {titles[type]}
        </h1>
        <p className="text-xs text-gray-400">Last updated: July 23, 2026 • Compliance Version 4.2</p>
      </div>

      <div className="glass-panel p-8 rounded-3xl border border-gray-200/60 dark:border-gray-800/60 space-y-6 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white">1. Data Encryption & SOC 2 Type II Standards</h3>
        <p>
          AJ Digital Marketing employs TLS 1.3 encryption for data in transit and AES-256 encryption for data at rest. Customer data ingested for AI vector embeddings (RAG) is isolated into tenant-specific encrypted namespaces.
        </p>

        <h3 className="font-bold text-lg text-gray-900 dark:text-white">2. AI Model Data Privacy</h3>
        <p>
          We explicitly enforce Zero Data Retention (ZDR) agreements with underlying LLM API providers (OpenAI, Anthropic, Google Cloud). Your proprietary ad copy, customer lists, and financial analytics are NEVER used to train public foundation models.
        </p>

        <h3 className="font-bold text-lg text-gray-900 dark:text-white">3. SLA & 30-Day Money Back Guarantee</h3>
        <p>
          Starter and Professional plans carry a 30-day performance satisfaction guarantee. If our technical SEO audits and AI ad tools fail to deliver promised deliverables, a 100% refund will be issued promptly.
        </p>
      </div>
    </div>
  );
};
