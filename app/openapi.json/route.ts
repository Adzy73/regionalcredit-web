import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const host = req.headers.get('host') || 'regionalcredit.au';

  const openapiData = {
    openapi: '3.0.3',
    info: {
      title: 'Regional Credit API',
      description: 'API for territory validation and lead pre-qualification in regional South Australia.',
      version: '1.0.0',
    },
    servers: [
      {
        url: `https://${host}`,
      },
    ],
    paths: {
      '/api/validate-territory': {
        post: {
          summary: 'Validate service territory by postcode',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    postcode: { type: 'string', example: '5290' },
                  },
                  required: ['postcode'],
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Territory status response',
            },
          },
        },
      },
      '/api/submit-lead': {
        post: {
          summary: 'Submit lead pre-qualification application',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    firstName: { type: 'string' },
                    lastName: { type: 'string' },
                    mobile: { type: 'string' },
                    email: { type: 'string' },
                    postcode: { type: 'string' },
                    weeklyIncome: { type: 'number' },
                    amount: { type: 'number' },
                  },
                  required: ['firstName', 'lastName', 'mobile', 'email', 'postcode'],
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Pre-qualification result',
            },
          },
        },
      },
    },
  };

  return NextResponse.json(openapiData, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
