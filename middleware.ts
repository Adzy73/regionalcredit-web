import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Known Search Engine Crawler User-Agent Patterns (Whitelisted for SEO indexing)
const BOT_USER_AGENTS = [
  /googlebot/i,
  /bingbot/i,
  /slurp/i,
  /duckduckbot/i,
  /baiduspider/i,
  /yandexbot/i,
  /facebookexternalhit/i,
  /twitterbot/i,
  /linkedinbot/i,
  /whatsapp/i,
  /applebot/i,
];

// User & Home Office Whitelisted IPs / Network Ranges
const WHITELISTED_IPS = [
  '103.237.18.15', // Home Office Public IP
  '100.87.191.45', // Tailscale Mac Mini IP
];

// Domain to Specific Regional Town Mapping
const DOMAIN_TOWN_MAP: Record<string, string> = {
  'regionalcredit.au': 'mount gambier',
  'www.regionalcredit.au': 'mount gambier',
  'regionalcreditonline.com.au': 'whyalla',
  'www.regionalcreditonline.com.au': 'whyalla',
  'regionalcreditdirect.com.au': 'port pirie',
  'www.regionalcreditdirect.com.au': 'port pirie',
  'regionalcreditline.com.au': 'port lincoln',
  'www.regionalcreditline.com.au': 'port lincoln',
};

function isWhitelistedIp(ip: string): boolean {
  if (!ip) return false;
  if (WHITELISTED_IPS.includes(ip)) return true;
  if (
    ip.startsWith('192.168.') ||
    ip.startsWith('10.') ||
    ip.startsWith('100.') ||
    ip.startsWith('172.16.') ||
    ip.startsWith('172.17.') ||
    ip.startsWith('172.18.') ||
    ip.startsWith('172.19.') ||
    ip.startsWith('172.20.') ||
    ip.startsWith('172.30.') ||
    ip.startsWith('172.31.')
  ) {
    return true;
  }
  return false;
}

function isSearchBot(userAgent: string): boolean {
  if (!userAgent) return false;
  return BOT_USER_AGENTS.some((bot) => bot.test(userAgent));
}

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const userAgent = request.headers.get('user-agent') || '';
  const hostname = (request.headers.get('host') || '').toLowerCase().split(':')[0];
  const clientIp =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    '';

  // 1. Static Assets Bypass
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/favicon.ico') ||
    url.pathname.startsWith('/public') ||
    url.pathname.startsWith('/images')
  ) {
    return NextResponse.next();
  }

  // 2. Admin Preview & Home Office Cookie Bypass
  const bypassKey = url.searchParams.get('preview_key') || request.headers.get('x-preview-key');
  const hasAdminCookie = request.cookies.get('admin_access')?.value === 'true';

  if (bypassKey === 'pawnpass-admin-2026' || url.searchParams.has('admin') || hasAdminCookie) {
    const response = NextResponse.next();
    response.cookies.set('admin_access', 'true', {
      maxAge: 60 * 60 * 24 * 365, // 1 year admin bypass cookie
      path: '/',
    });
    return response;
  }

  // 3. User Home Office IP Whitelist (See all 4 sites at home office address)
  if (clientIp && isWhitelistedIp(clientIp)) {
    return NextResponse.next();
  }

  // 4. Search Engine Crawler Whitelist (Allows Googlebot to index each site for its target town search terms)
  if (isSearchBot(userAgent)) {
    return NextResponse.next();
  }

  // 5. Strict Domain-to-Town Edge Geo Inspection
  const country =
    request.headers.get('x-vercel-ip-country') ||
    request.headers.get('cf-ipcountry') ||
    request.headers.get('x-country-code') ||
    '';

  const region =
    request.headers.get('x-vercel-ip-country-region') ||
    request.headers.get('cf-region-code') ||
    request.headers.get('x-region-code') ||
    '';

  const city = (
    request.headers.get('x-vercel-ip-city') ||
    request.headers.get('cf-ipcity') ||
    ''
  ).toLowerCase();

  const requiredTown = DOMAIN_TOWN_MAP[hostname];

  // If edge geo headers are present:
  if (country) {
    // Block non-Australian visitors
    if (country.toUpperCase() !== 'AU') {
      return new NextResponse('404 Not Found', { status: 404 });
    }

    // Block non-South Australia visitors
    if (region && region.toUpperCase() !== 'SA') {
      return new NextResponse('404 Not Found', { status: 404 });
    }

    // Enforce 1:1 Town Restriction for this specific domain
    if (requiredTown && city && !city.includes(requiredTown)) {
      return new NextResponse('404 Not Found', { status: 404 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};
