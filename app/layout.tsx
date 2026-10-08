import type { Metadata } from 'next';
import { headers } from 'next/headers';
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
  verification: {
    google: [
      'FUReDIJSpXPZgwnrYzgSdV6RMVwCS5nFVCk',
      '8RlaMkOiPpYnBvyBhcAnOFZhG42zmrwQu2-gl',
      'lK8PEfljTr8HzHLzjuTVnwKPbXwwiJtyyAL1xKc',
      'zYVYywyrIQ0COBh2MKdSjfNvducsDZgOqc1Ek',
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const host = headersList.get('host') || 'regionalcredit.au';
  const canonicalUrl = `https://${host.replace(/^www\./, '')}`;

  return (
    <html lang="en" className={`${inter.variable} ${mono.variable} antialiased dark`}>
      <head>
        <link rel="canonical" href={canonicalUrl} />
        <meta name="google-site-verification" content="FUReDIJSpXPZgwnrYzgSdV6RMVwCS5nFVCk" />
        <meta name="google-site-verification" content="8RlaMkOiPpYnBvyBhcAnOFZhG42zmrwQu2-gl" />
        <meta name="google-site-verification" content="lK8PEfljTr8HzHLzjuTVnwKPbXwwiJtyyAL1xKc" />
        <meta name="google-site-verification" content="zYVYywyrIQ0COBh2MKdSjfNvducsDZgOqc1Ek" />
        {/* Google tag (gtag.js) event - delayed navigation helper */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function gtagSendEvent(url) {
                var callback = function () {
                  if (typeof url === 'string') {
                    window.location = url;
                  }
                };
                if (typeof gtag === 'function') {
                  gtag('event', 'conversion_event_submit_lead_form_1', {
                    'event_callback': callback,
                    'event_timeout': 2000
                  });
                } else {
                  callback();
                }
                return false;
              }
            `,
          }}
        />
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

            <nav className="flex items-center gap-3 text-xs font-semibold">
              <a href="/about" className="text-slate-300 hover:text-white transition-colors hidden sm:inline-block">
                About
              </a>
              <a
                href="tel:0439726576"
                className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-900 px-3 py-1.5 rounded-xl transition-all font-bold text-xs flex items-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Call Chelsea: <strong className="text-white">0439 726 576</strong></span>
              </a>
              <a href="/#calculator" className="text-slate-300 hover:text-white transition-colors hidden md:inline-block">
                Calculator
              </a>
              <a href="/#faq" className="text-slate-300 hover:text-white transition-colors hidden sm:inline-block">
                Fees & FAQs
              </a>
              <a href="/contact" className="text-slate-300 hover:text-white transition-colors hidden md:inline-block">
                Contact
              </a>
              <a href="/terms" className="text-slate-300 hover:text-white transition-colors hidden sm:inline-block">
                Terms
              </a>
              <a
                href="tel:0434877310"
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 rounded-xl transition-all font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
              >
                <span>📞</span>
                <span className="hidden sm:inline">Call Agent</span>
                <span className="sm:hidden">Call</span>
              </a>
              <a
                href="/apply"
                className="bg-[#FF6B00] hover:bg-[#e05e00] text-white px-3.5 py-2 rounded-xl transition-all font-bold shadow-md shadow-orange-500/20"
              >
                Apply
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
              <div>© {new Date().getFullYear()} Regional Credit SA. Operated by Theorify Pty Ltd (ACL #525087).</div>
              <div className="flex gap-4">
                <a href="/about" className="hover:text-slate-300">About Us</a>
                <a href="/contact" className="hover:text-slate-300">Contact</a>
                <a href="/terms" className="hover:text-slate-300">Credit Terms & Fees</a>
                <a href="/privacy" className="hover:text-slate-300">Privacy Policy</a>
              </div>
            </div>
          </div>
        </footer>
        {/* Sticky Mobile Phone Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-slate-900/95 backdrop-blur border-t border-slate-800 p-3 shadow-2xl flex items-center justify-between gap-3">
          <a
            href="tel:0439726576"
            className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
          >
            <span className="text-base">📞</span>
            <span>Call Chelsea: 0439 726 576</span>
          </a>
          <a
            href="https://wa.me/61439726576?text=Hi%20Chelsea%2C%20I%20have%20an%20enquiry%20about%20a%20Personal%20Line%20of%20Credit."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white p-3 rounded-xl text-lg font-bold flex items-center justify-center shadow-md active:scale-95 transition-all shrink-0"
            title="SMS / WhatsApp"
          >
            💬
          </a>
        </div>
      </body>
    </html>
  );
}
