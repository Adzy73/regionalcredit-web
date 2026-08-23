import { NextRequest, NextResponse } from 'next/server';
import { validateTerritory } from '@/lib/territory-gate';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { postcode } = body;

    if (!postcode || typeof postcode !== 'string') {
      return NextResponse.json({ error: 'Postcode required' }, { status: 400 });
    }

    const result = validateTerritory(postcode);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: 'Validation failed' }, { status: 500 });
  }
}
