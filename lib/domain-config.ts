export interface DomainBrandConfig {
  domain: string;
  badgeText: string;
  heroHeadline: string;
  heroHighlight: string;
  heroSubtext: string;
  primaryCtaText: string;
  themeAccent: string;
}

export const DOMAIN_CONFIGS: Record<string, DomainBrandConfig> = {
  'regionalcredit.au': {
    domain: 'regionalcredit.au',
    badgeText: 'Official Regional SA Credit Access Portal',
    heroHeadline: 'No store in town?',
    heroHighlight: 'Flexible Line of Credit',
    heroSubtext: 'Apply online from your phone anywhere in regional SA. Lock in a flexible revolving credit line ($2,050 to $10,000) with $0 setup and $0 monthly fees.',
    primaryCtaText: 'Check Regional Eligibility',
    themeAccent: '#FF6B00',
  },
  'regionalcreditonline.com.au': {
    domain: 'regionalcreditonline.com.au',
    badgeText: '100% Digital • Zero Store Visit Required',
    heroHeadline: 'Fast Mobile Line of Credit,',
    heroHighlight: '100% Online Approval',
    heroSubtext: 'No paper forms or branch visits. Complete your pre-qualification from your phone in under 60 seconds for instant agent review.',
    primaryCtaText: 'Apply Online Now',
    themeAccent: '#10B981',
  },
  'regionalcreditdirect.com.au': {
    domain: 'regionalcreditdirect.com.au',
    badgeText: 'Direct Regional Agent Access',
    heroHeadline: 'Direct Cash Access for Regional SA,',
    heroHighlight: 'Same-Day Agent Callbacks',
    heroSubtext: 'Speak directly with our regional credit specialists. Simple 90-day bank check with rapid assessment and same-day direct transfer.',
    primaryCtaText: 'Speak to an Agent Today',
    themeAccent: '#3B82F6',
  },
  'regionalcreditline.com.au': {
    domain: 'regionalcreditline.com.au',
    badgeText: 'Revolving Personal Line of Credit',
    heroHeadline: 'Revolving Credit Line $2k - $10k,',
    heroHighlight: 'Pay $0 Monthly Account Fees',
    heroSubtext: 'Only pay interest on what you actually draw. Flexible repayments with full redraw ability whenever you need extra cash.',
    primaryCtaText: 'Calculate Your Credit Line',
    themeAccent: '#F59E0B',
  },
};

export function getDomainConfig(hostname?: string): DomainBrandConfig {
  if (!hostname) return DOMAIN_CONFIGS['regionalcredit.au'];
  const cleanHost = hostname.toLowerCase().replace(/^www\./, '');
  return DOMAIN_CONFIGS[cleanHost] || DOMAIN_CONFIGS['regionalcredit.au'];
}
