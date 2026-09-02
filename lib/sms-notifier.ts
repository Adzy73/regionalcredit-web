import { LeadSubmission } from './lead-storage';

export const AGENT_CONTACTS = [
  { name: 'Adam (Spare)', phone: '0439726576' },
];

const CLICKSEND_USERNAME = process.env.CLICKSEND_USERNAME || 'modburysa@cashconverters.com';
const CLICKSEND_API_KEY = process.env.CLICKSEND_API_KEY || 'F9780961-3991-4097-9023-058013DFCF04';

function formatPhoneE164(phone: string): string {
  const clean = phone.replace(/\D/g, '');
  if (clean.startsWith('04')) {
    return '+61' + clean.substring(1);
  }
  if (clean.startsWith('614')) {
    return '+' + clean;
  }
  return '+' + clean;
}

export async function sendLeadSmsAlert(lead: LeadSubmission) {
  const agentMessage = 
`🔥 NEW LOC LEAD (${lead.postcode} ${lead.suburb || ''})
Name: ${lead.firstName} ${lead.lastName}
Limit Req: $${lead.amount.toLocaleString()}
Phone: ${lead.mobile}
Income: $${lead.weeklyIncome}/wk (${lead.employmentStatus})
Time: ${new Date(lead.createdAt).toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })}
Call Now: tel:${lead.mobile.replace(/\s+/g, '')}`;

  const applicantMessage = 
`Hi ${lead.firstName}, thanks for applying for a Personal Line of Credit ($${lead.amount.toLocaleString()}) with Regional Credit. A credit specialist is reviewing your details now and will call you shortly on ${lead.mobile}. ACL #525087`;

  const messagesToSend = [];

  // 1. Alert Agent (Adam)
  for (const agent of AGENT_CONTACTS) {
    messagesToSend.push({
      to: formatPhoneE164(agent.phone),
      body: agentMessage,
    });
  }

  // 2. Alert Applicant
  if (lead.mobile) {
    messagesToSend.push({
      to: formatPhoneE164(lead.mobile),
      body: applicantMessage,
    });
  }

  try {
    const authHeader = 'Basic ' + Buffer.from(`${CLICKSEND_USERNAME}:${CLICKSEND_API_KEY}`).toString('base64');
    
    const res = await fetch('https://rest.clicksend.com/v3/sms/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader,
      },
      body: JSON.stringify({ messages: messagesToSend }),
    });

    const data = await res.json();
    console.log('=== CLICKSEND SMS DISPATCH RESPONSE ===', JSON.stringify(data));

    return {
      success: res.ok,
      agentsAlerted: AGENT_CONTACTS.map((c) => c.phone),
      applicantNotified: lead.mobile,
      clickSendResponse: data,
    };
  } catch (err) {
    console.error('ClickSend SMS dispatch error:', err);
    return {
      success: false,
      error: String(err),
    };
  }
}
