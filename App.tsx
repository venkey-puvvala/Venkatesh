import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FloatingAIChat } from './components/ai-agent/FloatingAIChat';

// Pages
import { HeroSection } from './components/home/HeroSection';
import { AboutView } from './components/pages/AboutView';
import { ServicesView } from './components/services/ServicesView';
import { PortfolioView } from './components/pages/PortfolioView';
import { PricingView } from './components/pages/PricingView';
import { AIHubView } from './components/ai-agent/AIHubView';
import { MarketplaceView } from './components/marketplace/MarketplaceView';
import { BlogView } from './components/pages/BlogView';
import { ContactView } from './components/pages/ContactView';
import { AuthView } from './components/pages/AuthView';
import { LegalView } from './components/pages/LegalView';

// Dashboards
import { UserDashboardView } from './components/dashboard/UserDashboardView';
import { AdminConsoleView } from './components/admin/AdminConsoleView';

export const AppContent: React.FC = () => {
  const { role } = useAuth();
  const [currentView, setCurrentView] = useState<string>('home');
  const [viewExtra, setViewExtra] = useState<any>(null);

  const handleNavigate = (view: string, extra?: any) => {
    if (view === 'admin' && role !== 'Admin') {
      setCurrentView('dashboard');
      setViewExtra(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setCurrentView(view);
    setViewExtra(extra);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-gray-100 font-sans selection:bg-brand-500 selection:text-white">
      
      {/* Sticky Top Header */}
      <Navbar currentView={currentView} onNavigate={handleNavigate} />

      {/* Main View Area */}
      <main className="flex-1">
        {currentView === 'home' && (
          <div className="space-y-16">
            <HeroSection onNavigate={handleNavigate} />
            <ServicesView onNavigate={handleNavigate} />
            <AIHubView onNavigate={handleNavigate} />
            <PortfolioView onNavigate={handleNavigate} />
            <PricingView onNavigate={handleNavigate} />
          </div>
        )}

        {currentView === 'about' && <AboutView onNavigate={handleNavigate} />}
        {currentView === 'services' && <ServicesView onNavigate={handleNavigate} />}
        {currentView === 'portfolio' && <PortfolioView onNavigate={handleNavigate} />}
        {currentView === 'pricing' && <PricingView onNavigate={handleNavigate} />}
        
        {currentView === 'ai-hub' && (
          <AIHubView
            initialTool={typeof viewExtra === 'string' ? viewExtra : viewExtra?.tool}
            initialUrl={viewExtra?.url}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'marketplace' && <MarketplaceView onNavigate={handleNavigate} />}
        {currentView === 'blog' && <BlogView onNavigate={handleNavigate} />}
        {currentView === 'contact' && <ContactView initialService={viewExtra?.service} onNavigate={handleNavigate} />}
        {currentView === 'auth' && <AuthView onNavigate={handleNavigate} />}
        
        {/* Dashboards */}
        {currentView === 'dashboard' && <UserDashboardView />}
        {currentView === 'admin' && role === 'Admin' && <AdminConsoleView />}
        {currentView === 'admin' && role !== 'Admin' && (
          <div className="py-24 text-center">
            <p className="text-sm font-semibold text-rose-400 uppercase tracking-[0.3em] mb-3">Access Denied</p>
            <h2 className="text-3xl font-bold text-white">Admin console restricted</h2>
            <p className="mt-4 max-w-xl mx-auto text-gray-400">Only the host administrator can access this page. Signed in users are redirected to the dashboard.</p>
          </div>
        )}

        {/* Legal Policies */}
        {['privacy', 'terms', 'refund', 'cookie'].includes(currentView) && (
          <LegalView type={currentView as any} onNavigate={handleNavigate} />
        )}
      </main>

      {/* 24/7 Floating AI Bot */}
      <FloatingAIChat />

      {/* Enterprise Footer */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
