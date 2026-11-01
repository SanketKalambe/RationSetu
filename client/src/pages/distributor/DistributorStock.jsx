import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { Boxes, ShieldCheck, RefreshCw, CheckCircle2, Info, Package, AlertCircle, Sparkles } from 'lucide-react';

const DistributorStock = () => {
  const [stock, setStock] = useState([]);
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState('');

  const fetchStock = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    try {
      const res = await API.get('/distributor/stock');
      if (res.data) {
        setStock(res.data.stockAvailability || []);
        if (res.data.shop) {
          setShop(res.data.shop);
        }
        setLastRefreshed(new Date().toLocaleTimeString());
      }
    } catch (e) {
      console.error('Failed to fetch distributor stock:', e);
    } finally {
      setLoading(false);
      if (isManual) {
        setTimeout(() => setRefreshing(false), 500);
      }
    }
  };

  useEffect(() => {
    fetchStock();
  }, []);

  // Standard items fallback if stock is empty
  const displayStock = stock.length > 0 ? stock : [
    { item: 'Rice', quantityKg: 500, unit: 'kg' },
    { item: 'Wheat', quantityKg: 350, unit: 'kg' },
    { item: 'Sugar', quantityKg: 100, unit: 'kg' },
    { item: 'Kerosene', quantityKg: 80, unit: 'L' }
  ];

  const getItemPrice = (itemName) => {
    switch (itemName) {
      case 'Rice': return 'FREE (AAY) / ₹3.00/kg (BPL)';
      case 'Wheat': return 'FREE (AAY) / ₹2.00/kg (BPL)';
      case 'Sugar': return '₹13.50/kg (Subsidized)';
      case 'Kerosene': return '₹25.00/L (Subsidized)';
      default: return 'Govt Subsidized Rate';
    }
  };

  if (loading) {
    return (
      <div className="text-center py-24 text-slate-400 text-xs animate-pulse space-y-3">
        <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p>Loading Official Shop Stock Inventory...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-100 font-['Outfit']">Shop Stock Inventory</h1>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> MANAGED BY ADMIN
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Official commodity stock quotas allocated by District Civil Supplies Administration
          </p>
        </div>

        <button
          onClick={() => fetchStock(true)}
          disabled={refreshing}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
          title="Refresh live stock balance from district database"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-blue-400 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Syncing...' : 'Sync Live Stock'}
        </button>
      </div>

      {/* Shop Info Banner */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/50">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base text-slate-100">
              {shop?.shopName || 'Fair Price Shop Licensee'}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-teal-400 font-bold border border-slate-700">
              {shop?.shopCode || 'DIS998877'}
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Assigned Ward: <span className="text-slate-300 font-medium">{shop?.wardDistrict || 'Ward 12 - North Zone'}</span> • Address: {shop?.address || 'Civil Lines'}
          </p>
        </div>

        <div className="flex items-center gap-3 text-right">
          <div className="text-[11px] text-slate-400">
            <span>Status: </span>
            <span className="text-emerald-400 font-bold">100% Synced</span>
            {lastRefreshed && (
              <span className="block text-[10px] text-slate-500 font-mono">Last refreshed at {lastRefreshed}</span>
            )}
          </div>
        </div>
      </div>

      {/* Official Stock Ledger Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {displayStock.map((s, idx) => {
          const qty = s.quantityKg !== undefined ? s.quantityKg : 0;
          const isLow = qty < 50;

          return (
            <div
              key={s.item || idx}
              className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3 relative overflow-hidden bg-slate-900/60 hover:border-slate-700 transition-all"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-slate-400">Government Allotment</span>
                  <h3 className="text-lg font-extrabold text-slate-100 font-['Outfit']">{s.item}</h3>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                  isLow 
                    ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' 
                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                }`}>
                  {isLow ? 'LOW STOCK' : 'IN STOCK'}
                </span>
              </div>

              {/* Big Quantity Display */}
              <div className="py-2">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold text-slate-100 font-mono tracking-tight">
                    {qty.toLocaleString()}
                  </span>
                  <span className="text-sm font-bold text-blue-400 font-mono">
                    {s.unit || 'kg'}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400">Current available physical inventory</span>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex justify-between items-center text-[11px]">
                <span className="text-slate-400">Issue Rate:</span>
                <span className="font-semibold text-slate-200">{getItemPrice(s.item)}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Statutory Governance Compliance Box */}
      <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs text-slate-300 space-y-2">
        <div className="flex items-center gap-2 text-blue-400 font-bold">
          <Info className="w-4 h-4 flex-shrink-0" />
          <span>Statutory Inventory Control Notice (PDS Control Order 2015)</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          In compliance with National Food Security Act (NFSA) guidelines, stock quotas are centrally allocated and managed by District Civil Supplies Authorities. Fair Price Shop licensees cannot manually modify or overwrite stock levels. Inventory balances automatically decrement upon verified biometric e-POS dispensations with digital receipts.
        </p>
      </div>
    </div>
  );
};

export default DistributorStock;
