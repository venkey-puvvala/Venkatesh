import React, { useState } from 'react';
import { Search, Sparkles, BookOpen, Clock, User, ArrowRight, MessageSquare } from 'lucide-react';

interface BlogViewProps {
  onNavigate: (view: string, extra?: any) => void;
}

export const BlogView: React.FC<BlogViewProps> = ({ onNavigate }) => {
  const [activeArticle, setActiveArticle] = useState<any | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [aiSummary, setAiSummary] = useState('');

  const articles = [
    {
      id: 'b1',
      title: 'How Agentic AI Will Overhaul Organic SEO & Google SGE in 2026',
      category: 'AI & SEO',
      author: 'Arjun (Chief Growth Architect)',
      date: 'July 20, 2026',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      snippet: 'Discover why traditional keyword stuffing is dead and how Schema vector RAG models dominate Generative Search Experience results.',
      fullContent: `In 2026, search engine optimization is no longer about matching exact keyword strings. Google's Search Generative Experience (SGE) evaluates contextual entity graphs and authority signals.\n\nKey Takeaways:\n1. Implement server-side JSON-LD Schema on all core landing pages.\n2. Leverage autonomous AI agents to continuously audit Core Web Vitals.\n3. Build first-party data capture mechanisms to protect against cookie degradation.`
    },
    {
      id: 'b2',
      title: 'Scaling Meta & TikTok Video Ads to $100K/Day in Revenue',
      category: 'Paid Growth',
      author: 'Sarah Jenkins',
      date: 'July 15, 2026',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
      snippet: 'A deep dive into dynamic creative testing, server-side CAPI pixel setups, and hook variation frameworks.',
      fullContent: `Scaling video ad creatives requires statistically sound A/B testing frameworks. We test 15 hook variations per week while maintaining strict CPA guardrails.`
    }
  ];

  const handleSummarize = (article: any) => {
    setIsSummarizing(true);
    setTimeout(() => {
      setAiSummary(`AI Key Takeaways for "${article.title}":\n• Focus on first-party data infrastructure.\n• SGE AI indexing favors structured schema markup.\n• Automated audit workflows save 25+ technical hours monthly.`);
      setIsSummarizing(false);
    }, 1000);
  };

  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-black uppercase tracking-widest text-brand-500">AJ AI Growth Engineering Journal</span>
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-gray-900 dark:text-white">
          Latest Insights & <span className="text-gradient">AI News</span>
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400">
          In-depth breakdowns on search algorithms, ad funnels, and autonomous marketing workflows.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.map((art) => (
          <div key={art.id} className="glass-panel rounded-3xl overflow-hidden border border-gray-200/60 dark:border-gray-800/60 flex flex-col justify-between">
            <img src={art.image} alt={art.title} className="w-full h-56 object-cover" />
            
            <div className="p-8 space-y-4">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span className="px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 font-bold">{art.category}</span>
                <span>{art.readTime}</span>
              </div>

              <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white hover:text-brand-500 transition">
                {art.title}
              </h3>

              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{art.snippet}</p>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500">By {art.author}</span>
                
                <button
                  onClick={() => {
                    setActiveArticle(art);
                    setAiSummary('');
                  }}
                  className="px-4 py-2 rounded-xl bg-brand-500 text-dark-bg font-extrabold text-xs hover:bg-brand-400 transition"
                >
                  Read Article →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ARTICLE READER MODAL */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-800 rounded-3xl max-w-3xl w-full p-8 relative shadow-2xl space-y-6">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white font-bold"
            >
              ✕
            </button>

            <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-500/20 text-brand-400 uppercase">
              {activeArticle.category}
            </span>

            <h2 className="font-display font-extrabold text-3xl text-gray-900 dark:text-white">{activeArticle.title}</h2>
            <p className="text-xs text-gray-400">By {activeArticle.author} • Published {activeArticle.date}</p>

            {/* AI Summary Button */}
            <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-accent-purple flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> 1-Click AI Executive Summary
                </span>
                <button
                  onClick={() => handleSummarize(activeArticle)}
                  className="px-3 py-1 rounded-lg bg-accent-purple text-white font-bold text-xs"
                >
                  {isSummarizing ? 'Generating Summary...' : 'Summarize Article'}
                </button>
              </div>

              {aiSummary && (
                <p className="text-xs text-gray-300 font-mono whitespace-pre-line pt-2 border-t border-purple-500/20">
                  {aiSummary}
                </p>
              )}
            </div>

            <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed border-t border-gray-200 dark:border-gray-800 pt-4">
              {activeArticle.fullContent}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
