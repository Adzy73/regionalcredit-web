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

// User & Developer Whitelisted IP Addresses / Ranges
const WHITELISTED_IPS = [
  '103.237.18.15', // User Primary Public IP
  '100.87.191.45', // Tailscale Mac Mini IP
  '127.0.0.1',
  '::1',
  'localhost',
];

function isWhitelistedIp(ip: string): boolean {
  if (!ip) return false;
  if (WHITELISTED_IPS.includes(ip)) return true;
  // Match LAN / VPN ranges (192.168.x.x, 10.x.x.x, 100.x.x.x, 172.16-31.x.x)
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

  // 2. Secret Key Preview & Admin Cookie Bypass
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

  // 3. User & Developer IP Whitelist
  if (isWhitelistedIp(clientIp) || isWhitelistedIp(request.headers.get('host') || '')) {
    return NextResponse.next();
  }

  // 4. Search Engine Crawler Whitelist (Allows Googlebot to index local search queries)
  if (isSearchBot(userAgent)) {
    return NextResponse.next();
  }

  // 5. Edge IP Geo-Fence Inspection (Vercel & Cloudflare Edge Headers)
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

  // If edge geo headers are present:
  if (country) {
    // Block non-Australian visitors
    if (country.toUpperCase() !== 'AU') {
      return new NextResponse('404 Not Found', { status: 404 });
    }

    // Block non-South Australia visitors (if region header is present)
    if (region && region.toUpperCase() !== 'SA') {
      return new NextResponse('404 Not Found', { status: 404 });
    }

    // Targeted Town Filter (Environment-configurable, e.g. NEXT_PUBLIC_TARGET_TOWN=whyalla)
    const targetCity = process.env.NEXT_PUBLIC_TARGET_TOWN?.toLowerCase();
    if (targetCity && city && city !== targetCity) {
      return new NextResponse('404 Not Found', { status: 404 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};
