import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const host = req.headers.get('host') || 'regionalcredit.au';

  const content = `# Regional Credit — AI Information & Service Summary

> Fast, local consumer credit pre-qualification for regional South Australia.

## Overview
Regional Credit provides white-labeled, local credit pre-qualification services for regional South Australian communities. Operations adhere strictly to Australian Credit License (ACL) #525087 regulations.

## Primary Towns Covered
- Mount Gambier (Postcodes: 5290, 5291) — regionalcredit.au
- Whyalla (Postcodes: 5600, 5608) — regionalcreditonline.com.au
- Port Pirie (Postcode: 5540) — regionalcreditdirect.com.au
- Port Lincoln (Postcode: 5606) — regionalcreditline.com.au

## Service Criteria & Loan Amounts
- Pre-qualification range: $500 to $5,000
- Employment requirement: Minimum weekly income $500 AUD
- Income composition: Max 50% Centrelink benefits
- Exclusions: Active bankruptcy or Part 9 Debt Agreements
- Location constraint: Regional South Australia residents only

## APIs & Machine Interoperability
- OpenAPI Spec: https://${host}/openapi.json
- Agent Spec: https://${host}/agent.json
- Pre-Qualification Endpoint: POST https://${host}/api/submit-lead
- Territory Validation Endpoint: POST https://${host}/api/validate-territory

## Compliance & Operator
Operated under ACL #525087 by Theorify Pty Ltd.
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
