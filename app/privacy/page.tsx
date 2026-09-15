import React from 'react';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | Regional Credit SA',
  description: 'How Regional Credit SA collects, uses, and protects your personal information under the Australian Privacy Principles and ACL #525087.',
};

export default function PrivacyPage() {
  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 space-y-8 text-slate-300 text-xs sm:text-sm">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Privacy Policy</h1>
        <p className="text-slate-400 text-xs mt-1">
          Last updated: September 2026 | Australian Credit Licence 525087 (Theorify Pty Ltd)
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#FF6B00]" /> 1. Commitment to Privacy
        </h2>
        <p className="text-slate-400 leading-relaxed">
          Regional Credit SA (operated under Australian Credit Licence #525087 by Theorify Pty Ltd) is committed to protecting your personal information in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs). This policy outlines how we collect, store, use, and disclose personal data when you interact with our websites and pre-qualification application tools.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#FF6B00]" /> 2. Information We Collect
        </h2>
        <p className="text-slate-400 leading-relaxed">
          To assess eligibility for consumer line of credit pre-qualification, we collect personal and financial information provided directly by you during the application process, including:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-slate-400">
          <li>Full name, residential address, postcode, and suburb</li>
          <li>Contact details including mobile phone number and email address</li>
          <li>Employment status, weekly income, and Centrelink income ratio</li>
          <li>Bankruptcy, insolvency, or Part 9 Debt Agreement history</li>
          <li>Technical data such as IP address, browser user-agent, and interaction analytics</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Lock className="w-5 h-5 text-[#FF6B00]" /> 3. How We Use Your Information
        </h2>
        <p className="text-slate-400 leading-relaxed">
          Your information is used solely for the following purposes:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-slate-400">
          <li>Evaluating geographic service eligibility and credit pre-qualification parameters</li>
          <li>Dispatching instant SMS and email notifications regarding your application status</li>
          <li>Connecting you with an authorised credit representative to process formal loan documents</li>
          <li>Complying with statutory obligations under the National Consumer Credit Protection Act 2009</li>
          <li>Improving website performance, security monitoring, and fraud prevention</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Eye className="w-5 h-5 text-[#FF6B00]" /> 4. Cookies & Analytics Technologies
        </h2>
        <p className="text-slate-400 leading-relaxed">
          We use cookies, web beacons, and first/third-party analytics services (such as Google Analytics and tag manager tools) to monitor website traffic, conversion performance, and site responsiveness. You may adjust your browser settings to disable cookies, though certain interactive features may be limited as a result.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
        <h2 className="text-base font-bold text-white">5. Contact Our Privacy Officer</h2>
        <p className="text-slate-400 leading-relaxed">
          If you wish to access or correct your personal data, request deletion, or submit a privacy inquiry, please contact our Privacy Officer:
        </p>
        <div className="text-xs font-mono text-slate-300 space-y-1">
          <div>Entity: Theorify Pty Ltd (ACL #525087)</div>
          <div>Email: amenadue73@gmail.com</div>
          <div>Location: Regional South Australia Operations</div>
        </div>
      </div>
    </div>
  );
}
