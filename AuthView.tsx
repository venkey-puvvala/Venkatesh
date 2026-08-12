import React, { useState, useEffect } from 'react';
import {
  Lock, Mail, ShieldCheck, Eye, EyeOff, Sparkles, Bot,
  CheckCircle2, ArrowRight, Chrome, Github, User, Building2,
  KeyRound, RotateCcw, Zap, TrendingUp
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { DEMO_CREDENTIALS } from '../../lib/firebase';

interface AuthViewProps {
  onNavigate: (view: string, extra?: any) => void;
}

// Floating Orb Component
const FloatingOrb: React.FC<{
  size: number;
  x: number;
  y: number;
  color: string;
  delay: number;
  duration: number;
}> = ({ size, x, y, color, delay, duration }) => (
  <div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      left: `${x}%`,
      top: `${y}%`,
      background: color,
      filter: 'blur(60px)',
      opacity: 0.3,
      animation: `float ${duration}s ease-in-out ${delay}s infinite alternate`,
    }}
  />
);

// Particle Dot
const Particle: React.FC<{ x: number; y: number; delay: number }> = ({ x, y, delay }) => (
  <div
    className="absolute w-1 h-1 rounded-full bg-brand-400 pointer-events-none"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      opacity: 0,
      animation: `particlePulse 4s ease-in-out ${delay}s infinite`,
    }}
  />
);

// Animated Input Field
const AnimatedInput: React.FC<{
  type: string;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  icon: React.ReactNode;
  label: string;
  required?: boolean;
  rightElement?: React.ReactNode;
  animDelay: string;
}> = ({ type, value, onChange, placeholder, icon, label, required, rightElement, animDelay }) => {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className="space-y-1.5"
      style={{ animation: `slideInUp 0.5s ease-out ${animDelay} both` }}
    >
      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</label>
      <div
        className={`relative flex items-center rounded-2xl border transition-all duration-300 overflow-hidden ${
          focused
            ? 'border-brand-500 shadow-lg shadow-brand-500/20 bg-brand-500/5'
            : 'border-gray-700 bg-gray-900/60'
        }`}
      >
        {/* Left icon */}
        <div className={`pl-4 transition-colors duration-300 ${focused ? 'text-brand-400' : 'text-gray-500'}`}>
          {icon}
        </div>

        <input
          type={type}
          required={required}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 px-3 py-3.5 bg-transparent text-sm text-white placeholder-gray-600 focus:outline-none"
        />

        {/* Right element (e.g., show/hide password) */}
        {rightElement && (
          <div className="pr-4 text-gray-500">{rightElement}</div>
        )}

        {/* Animated underline */}
        <div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-brand-500 via-blue-500 to-purple-500 transition-all duration-500 ease-out"
          style={{ width: focused ? '100%' : '0%' }}
        />
      </div>
    </div>
  );
};

// OTP Input Box
const OTPBox: React.FC<{
  index: number;
  value: string;
  onChange: (val: string, idx: number) => void;
  onKeyDown: (e: React.KeyboardEvent, idx: number) => void;
  inputRef: (el: HTMLInputElement | null) => void;
}> = ({ index, value, onChange, onKeyDown, inputRef }) => (
  <input
    ref={inputRef}
    type="text"
    maxLength={1}
    value={value}
    onChange={(e) => onChange(e.target.value.replace(/\D/, ''), index)}
    onKeyDown={(e) => onKeyDown(e, index)}
    className="w-12 h-14 text-center text-xl font-black bg-gray-900/80 border-2 border-gray-700 rounded-2xl text-white focus:outline-none focus:border-brand-500 focus:bg-brand-500/10 focus:shadow-lg focus:shadow-brand-500/20 transition-all duration-200"
    style={{ animation: `bounceIn 0.4s cubic-bezier(0.34,1.56,0.64,1) ${index * 0.08}s both` }}
  />
);

export const AuthView: React.FC<AuthViewProps> = ({ onNavigate }) => {
  const { login, setRole } = useAuth();

  // Flow State: 'login' | 'register' | 'otp' | 'success'
  const [flow, setFlow] = useState<'login' | 'register' | 'otp' | 'forgot' | 'success'>('login');
  const [isLoading, setIsLoading] = useState(false);

  // Form Fields
  const [email, setEmail] = useState('admin@ajdigital.com');
  const [password, setPassword] = useState('admin@password2026');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('Customer');

  const handleSelectDemoCreds = (cred: typeof DEMO_CREDENTIALS[0]) => {
    setEmail(cred.email);
    setPassword(cred.password);
    setSelectedRole(cred.role === 'Admin' ? 'Admin' : 'Customer');
  };

  // OTP: 6 individual boxes
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const otpRefs: (HTMLInputElement | null)[] = Array(6).fill(null);

  // Particles seeded once
  const [particles] = useState(() =>
    Array.from({ length: 25 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }))
  );

  const handleOTPChange = (val: string, idx: number) => {
    const next = [...otpDigits];
    next[idx] = val;
    setOtpDigits(next);
    if (val && idx < 5) otpRefs[idx + 1]?.focus();
  };

  const handleOTPKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'Backspace' && !otpDigits[idx] && idx > 0) {
      otpRefs[idx - 1]?.focus();
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setFlow('otp');
    }, 1200);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setFlow('otp');
    }, 1400);
  };

  const isAdminEmail = (value: string) => {
    return value.trim().toLowerCase() === 'admin@ajdigital.com';
  };

  const handleOTPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otpDigits.join('');
    if (code.length < 6) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setFlow('success');
      setTimeout(() => {
        const finalRole: UserRole = isAdminEmail(email) ? 'Admin' : 'Customer';
        login(email || 'user@ajdigital.com', finalRole);
        setRole(finalRole);
        onNavigate('dashboard');
      }, 1800);
    }, 1000);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('✅ Password reset link sent! Check your inbox.');
      setFlow('login');
    }, 1200);
  };

  const handleSocialLogin = (provider: 'google' | 'github') => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const socialEmail = `${provider}user@${provider}.com`;
      const finalRole: UserRole = isAdminEmail(socialEmail) ? 'Admin' : 'Customer';
      login(socialEmail, finalRole);
      setRole(finalRole);
      onNavigate('dashboard');
    }, 1000);
  };

  return (
    <>
      {/* ── Keyframe Styles ─────────────────────────────────────────── */}
      <style>{`
        @keyframes float {
          0%   { transform: translateY(0px) scale(1); }
          100% { transform: translateY(-30px) scale(1.08); }
        }
        @keyframes particlePulse {
          0%, 100% { opacity: 0; transform: scale(0); }
          50%       { opacity: 0.8; transform: scale(1.5); }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes bounceIn {
          0%   { opacity: 0; transform: scale(0.6); }
          70%  { transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes spinGlow {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes successPop {
          0%   { opacity: 0; transform: scale(0.5) rotate(-10deg); }
          70%  { transform: scale(1.15) rotate(5deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes progressBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
        .btn-shimmer {
          background: linear-gradient(
            90deg,
            #0d9488 0%,
            #14b8a6 25%,
            #06b6d4 50%,
            #14b8a6 75%,
            #0d9488 100%
          );
          background-size: 200% auto;
          animation: shimmer 2.5s linear infinite;
        }
        .card-panel {
          background: rgba(17, 24, 39, 0.85);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }
        .otp-progress {
          animation: progressBar 30s linear forwards;
        }
      `}</style>

      {/* ── Full Page Layout ─────────────────────────────────────────── */}
      <div className="relative min-h-screen flex overflow-hidden bg-[#060b15]">

        {/* ── Left Decorative Panel (desktop only) ──────────────────── */}
        <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative flex-col justify-between p-12 overflow-hidden">

          {/* Ambient orbs */}
          <FloatingOrb size={500} x={-10} y={-10} color="rgba(20,184,166,0.35)" delay={0}   duration={8} />
          <FloatingOrb size={400} x={60}  y={50}  color="rgba(139,92,246,0.3)"  delay={2}   duration={10} />
          <FloatingOrb size={300} x={20}  y={70}  color="rgba(59,130,246,0.25)" delay={1.5} duration={7} />
          <FloatingOrb size={200} x={80}  y={10}  color="rgba(236,72,153,0.2)"  delay={3}   duration={9} />

          {/* Particles */}
          {particles.map((p, i) => (
            <Particle key={i} x={p.x} y={p.y} delay={p.delay} />
          ))}

          {/* Thin grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(20,184,166,0.4) 1px, transparent 1px),
                linear-gradient(90deg, rgba(20,184,166,0.4) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />

          {/* Brand */}
          <div
            className="relative z-10 flex items-center space-x-3"
            style={{ animation: 'slideInDown 0.6s ease-out both' }}
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-accent-blue flex items-center justify-center shadow-xl shadow-brand-500/30">
              <Sparkles className="w-7 h-7 text-dark-bg" />
            </div>
            <div>
              <span className="font-display font-black text-2xl text-white tracking-tight">
                AJ <span className="text-gradient">DIGITAL</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-brand-400 block -mt-1">
                Enterprise AI Suite
              </span>
            </div>
          </div>

          {/* Center Hero Copy */}
          <div className="relative z-10 space-y-8" style={{ animation: 'slideInUp 0.7s ease-out 0.2s both' }}>
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-bold uppercase tracking-widest">
                <Zap className="w-3.5 h-3.5 animate-bounce" />
                <span>AI-Powered Growth Engine 2026</span>
              </div>

              <h1 className="font-display font-extrabold text-5xl xl:text-6xl text-white leading-tight">
                Automate Your <br />
                <span className="text-gradient">Marketing</span> with <br />
                Autonomous AI
              </h1>

              <p className="text-gray-400 text-base max-w-sm leading-relaxed">
                Join 10,000+ enterprise brands using AJ AI to dominate search rankings, automate ad campaigns, and qualify leads 24/7.
              </p>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: '⚡', label: 'Instant SEO Audit' },
                { icon: '🤖', label: 'AI Ad Copy Writer' },
                { icon: '📊', label: 'Live Google Trends' },
                { icon: '🔒', label: 'SOC2 Certified' },
              ].map((pill, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-gray-300 text-xs font-semibold backdrop-blur-md hover:bg-white/10 hover:border-brand-500/40 transition-all duration-300"
                  style={{ animation: `slideInUp 0.5s ease-out ${0.4 + i * 0.1}s both` }}
                >
                  <span>{pill.icon}</span>
                  <span>{pill.label}</span>
                </div>
              ))}
            </div>

            {/* Social Proof */}
            <div
              className="flex items-center space-x-4 pt-2"
              style={{ animation: 'slideInUp 0.5s ease-out 0.85s both' }}
            >
              <div className="flex -space-x-3">
                {[
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80',
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80',
                  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80',
                  'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=80&q=80',
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="user"
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-[#060b15]"
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center space-x-1 text-amber-400 text-sm font-bold">
                  {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
                  <span className="ml-1 text-white font-black">4.97</span>
                </div>
                <p className="text-xs text-gray-500">Trusted by 10,000+ enterprise growth teams</p>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div
            className="relative z-10 grid grid-cols-3 gap-6"
            style={{ animation: 'slideInUp 0.5s ease-out 1s both' }}
          >
            {[
              { value: '$450M+', label: 'Revenue Generated' },
              { value: '4.2x',   label: 'Average ROAS' },
              { value: '99.8%',  label: 'AI Audit Accuracy' },
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center">
                <p className="font-display font-black text-2xl text-gradient">{stat.value}</p>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

        </div>

        {/* ── Right: Auth Card ─────────────────────────────────────── */}
        <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-6 sm:p-10 relative z-10">

          {/* Mobile ambient orbs */}
          <div className="lg:hidden absolute inset-0 pointer-events-none">
            <FloatingOrb size={350} x={-20} y={-20} color="rgba(20,184,166,0.3)" delay={0}   duration={8} />
            <FloatingOrb size={250} x={60}  y={60}  color="rgba(139,92,246,0.25)" delay={2}   duration={10} />
          </div>

          <div
            className="card-panel w-full max-w-md rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
            style={{ animation: 'slideInUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s both' }}
          >

            {/* ── SUCCESS SCREEN ──────────────────────────────────── */}
            {flow === 'success' && (
              <div className="p-10 flex flex-col items-center justify-center space-y-5 min-h-[480px]">
                <div
                  className="w-24 h-24 rounded-full bg-gradient-to-tr from-brand-500 to-emerald-400 flex items-center justify-center shadow-2xl shadow-brand-500/40"
                  style={{ animation: 'successPop 0.6s cubic-bezier(0.34,1.56,0.64,1) both' }}
                >
                  <CheckCircle2 className="w-12 h-12 text-dark-bg" />
                </div>

                <div className="text-center space-y-2" style={{ animation: 'slideInUp 0.5s ease-out 0.3s both' }}>
                  <h2 className="font-display font-extrabold text-3xl text-white">Access Granted!</h2>
                  <p className="text-sm text-gray-400">Initializing your AI Marketing Suite dashboard…</p>
                </div>

                {/* Loading dots */}
                <div className="flex items-center space-x-2">
                  {[0, 1, 2].map(i => (
                    <div
                      key={i}
                      className="w-2.5 h-2.5 rounded-full bg-brand-400"
                      style={{ animation: `bounceIn 0.6s ease ${i * 0.2}s infinite alternate` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ── OTP VERIFICATION ────────────────────────────────── */}
            {flow === 'otp' && (
              <div className="p-8 sm:p-10 space-y-8">

                {/* Header */}
                <div className="text-center space-y-2" style={{ animation: 'slideInDown 0.5s ease-out both' }}>
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-brand-500/20 flex items-center justify-center mb-3">
                    <ShieldCheck className="w-9 h-9 text-brand-400" />
                  </div>
                  <h2 className="font-display font-extrabold text-2xl text-white">Verify Identity</h2>
                  <p className="text-xs text-gray-500">
                    6-digit OTP sent to{' '}
                    <span className="text-brand-400 font-semibold">{email || 'your email'}</span>
                  </p>
                </div>

                {/* OTP progress bar */}
                <div className="h-0.5 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-brand-500 to-blue-500 otp-progress rounded-full" />
                </div>

                {/* 6 OTP Boxes */}
                <form onSubmit={handleOTPSubmit} className="space-y-6">
                  <div className="flex items-center justify-center gap-2 sm:gap-3">
                    {otpDigits.map((digit, i) => (
                      <OTPBox
                        key={i}
                        index={i}
                        value={digit}
                        onChange={handleOTPChange}
                        onKeyDown={handleOTPKeyDown}
                        inputRef={(el) => { otpRefs[i] = el; }}
                      />
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || otpDigits.join('').length < 6}
                    className="w-full py-4 rounded-2xl font-extrabold text-sm text-dark-bg transition-all duration-300 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed btn-shimmer"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-dark-bg/40 border-t-dark-bg rounded-full" style={{ animation: 'spinGlow 0.8s linear infinite' }} />
                        <span>Verifying Identity…</span>
                      </span>
                    ) : (
                      <span className="flex items-center justify-center space-x-2">
                        <KeyRound className="w-4 h-4" />
                        <span>Verify & Access Dashboard</span>
                      </span>
                    )}
                  </button>

                  <div className="text-center space-y-2">
                    <button type="button" className="text-xs text-gray-500 hover:text-brand-400 transition flex items-center justify-center space-x-1 mx-auto">
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Resend OTP Code</span>
                    </button>
                    <button type="button" onClick={() => setFlow('login')} className="text-xs text-gray-600 hover:text-gray-400 transition">
                      ← Back to Sign In
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ── FORGOT PASSWORD ──────────────────────────────────── */}
            {flow === 'forgot' && (
              <div className="p-8 sm:p-10 space-y-8">
                <div className="text-center space-y-2" style={{ animation: 'slideInDown 0.5s ease-out both' }}>
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/20 flex items-center justify-center mb-3">
                    <Lock className="w-9 h-9 text-amber-400" />
                  </div>
                  <h2 className="font-display font-extrabold text-2xl text-white">Reset Password</h2>
                  <p className="text-xs text-gray-500">Enter your email and we'll send a secure reset link.</p>
                </div>

                <form onSubmit={handleForgotSubmit} className="space-y-5">
                  <AnimatedInput
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="name@company.com"
                    icon={<Mail className="w-4 h-4" />}
                    label="Corporate Email Address"
                    required
                    animDelay="0.1s"
                  />

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 rounded-2xl font-extrabold text-sm text-dark-bg transition-all duration-300 btn-shimmer disabled:opacity-60"
                  >
                    {isLoading ? 'Sending Reset Link…' : 'Send Secure Reset Link'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setFlow('login')}
                    className="w-full text-center text-xs text-gray-500 hover:text-gray-300 transition"
                  >
                    ← Back to Sign In
                  </button>
                </form>
              </div>
            )}

            {/* ── LOGIN FORM ───────────────────────────────────────── */}
            {flow === 'login' && (
              <div className="p-8 sm:p-10 space-y-7">

                {/* Header */}
                <div className="space-y-1" style={{ animation: 'slideInDown 0.5s ease-out both' }}>
                  <h2 className="font-display font-extrabold text-2xl text-white">Welcome back 👋</h2>
                  <p className="text-xs text-gray-500">Sign into your AJ AI Enterprise account</p>
                </div>

                {/* Quick Demo Login Credentials Picker */}
                <div className="p-3.5 rounded-2xl bg-brand-500/10 border border-brand-500/30 space-y-2" style={{ animation: 'slideInUp 0.5s ease-out 0.1s both' }}>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold text-brand-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-brand-400" />
                      <span>Quick Demo Credentials</span>
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">Click to Auto-Fill</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {DEMO_CREDENTIALS.map((cred) => (
                      <button
                        key={cred.role}
                        type="button"
                        onClick={() => handleSelectDemoCreds(cred)}
                        className={`p-2 rounded-xl border text-left transition-all text-xs flex flex-col justify-between ${
                          selectedRole === cred.role && email === cred.email
                            ? 'bg-brand-500/20 border-brand-400 shadow-md shadow-brand-500/10'
                            : 'bg-gray-900/60 border-gray-800 hover:border-gray-700 hover:bg-gray-900'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-1">
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-black uppercase border ${cred.badgeColor}`}>
                            {cred.role}
                          </span>
                          {selectedRole === cred.role && email === cred.email && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-brand-400" />
                          )}
                        </div>
                        <span className="text-[11px] font-bold text-white truncate">{cred.email}</span>
                        <span className="text-[9px] text-gray-400 font-mono mt-0.5">Pass: {cred.password}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Social Logins */}
                <div
                  className="grid grid-cols-2 gap-3"
                  style={{ animation: 'slideInUp 0.5s ease-out 0.15s both' }}
                >
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('google')}
                    className="flex items-center justify-center space-x-2 py-2.5 rounded-xl border border-gray-700 bg-white/5 text-gray-300 text-xs font-bold hover:border-brand-500/50 hover:bg-white/10 transition-all duration-300"
                  >
                    <Chrome className="w-4 h-4 text-blue-400" />
                    <span>Google</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('github')}
                    className="flex items-center justify-center space-x-2 py-2.5 rounded-xl border border-gray-700 bg-white/5 text-gray-300 text-xs font-bold hover:border-brand-500/50 hover:bg-white/10 transition-all duration-300"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </button>
                </div>

                {/* Divider */}
                <div
                  className="flex items-center space-x-3"
                  style={{ animation: 'fadeIn 0.5s ease-out 0.25s both' }}
                >
                  <div className="flex-1 h-px bg-gray-800" />
                  <span className="text-[11px] text-gray-600 font-semibold uppercase tracking-widest">or continue with email</span>
                  <div className="flex-1 h-px bg-gray-800" />
                </div>

                {/* Login Form Fields */}
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <AnimatedInput
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="name@company.com"
                    icon={<Mail className="w-4 h-4" />}
                    label="Corporate Email"
                    required
                    animDelay="0.3s"
                  />

                  <AnimatedInput
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={setPassword}
                    placeholder="Your secure password"
                    icon={<Lock className="w-4 h-4" />}
                    label="Password"
                    required
                    animDelay="0.4s"
                    rightElement={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-500 hover:text-brand-400 transition"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    }
                  />

                  {/* Role selector */}
                  <div
                    className="space-y-1.5"
                    style={{ animation: 'slideInUp 0.5s ease-out 0.5s both' }}
                  >
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Dashboard View</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Customer', 'Manager', 'Employee'] as UserRole[]).map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setSelectedRole(r)}
                          className={`py-2 rounded-xl text-[10px] font-black uppercase tracking-wider border transition-all duration-200 ${
                            selectedRole === r
                              ? 'bg-brand-500 border-brand-500 text-dark-bg scale-105 shadow-lg shadow-brand-500/30'
                              : 'border-gray-700 text-gray-500 hover:border-gray-600 hover:text-gray-300'
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Forgot link */}
                  <div
                    className="flex justify-end"
                    style={{ animation: 'fadeIn 0.5s ease-out 0.6s both' }}
                  >
                    <button
                      type="button"
                      onClick={() => setFlow('forgot')}
                      className="text-xs text-gray-500 hover:text-brand-400 transition font-semibold"
                    >
                      Forgot password?
                    </button>
                  </div>

                  {/* Submit button */}
                  <div style={{ animation: 'slideInUp 0.5s ease-out 0.65s both' }}>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-4 rounded-2xl font-extrabold text-sm text-dark-bg transition-all duration-300 relative overflow-hidden group btn-shimmer disabled:opacity-60"
                    >
                      <span className="relative z-10 flex items-center justify-center space-x-2">
                        {isLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-dark-bg/40 border-t-dark-bg rounded-full" style={{ animation: 'spinGlow 0.8s linear infinite' }} />
                            <span>Authenticating…</span>
                          </>
                        ) : (
                          <>
                            <span>Sign In to AJ Dashboard</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                </form>

                {/* Switch to Register */}
                <p
                  className="text-center text-xs text-gray-600"
                  style={{ animation: 'fadeIn 0.5s ease-out 0.8s both' }}
                >
                  Don&apos;t have an account?{' '}
                  <button
                    onClick={() => setFlow('register')}
                    className="text-brand-400 font-extrabold hover:text-brand-300 transition underline underline-offset-2"
                  >
                    Create Free Account
                  </button>
                </p>

              </div>
            )}

            {/* ── REGISTER FORM ─────────────────────────────────────── */}
            {flow === 'register' && (
              <div className="p-8 sm:p-10 space-y-6">

                {/* Header */}
                <div className="space-y-1" style={{ animation: 'slideInDown 0.5s ease-out both' }}>
                  <h2 className="font-display font-extrabold text-2xl text-white">Create Account 🚀</h2>
                  <p className="text-xs text-gray-500">Join 10,000+ enterprise growth teams on AJ AI</p>
                </div>

                {/* Social Logins */}
                <div
                  className="grid grid-cols-2 gap-3"
                  style={{ animation: 'slideInUp 0.5s ease-out 0.15s both' }}
                >
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('google')}
                    className="flex items-center justify-center space-x-2 py-2.5 rounded-xl border border-gray-700 bg-white/5 text-gray-300 text-xs font-bold hover:border-brand-500/50 hover:bg-white/10 transition-all duration-300"
                  >
                    <Chrome className="w-4 h-4 text-blue-400" />
                    <span>Google</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('github')}
                    className="flex items-center justify-center space-x-2 py-2.5 rounded-xl border border-gray-700 bg-white/5 text-gray-300 text-xs font-bold hover:border-brand-500/50 hover:bg-white/10 transition-all duration-300"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </button>
                </div>

                {/* Divider */}
                <div className="flex items-center space-x-3" style={{ animation: 'fadeIn 0.4s ease-out 0.2s both' }}>
                  <div className="flex-1 h-px bg-gray-800" />
                  <span className="text-[11px] text-gray-600 font-semibold uppercase tracking-widest">or with email</span>
                  <div className="flex-1 h-px bg-gray-800" />
                </div>

                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <AnimatedInput
                      type="text"
                      value={fullName}
                      onChange={setFullName}
                      placeholder="John Doe"
                      icon={<User className="w-4 h-4" />}
                      label="Full Name"
                      required
                      animDelay="0.25s"
                    />
                    <AnimatedInput
                      type="text"
                      value={company}
                      onChange={setCompany}
                      placeholder="TechCorp Inc."
                      icon={<Building2 className="w-4 h-4" />}
                      label="Company"
                      animDelay="0.3s"
                    />
                  </div>

                  <AnimatedInput
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="name@company.com"
                    icon={<Mail className="w-4 h-4" />}
                    label="Corporate Email"
                    required
                    animDelay="0.35s"
                  />

                  <AnimatedInput
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={setPassword}
                    placeholder="Create a strong password"
                    icon={<Lock className="w-4 h-4" />}
                    label="Password"
                    required
                    animDelay="0.4s"
                    rightElement={
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-500 hover:text-brand-400 transition">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    }
                  />

                  {/* Role selector */}
                  <div className="space-y-1.5" style={{ animation: 'slideInUp 0.5s ease-out 0.45s both' }}>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Account Role</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Customer', 'Manager', 'Employee'] as UserRole[]).map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setSelectedRole(r)}
                          className={`py-2 rounded-xl text-[10px] font-black uppercase tracking-wider border transition-all duration-200 ${
                            selectedRole === r
                              ? 'bg-brand-500 border-brand-500 text-dark-bg scale-105 shadow-lg shadow-brand-500/30'
                              : 'border-gray-700 text-gray-500 hover:border-gray-600 hover:text-gray-300'
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ animation: 'slideInUp 0.5s ease-out 0.55s both' }}>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-4 rounded-2xl font-extrabold text-sm text-dark-bg transition-all duration-300 btn-shimmer disabled:opacity-60"
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center space-x-2">
                          <div className="w-4 h-4 border-2 border-dark-bg/40 border-t-dark-bg rounded-full" style={{ animation: 'spinGlow 0.8s linear infinite' }} />
                          <span>Creating Account…</span>
                        </span>
                      ) : (
                        <span className="flex items-center justify-center space-x-2">
                          <Bot className="w-4 h-4" />
                          <span>Create Enterprise Account</span>
                        </span>
                      )}
                    </button>
                  </div>
                </form>

                <p
                  className="text-center text-xs text-gray-600"
                  style={{ animation: 'fadeIn 0.5s ease-out 0.65s both' }}
                >
                  Already have an account?{' '}
                  <button
                    onClick={() => setFlow('login')}
                    className="text-brand-400 font-extrabold hover:text-brand-300 transition underline underline-offset-2"
                  >
                    Sign In
                  </button>
                </p>

              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
};
