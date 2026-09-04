'use client';

import React, { useState } from 'react';
import { trackEvent } from './Analytics';
import { MapPin, DollarSign, Briefcase, UserCheck, ArrowRight, ArrowLeft, CheckCircle, AlertCircle, Loader2, Phone, ShieldCheck } from 'lucide-react';

interface ApplicationFunnelProps {
  initialAmount?: number;
}

export default function ApplicationFunnel({ initialAmount = 5000 }: ApplicationFunnelProps) {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Form State
  const [postcode, setPostcode] = useState<string>('');
  const [suburb, setSuburb] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [territoryStatus, setTerritoryStatus] = useState<'idle' | 'checking' | 'allowed' | 'denied' | 'needs_address'>('idle');
  
  const [amount, setAmount] = useState<number>(initialAmount);
  
  const [employmentStatus, setEmploymentStatus] = useState<string>('full_time');
  const [weeklyIncome, setWeeklyIncome] = useState<number>(850);
  const [centrelinkPercentage, setCentrelinkPercentage] = useState<number>(0);
  const [isBankruptOrPart9, setIsBankruptOrPart9] = useState<boolean>(false);

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [consent, setConsent] = useState<boolean>(true);

  const [result, setResult] = useState<{
    success: boolean;
    status: string;
    message: string;
    leadId?: string;
  } | null>(null);

  // Step 1: Territory check
  const handleCheckTerritory = async () => {
    if (!postcode || postcode.length < 4) {
      setErrorMsg('Please enter a valid 4-digit South Australian postcode.');
      return;
    }
    setErrorMsg('');
    setTerritoryStatus('checking');

    try {
      const res = await fetch('/api/validate-territory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postcode }),
      });
      const data = await res.json();

      if (data.action === 'deny') {
        setTerritoryStatus('denied');
      } else if (data.action === 'geocode_address') {
        setTerritoryStatus('needs_address');
      } else {
        setTerritoryStatus('allowed');
        if (data.localities && data.localities.length > 0) {
          setSuburb(data.localities[0]);
        }
      }
    } catch (err) {
      setErrorMsg('Network error validating location. Please try again.');
      setTerritoryStatus('idle');
    }
  };

  // Step 4: Final Lead Submission
  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !mobile || !email) {
      setErrorMsg('Please complete all contact details.');
      return;
    }
    if (!consent) {
      setErrorMsg('Please agree to the privacy policy and consent check.');
      return;
    }

    setErrorMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok && data.success) {
        trackEvent('lead_submitted', {
          amount,
          postcode,
          suburb,
          leadId: data.leadId,
        });

        setResult({
          success: true,
          status: data.status,
          message: data.message,
          leadId: data.leadId,
        });
      } else {
        setResult({
          success: false,
          status: data.status || 'ERROR',
          message: data.message || 'We are unable to process your request at this time.',
        });
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg('Submission error. Please check your connection.');
    }
  };

  return (
    <div id="apply-funnel" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-10 text-white max-w-2xl mx-auto shadow-2xl">
      {/* Step Header Indicator */}
      {!result && (
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-3">
            <span>Step {step} of 4</span>
            <span className="text-[#FF6B00]">
              {step === 1 && 'Location Check'}
              {step === 2 && 'Credit Limit'}
              {step === 3 && 'Financial Status'}
              {step === 4 && 'Contact & Agent Callback'}
            </span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#FF6B00] h-full transition-all duration-300 ease-out rounded-full"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* RESULT SCREEN */}
      {result && (
        <div className="text-center py-6">
          {result.success ? (
            <div>
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-2">Pre-Qualification Successful!</h3>
              <p className="text-slate-300 text-sm max-w-md mx-auto mb-6">
                Thank you <strong className="text-white">{firstName}</strong>. Your requested credit limit of <strong className="text-emerald-400">${amount.toLocaleString()}</strong> has been submitted.
              </p>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-left mb-6 max-w-md mx-auto text-xs space-y-2">
                <div className="text-amber-400 font-semibold flex items-center gap-1.5 mb-2">
                  <Phone className="w-4 h-4" /> Live Agent Assigned
                </div>
                <div className="text-slate-300">
                  A credit specialist from Regional Credit is reviewing your file now and will call you on <span className="text-white font-mono">{mobile}</span>.
                </div>
                <div className="text-slate-500 text-[11px] pt-1">
                  Reference ID: <span className="font-mono">{result.leadId}</span>
                </div>
              </div>

              <p className="text-xs text-slate-500">
                Operating under Australian Credit Licence 525087.
              </p>
            </div>
          ) : (
            <div>
              <div className="w-16 h-16 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-500/30">
                <AlertCircle className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Notice</h3>
              <p className="text-slate-300 text-sm max-w-md mx-auto mb-6">
                {result.message}
              </p>
              <button
                onClick={() => {
                  setResult(null);
                  setStep(1);
                  setTerritoryStatus('idle');
                }}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold py-2.5 px-5 rounded-lg transition-colors"
              >
                Try Different Postcode
              </button>
            </div>
          )}
        </div>
      )}

      {/* STEP 1: Location Check */}
      {!result && step === 1 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#FF6B00]" /> Check Regional SA Eligibility
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Enter your SA postcode to verify service area eligibility.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                SA Postcode
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={4}
                  value={postcode}
                  onChange={(e) => {
                    setPostcode(e.target.value.replace(/\D/g, ''));
                    setTerritoryStatus('idle');
                    setErrorMsg('');
                  }}
                  placeholder="e.g. 5600, 5540, 5290"
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-[#FF6B00] font-mono text-lg"
                />
                <button
                  type="button"
                  onClick={handleCheckTerritory}
                  disabled={territoryStatus === 'checking'}
                  className="bg-[#FF6B00] hover:bg-[#e05e00] disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl transition-colors flex items-center gap-2 text-sm"
                >
                  {territoryStatus === 'checking' ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    'Verify Area'
                  )}
                </button>
              </div>
            </div>

            {/* Territory Status Callouts */}
            {territoryStatus === 'allowed' && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 shrink-0 text-emerald-400" />
                  <span>Great news! Postcode <strong>{postcode}</strong> is in our approved regional service zone.</span>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs shrink-0"
                >
                  Continue →
                </button>
              </div>
            )}

            {territoryStatus === 'needs_address' && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-3">
                <div className="text-amber-400 text-xs flex items-center gap-2 font-medium">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>Postcode {postcode} covers both regional and local store boundaries. Enter your street address to confirm distance eligibility:</span>
                </div>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street Address (e.g. 12 Main Rd, Victor Harbor)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-xs"
                />
                <button
                  onClick={() => {
                    if (address.length > 5) {
                      setTerritoryStatus('allowed');
                      setStep(2);
                    } else {
                      setErrorMsg('Please enter street address.');
                    }
                  }}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2.5 rounded-xl text-xs"
                >
                  Confirm Address & Proceed →
                </button>
              </div>
            )}

            {territoryStatus === 'denied' && (
              <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-xs space-y-2">
                <div className="text-amber-400 font-semibold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" /> Out of Regional Service Zone
                </div>
                <p className="text-slate-400">
                  Postcode <strong className="text-white">{postcode}</strong> is within Adelaide metro or a local store area. Our online line of credit pre-qualification is strictly reserved for regional SA residents.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* STEP 2: Credit Limit */}
      {!result && step === 2 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-[#FF6B00]" /> Choose Your Line of Credit Limit
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Select your approved limit between $2,050 and $10,000.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Desired Credit Limit
            </div>
            <div className="text-4xl font-extrabold text-[#FF6B00] font-mono my-2">
              ${amount.toLocaleString()}
            </div>
            <input
              type="range"
              min={2050}
              max={10000}
              step={100}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#FF6B00] my-4"
            />
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>$2,050</span>
              <span>$5,000</span>
              <span>$10,000</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold px-5 py-3 rounded-xl text-xs flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="flex-1 bg-[#FF6B00] hover:bg-[#e05e00] text-white font-bold py-3 px-6 rounded-xl text-xs flex items-center justify-center gap-2"
            >
              Next: Financial Details <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Financial Pre-Qual */}
      {!result && step === 3 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#FF6B00]" /> Income & Financial Status
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Fast qualification check (required under responsible lending guidelines).
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Employment Status
              </label>
              <select
                value={employmentStatus}
                onChange={(e) => setEmploymentStatus(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-[#FF6B00]"
              >
                <option value="full_time">Employed — Full Time</option>
                <option value="part_time">Employed — Part Time / Casual</option>
                <option value="self_employed">Self Employed / Contractor</option>
                <option value="unemployed">Unemployed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Estimated Weekly Income (After Tax)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-slate-500 font-mono text-xs">$</span>
                <input
                  type="number"
                  value={weeklyIncome}
                  onChange={(e) => setWeeklyIncome(Number(e.target.value))}
                  placeholder="850"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-[#FF6B00]"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Must be at least $500/week to qualify.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Approx. % of Income from Centrelink / Benefits
              </label>
              <select
                value={centrelinkPercentage}
                onChange={(e) => setCentrelinkPercentage(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-[#FF6B00]"
              >
                <option value={0}>0% — Fully wage/salary earner</option>
                <option value={20}>Under 50% Centrelink</option>
                <option value={60}>Over 50% Centrelink (Disqualifies)</option>
              </select>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isBankruptOrPart9}
                  onChange={(e) => setIsBankruptOrPart9(e.target.checked)}
                  className="w-4 h-4 accent-[#FF6B00] rounded"
                />
                <span className="text-xs text-slate-300">
                  I am currently bankrupt or under an active Part 9 debt agreement
                </span>
              </label>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(2)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold px-5 py-3 rounded-xl text-xs flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => {
                if (weeklyIncome < 500) {
                  setErrorMsg('Minimum weekly income requirement is $500.');
                  return;
                }
                setErrorMsg('');
                setStep(4);
              }}
              className="flex-1 bg-[#FF6B00] hover:bg-[#e05e00] text-white font-bold py-3 px-6 rounded-xl text-xs flex items-center justify-center gap-2"
            >
              Next: Contact Details <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Contact Details */}
      {!result && step === 4 && (
        <form onSubmit={handleSubmitLead} className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-[#FF6B00]" /> Live Agent Callback Details
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Enter your details to receive an instant callback from our live credit agent.
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-[#FF6B00]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Smith"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-[#FF6B00]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="0412 345 678"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-xs font-mono focus:outline-none focus:border-[#FF6B00]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john.smith@example.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-[#FF6B00]"
              />
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="w-4 h-4 mt-0.5 accent-[#FF6B00] rounded shrink-0"
                />
                <span className="text-[11px] text-slate-400 leading-normal">
                  I consent to Regional Credit contacting me via SMS/Phone regarding my Personal Line of Credit enquiry under Australian Credit Licence 525087.
                </span>
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setStep(3)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold px-5 py-3 rounded-xl text-xs flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#FF6B00] hover:bg-[#e05e00] disabled:opacity-50 text-white font-bold py-3.5 px-6 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Submit & Request Live Call →'
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
