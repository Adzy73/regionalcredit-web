import fs from 'fs';
import path from 'path';

export interface LeadSubmission {
  id: string;
  createdAt: string;
  amount: number;
  postcode: string;
  suburb?: string;
  address?: string;
  employmentStatus: string;
  weeklyIncome: number;
  centrelinkPercentage: number;
  isBankruptOrPart9: boolean;
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  ipAddress?: string;
  userAgent?: string;
  status: 'QUALIFIED_PENDING_CALL' | 'TERRITORY_DENIED' | 'INCOME_DISQUALIFIED';
  territoryResult: {
    action: string;
    reason: string;
  };
}

const DATA_DIR = path.join(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

function ensureFileExists() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(LEADS_FILE)) {
    fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2));
  }
}

export function saveLead(lead: LeadSubmission): void {
  ensureFileExists();
  try {
    const currentLeads: LeadSubmission[] = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf-8'));
    currentLeads.unshift(lead);
    fs.writeFileSync(LEADS_FILE, JSON.stringify(currentLeads, null, 2));
  } catch (err) {
    console.error('Failed to save lead:', err);
  }
}

export function getLeads(): LeadSubmission[] {
  ensureFileExists();
  try {
    return JSON.parse(fs.readFileSync(LEADS_FILE, 'utf-8'));
  } catch (err) {
    return [];
  }
}
