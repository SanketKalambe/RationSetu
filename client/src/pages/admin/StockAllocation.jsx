import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { allocateStock } from '../../redux/slices/adminSlice';
import API from '../../services/api';
import { Boxes, CheckCircle2, AlertCircle, ShieldCheck, RefreshCw, Layers } from 'lucide-react';

const StockAllocation = () => {
  const dispatch = useDispatch();
  const [shops, setShops] = useState([]);
  const [selectedShopId, setSelectedShopId] = useState('');
  const [item, setItem] = useState('Rice');
  const [quantityKg, setQuantityKg] = useState('500');
  const [mode, setMode] = useState('set'); // 'set' (exact) or 'add'
  const [monthYear, setMonthYear] = useState(new Date().toISOString().slice(0, 7));
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadShops = async () => {
    try {
      const res = await API.get('/admin/distributors');
      if (res.data.distributors) {
        const activeShops = res.data.distributors
          .filter(d => d.shop)
          .map(d => ({
            ...d.shop,
            distributorName: d.name
          }));
        setShops(activeShops);
        if (activeShops.length > 0 && !selectedShopId) {
          setSelectedShopId(activeShops[0].id);
        }
      }
    } catch (e) {
      console.error('Failed to load shops:', e);
    }
  };

  useEffect(() => {
    loadShops();
  }, []);

  const selectedShop = shops.find(s => s.id === selectedShopId) || shops[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedShopId) return;

    setLoading(true);
    setMessage('');

    const res = await dispatch(allocateStock({
      shopId: selectedShopId,
      monthYear,
      item,
      quantityKg,
      mode
    }));

    setLoading(false);

    if (allocateStock.fulfilled.match(res)) {
      const modeText = mode === 'set' ? 'set to' : 'increased by';
      const unitText = item === 'Kerosene' ? 'L' : 'kg';
      setMessage(`Official stock for ${item} ${modeText} ${quantityKg} ${unitText} for ${selectedShop?.shopName}!`);
      // Reload shops to immediately reflect updated stock in UI
      await loadShops();
    } else {
      setMessage(res.payload || 'Allocation failed.');
    }
  };

  const getUnit = (itemName) => (itemName === 'Kerosene' ? 'L' : 'kg');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-extrabold text-slate-100 font-['Outfit']">District Stock Allocation</h1>
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
            DISTRICT FOOD AUTHORITY
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">
          Centrally allocate and manage official grain quotas for Fair Price Shops
        </p>
      </div>

      {message && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 text-xs flex items-center gap-2 animate-fade-in font-medium">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          {message}
        </div>
      )}

      {/* Target Shop Selection & Live Stock Preview */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-5">
        <div>
          <label className="text-xs font-bold text-slate-200 block mb-2 flex items-center justify-between">
            <span>Select Target Fair Price Shop</span>
            <span className="text-[11px] text-blue-400 font-normal">Active Licensees ({shops.length})</span>
          </label>
          <select
            value={selectedShopId}
            onChange={(e) => setSelectedShopId(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500 font-medium"
          >
            {shops.map((s) => (
              <option key={s.id} value={s.id}>
                {s.shopName} ({s.shopCode}) — Dealer: {s.distributorName}
              </option>
            ))}
          </select>
        </div>

        {/* Live Stock of Selected Shop */}
        {selectedShop && selectedShop.stock && (
          <div className="pt-2">
            <span className="text-xs font-semibold text-slate-400 block mb-2.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-teal-400" />
              Current Live Stock in {selectedShop.shopName}:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {selectedShop.stock.map((st) => (
                <div key={st.item} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
                  <span className="text-[11px] text-slate-400 block">{st.item}</span>
                  <p className="text-lg font-mono font-extrabold text-slate-100">
                    {st.quantityKg} <span className="text-xs text-blue-400 font-bold">{st.unit || 'kg'}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Stock Allocation Form */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-5">
        <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
          <Boxes className="w-4 h-4 text-blue-400" />
          Set / Allocate Commodity Quota
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Commodity Item</label>
              <select
                value={item}
                onChange={(e) => setItem(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
              >
                <option value="Rice">Rice (White Grain)</option>
                <option value="Wheat">Wheat (Whole Grain)</option>
                <option value="Sugar">Sugar (Refined)</option>
                <option value="Kerosene">Kerosene (L)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Quantity ({getUnit(item)})
              </label>
              <input
                type="number"
                required
                min="0"
                value={quantityKg}
                onChange={(e) => setQuantityKg(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500 font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Allocation Mode</label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500 font-semibold"
              >
                <option value="set">Set Exact Stock Level</option>
                <option value="add">Add to Buffer Stock (+)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Allocation Month</label>
            <input
              type="month"
              value={monthYear}
              onChange={(e) => setMonthYear(e.target.value)}
              className="w-full sm:w-1/3 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-xl shadow-blue-600/25 transition-all flex items-center justify-center gap-2"
          >
            <Boxes className="w-4 h-4" />
            {loading ? 'Dispatching & Updating Quota...' : 'Confirm & Set Official Stock'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StockAllocation;
