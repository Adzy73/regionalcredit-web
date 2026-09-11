'use client';

import Script from 'next/script';
import { useState, useEffect } from 'react';
import { getDomainConfig } from '@/lib/domain-config';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
    gtagSendEvent: (url?: string, params?: Record<string, any>) => boolean;
  }
}

// Global Tracking Helper Function
export const trackEvent = (eventName: string, eventParams: Record<string, any> = {}) => {
  if (typeof window === 'undefined') return;

  // 1. GTM / DataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...eventParams,
  });

  // 2. GA4 Direct & Google Ads Conversion Event
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, eventParams);

    // Fire Google Ads Lead Conversion Event
    if (eventName === 'lead_submitted') {
      window.gtag('event', 'conversion_event_submit_lead_form_1', {
        value: eventParams.amount || 0,
        currency: 'AUD',
        transaction_id: eventParams.leadId || '',
        ...eventParams,
      });
    }
  }

  // 3. Meta Pixel Direct
  if (typeof window.fbq === 'function') {
    if (eventName === 'lead_submitted') {
      window.fbq('track', 'Lead', eventParams);
    } else {
      window.fbq('trackCustom', eventName, eventParams);
    }
  }
};

export default function Analytics() {
  const [ga4Id, setGa4Id] = useState<string | undefined>(process.env.NEXT_PUBLIC_GA4_ID);
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const fbPixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const config = getDomainConfig(window.location.hostname);
      if (config.ga4MeasurementId) {
        setGa4Id(config.ga4MeasurementId);
      }
    }
  }, []);

  return (
    <>
      {/* Google Tag (gtag.js) Delayed Navigation Helper */}
      <Script
        id="gtag-delayed-navigation-helper"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Helper function to delay opening a URL until a gtag event is sent.
            // Call it in response to an action that should navigate to a URL.
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

      {/* Google Tag Manager */}
      {gtmId && (
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `,
          }}
        />
      )}

      {/* GA4 Script */}
      {ga4Id && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
            strategy="afterInteractive"
          />
          <Script
            id="ga4-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${ga4Id}', { page_path: window.location.pathname });
              `,
            }}
          />
        </>
      )}

      {/* Meta Pixel Script */}
      {fbPixelId && (
        <Script
          id="fb-pixel-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${fbPixelId}');
              fbq('track', 'PageView');
            `,
          }}
        />
      )}
    </>
  );
}
