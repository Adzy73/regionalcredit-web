export interface DomainBrandConfig {
  domain: string;
  targetTown: string;
  targetPostcodes: string[];
  population: string;
  badgeText: string;
  heroHeadline: string;
  heroHighlight: string;
  heroSubtext: string;
  primaryCtaText: string;
  themeAccent: string;
  googleSiteVerification?: string;
  ga4MeasurementId?: string;
}

export const DOMAIN_CONFIGS: Record<string, DomainBrandConfig> = {
  'regionalcredit.au': {
    domain: 'regionalcredit.au',
    targetTown: 'Mount Gambier',
    targetPostcodes: ['5290', '5291'],
    population: '25,591',
    badgeText: 'Mount Gambier & Limestone Coast Dedicated Portal',
    heroHeadline: 'Mount Gambier Resident?',
    heroHighlight: 'Flexible Line of Credit',
    heroSubtext: 'Dedicated online line of credit ($2,050 to $10,000) for Mount Gambier and Limestone Coast residents with $0 establishment fees and $0 monthly fees.',
    primaryCtaText: 'Check Mount Gambier Pre-Qual',
    themeAccent: '#FF6B00',
    googleSiteVerification: 'FUReDIJSpXPZgwnrYzgSdV6RMVwCS5nFVCk',
    ga4MeasurementId: 'G-K8LN402MTD',
  },
  'regionalcreditonline.com.au': {
    domain: 'regionalcreditonline.com.au',
    targetTown: 'Whyalla',
    targetPostcodes: ['5600', '5608'],
    population: '20,880',
    badgeText: 'Whyalla & Eyre Peninsula 100% Digital Access',
    heroHeadline: 'Whyalla Mobile Line of Credit,',
    heroHighlight: '100% Online Approval',
    heroSubtext: 'Apply directly from your phone in Whyalla. Zero paper forms or branch visits. Rapid assessment and direct bank transfer.',
    primaryCtaText: 'Apply Online in Whyalla',
    themeAccent: '#10B981',
    googleSiteVerification: '8RlaMkOiPpYnBvyBhcAnOFZhG42zmrwQu2-gl',
    ga4MeasurementId: 'G-NXBR3GYR12',
  },
  'regionalcreditdirect.com.au': {
    domain: 'regionalcreditdirect.com.au',
    targetTown: 'Port Pirie',
    targetPostcodes: ['5540'],
    population: '13,896',
    badgeText: 'Port Pirie Direct Regional Agent Line',
    heroHeadline: 'Port Pirie Direct Cash Line,',
    heroHighlight: 'Same-Day Agent Callbacks',
    heroSubtext: 'Connect directly with our regional credit specialists serving Port Pirie. Fast 90-day bank check with same-day payout.',
    primaryCtaText: 'Speak to Port Pirie Agent',
    themeAccent: '#3B82F6',
    googleSiteVerification: 'lK8PEfljTr8HzHLzjuTVnwKPbXwwiJtyyAL1xKc',
    ga4MeasurementId: 'G-K81QK0MLZN',
  },
  'regionalcreditline.com.au': {
    domain: 'regionalcreditline.com.au',
    targetTown: 'Port Lincoln',
    targetPostcodes: ['5606', '5607'],
    population: '13,810',
    badgeText: 'Port Lincoln Revolving Line of Credit',
    heroHeadline: 'Port Lincoln Revolving Credit $2k - $10k,',
    heroHighlight: 'Pay $0 Monthly Account Fees',
    heroSubtext: 'Dedicated revolving credit line for Port Lincoln residents. Only pay interest on what you draw with full redraw flexibility.',
    primaryCtaText: 'Calculate Port Lincoln Line',
    themeAccent: '#F59E0B',
    googleSiteVerification: 'zYVYywyrIQ0COBh2MKdSjfNvducsDZgOqc1Ek',
    ga4MeasurementId: 'G-PSS8JL8692',
  },
};

export function getDomainConfig(hostname?: string): DomainBrandConfig {
  if (!hostname) return DOMAIN_CONFIGS['regionalcredit.au'];
  const cleanHost = hostname.toLowerCase().replace(/^www\./, '');
  return DOMAIN_CONFIGS[cleanHost] || DOMAIN_CONFIGS['regionalcredit.au'];
}
