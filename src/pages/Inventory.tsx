import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, ScanLine, Plus, Camera, Truck, Minus, X } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const initialItems = [
  { emoji: "🍅", name: "Tomatoes", category: "Vegetables", qty: 8, unit: "pcs", low: false },
  { emoji: "🧅", name: "Onions", category: "Vegetables", qty: 5, unit: "pcs", low: false },
  { emoji: "🍚", name: "Rice", category: "Staples", qty: 2, unit: "kg", low: false },
  { emoji: "🍝", name: "Pasta", category: "Staples", qty: 3, unit: "pcs", low: false },
  { emoji: "🥛", name: "Milk", category: "Dairy", qty: 1, unit: "L", low: true },
  { emoji: "🧈", name: "Butter", category: "Dairy", qty: 1, unit: "pcs", low: true },
  { emoji: "🥚", name: "Eggs", category: "Dairy", qty: 4, unit: "pcs", low: true },
];

const billItems = [
  { emoji: "🍎", name: "Apples", category: "Fruits", qty: 6, unit: "pcs", low: false },
  { emoji: "🥕", name: "Carrots", category: "Vegetables", qty: 4, unit: "pcs", low: false },
  { emoji: "🧀", name: "Cheese", category: "Dairy", qty: 1, unit: "pcs", low: false },
];

const Inventory = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"available" | "low">("available");
  const [search, setSearch] = useState("");
  const [items, setItems] = useState(initialItems);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showScanModal, setShowScanModal] = useState(false);
  const [showBillModal, setShowBillModal] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", category: "Other", qty: 1, unit: "pcs" });

  const filtered = items.filter((it) => {
    const matchTab = tab === "available" ? !it.low : it.low;
    const matchSearch = it.name.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const updateQty = (name: string, delta: number) => {
    setItems((prev) =>
      prev.map((it) => (it.name === name ? { ...it, qty: Math.max(0, it.qty + delta) } : it))
    );
  };

  const addItem = () => {
    if (!newItem.name.trim()) return;
    setItems((prev) => [...prev, { emoji: "📦", name: newItem.name, category: newItem.category, qty: newItem.qty, unit: newItem.unit, low: false }]);
    setNewItem({ name: "", category: "Other", qty: 1, unit: "pcs" });
    setShowAddModal(false);
  };

  const scanBill = () => {
    setItems((prev) => {
      const existing = new Set(prev.map((i) => i.name));
      const toAdd = billItems.filter((b) => !existing.has(b.name));
      return [...prev, ...toAdd];
    });
    setShowBillModal(false);
  };

  return (
    <div className="app-container bg-background px-6 pt-6 pb-28 min-h-screen">
      <button onClick={() => navigate(-1)} className="mb-4 text-foreground">
        <ArrowLeft className="w-6 h-6" />
      </button>

      <h1 className="text-2xl font-bold text-foreground mb-0.5">Inventory</h1>
      <p className="text-muted-foreground mb-5">Manage your fridge & pantry</p>

      <div className="bg-secondary rounded-2xl px-5 py-4 flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center">
            <Truck className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <p className="font-bold text-foreground">Quick Delivery</p>
            <p className="text-xs text-muted-foreground">1 app(s) connected</p>
          </div>
        </div>
        <button className="bg-primary text-primary-foreground px-5 py-2 rounded-xl font-semibold text-sm">Manage</button>
      </div>

      <div className="bg-secondary rounded-2xl px-4 py-3 flex items-center gap-3 mb-4">
        <Search className="w-5 h-5 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search items..."
          className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
        />
      </div>

      <div className="flex gap-3 mb-3">
        <button
          onClick={() => setShowScanModal(true)}
          className="flex-1 py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2"
        >
          <ScanLine className="w-5 h-5" /> Scan Item
        </button>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex-1 py-3.5 rounded-2xl border border-border font-semibold text-foreground flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" /> Add Item
        </button>
      </div>
      <button
        onClick={() => setShowBillModal(true)}
        className="w-full py-3.5 rounded-2xl border border-primary text-primary font-semibold flex items-center justify-center gap-2 mb-5"
      >
        <Camera className="w-5 h-5" /> Scan Bill to Auto-Update
      </button>

      <div className="flex bg-secondary rounded-2xl p-1 mb-5">
        <button
          onClick={() => setTab("available")}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            tab === "available" ? "bg-primary text-primary-foreground" : "text-foreground"
          }`}
        >
          Available
        </button>
        <button
          onClick={() => setTab("low")}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            tab === "low" ? "bg-primary text-primary-foreground" : "text-foreground"
          }`}
        >
          Running Low
        </button>
      </div>

      <div className="space-y-3">
        {filtered.map((it) => (
          <div key={it.name} className="bg-secondary rounded-2xl px-4 py-4 flex items-center gap-4">
            <span className="text-3xl">{it.emoji}</span>
            <div className="flex-1">
              <p className="font-bold text-foreground">{it.name}</p>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-card text-muted-foreground border border-border">{it.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => updateQty(it.name, -1)} className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center">
                <Minus className="w-4 h-4 text-foreground" />
              </button>
              <div className="text-center w-10">
                <p className="font-bold text-foreground text-lg leading-tight">{it.qty}</p>
                <p className="text-xs text-muted-foreground">{it.unit}</p>
              </div>
              <button onClick={() => updateQty(it.name, 1)} className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                <Plus className="w-4 h-4 text-primary-foreground" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center" onClick={() => setShowAddModal(false)}>
          <div className="bg-card w-full max-w-md rounded-t-3xl p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-foreground">Add New Item</h3>
              <button onClick={() => setShowAddModal(false)}><X className="w-5 h-5 text-muted-foreground" /></button>
            </div>
            <input
              placeholder="Item name..."
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl bg-secondary text-foreground placeholder:text-muted-foreground mb-3 outline-none"
            />
            <div className="flex gap-3 mb-4">
              <input
                type="number"
                min={1}
                value={newItem.qty}
                onChange={(e) => setNewItem({ ...newItem, qty: Number(e.target.value) })}
                className="w-20 px-4 py-3 rounded-2xl bg-secondary text-foreground outline-none"
              />
              <select
                value={newItem.unit}
                onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                className="flex-1 px-4 py-3 rounded-2xl bg-secondary text-foreground outline-none"
              >
                <option>pcs</option><option>kg</option><option>L</option><option>g</option>
              </select>
            </div>
            <button onClick={addItem} className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold">
              Add to Inventory
            </button>
          </div>
        </div>
      )}

      {/* Scan Item Modal */}
      {showScanModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={() => setShowScanModal(false)}>
          <div className="bg-card w-80 rounded-3xl p-6 text-center" onClick={(e) => e.stopPropagation()}>
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <ScanLine className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Scan Barcode</h3>
            <p className="text-sm text-muted-foreground mb-4">Point your camera at the item's barcode to add it automatically</p>
            <p className="text-xs text-muted-foreground mb-4">📷 Camera access required</p>
            <button onClick={() => setShowScanModal(false)} className="w-full py-3 rounded-2xl bg-primary text-primary-foreground font-semibold">
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Scan Bill Modal */}
      {showBillModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center" onClick={() => setShowBillModal(false)}>
          <div className="bg-card w-full max-w-md rounded-t-3xl p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-foreground">Scan Bill</h3>
              <button onClick={() => setShowBillModal(false)}><X className="w-5 h-5 text-muted-foreground" /></button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">We detected these items from your grocery bill:</p>
            <div className="space-y-2 mb-4">
              {billItems.map((b) => (
                <div key={b.name} className="flex items-center gap-3 bg-secondary rounded-xl px-4 py-3">
                  <span className="text-xl">{b.emoji}</span>
                  <span className="flex-1 font-medium text-foreground">{b.name}</span>
                  <span className="text-sm text-muted-foreground">{b.qty} {b.unit}</span>
                </div>
              ))}
            </div>
            <button onClick={scanBill} className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold">
              Add All to Inventory
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default Inventory;
