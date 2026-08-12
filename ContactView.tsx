import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Bot } from 'lucide-react';

interface ContactViewProps {
  initialService?: string;
  onNavigate: (view: string, extra?: any) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ initialService = '', onNavigate }) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    service: initialService || 'SEO Optimization',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', company: '', service: 'SEO Optimization', message: '' });
    }, 4000);
  };

  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-black uppercase tracking-widest text-brand-500">24/7 Enterprise Consultation</span>
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-gray-900 dark:text-white">
          Get in Touch with <span className="text-gradient">Growth Leads</span>
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400">
          Book a custom 1-on-1 strategy briefing or request an enterprise proposal.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Contact Form */}
        <div className="glass-panel p-8 rounded-3xl border border-gray-200/60 dark:border-gray-800/60">
          <h3 className="font-display font-bold text-2xl text-gray-900 dark:text-white mb-6">Request Proposal</h3>
          
          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="font-bold text-lg text-white">Proposal Request Received!</h4>
              <p className="text-xs text-gray-300">A Senior CMO Growth Lead will review your domain and respond within 2 business hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-card border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Corporate Email *</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="john@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-card border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Company Name & Domain</label>
                <input
                  type="text"
                  value={formState.company}
                  onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                  placeholder="TechCorp Inc (techcorp.com)"
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-card border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Target Service Area</label>
                <select
                  value={formState.service}
                  onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-card border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                >
                  <option>SEO Optimization</option>
                  <option>Google Ads (PPC)</option>
                  <option>Facebook & Meta Ads</option>
                  <option>LinkedIn B2B Lead Gen</option>
                  <option>AI Chatbot Development</option>
                  <option>Web & App Engineering</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Project Details & Growth Goals</label>
                <textarea
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Tell us about your target CAC, budget, and 90-day expansion goals..."
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-card border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-brand-500 hover:bg-brand-400 text-dark-bg font-extrabold text-sm transition shadow-xl shadow-brand-500/20 flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Enterprise Proposal Request</span>
              </button>
            </form>
          )}
        </div>

        {/* Global HQ Info */}
        <div className="space-y-8 flex flex-col justify-between">
          <div className="glass-panel p-8 rounded-3xl border border-gray-200/60 dark:border-gray-800/60 space-y-6">
            <h3 className="font-display font-bold text-2xl text-gray-900 dark:text-white">Global Headquarters</h3>
            
            <div className="space-y-4 text-sm">
              <div className="flex items-start space-x-3 text-gray-600 dark:text-gray-300">
                <MapPin className="w-5 h-5 text-brand-500 shrink-0 mt-1" />
                <span>500 Tech Plaza, Floor 14, San Francisco, CA 94107, USA</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                <Mail className="w-5 h-5 text-brand-500 shrink-0" />
                <span>enterprise@ajdigitalmarketing.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                <Phone className="w-5 h-5 text-brand-500 shrink-0" />
                <span>+1 (800) 555-AJ-GROWTH</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-900/40 to-dark-card p-8 rounded-3xl border border-purple-500/30 text-white space-y-3">
            <Bot className="w-8 h-8 text-accent-purple" />
            <h4 className="font-bold text-lg">Need Immediate Assistance?</h4>
            <p className="text-xs text-gray-300">Our built-in AJ AI Bot is online 24/7 to answer technical questions and run instant SEO audits.</p>
            <button
              onClick={() => onNavigate('ai-hub')}
              className="px-4 py-2 rounded-xl bg-accent-purple text-white font-bold text-xs hover:bg-purple-600 transition inline-block"
            >
              Launch AI Chatbot Studio
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
