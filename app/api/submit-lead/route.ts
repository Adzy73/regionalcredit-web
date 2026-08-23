import { NextRequest, NextResponse } from 'next/server';
import { validateTerritory } from '@/lib/territory-gate';
import { saveLead, LeadSubmission } from '@/lib/lead-storage';
import { sendLeadSmsAlert } from '@/lib/sms-notifier';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      amount,
      postcode,
      suburb,
      address,
      employmentStatus,
      weeklyIncome,
      centrelinkPercentage,
      isBankruptOrPart9,
      firstName,
      lastName,
      mobile,
      email,
    } = body;

    // Validate inputs
    if (!firstName || !lastName || !mobile || !email || !postcode) {
      return NextResponse.json({ error: 'Missing required contact fields' }, { status: 400 });
    }

    // Territory gate check
    const territoryResult = validateTerritory(postcode);

    // Qualification rules check
    let status: LeadSubmission['status'] = 'QUALIFIED_PENDING_CALL';
    
    if (territoryResult.action === 'deny') {
      status = 'TERRITORY_DENIED';
    } else if (
      weeklyIncome < 500 ||
      centrelinkPercentage > 50 ||
      isBankruptOrPart9 === true ||
      employmentStatus === 'unemployed'
    ) {
      status = 'INCOME_DISQUALIFIED';
    }

    const newLead: LeadSubmission = {
      id: 'lead_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
      createdAt: new Date().toISOString(),
      amount: Number(amount) || 2050,
      postcode: String(postcode).trim(),
      suburb: suburb ? String(suburb).trim() : undefined,
      address: address ? String(address).trim() : undefined,
      employmentStatus: String(employmentStatus || 'employed'),
      weeklyIncome: Number(weeklyIncome) || 0,
      centrelinkPercentage: Number(centrelinkPercentage) || 0,
      isBankruptOrPart9: Boolean(isBankruptOrPart9),
      firstName: String(firstName).trim(),
      lastName: String(lastName).trim(),
      mobile: String(mobile).trim(),
      email: String(email).trim(),
      status,
      territoryResult: {
        action: territoryResult.action,
        reason: territoryResult.reason,
      },
    };

    // Save lead
    saveLead(newLead);

    // If qualified, trigger instant SMS alerts
    if (status === 'QUALIFIED_PENDING_CALL') {
      await sendLeadSmsAlert(newLead);
      return NextResponse.json({
        success: true,
        status: 'QUALIFIED',
        message: 'Your pre-qualification request has been received. An agent will contact you shortly.',
        leadId: newLead.id,
      });
    } else if (status === 'TERRITORY_DENIED') {
      return NextResponse.json({
        success: false,
        status: 'TERRITORY_DENIED',
        message: 'Thank you for your interest. Unfortunately, we currently only service regional South Australia locations.',
      });
    } else {
      return NextResponse.json({
        success: false,
        status: 'DISQUALIFIED',
        message: 'Based on the details provided, we are unable to process this application at this time.',
      });
    }
  } catch (err) {
    console.error('Submit lead error:', err);
    return NextResponse.json({ error: 'Failed to process lead submission' }, { status: 500 });
  }
}
