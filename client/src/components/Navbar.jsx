import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { 
  LogOut, 
  ShieldCheck, 
  User as UserIcon, 
  Package, 
  Sparkles,
  Menu,
  X,
  Globe2,
  ChevronDown,
  CheckCircle2,
  PhoneCall,
  LayoutDashboard,
  BookOpen,
  Calendar,
  MessageSquare,
  History,
  Terminal,
  Boxes,
  UserCheck,
  Sliders
} from 'lucide-react';
import StatusBadge from './StatusBadge';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeStr, setTimeStr] = useState('');
  const [activeLang, setActiveLang] = useState('English');
  const [isLangOpen, setIsLangOpen] = useState(false);

  // Close mobile drawer when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleDateString('en-IN', {
        weekday: 'short',
        day: '2-digit',
        month: 'short'
      }) + ' | ' + now.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit'
      }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setMobileMenuOpen(false);
    navigate('/login');
  };

  const getRoleLinks = () => {
    if (!user) return [];
    if (user.role === 'admin') {
      return [
        { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
        { to: '/admin/verification-queue', label: 'KYC Queue', icon: UserCheck },
        { to: '/admin/stock-allocation', label: 'Stock Allocation', icon: Boxes },
        { to: '/admin/complaints', label: 'Grievance Mgmt', icon: MessageSquare },
        { to: '/admin/settings', label: 'Settings', icon: Sliders }
      ];
    }
    if (user.role === 'distributor') {
      return [
        { to: '/distributor', label: 'Shop Dashboard', icon: LayoutDashboard },
        { to: '/distributor/epos', label: 'e-POS Terminal', icon: Terminal },
        { to: '/distributor/stock', label: 'Inventory Stock', icon: Boxes },
        { to: '/distributor/slots', label: 'Expected Bookings', icon: Calendar }
      ];
    }
    return [
      { to: '/consumer', label: 'Overview', icon: LayoutDashboard },
      { to: '/consumer/ration-book', label: 'Ration Book', icon: BookOpen },
      { to: '/consumer/slots', label: 'Slot Booking', icon: Calendar },
      { to: '/consumer/complaints', label: 'Complaints', icon: MessageSquare },
      { to: '/consumer/history', label: 'History', icon: History }
    ];
  };

  const navLinks = getRoleLinks();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      {/* Top Gov Announcement & Accessibility Ticker Bar (Deep Navy Civic Bar) */}
      <div className="bg-slate-900 text-slate-200 text-[11px] py-1 px-3 sm:px-4 font-medium border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-2">
          <div className="flex items-center gap-2 truncate">
            <span className="bg-amber-500 text-slate-950 font-extrabold text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider flex-shrink-0">
              GOVT NOTICE
            </span>
            <span className="text-slate-200 text-[10px] sm:text-[11px] truncate">
              NFSA Distribution Active • Toll Free Helpline: <strong className="text-amber-300 font-mono">1967</strong>
            </span>
          </div>

          <div className="flex items-center gap-3 text-[10px] text-slate-300 flex-shrink-0">
            <span className="font-mono text-amber-300 hidden md:inline">{timeStr}</span>
            
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1 hover:text-white transition-colors py-0.5 px-1.5 rounded hover:bg-slate-800 text-[10px]"
              >
                <Globe2 className="w-3 h-3 text-blue-400" />
                <span className="hidden sm:inline">{activeLang}</span>
                <ChevronDown className="w-2.5 h-2.5" />
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-1 w-32 bg-white text-slate-900 border border-slate-200 rounded-xl shadow-xl z-50 py-1 text-xs font-semibold">
                  {['English', 'हिंदी (Hindi)', 'मराठी (Marathi)', 'தமிழ் (Tamil)'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setActiveLang(lang.split(' ')[0]);
                        setIsLangOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center justify-between"
                    >
                      {lang}
                      {activeLang === lang.split(' ')[0] && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Brand Logo & Emblem */}
        <Link to="/" className="flex items-center gap-2.5 sm:gap-3.5 group">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-950 p-0.5 shadow-md group-hover:scale-105 transition-transform flex-shrink-0">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center border border-amber-400/40">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight font-['Outfit'] group-hover:text-blue-700 transition-colors">
                RationSetu
              </span>
              <span className="text-[9px] font-extrabold bg-blue-100 text-blue-900 px-1.5 py-0.5 rounded-full border border-blue-200 hidden xs:inline-block">
                e-POS v2.4
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] text-slate-600 font-semibold tracking-normal flex items-center gap-1">
              <span>सार्वजनिक वितरण प्रणाली</span>
              <span className="hidden sm:inline">• Dept. of Food</span>
            </span>
          </div>
        </Link>

        {/* Desktop User Navigation / Controls */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              {/* Role Badge Card */}
              <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs shadow-sm">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                  user.role === 'admin' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                  user.role === 'distributor' ? 'bg-purple-100 text-purple-900 border border-purple-300' :
                  'bg-blue-100 text-blue-900 border border-blue-300'
                }`}>
                  {user.role === 'admin' ? 'ADM' : user.role === 'distributor' ? 'FPS' : 'RCN'}
                </div>

                <div className="flex flex-col text-left">
                  <span className="text-slate-900 font-bold leading-tight">{user.name}</span>
                  <span className="text-[10px] text-slate-600 uppercase tracking-wider font-extrabold">
                    {user.role === 'admin' ? 'District Officer' : user.role === 'distributor' ? `FPS Licensee` : `Cardholder`}
                  </span>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-200 hover:border-rose-300 transition-all text-xs font-bold flex items-center gap-1.5"
                title="Sign out of government session"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
              >
                <UserIcon className="w-3.5 h-3.5 text-amber-300" />
                Sign In
              </Link>
              
              <Link
                to="/register/consumer"
                className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                New e-KYC
              </Link>
            </div>
          )}
        </div>

        {/* Mobile & Tablet Hamburger Toggle Button */}
        <div className="flex md:hidden items-center gap-2">
          {user && (
            <span className="text-[10px] font-extrabold bg-blue-100 text-blue-900 px-2 py-0.5 rounded-full uppercase">
              {user.role}
            </span>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-rose-600" /> : <Menu className="w-5 h-5 text-slate-800" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-4 shadow-xl animate-fade-in">
          {user ? (
            <div className="space-y-3">
              {/* User Info Card */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900">{user.name}</p>
                  <p className="text-[10px] text-slate-500 font-mono">{user.email || user.rationCardNo}</p>
                </div>
                <span className="text-[10px] font-extrabold uppercase bg-blue-600 text-white px-2 py-0.5 rounded-full">
                  {user.role}
                </span>
              </div>

              {/* Nav Links List */}
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block px-1">
                  Portal Navigation
                </span>
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.to;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        isActive 
                          ? 'bg-blue-900 text-white shadow-sm' 
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 flex items-center justify-center gap-2 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout Session</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link
                to="/login"
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <UserIcon className="w-4 h-4 text-amber-300" />
                Sign In to Citizen / Official Portal
              </Link>

              <Link
                to="/register/consumer"
                className="w-full py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                Register New Ration Card (e-KYC)
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
