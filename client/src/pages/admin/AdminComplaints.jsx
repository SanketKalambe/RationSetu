import React, { useEffect, useState, useRef } from 'react';
import API from '../../services/api';
import StatusBadge from '../../components/StatusBadge';
import { 
  MessageSquare, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  RefreshCw, 
  Search, 
  Clock, 
  Radio, 
  BellRing,
  Filter,
  Check,
  SendHorizontal,
  FileText,
  User,
  Building2
} from 'lucide-react';

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'open', 'in-progress', 'resolved'
  const [searchQuery, setSearchQuery] = useState('');
  const [actionNotesMap, setActionNotesMap] = useState({});
  const [submittingId, setSubmittingId] = useState(null);
  const [lastSyncTime, setLastSyncTime] = useState(new Date().toLocaleTimeString());
  const [realtimeNotification, setRealtimeNotification] = useState(null);

  const prevComplaintsCountRef = useRef(0);

  const fetchComplaints = async (showFullLoader = false) => {
    if (showFullLoader) setLoading(true);
    setRefreshing(true);
    try {
      const res = await API.get('/admin/complaints');
      const data = res.data.complaints || [];

      // Check if new complaint arrived in real time
      if (!showFullLoader && data.length > prevComplaintsCountRef.current && prevComplaintsCountRef.current > 0) {
        const newest = data[0];
        setRealtimeNotification({
          message: `New Grievance Filed: ${newest.subject} (Card: ${newest.consumerProfile?.rationCardNo || 'N/A'})`,
          time: new Date().toLocaleTimeString()
        });
      }

      setComplaints(data);
      prevComplaintsCountRef.current = data.length;
      setLastSyncTime(new Date().toLocaleTimeString());
    } catch (e) {
      console.error('Fetch complaints error:', e);
    } finally {
      if (showFullLoader) setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchComplaints(true);
  }, []);

  // Real-Time Multi-Channel Event Listener & Polling
  useEffect(() => {
    let bc;
    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        bc = new BroadcastChannel('rationsetu_realtime_events');
        bc.onmessage = (event) => {
          if (event.data?.type === 'COMPLAINT_FILED' || event.data?.type === 'COMPLAINT_STATUS_UPDATED') {
            fetchComplaints(false);
            if (event.data?.type === 'COMPLAINT_FILED' && event.data?.payload) {
              setRealtimeNotification({
                message: `New Real-Time Grievance: ${event.data.payload.subject}`,
                time: new Date().toLocaleTimeString()
              });
            }
          }
        };
      }
    } catch (e) {
      console.warn('BroadcastChannel notice:', e);
    }

    const handleStorage = (e) => {
      if (e.key === 'rationsetu_last_complaint_event' && e.newValue) {
        fetchComplaints(false);
      }
    };
    window.addEventListener('storage', handleStorage);

    // 3-second background polling heartbeat for guaranteed real-time sync across devices
    const timer = setInterval(() => {
      fetchComplaints(false);
    }, 3000);

    return () => {
      if (bc) bc.close();
      window.removeEventListener('storage', handleStorage);
      clearInterval(timer);
    };
  }, []);

  // Dismiss notification after 6 seconds
  useEffect(() => {
    if (realtimeNotification) {
      const t = setTimeout(() => setRealtimeNotification(null), 6000);
      return () => clearTimeout(t);
    }
  }, [realtimeNotification]);

  const handleUpdateStatus = async (id, status) => {
    setSubmittingId(id);
    try {
      const notes = actionNotesMap[id] || '';
      await API.patch(`/admin/complaints/${id}`, { status, adminNotes: notes });
      
      // Clear notes for this card
      setActionNotesMap(prev => ({ ...prev, [id]: '' }));
      
      // Broadcast update
      try {
        if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
          const bc = new BroadcastChannel('rationsetu_realtime_events');
          bc.postMessage({ type: 'COMPLAINT_STATUS_UPDATED', id, status, timestamp: Date.now() });
        }
      } catch (err) {}

      await fetchComplaints(false);
    } catch (e) {
      console.error('Update complaint status error:', e);
    } finally {
      setSubmittingId(null);
    }
  };

  // Filter & Search logic
  const filteredComplaints = complaints.filter(c => {
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const consumerName = (c.consumerProfile?.headOfHouseholdName || c.consumerProfile?.user?.name || '').toLowerCase();
    const cardNo = (c.consumerProfile?.rationCardNo || '').toLowerCase();
    const subject = (c.subject || '').toLowerCase();
    const category = (c.suggestedCategory || '').toLowerCase();
    const matchesSearch = !q || consumerName.includes(q) || cardNo.includes(q) || subject.includes(q) || category.includes(q);
    return matchesStatus && matchesSearch;
  });

  const openCount = complaints.filter(c => c.status === 'open').length;
  const inProgressCount = complaints.filter(c => c.status === 'in-progress').length;
  const resolvedCount = complaints.filter(c => c.status === 'resolved').length;

  return (
    <div className="space-y-6">
      {/* Real-time Alert Toast */}
      {realtimeNotification && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-600/30 via-red-600/20 to-rose-600/30 border border-rose-500/50 text-rose-300 text-xs flex items-center justify-between shadow-xl shadow-rose-500/10 animate-fade-in">
          <div className="flex items-center gap-2.5 font-bold">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
            <BellRing className="w-4 h-4 text-rose-400" />
            <span>{realtimeNotification.message}</span>
          </div>
          <span className="text-[10px] text-rose-400/80 font-mono">{realtimeNotification.time}</span>
        </div>
      )}

      {/* Main Header */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-extrabold text-slate-100 font-['Outfit']">Grievance & Complaint Management</h1>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE REAL-TIME FEED</span>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Review consumer grievances, inspect auto-categorization, and resolve issues in real time
          </p>
        </div>

        {/* Sync Controls */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
            Last synced: <span className="text-slate-200 font-bold">{lastSyncTime}</span>
          </span>

          <button
            onClick={() => fetchComplaints(false)}
            disabled={refreshing}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700 transition-all shadow-md"
            title="Refresh complaints manually"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-blue-400 ${refreshing ? 'animate-spin' : ''}`} />
            <span>{refreshing ? 'Syncing...' : 'Sync Now'}</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div 
          onClick={() => setStatusFilter('all')}
          className={`glass-panel p-4 rounded-2xl border cursor-pointer transition-all space-y-1 ${
            statusFilter === 'all' ? 'border-blue-500/50 bg-blue-500/10' : 'border-slate-800 hover:border-slate-700'
          }`}
        >
          <span className="text-[11px] font-semibold text-slate-400">Total Grievances</span>
          <p className="text-xl font-extrabold text-slate-100">{complaints.length}</p>
        </div>

        <div 
          onClick={() => setStatusFilter('open')}
          className={`glass-panel p-4 rounded-2xl border cursor-pointer transition-all space-y-1 ${
            statusFilter === 'open' ? 'border-rose-500/50 bg-rose-500/10' : 'border-slate-800 hover:border-slate-700'
          }`}
        >
          <span className="text-[11px] font-semibold text-slate-400">Open / Pending</span>
          <p className="text-xl font-extrabold text-rose-400">{openCount}</p>
        </div>

        <div 
          onClick={() => setStatusFilter('in-progress')}
          className={`glass-panel p-4 rounded-2xl border cursor-pointer transition-all space-y-1 ${
            statusFilter === 'in-progress' ? 'border-amber-500/50 bg-amber-500/10' : 'border-slate-800 hover:border-slate-700'
          }`}
        >
          <span className="text-[11px] font-semibold text-slate-400">Under Investigation</span>
          <p className="text-xl font-extrabold text-amber-400">{inProgressCount}</p>
        </div>

        <div 
          onClick={() => setStatusFilter('resolved')}
          className={`glass-panel p-4 rounded-2xl border cursor-pointer transition-all space-y-1 ${
            statusFilter === 'resolved' ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-slate-800 hover:border-slate-700'
          }`}
        >
          <span className="text-[11px] font-semibold text-slate-400">Resolved</span>
          <p className="text-xl font-extrabold text-emerald-400">{resolvedCount}</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-3 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto text-xs font-semibold overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              statusFilter === 'all'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            All ({complaints.length})
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('open')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              statusFilter === 'open'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Open ({openCount})
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('in-progress')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              statusFilter === 'in-progress'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            In-Progress ({inProgressCount})
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('resolved')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              statusFilter === 'resolved'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Resolved ({resolvedCount})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search consumer, card no, keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Main Complaints List */}
      {loading ? (
        <div className="text-center py-16 text-slate-400 text-xs animate-pulse space-y-2">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p>Syncing grievance queue from central database...</p>
        </div>
      ) : filteredComplaints.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl text-center space-y-3 border border-slate-800">
          <MessageSquare className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-300">No Grievances Found</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            {complaints.length === 0
              ? 'No consumer complaints are currently registered in the database.'
              : 'No complaints match your current status filter or search query.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredComplaints.map((c) => {
            const isSubmitting = submittingId === c._id;
            const currentNotes = actionNotesMap[c._id] || '';

            return (
              <div 
                key={c._id} 
                className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 hover:border-slate-700/80 transition-all shadow-md"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-3 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-100">{c.subject}</h3>
                      <StatusBadge status={c.status} />
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 pt-1">
                      <span className="flex items-center gap-1 text-slate-300">
                        <User className="w-3.5 h-3.5 text-blue-400" />
                        {c.consumerProfile?.headOfHouseholdName || c.consumerProfile?.user?.name || 'Consumer'}
                      </span>
                      <span>•</span>
                      <span className="font-mono text-blue-300 font-semibold">
                        Card: {c.consumerProfile?.rationCardNo || 'N/A'}
                      </span>
                      {c.shop && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-slate-400">
                            <Building2 className="w-3.5 h-3.5 text-slate-500" />
                            {c.shop.shopName || c.shop.shopCode}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-slate-400">
                    {new Date(c.createdAt).toLocaleDateString()} {new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                {/* Complaint Body */}
                <div className="p-3.5 bg-slate-900/70 rounded-2xl border border-slate-800/80 text-xs text-slate-200 space-y-2">
                  <p className="leading-relaxed whitespace-pre-wrap">"{c.description}"</p>

                  {c.mediaUrls && c.mediaUrls.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
                      {c.mediaUrls.map((url, i) => (
                        <a key={i} href={url} target="_blank" rel="noopener noreferrer">
                          <img 
                            src={url} 
                            alt="Evidence Attachment" 
                            className="w-16 h-16 object-cover rounded-xl border border-slate-700 hover:scale-105 transition-all" 
                          />
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                {/* AI / Automated Categorization Box */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-blue-500/5 p-3.5 rounded-2xl border border-blue-500/20">
                  <div>
                    <span className="text-blue-400 font-bold block mb-1">Auto-Suggested Category:</span>
                    <span className="text-slate-200 font-semibold">{c.suggestedCategory || 'General PDS Issue'}</span>
                  </div>
                  <div>
                    <span className="text-blue-400 font-bold block mb-1">Recommended Resolution:</span>
                    <span className="text-slate-300">{c.suggestedResolution || 'Investigate fair price shop logs and verify quota distribution.'}</span>
                  </div>
                </div>

                {/* Existing Admin Notes if any */}
                {c.adminNotes && (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-300">
                    <span className="font-bold block mb-0.5">Official Inspector Notes:</span>
                    <p className="text-slate-300">{c.adminNotes}</p>
                  </div>
                )}

                {/* Action Strip */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <input
                    type="text"
                    placeholder="Enter official resolution notes / inspector action..."
                    value={currentNotes}
                    onChange={(e) => {
                      const val = e.target.value;
                      setActionNotesMap(prev => ({ ...prev, [c._id]: val }));
                    }}
                    className="w-full sm:flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {c.status !== 'in-progress' && (
                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => handleUpdateStatus(c._id, 'in-progress')}
                        className="flex-1 sm:flex-initial px-3.5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition-all shadow-md"
                      >
                        {isSubmitting ? 'Updating...' : 'Mark In-Progress'}
                      </button>
                    )}

                    {c.status !== 'resolved' ? (
                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => handleUpdateStatus(c._id, 'resolved')}
                        className="flex-1 sm:flex-initial px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{isSubmitting ? 'Resolving...' : 'Resolve Grievance'}</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => handleUpdateStatus(c._id, 'open')}
                        className="flex-1 sm:flex-initial px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-all border border-slate-700"
                      >
                        Re-open
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminComplaints;
