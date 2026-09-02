'use client';

import React, { useState, useEffect } from 'react';
import LocCalculator from '@/components/LocCalculator';
import ApplicationFunnel from '@/components/ApplicationFunnel';
import { getDomainConfig, DomainBrandConfig } from '@/lib/domain-config';
import { ShieldCheck, CheckCircle2, MapPin } from 'lucide-react';

export default function HomePage() {
  const [brand, setBrand] = useState<DomainBrandConfig>(getDomainConfig());

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setBrand(getDomainConfig(window.location.hostname));
    }
  }, []);

  const handleScrollToFunnel = () => {
    const funnelEl = document.getElementById('apply-funnel');
    if (funnelEl) {
      funnelEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-16 py-8 sm:py-12">
      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-left">
          <div className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full bg-orange-500/10 text-[#FF6B00] border border-orange-500/20">
            <MapPin className="w-4 h-4" /> {brand.badgeText}
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {brand.heroHeadline} <br />
            <span className="text-[#FF6B00]">{brand.heroHighlight}</span> up to $10,000.
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {brand.heroSubtext}
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-slate-300 font-medium">
            <div className="flex items-center gap-2 bg-slate-900 p-3 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>$0 Setup / Monthly Fees</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900 p-3 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Rates from 19.95% p.a.</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900 p-3 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Redraw funds anytime</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900 p-3 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Fast Live Agent Callbacks</span>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5 font-semibold text-slate-200">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> ACL #525087 Licensed
            </div>
            <span>•</span>
            <div>90-Day Digital Bank Statement Check</div>
          </div>
        </div>

        {/* CALCULATOR WIDGET */}
        <div id="calculator">
          <LocCalculator onStartApplication={() => handleScrollToFunnel()} />
        </div>
      </section>

      {/* REGIONAL SA COVERAGE TICKER */}
      <section className="bg-slate-900/60 border-y border-slate-800 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-6">
            <h3 className="text-xs font-bold text-[#FF6B00] uppercase tracking-widest">
              Serving 620+ Regional SA Communities
            </h3>
            <p className="text-sm text-slate-300 font-medium mt-1">
              Direct phone & online credit access for regional towns outside store zones
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 text-xs font-semibold text-slate-300">
            {[
              'Whyalla', 'Port Pirie', 'Mount Gambier', 'Port Augusta', 'Port Lincoln',
              'Renmark', 'Berri', 'Loxton', 'Clare', 'Kadina', 'Wallaroo', 'Moonta',
              'Naracoorte', 'Millicent', 'Roxby Downs', 'Bordertown', 'Waikerie', 'Coober Pedy'
            ].map((town) => (
              <span
                key={town}
                className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg text-slate-300 hover:border-[#FF6B00] transition-colors"
              >
                📍 {town}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATION FUNNEL SECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Check Your Regional Eligibility in 60 Seconds
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            No hit to your credit score for pre-qualifying. Connect directly with our regional credit team.
          </p>
        </div>

        <ApplicationFunnel />
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-white">How the Personal Line of Credit Works</h2>
          <p className="text-xs text-slate-400 mt-1">Simple 3-step process designed for country SA residents</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-[#FF6B00] font-extrabold flex items-center justify-center text-lg border border-orange-500/20">
              1
            </div>
            <h3 className="text-base font-bold text-white">Lock in Your Limit</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Choose your credit limit from $2,050 to $10,000. Upon approval, your full limit is transferred straight into your bank account.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-[#FF6B00] font-extrabold flex items-center justify-center text-lg border border-orange-500/20">
              2
            </div>
            <h3 className="text-base font-bold text-white">Only Pay Interest on What You Draw</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              No establishment fees and $0 monthly fees. You only pay interest on your actual balance, with fixed rates starting from 19.95% p.a.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-[#FF6B00] font-extrabold flex items-center justify-center text-lg border border-orange-500/20">
              3
            </div>
            <h3 className="text-base font-bold text-white">Repay & Redraw Anytime</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              As you make repayments, your available balance restores. Redraw extra cash whenever you need (min $200) without reapplying.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-400 mt-1">Everything you need to know about our personal line of credit</p>
        </div>

        <div className="space-y-4 text-xs">
          <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-2">
            <h4 className="text-sm font-bold text-white">What is the difference between a line of credit and a standard personal loan?</h4>
            <p className="text-slate-400 leading-relaxed">
              A standard personal loan gives you a single lump sum that you repay over time. A personal line of credit is a continuing credit contract where your credit limit ($2,050–$10,000) stays open. You can repay and redraw funds as needed with $0 monthly fees.
            </p>
          </div>

          <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-2">
            <h4 className="text-sm font-bold text-white">What are the interest rates?</h4>
            <p className="text-slate-400 leading-relaxed">
              We offer three fixed interest rate tiers based on your credit score and repayment history: <strong>19.95% p.a.</strong> (Good credit), <strong>35% p.a.</strong> (OK credit), and <strong>48% p.a.</strong> (Challenged credit).
            </p>
          </div>

          <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-2">
            <h4 className="text-sm font-bold text-white">Are there any hidden fees or establishment charges?</h4>
            <p className="text-slate-400 leading-relaxed">
              No establishment fees and $0 monthly account management fees. The only potential additional fee is a $33.00 dishonour fee if a scheduled payment declines or is missed.
            </p>
          </div>

          <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-2">
            <h4 className="text-sm font-bold text-white">What are the eligibility requirements?</h4>
            <p className="text-slate-400 leading-relaxed">
              You must be 18+ years old, an Australian citizen or PR, earning over $500/week (with less than 50% from Centrelink), not currently bankrupt or under a Part 9 agreement, and willing to provide 90 days of online bank statements.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
