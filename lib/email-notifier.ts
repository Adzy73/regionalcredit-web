import nodemailer from 'nodemailer';
import { LeadSubmission } from './lead-storage';

const GMAIL_USER = process.env.GMAIL_USER || 'amenadue73@gmail.com';
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD || 'iuijqhzzmlvkpwpc';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // SSL
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
});

export async function sendLeadEmailAlert(lead: LeadSubmission, websiteDomain?: string) {
  const domainName = websiteDomain || 'Regional Credit Network';
  
  const subject = `🔥 NEW LEAD (${lead.postcode} ${lead.suburb || ''}): ${lead.firstName} ${lead.lastName} - $${lead.amount.toLocaleString()}`;

  const html = `
    <div style="font-family: Arial, sans-serif; background-color: #0f172a; color: #f8fafc; padding: 24px; border-radius: 12px; max-width: 600px; margin: 0 auto;">
      <div style="border-bottom: 2px solid #FF6B00; padding-bottom: 12px; margin-bottom: 20px;">
        <span style="background-color: #FF6B00; color: #ffffff; padding: 4px 10px; font-weight: bold; border-radius: 4px; font-size: 12px;">NEW QUALIFIED LEAD</span>
        <h2 style="color: #ffffff; margin: 12px 0 4px 0; font-size: 22px;">$${lead.amount.toLocaleString()} Line of Credit Requested</h2>
        <p style="color: #94a3b8; font-size: 13px; margin: 0;">Captured via <strong>${domainName}</strong></p>
      </div>

      <div style="background-color: #1e293b; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
        <h3 style="color: #FF6B00; margin-top: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Applicant Contact Details</h3>
        <table style="width: 100%; font-size: 14px; color: #e2e8f0; border-collapse: collapse;">
          <tr><td style="padding: 6px 0; color: #94a3b8;">Full Name:</td><td style="font-weight: bold;">${lead.firstName} ${lead.lastName}</td></tr>
          <tr><td style="padding: 6px 0; color: #94a3b8;">Mobile Phone:</td><td style="font-weight: bold; color: #38bdf8;"><a href="tel:${lead.mobile}" style="color: #38bdf8; text-decoration: none;">${lead.mobile}</a></td></tr>
          <tr><td style="padding: 6px 0; color: #94a3b8;">Email Address:</td><td style="font-weight: bold;"><a href="mailto:${lead.email}" style="color: #38bdf8; text-decoration: none;">${lead.email}</a></td></tr>
          <tr><td style="padding: 6px 0; color: #94a3b8;">Location:</td><td style="font-weight: bold;">${lead.suburb ? lead.suburb + ', ' : ''}SA ${lead.postcode}</td></tr>
        </table>
      </div>

      <div style="background-color: #1e293b; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
        <h3 style="color: #10b981; margin-top: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Financial Pre-Qualification</h3>
        <table style="width: 100%; font-size: 14px; color: #e2e8f0; border-collapse: collapse;">
          <tr><td style="padding: 6px 0; color: #94a3b8;">Requested Limit:</td><td style="font-weight: bold; color: #10b981;">$${lead.amount.toLocaleString()}</td></tr>
          <tr><td style="padding: 6px 0; color: #94a3b8;">Weekly Income:</td><td style="font-weight: bold;">$${lead.weeklyIncome}/week</td></tr>
          <tr><td style="padding: 6px 0; color: #94a3b8;">Employment Status:</td><td style="font-weight: bold;">${lead.employmentStatus.toUpperCase()}</td></tr>
          <tr><td style="padding: 6px 0; color: #94a3b8;">Centrelink %:</td><td>${lead.centrelinkPercentage}%</td></tr>
          <tr><td style="padding: 6px 0; color: #94a3b8;">Bankruptcy/Part 9:</td><td>${lead.isBankruptOrPart9 ? 'YES' : 'NO (Clear)'}</td></tr>
        </table>
      </div>

      <div style="text-align: center; margin-top: 24px;">
        <a href="tel:${lead.mobile.replace(/\s+/g, '')}" style="background-color: #FF6B00; color: #ffffff; padding: 14px 28px; text-decoration: none; font-weight: bold; border-radius: 8px; display: inline-block; font-size: 16px;">
          📞 Call ${lead.firstName} Now (${lead.mobile})
        </a>
      </div>
    </div>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"Regional Credit Leads" <${GMAIL_USER}>`,
      to: 'amenadue73@gmail.com',
      subject,
      html,
    });
    console.log('=== LEAD EMAIL ALERT SENT VIA GMAIL ===', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error('Email alert dispatch error:', err);
    return { success: false, error: String(err) };
  }
}
