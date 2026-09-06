import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import JsonLdSchema from '@/components/JsonLdSchema';
import Analytics from '@/components/Analytics';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Regional Credit SA | Flexible Personal Line of Credit up to $10,000',
  description: 'Flexible personal line of credit for regional South Australia residents. $0 establishment fees, $0 monthly fees. Fast online pre-approval and live agent callbacks.',
  keywords: 'line of credit SA, regional loans, fast cash loans Port Pirie, Whyalla loans, Mount Gambier line of credit',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable} antialiased dark`}>
      <head>
        <meta name="google-site-verification" content="FUReDIJSpXPZgwnrYzgSdV6RMVwCS5nFVCk" />
        <JsonLdSchema />
        <Analytics />
      </head>
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans">
        {/* Navigation */}
        <header className="border-b border-slate-800/80 bg-slate-900/90 backdrop-blur sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 font-bold text-lg text-white tracking-tight">
              <span className="w-8 h-8 rounded-lg bg-[#FF6B00] text-white flex items-center justify-center text-sm font-black shadow-md shadow-orange-500/20">
                RC
              </span>
              <span>Regional<span className="text-[#FF6B00]">Credit</span></span>
              <span className="hidden sm:inline-block text-[10px] font-semibold bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700 ml-1">
                ACL 525087
              </span>
            </a>

            <nav className="flex items-center gap-4 text-xs font-semibold">
              <a href="/#calculator" className="text-slate-300 hover:text-white transition-colors hidden sm:inline-block">
                Calculator
              </a>
              <a href="/#faq" className="text-slate-300 hover:text-white transition-colors hidden sm:inline-block">
                Fees & FAQs
              </a>
              <a href="/terms" className="text-slate-300 hover:text-white transition-colors">
                Terms
              </a>
              <a
                href="/apply"
                className="bg-[#FF6B00] hover:bg-[#e05e00] text-white px-4 py-2 rounded-xl transition-all font-bold shadow-md shadow-orange-500/20"
              >
                Apply Now
              </a>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="bg-slate-900 border-t border-slate-800/80 text-slate-400 py-12 text-xs">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
              <div>
                <div className="text-white font-bold text-base mb-1">
                  Regional Credit SA
                </div>
                <div className="text-slate-400">
                  Exclusive regional South Australia lead agent network for flexible line of credit products.
                </div>
              </div>
              <div className="text-slate-400 font-mono text-[11px]">
                Australian Credit Licence 525087
              </div>
            </div>

            {/* Regulatory Disclosures */}
            <div className="space-y-3 text-[11px] leading-relaxed text-slate-500">
              <p>
                <strong className="text-slate-300">Fee & Interest Disclosure:</strong> Our flexible personal line of credit carries $0 establishment fees and $0 monthly account management fees. Fixed interest rates offered vary between 19.95%, 35%, or 48% per annum, determined by applicant credit assessment. Interest is charged on the outstanding balance only. Maximum repayment term for each drawing is 36 months. A dishonour fee of $33 is payable if a repayment is declined or missed.
              </p>
              <p>
                <strong className="text-slate-300">Territory Restriction:</strong> Lead generation and online pre-qualification services on this site are strictly available to residents of designated regional South Australia locations outside Adelaide metropolitan boundaries and store radius zones.
              </p>
              <p>
                <strong className="text-slate-300">Warning about Borrowing:</strong> Do you really need a loan? Consider alternatives before borrowing. For financial assistance and independent advice, visit <a href="https://moneysmart.gov.au" target="_blank" rel="noreferrer" className="underline text-slate-400 hover:text-slate-200">Moneysmart.gov.au</a> or call 1800 007 007.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-500 gap-2">
              <div>© {new Date().getFullYear()} Regional Credit. All rights reserved. ACL #525087.</div>
              <div className="flex gap-4">
                <a href="/terms" className="hover:text-slate-300">Credit Terms & Fees</a>
                <a href="/terms#privacy" className="hover:text-slate-300">Privacy Policy</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
