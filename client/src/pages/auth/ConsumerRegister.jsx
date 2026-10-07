import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerConsumer } from '../../redux/slices/authSlice';
import FamilyMemberForm from '../../components/FamilyMemberForm';
import { CreditCard, Phone, AlertCircle, CheckCircle2, Sparkles, Info } from 'lucide-react';
import API from '../../services/api';

const ConsumerRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, registrationMessage } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    rationCardNo: '',
    headOfHouseholdName: '',
    address: '',
    assignedShopId: ''
  });

  const [familyMembers, setFamilyMembers] = useState([
    { name: '', relation: 'Self (Head)', dateOfBirth: '', aadhaarNumber: '' }
  ]);

  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpMessage, setOtpMessage] = useState('');
  const [generatedOtpCode, setGeneratedOtpCode] = useState('');

  const handleSendOtp = async () => {
    if (!formData.phone || formData.phone.length < 10) {
      setOtpMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    try {
      const res = await API.post('/auth/otp/send', { phone: formData.phone });
      setOtpSent(true);
      const code = res.data.otp || '123456';
      setGeneratedOtpCode(code);
      setOtpInput(code); // Pre-fill generated OTP for instant demo testing
      setOtpMessage(`Simulated OTP code [${code}] generated. Click 'Verify OTP' below.`);
    } catch (e) {
      setOtpMessage('Failed to send OTP.');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await API.post('/auth/otp/verify', { phone: formData.phone, otp: otpInput || generatedOtpCode || '123456' });
      if (res.data.success) {
        setOtpVerified(true);
        setOtpMessage('Mobile phone verified via OTP!');
      }
    } catch (e) {
      setOtpMessage(e.response?.data?.message || 'Invalid OTP.');
    }
  };

  const handleAutoFillOtp = () => {
    setOtpInput('123456');
    setOtpVerified(true);
    setOtpMessage('Mobile phone verified via Demo OTP (123456)!');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otpVerified) {
      setOtpMessage('Please complete Mobile OTP verification before proceeding.');
      return;
    }

    const payload = {
      ...formData,
      name: formData.headOfHouseholdName || formData.name,
      familyMembers
    };

    const result = await dispatch(registerConsumer(payload));
    if (registerConsumer.fulfilled.match(result)) {
      setTimeout(() => {
        navigate('/consumer');
      }, 1500);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 text-slate-900 font-sans">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-6 shadow-sm">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-900 mx-auto">
            <CreditCard className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 font-['Outfit']">Consumer Ration Card Registration</h2>
          <p className="text-xs text-slate-600">Onboard your Household Ration Card & Family Members</p>
        </div>

        {error && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2 font-semibold">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {registrationMessage && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2 font-semibold">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            {registrationMessage} Redirecting to Digital Ration Book...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">Ration Card Number</label>
              <input
                type="text"
                required
                placeholder="e.g. RC100200300"
                value={formData.rationCardNo}
                onChange={(e) => setFormData({ ...formData, rationCardNo: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-700 font-mono tracking-wider"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Validates against Mock PDS Registry</span>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">Head of Household Name</label>
              <input
                type="text"
                required
                placeholder="Ramesh Kumar"
                value={formData.headOfHouseholdName}
                onChange={(e) => setFormData({ ...formData, headOfHouseholdName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">Email Address (Optional)</label>
              <input
                type="email"
                placeholder="consumer@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-700"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">Account Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-700"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-800 block mb-1">Residential Address (As on Ration Card)</label>
            <input
              type="text"
              required
              placeholder="H.No. 45, Gali No. 3, North Block"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-700"
            />
          </div>

          {/* Repeatable Family Members */}
          <FamilyMemberForm
            familyMembers={familyMembers}
            onChange={setFamilyMembers}
          />

          {/* Mobile OTP Verification */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <label className="text-xs font-bold text-slate-900 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-blue-800" /> Mobile OTP Verification
              </span>
              {otpVerified && (
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                  VERIFIED ✓
                </span>
              )}
            </label>

            <div className="flex gap-2">
              <input
                type="text"
                required
                disabled={otpVerified}
                placeholder="10-digit mobile number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="flex-1 bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-700"
              />
              <button
                type="button"
                disabled={otpVerified}
                onClick={handleSendOtp}
                className="px-3.5 py-2 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs transition-all disabled:opacity-50"
              >
                Send OTP
              </button>
              <button
                type="button"
                disabled={otpVerified}
                onClick={handleAutoFillOtp}
                className="px-3 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 font-bold text-xs transition-all flex items-center gap-1"
                title="Bypass SMS gateway in prototype demo mode"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Auto-Verify Demo OTP (123456)
              </button>
            </div>

            {otpSent && !otpVerified && (
              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Enter OTP (e.g. 123456)"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  className="flex-1 bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-mono"
                />
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs"
                >
                  Verify OTP
                </button>
              </div>
            )}

            {otpMessage && (
              <p className="text-[11px] text-amber-800 font-semibold font-mono bg-amber-50 p-2 rounded-lg border border-amber-200">{otpMessage}</p>
            )}

            <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-200 text-[11px] text-slate-600 space-y-1">
              <span className="font-bold text-blue-900 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-blue-700" /> Prototype SMS Gateway Note:
              </span>
              <p>In local demo mode, real SMS delivery is simulated. Use the generated OTP or click <strong>'Auto-Verify Demo OTP (123456)'</strong> to verify instantly.</p>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-extrabold text-xs shadow-md transition-all"
          >
            {loading ? 'Submitting Registration...' : 'Register Consumer Ration Card'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConsumerRegister;
