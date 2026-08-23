'use client';

import React, { useState } from 'react';
import { DollarSign, ShieldCheck, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

interface LocCalculatorProps {
  onStartApplication?: (amount: number) => void;
}

export default function LocCalculator({ onStartApplication }: LocCalculatorProps) {
  const [amount, setAmount] = useState<number>(5000);

  // Repayment estimation logic (based on 36-month schedule at OK rate ~35% p.a.)
  // Formula: Estimated monthly payment for 36 months
  const monthlyRate = 0.35 / 12;
  const numMonths = 36;
  const estimatedMonthly = Math.round(
    (amount * monthlyRate * Math.pow(1 + monthlyRate, numMonths)) /
      (Math.pow(1 + monthlyRate, numMonths) - 1)
  );
  const estimatedFortnightly = Math.round((estimatedMonthly * 12) / 26);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl text-white max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <Zap className="w-3.5 h-3.5" /> Personal Line of Credit
        </span>
        <span className="text-xs text-slate-400 font-medium">ACL #525087</span>
      </div>

      <h3 className="text-2xl font-bold text-slate-100 tracking-tight mb-2">
        How much credit do you need?
      </h3>
      <p className="text-sm text-slate-400 mb-6">
        Lock in your limit ($2,050 – $10,000). Only pay interest on what you actually draw.
      </p>

      {/* Amount Display */}
      <div className="bg-slate-950/80 rounded-xl p-5 border border-slate-800/80 mb-6 text-center">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
          Requested Limit
        </div>
        <div className="text-4xl sm:text-5xl font-extrabold text-[#FF6B00] font-mono tracking-tight">
          ${amount.toLocaleString()}
        </div>
        <div className="text-xs text-slate-400 mt-2">
          Initial drawdown: <span className="text-slate-200 font-medium">${amount.toLocaleString()}</span> upfront into your account
        </div>
      </div>

      {/* Slider */}
      <div className="mb-8">
        <input
          type="range"
          min={2050}
          max={10000}
          step={100}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#FF6B00]"
        />
        <div className="flex justify-between text-xs font-semibold text-slate-400 mt-2 font-mono">
          <span>$2,050</span>
          <span>$5,000</span>
          <span>$10,000</span>
        </div>
      </div>

      {/* Fee & Repayment Highlights */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-400 font-medium">Est. Fortnightly</div>
          <div className="text-lg font-bold text-emerald-400 font-mono">
            ~${estimatedFortnightly} <span className="text-xs font-normal text-slate-400">/fn</span>
          </div>
        </div>
        <div className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-400 font-medium">Est. Monthly</div>
          <div className="text-lg font-bold text-emerald-400 font-mono">
            ~${estimatedMonthly} <span className="text-xs font-normal text-slate-400">/mth</span>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-8 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span><strong className="text-white">$0 Establishment Fee</strong> & <strong className="text-white">$0 Monthly Fees</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Personalised rates from <strong className="text-white">19.95% to 48% p.a.</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Redraw funds anytime (min $200) as you pay down</span>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={() => onStartApplication?.(amount)}
        className="w-full bg-[#FF6B00] hover:bg-[#e05e00] text-white font-bold py-4 px-6 rounded-xl transition-colors duration-200 shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 text-base"
      >
        Check Eligibility for ${amount.toLocaleString()} <ArrowRight className="w-5 h-5" />
      </button>

      <p className="text-[11px] text-slate-500 text-center mt-3">
        Fast 2-minute form. No hit to credit score for pre-qualification check.
      </p>
    </div>
  );
}
