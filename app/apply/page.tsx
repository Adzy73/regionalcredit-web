import React from 'react';
import ApplicationFunnel from '@/components/ApplicationFunnel';
import { ShieldCheck, MapPin } from 'lucide-react';

export const metadata = {
  title: 'Apply Online | Regional Credit SA — Personal Line of Credit',
  description: 'Fast online pre-approval application for regional South Australia residents. Up to $10,000 Personal Line of Credit with $0 establishment fees.',
};

export default function ApplyPage() {
  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF6B00] bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
          <MapPin className="w-3.5 h-3.5" /> Regional SA Exclusive Funnel
        </div>
        <h1 className="text-3xl font-extrabold text-white">
          Personal Line of Credit Application
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto">
          Pre-qualify in under 2 minutes. Your details are securely dispatched to our live regional credit agents under ACL #525087.
        </p>
      </div>

      <ApplicationFunnel />

      <div className="text-center text-xs text-slate-500 pt-4">
        <div className="flex items-center justify-center gap-2 font-medium text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Secured with 256-Bit SSL Encryption • Australian Credit Licence 525087</span>
        </div>
      </div>
    </div>
  );
}
