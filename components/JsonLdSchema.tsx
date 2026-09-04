'use client';

import React, { useEffect, useState } from 'react';
import { getDomainConfig, DomainBrandConfig } from '@/lib/domain-config';

export default function JsonLdSchema() {
  const [config, setConfig] = useState<DomainBrandConfig>(getDomainConfig());

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setConfig(getDomainConfig(window.location.hostname));
    }
  }, []);

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    'name': `Regional Credit - ${config.targetTown}`,
    'description': config.heroSubtext,
    'url': `https://${config.domain}`,
    'areaServed': {
      '@type': 'AdministrativeArea',
      'name': `${config.targetTown}, South Australia`,
      'postalCode': config.targetPostcodes,
    },
    'serviceType': 'Personal Line of Credit',
    'provider': {
      '@type': 'FinancialService',
      'name': 'Regional Credit SA',
      'identifier': 'ACL 525087',
    },
    'termsOfService': `https://${config.domain}/terms`,
    'feesAndCommissionsSpecification': '$0 establishment fee, $0 monthly account fee. Fixed interest rates 19.95% to 48% p.a.',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
