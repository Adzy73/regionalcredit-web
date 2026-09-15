import React from 'react';
import { Building2, MapPin, CheckCircle2, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'About Us | Regional Credit SA',
  description: 'Learn about Regional Credit SA, our regional South Australia focus, transparent credit terms, and operation under ACL #525087.',
};

export default function AboutPage() {
  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 space-y-8 text-slate-300 text-xs sm:text-sm">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">About Regional Credit SA</h1>
        <p className="text-slate-400 text-xs mt-1">
          Dedicated regional South Australia consumer credit pre-qualification portal | ACL #525087
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Building2 className="w-5 h-5 text-[#FF6B00]" /> Our Mission & Service Focus
        </h2>
        <p className="text-slate-400 leading-relaxed">
          Regional Credit SA was built specifically to serve country South Australian residents who require accessible, transparent, and flexible consumer line of credit products without hidden fees or predatory terms.
        </p>
        <p className="text-slate-400 leading-relaxed">
          While traditional financial institutions often overlook regional communities outside Adelaide, Regional Credit provides tailored pre-qualification gateways built specifically for key regional SA hubs.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#FF6B00]" /> Primary Regional SA Hubs
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <div className="font-bold text-white mb-1">Mount Gambier & Limestone Coast</div>
            <div className="text-xs text-slate-400">Serving Mount Gambier (5290, 5291) and the South East region.</div>
          </div>
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <div className="font-bold text-white mb-1">Whyalla & Upper Spencer Gulf</div>
            <div className="text-xs text-slate-400">Serving Whyalla (5600, 5608) and surrounding industrial centers.</div>
          </div>
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <div className="font-bold text-white mb-1">Port Pirie & Mid North</div>
            <div className="text-xs text-slate-400">Serving Port Pirie (5540) and agricultural communities across Mid North SA.</div>
          </div>
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <div className="font-bold text-white mb-1">Port Lincoln & Eyre Peninsula</div>
            <div className="text-xs text-slate-400">Serving Port Lincoln (5606) and Lower Eyre Peninsula townships.</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Why Choose Regional Credit
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
            <div className="text-emerald-400 font-bold text-lg font-mono">$0 Setup Fee</div>
            <p className="text-slate-400 text-xs mt-1">No establishment or application fees to open your credit line.</p>
          </div>
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
            <div className="text-emerald-400 font-bold text-lg font-mono">$0 Monthly Fee</div>
            <p className="text-slate-400 text-xs mt-1">Pay interest only on funds drawn. $0 when unused.</p>
          </div>
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
            <div className="text-[#FF6B00] font-bold text-lg font-mono">Fast Local Response</div>
            <p className="text-slate-400 text-xs mt-1">Instant pre-qualification checks with prompt agent callbacks.</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#FF6B00]" /> Licensing & Operator
        </h2>
        <p className="text-slate-400 leading-relaxed text-xs">
          Regional Credit SA is operated by <strong>Theorify Pty Ltd</strong> under <strong>Australian Credit Licence 525087</strong>. All credit activities, rate assessments, and customer evaluations comply with the National Consumer Credit Protection (NCCP) Act.
        </p>
      </div>
    </div>
  );
}
