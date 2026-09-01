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

function isSearchBot(userAgent: string): boolean {
  if (!userAgent) return false;
  return BOT_USER_AGENTS.some((bot) => bot.test(userAgent));
}

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const userAgent = request.headers.get('user-agent') || '';

  // 1. Static Assets Bypass
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/favicon.ico') ||
    url.pathname.startsWith('/public') ||
    url.pathname.startsWith('/images')
  ) {
    return NextResponse.next();
  }

  // 2. Secret Key Preview Bypass (Admin / Testing access)
  const bypassKey = url.searchParams.get('preview_key') || request.headers.get('x-preview-key');
  if (bypassKey === 'pawnpass-admin-2026') {
    return NextResponse.next();
  }

  // 3. Search Engine Crawler Whitelist (Allows Googlebot to index local search queries)
  if (isSearchBot(userAgent)) {
    return NextResponse.next();
  }

  // 4. Edge IP Geo-Fence Inspection (Vercel & Cloudflare Edge Headers)
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
