import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Terminal, 
  BookOpen, 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  UserCheck, 
  Building2,
  CheckCircle2,
  FileText,
  PhoneCall,
  Award,
  ChevronRight,
  Package,
  Search,
  Lock
} from 'lucide-react';

const LandingPage = () => {
  const [selectedCardType, setSelectedCardType] = useState('AAY');
  const [familyMembersCount, setFamilyMembersCount] = useState(4);

  // Quota Calculator Matrix (Authentic NFSA Standards)
  const calculateQuota = (type, members) => {
    if (type === 'AAY') {
      return [
        { item: 'Fortified Rice', qty: 20, unit: 'kg', price: '₹3 / kg' },
        { item: 'Whole Wheat', qty: 15, unit: 'kg', price: '₹2 / kg' },
        { item: 'Sugar (Antyodaya)', qty: 1, unit: 'kg', price: '₹13.50 / kg' }
      ];
    } else if (type === 'PHH') {
      return [
        { item: 'Fortified Rice', qty: members * 3, unit: 'kg', price: 'FREE (NFSA)' },
        { item: 'Whole Wheat', qty: members * 2, unit: 'kg', price: 'FREE (NFSA)' },
        { item: 'Chana Dal / Pulses', qty: 1, unit: 'kg', price: '₹15 / kg' }
      ];
    } else {
      return [
        { item: 'Subsidized Wheat', qty: 10, unit: 'kg', price: '₹7 / kg' },
        { item: 'Subsidized Rice', qty: 5, unit: 'kg', price: '₹9.50 / kg' }
      ];
    }
  };

  return (
    <div className="space-y-8 sm:space-y-10 pb-16 font-sans text-slate-900">
      {/* HERO SECTION: Responsive Civic Portal Header */}
      <section className="relative overflow-hidden bg-white p-5 sm:p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6 sm:space-y-8">
        <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-[11px] sm:text-xs font-extrabold">
            <Award className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
            <span className="truncate">National Food Security Act (NFSA) Integrated Portal</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-['Outfit'] leading-tight">
            Transparent Ration Distribution & <span className="text-blue-900 block sm:inline">Digital Consumer Services</span>
          </h1>

          <p className="text-xs sm:text-base text-slate-700 leading-relaxed font-normal">
            Welcome to the official RationSetu Public Distribution System Portal. Connecting 
            Government Admins, Fair Price Shop (FPS) Licensees, and Citizens through secure e-POS biometric authentication, 
            AES-256 Aadhaar encryption, and atomic queue slot management.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <Link
              to="/login"
              className="px-5 py-3.5 rounded-2xl bg-blue-950 hover:bg-blue-900 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 group text-center"
            >
              <span>Access Citizen / Official Portal</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/register/consumer"
              className="px-5 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs border border-slate-300 transition-all flex items-center justify-center gap-2 text-center"
            >
              <UserCheck className="w-4 h-4 text-emerald-700" />
              <span>Register Ration Card (e-KYC)</span>
            </Link>
          </div>
        </div>

        {/* Live National Distribution Metrics Tape (Responsive 2-col / 4-col) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-slate-200 text-xs">
          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-600 font-semibold block text-[10px] sm:text-[11px]">Active Ration Cards</span>
            <p className="text-base sm:text-xl font-extrabold text-slate-900 font-mono">3.48 Crore</p>
            <span className="text-[9px] sm:text-[10px] text-emerald-700 font-bold">100% Aadhaar Seeded</span>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-600 font-semibold block text-[10px] sm:text-[11px]">FPS Shops Onboarded</span>
            <p className="text-base sm:text-xl font-extrabold text-blue-900 font-mono">5,38,120</p>
            <span className="text-[9px] sm:text-[10px] text-slate-600 font-semibold">e-POS Minutiae v2.4</span>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-600 font-semibold block text-[10px] sm:text-[11px]">Biometric Auth Rate</span>
            <p className="text-base sm:text-xl font-extrabold text-purple-900 font-mono">99.84%</p>
            <span className="text-[9px] sm:text-[10px] text-purple-800 font-bold">Zero Paper Coupons</span>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-600 font-semibold block text-[10px] sm:text-[11px]">Grievance Resolution</span>
            <p className="text-base sm:text-xl font-extrabold text-amber-900 font-mono">24 Hours</p>
            <span className="text-[9px] sm:text-[10px] text-amber-800 font-bold">Assisted AI Engine</span>
          </div>
        </div>
      </section>

      {/* CORE PORTALS & CITIZEN SERVICES GRID */}
      <section className="space-y-4 sm:space-y-6">
        <div>
          <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 font-['Outfit']">
            Departmental Services & Interactive Modules
          </h2>
          <p className="text-xs text-slate-600">Select a portal module to access citizen entitlements or operational shop tools</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Card 1: Consumer Digital Ration Book */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5 sm:space-y-6 group">
            <div className="space-y-3 sm:space-y-4">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-900 group-hover:scale-110 transition-transform">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-blue-900 transition-colors">
                  Consumer Digital Ration Book
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  View household grain entitlements, family member lists, card category (AAY/PHH/NPHH), and transaction history.
                </p>
              </div>

              <div className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>AES-256 Field-Level Aadhaar Masking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Real-Time Grain Entitlement Balance</span>
                </div>
              </div>
            </div>

            <Link
              to="/login"
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-blue-900 text-slate-900 hover:text-white font-extrabold text-xs border border-slate-200 transition-all text-center flex items-center justify-center gap-1.5"
            >
              <span>Login to Digital Book</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2: FPS Distributor e-POS Terminal */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5 sm:space-y-6 group">
            <div className="space-y-3 sm:space-y-4">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-900 group-hover:scale-110 transition-transform">
                <Terminal className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-purple-900 transition-colors">
                  FPS e-POS Machine Terminal
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Guided 5-step distribution state machine (`scan` → `verify` → `dispense` → `pay` → `receipt`) with biometric scanner.
                </p>
              </div>

              <div className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-700 flex-shrink-0" />
                  <span>Optical & WebAuthn Fingerprint Sensor</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-700 flex-shrink-0" />
                  <span>Razorpay Sandbox & Printable QR Receipts</span>
                </div>
              </div>
            </div>

            <Link
              to="/login"
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-purple-900 text-slate-900 hover:text-white font-extrabold text-xs border border-slate-200 transition-all text-center flex items-center justify-center gap-1.5"
            >
              <span>Open e-POS Terminal</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3: Government Admin Suite */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5 sm:space-y-6 group md:col-span-2 lg:col-span-1">
            <div className="space-y-3 sm:space-y-4">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-900 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-amber-900 transition-colors">
                  Government Admin Control Suite
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Review pending KYC verification queues, allocate monthly grain stocks to FPS shops, and configure helpline rules.
                </p>
              </div>

              <div className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
                  <span>Interactive KYC Queue & Document Review</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
                  <span>Recharts Distribution Analytics</span>
                </div>
              </div>
            </div>

            <Link
              to="/login"
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-amber-800 text-slate-900 hover:text-white font-extrabold text-xs border border-slate-200 transition-all text-center flex items-center justify-center gap-1.5"
            >
              <span>Admin Officer Login</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* INTERACTIVE CITIZEN ENTITLEMENT CALCULATOR */}
      <section className="bg-white p-5 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-slate-200 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 mb-1">
              <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
              Official NFSA Entitlement Calculator
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-['Outfit']">
              Check Monthly Household Grain Quota & Prices
            </h3>
            <p className="text-xs text-slate-600">Calculate subsidized food grain entitlement based on card category and family count</p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-xs self-start md:self-auto">
            {['AAY', 'PHH', 'NPHH'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCardType(cat)}
                className={`px-3 py-1.5 font-bold rounded-lg transition-all ${
                  selectedCardType === cat
                    ? 'bg-blue-900 text-white shadow-sm'
                    : 'text-slate-700 hover:text-blue-900'
                }`}
              >
                {cat} Card
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          {/* Controls */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Family Members Count: <span className="font-bold text-blue-900 font-mono text-sm">{familyMembersCount}</span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={familyMembersCount}
                onChange={(e) => setFamilyMembersCount(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-700"
              />
              <div className="flex justify-between text-[10px] text-slate-600 font-mono mt-1">
                <span>1 Member</span>
                <span>5 Members</span>
                <span>10 Members</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
              <span className="font-bold text-slate-900 block">Category Info:</span>
              {selectedCardType === 'AAY' && <p className="text-[11px] text-slate-600">Antyodaya Anna Yojana (Poorest of Poor Households) — Fixed 35 kg grain quota per family.</p>}
              {selectedCardType === 'PHH' && <p className="text-[11px] text-slate-600">Priority Households (BPL) — 5 kg grain quota per family member per month.</p>}
              {selectedCardType === 'NPHH' && <p className="text-[11px] text-slate-600">Non-Priority Households (APL) — Subsidized grains as per state allocation policy.</p>}
            </div>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {calculateQuota(selectedCardType, familyMembersCount).map((q) => (
              <div key={q.item} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-center shadow-sm">
                <span className="text-xs font-bold text-slate-700 block">{q.item}</span>
                <p className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono">
                  {q.qty} <span className="text-xs text-slate-600">{q.unit}</span>
                </p>
                <span className="inline-block text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                  {q.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFFICIAL GOVERNMENT NOTIFICATIONS & CIRCULARS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Latest Announcements */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-900 flex-shrink-0" />
            Official Department Circulars & Bulletins
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] font-extrabold text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300 inline-block">
                15 FEB 2026
              </span>
              <h4 className="font-bold text-slate-900">Mandatory e-POS Minutiae Biometric Verification</h4>
              <p className="text-[11px] text-slate-600">All Fair Price Shops instructed to enforce 100% RD Service biometric verification before stock release.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] font-extrabold text-blue-900 bg-blue-100 px-2 py-0.5 rounded border border-blue-300 inline-block">
                01 FEB 2026
              </span>
              <h4 className="font-bold text-slate-900">Fortified Rice & Chana Dal Allocation Released</h4>
              <p className="text-[11px] text-slate-600">Monthly grain stocks dispatched to all district godowns for AAY and Priority Households.</p>
            </div>
          </div>
        </div>

        {/* Citizen Helpdesk & Contact */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <PhoneCall className="w-5 h-5 text-emerald-700 flex-shrink-0" />
            Citizen Support & Helpline Contacts
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs sm:text-sm">National PDS Toll-Free Support</span>
                <span className="font-mono text-base font-extrabold text-emerald-800">1967</span>
              </div>
              <p className="text-[11px] text-emerald-900/80">Available 24x7 in all regional languages for card issues, shop complaints, and slot booking help.</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-slate-700">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-600 text-[10px] block">Grievance Portal</span>
                <span className="font-bold text-blue-900 truncate block">pgportal.gov.in</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-600 text-[10px] block">NFSA Official Link</span>
                <span className="font-bold text-blue-900 truncate block">nfsa.gov.in</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER: Official Government Footer */}
      <footer className="pt-6 sm:pt-8 border-t border-slate-200 text-xs text-slate-600 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <div>
            <p className="text-slate-900 font-bold">RationSetu Public Distribution System Portal</p>
            <p className="text-[11px]">Designed & Developed for CSE Major Project • Dept. of Food & Public Distribution</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-[11px] font-semibold text-slate-600">
            <a href="https://nfsa.gov.in" target="_blank" rel="noreferrer" className="hover:text-slate-900">NFSA Portal</a>
            <span>•</span>
            <a href="https://dbtbharat.gov.in" target="_blank" rel="noreferrer" className="hover:text-slate-900">DBT Bharat</a>
            <span>•</span>
            <a href="https://digitalindia.gov.in" target="_blank" rel="noreferrer" className="hover:text-slate-900">Digital India</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
