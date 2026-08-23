import { LeadSubmission } from './lead-storage';

export const AGENT_CONTACTS = [
  { name: 'Dave', phone: '0418935267' },
  { name: 'Adam', phone: '0423808559' },
];

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

  console.log('=== SMS DISPATCH SIMULATION ===');
  console.log('AGENT ALERT MESSAGE:\n', agentMessage);
  console.log('APPLICANT CONFIRMATION SMS:\n', applicantMessage);
  console.log('===============================');

  return {
    agentsAlerted: AGENT_CONTACTS.map((c) => c.phone),
    applicantNotified: lead.mobile,
    sentAt: new Date().toISOString(),
  };
}
