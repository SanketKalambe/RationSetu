import React, { useEffect, useState, useRef } from 'react';
import API from '../../services/api';
import StatusBadge from '../../components/StatusBadge';
import { 
  Calendar, 
  Clock, 
  Phone, 
  User, 
  RefreshCw, 
  Radio, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  CreditCard, 
  Sparkles,
  SlidersHorizontal,
  BellRing
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DistributorSlots = () => {
  const navigate = useNavigate();
  const todayStr = new Date().toISOString().slice(0, 10);
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().slice(0, 10);

  const [date, setDate] = useState(todayStr);
  const [filterMode, setFilterMode] = useState('today'); // 'today', 'tomorrow', 'all', 'custom'
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(new Date().toLocaleTimeString());
  const [realtimeNotification, setRealtimeNotification] = useState(null);

  const prevBookingsCountRef = useRef(0);

  const fetchBookings = async (showFullLoader = false) => {
    if (showFullLoader) setLoading(true);
    setRefreshing(true);
    try {
      const res = await API.get(`/distributor/slots?date=${date}`);
      const newBookings = res.data.bookings || [];
      
      // Check if new booking arrived while on the screen
      if (!showFullLoader && newBookings.length > prevBookingsCountRef.current && prevBookingsCountRef.current > 0) {
        const latest = newBookings[newBookings.length - 1];
        setRealtimeNotification({
          message: `Live Booking Alert: ${latest.consumerName || 'Beneficiary'} scheduled ${latest.timeSlot} (${latest.rationCardNo})`,
          time: new Date().toLocaleTimeString()
        });
      }

      setBookings(newBookings);
      prevBookingsCountRef.current = newBookings.length;
      setLastSyncTime(new Date().toLocaleTimeString());
    } catch (e) {
      console.error('Distributor slot fetch error:', e);
    } finally {
      if (showFullLoader) setLoading(false);
      setRefreshing(false);
    }
  };

  // Date filter change handler
  const handleFilterChange = (mode) => {
    setFilterMode(mode);
    if (mode === 'today') setDate(todayStr);
    else if (mode === 'tomorrow') setDate(tomorrowStr);
    else if (mode === 'all') setDate('all');
  };

  // Initial load and filter change
  useEffect(() => {
    fetchBookings(true);
  }, [date]);

  // Real-Time Multi-Channel Synchronization Engine
  useEffect(() => {
    let bc;
    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        bc = new BroadcastChannel('rationsetu_realtime_events');
        bc.onmessage = (event) => {
          if (event.data?.type === 'SLOT_BOOKED' || event.data?.type === 'SLOT_CANCELLED') {
            fetchBookings(false);
            if (event.data.type === 'SLOT_BOOKED' && event.data.payload) {
              setRealtimeNotification({
                message: `Real-Time Booking: ${event.data.payload.timeSlot} on ${event.data.payload.date} booked by cardholder!`,
                time: new Date().toLocaleTimeString()
              });
            }
          }
        };
      }
    } catch (e) {
      console.warn('BroadcastChannel initialization notice:', e);
    }

    // Cross-tab storage event listener
    const handleStorage = (e) => {
      if (e.key === 'rationsetu_last_booking_event' && e.newValue) {
        fetchBookings(false);
      }
    };
    window.addEventListener('storage', handleStorage);

    // 3-second background polling heartbeat for guaranteed real-time updates across devices/networks
    const pollTimer = setInterval(() => {
      fetchBookings(false);
    }, 3000);

    return () => {
      if (bc) bc.close();
      window.removeEventListener('storage', handleStorage);
      clearInterval(pollTimer);
    };
  }, [date]);

  // Dismiss notification after 6 seconds
  useEffect(() => {
    if (realtimeNotification) {
      const timer = setTimeout(() => setRealtimeNotification(null), 6000);
      return () => clearTimeout(timer);
    }
  }, [realtimeNotification]);

  return (
    <div className="space-y-6">
      {/* Real-time Toast Banner */}
      {realtimeNotification && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600/30 via-teal-600/20 to-emerald-600/30 border border-emerald-500/50 text-emerald-300 text-xs flex items-center justify-between shadow-xl shadow-emerald-500/10 animate-fade-in">
          <div className="flex items-center gap-2.5 font-bold">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <BellRing className="w-4 h-4 text-emerald-400" />
            <span>{realtimeNotification.message}</span>
          </div>
          <span className="text-[10px] text-emerald-400/80 font-mono">{realtimeNotification.time}</span>
        </div>
      )}

      {/* Main Header & Real-time Live Badge */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-extrabold text-slate-100 font-['Outfit']">Expected Slot Bookings</h1>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE REAL-TIME SYNC</span>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Real-time feed of consumer appointments. Auto-syncs within seconds as consumers book slots.
          </p>
        </div>

        {/* Sync Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
            Last synced: <span className="text-slate-200 font-bold">{lastSyncTime}</span>
          </span>

          <button
            onClick={() => fetchBookings(false)}
            disabled={refreshing}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700 transition-all shadow-md"
            title="Refresh bookings manually"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-blue-400 ${refreshing ? 'animate-spin' : ''}`} />
            <span>{refreshing ? 'Syncing...' : 'Sync Now'}</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Quick Date Selectors */}
      <div className="glass-panel p-3 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => handleFilterChange('today')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filterMode === 'today'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Today ({todayStr})
          </button>
          
          <button
            type="button"
            onClick={() => handleFilterChange('tomorrow')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filterMode === 'tomorrow'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Tomorrow
          </button>

          <button
            type="button"
            onClick={() => handleFilterChange('all')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filterMode === 'all'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            All Upcoming
          </button>
        </div>

        {/* Custom Date Picker */}
        <div className="flex items-center gap-2 text-xs">
          <label className="text-slate-400 font-semibold flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" /> Specific Date:
          </label>
          <input
            type="date"
            value={date === 'all' ? todayStr : date}
            onChange={(e) => {
              setFilterMode('custom');
              setDate(e.target.value);
            }}
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400">Total Booked Appointments</span>
          <p className="text-xl font-extrabold text-slate-100">{bookings.length} Consumers</p>
        </div>
        
        <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400">Filter Scope</span>
          <p className="text-xl font-extrabold text-blue-400">
            {filterMode === 'today' ? 'Today Only' : filterMode === 'tomorrow' ? 'Tomorrow Only' : filterMode === 'all' ? 'All Upcoming' : date}
          </p>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400">Real-time Connection</span>
          <p className="text-xl font-extrabold text-emerald-400 flex items-center gap-1.5">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" /> Active Polling & Events
          </p>
        </div>
      </div>

      {/* Bookings Display Grid */}
      {loading ? (
        <div className="text-center py-16 text-slate-400 text-xs animate-pulse space-y-2">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p>Syncing scheduled slot bookings from database...</p>
        </div>
      ) : bookings.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl text-center space-y-3 border border-slate-800">
          <Calendar className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-300">No Appointments Scheduled for this Date</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            When a beneficiary books a distribution slot on their consumer portal, it will immediately appear here in real time.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookings.map((b) => (
            <div 
              key={b.bookingId} 
              className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-slate-700 transition-all shadow-md group relative overflow-hidden"
            >
              {/* Card Header: Slot Time & Status */}
              <div className="flex justify-between items-center pb-2.5 border-b border-slate-800/80">
                <span className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-400" /> {b.timeSlot}
                </span>
                <StatusBadge status={b.status} />
              </div>

              {/* Consumer Info */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Consumer:</span>
                  <span className="font-bold text-slate-200">{b.consumerName}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Ration Card:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-blue-300 font-bold">{b.rationCardNo}</span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      {b.cardType || 'BPL'}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Appointment Date:</span>
                  <span className="font-semibold text-slate-300">{b.date}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Booking Ref:</span>
                  <span className="font-mono text-[11px] text-slate-400">{b.bookingReference}</span>
                </div>
              </div>

              {/* Quick e-POS Link Action */}
              <div className="pt-2 border-t border-slate-800/60">
                <button
                  type="button"
                  onClick={() => navigate('/distributor/epos')}
                  className="w-full py-2 rounded-xl bg-slate-900 group-hover:bg-blue-600 text-slate-300 group-hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 border border-slate-700/60 group-hover:border-blue-500"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Verify in e-POS Terminal</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DistributorSlots;
