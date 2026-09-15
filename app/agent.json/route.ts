import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const host = req.headers.get('host') || 'regionalcredit.au';

  const agentData = {
    schema_version: '1.0',
    name: 'Regional Credit AI Assistant',
    description: 'Regional South Australia consumer credit pre-qualification assistant providing town-isolated loan evaluation.',
    url: `https://${host}`,
    provider: {
      name: 'Theorify Pty Ltd',
      acl: '525087',
    },
    capabilities: {
      territory_validation: `https://${host}/api/validate-territory`,
      lead_submission: `https://${host}/api/submit-lead`,
    },
    endpoints: [
      {
        path: '/api/validate-territory',
        method: 'POST',
        description: 'Validates if a customer postcode falls within allowed regional SA service zones (Mount Gambier, Whyalla, Port Pirie, Port Lincoln).',
      },
      {
        path: '/api/submit-lead',
        method: 'POST',
        description: 'Submits a pre-qualification request for regional consumer credit ($500 - $5,000).',
      },
    ],
    documentation: `https://${host}/llms-full.txt`,
    openapi: `https://${host}/openapi.json`,
  };

  return NextResponse.json(agentData, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
