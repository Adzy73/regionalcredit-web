import React from 'react';
import { ShieldCheck, FileText, AlertTriangle } from 'lucide-react';

export const metadata = {
  title: 'Credit Terms & Fees | Regional Credit SA',
  description: 'Detailed fee schedule, interest rate tiers, and regulatory disclosures for our Personal Line of Credit under ACL #525087.',
};

export default function TermsPage() {
  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 space-y-8 text-slate-300 text-xs sm:text-sm">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Credit Terms & Fee Schedule</h1>
        <p className="text-slate-400 text-xs mt-1">
          Full regulatory disclosures for Line of Credit products under Australian Credit Licence 525087.
        </p>
      </div>

      {/* FEE SCHEDULE TABLE */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#FF6B00]" /> Complete Fee Breakdown
        </h2>

        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-300 border-b border-slate-800">
              <tr>
                <th className="p-3.5 font-semibold">Fee Type</th>
                <th className="p-3.5 font-semibold">Amount</th>
                <th className="p-3.5 font-semibold">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              <tr>
                <td className="p-3.5 font-bold text-white">Establishment Fee</td>
                <td className="p-3.5 font-mono text-emerald-400 font-bold">$0.00</td>
                <td className="p-3.5 text-slate-400">Zero upfront cost to set up your line of credit.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-white">Monthly Account Fee</td>
                <td className="p-3.5 font-mono text-emerald-400 font-bold">$0.00</td>
                <td className="p-3.5 text-slate-400">No monthly management or maintenance fees.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-white">Early Repayment Fee</td>
                <td className="p-3.5 font-mono text-emerald-400 font-bold">$0.00</td>
                <td className="p-3.5 text-slate-400">Pay out your balance early anytime with zero penalties.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-white">Dishonour / Late Fee</td>
                <td className="p-3.5 font-mono text-amber-400 font-bold">$33.00</td>
                <td className="p-3.5 text-slate-400">Charged only if a scheduled direct debit declines or payment is missed.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* INTEREST RATE TIERS */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-white">Personalised Interest Rate Tiers</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="text-xs font-semibold text-slate-400">Good Credit</div>
            <div className="text-2xl font-black text-emerald-400 font-mono">19.95% p.a.</div>
            <p className="text-[11px] text-slate-400">Long history of making repayments on time for existing loans and utilities.</p>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="text-xs font-semibold text-slate-400">OK Credit</div>
            <div className="text-2xl font-black text-amber-400 font-mono">35.00% p.a.</div>
            <p className="text-[11px] text-slate-400">Generally meets repayments, with occasional minor past payment delays.</p>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="text-xs font-semibold text-slate-400">Challenged Credit</div>
            <div className="text-2xl font-black text-orange-400 font-mono">48.00% p.a.</div>
            <p className="text-[11px] text-slate-400">Past defaults or less stable repayment patterns. Subject to full affordability check.</p>
          </div>
        </div>
      </div>

      {/* WARNING ABOUT BORROWING */}
      <div id="privacy" className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" /> ASIC Warning about Borrowing
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          Do you really need a loan? Consider alternatives before borrowing. It can be expensive to borrow money. For information about financial assistance and independent advisory services, visit <a href="https://moneysmart.gov.au" target="_blank" rel="noreferrer" className="text-amber-400 underline">Moneysmart.gov.au</a> or call 1800 007 007.
        </p>
      </div>
    </div>
  );
}
