import React from 'react';
import { Mail, Phone, MapPin, Clock, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Contact Us | Regional Credit SA',
  description: 'Get in touch with the Regional Credit SA team for pre-qualification help, credit terms inquiries, or support across regional SA.',
};

export default function ContactPage() {
  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 space-y-8 text-slate-300 text-xs sm:text-sm">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Contact Us</h1>
        <p className="text-slate-400 text-xs mt-1">
          Regional South Australia Customer Support | Australian Credit Licence 525087
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Mail className="w-5 h-5 text-[#FF6B00]" /> Electronic Communications
          </h2>
          <p className="text-slate-400 leading-relaxed text-xs">
            For application inquiries, document submission, or general credit support, email our team:
          </p>
          <div className="bg-slate-950 p-3 rounded-lg font-mono text-xs text-[#FF6B00] border border-slate-800">
            amenadue73@gmail.com
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Phone className="w-5 h-5 text-[#FF6B00]" /> Phone & SMS Callback Service
          </h2>
          <p className="text-slate-400 leading-relaxed text-xs">
            Qualified applicants receive direct SMS callbacks from our local credit representatives:
          </p>
          <div className="bg-slate-950 p-3 rounded-lg font-mono text-xs text-emerald-400 border border-slate-800">
            0434 877 310 (Regional SA Support Line)
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-[#FF6B00]" /> Hours of Operation
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 text-xs text-slate-300">
          <div>
            <div className="font-bold text-white mb-1">Monday – Friday:</div>
            <div className="text-slate-400">9:00 AM – 5:00 PM ACST (Adelaide Time)</div>
          </div>
          <div>
            <div className="font-bold text-white mb-1">Saturday:</div>
            <div className="text-slate-400">9:00 AM – 1:00 PM ACST</div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#FF6B00]" /> Business & Licensing Details
        </h2>
        <div className="text-xs text-slate-400 space-y-1">
          <div><strong className="text-slate-200">Legal Entity:</strong> Theorify Pty Ltd</div>
          <div><strong className="text-slate-200">Licence:</strong> Australian Credit Licence #525087</div>
          <div><strong className="text-slate-200">Service Area:</strong> Mount Gambier, Whyalla, Port Pirie, Port Lincoln & Regional SA</div>
        </div>
      </div>
    </div>
  );
}
