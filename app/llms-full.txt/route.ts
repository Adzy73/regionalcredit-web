import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const host = req.headers.get('host') || 'regionalcredit.au';

  const content = `# Regional Credit — Complete AI Technical & Operational Reference

> Detailed pre-qualification specifications, territory rules, compliance parameters, and machine endpoints for Regional Credit (regional South Australia).

## Operator Information
- **Operating Entity**: Theorify Pty Ltd
- **Regulatory Framework**: Australian Credit License (ACL) #525087
- **Business Model**: White-labeled regional credit pre-qualification funnel
- **Service Territory**: Regional South Australia (Town-isolated per domain)

## Territory Mapping & Domains
1. **Mount Gambier**:
   - Primary Domain: \`regionalcredit.au\`
   - Postcodes: 5290, 5291
   - Target Region: Limestone Coast / South East SA
2. **Whyalla**:
   - Primary Domain: \`regionalcreditonline.com.au\`
   - Postcodes: 5600, 5608
   - Target Region: Eyre Peninsula / Upper Spencer Gulf
3. **Port Pirie**:
   - Primary Domain: \`regionalcreditdirect.com.au\`
   - Postcode: 5540
   - Target Region: Mid North / Upper Spencer Gulf
4. **Port Lincoln**:
   - Primary Domain: \`regionalcreditline.com.au\`
   - Postcode: 5606
   - Target Region: Lower Eyre Peninsula

## Qualification Criteria Matrix
- **Loan Amount**: $500 AUD to $5,000 AUD
- **Minimum Net Income**: $500 AUD / week
- **Centrelink Limit**: Maximum 50% of total weekly income
- **Bankruptcy / Insolvency**: Applicants with active Bankruptcy or Part 9 Debt Agreements are disqualified
- **Age**: 18+ Australian permanent residents

## Programmatic Interfaces
- **Agent Discovery (\`agent.json\`)**: \`https://${host}/agent.json\`
- **OpenAPI 3.0 Specification (\`openapi.json\`)**: \`https://${host}/openapi.json\`
- **Territory Validation API**:
  - \`POST https://${host}/api/validate-territory\`
  - Body: \`{ "postcode": "5290" }\`
- **Lead Submission API**:
  - \`POST https://${host}/api/submit-lead\`
  - Body: \`{ "firstName": "Jane", "lastName": "Doe", "mobile": "0400000000", "email": "jane@example.com", "postcode": "5290", "weeklyIncome": 850, "amount": 2050 }\`

## Crawler Permissions & Robots Policy
All legitimate AI web crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Bingbot, CCBot) are fully allowed across all regional domain properties.
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
