import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, ScanLine, Plus, Camera, Truck, Minus } from "lucide-react";
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

const Inventory = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"available" | "low">("available");
  const [search, setSearch] = useState("");
  const [items, setItems] = useState(initialItems);

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

  return (
    <div className="app-container bg-background px-6 pt-6 pb-28 min-h-screen">
      <button onClick={() => navigate(-1)} className="mb-4 text-foreground">
        <ArrowLeft className="w-6 h-6" />
      </button>

      <h1 className="text-2xl font-bold text-foreground mb-0.5">Inventory</h1>
      <p className="text-muted-foreground mb-5">Manage your fridge & pantry</p>

      {/* Quick delivery banner */}
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
        <button className="bg-primary text-primary-foreground px-5 py-2 rounded-xl font-semibold text-sm">
          Manage
        </button>
      </div>

      {/* Search */}
      <div className="bg-secondary rounded-2xl px-4 py-3 flex items-center gap-3 mb-4">
        <Search className="w-5 h-5 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search items..."
          className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 mb-3">
        <button className="flex-1 py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2">
          <ScanLine className="w-5 h-5" /> Scan Item
        </button>
        <button className="flex-1 py-3.5 rounded-2xl border border-border font-semibold text-foreground flex items-center justify-center gap-2">
          <Plus className="w-5 h-5" /> Add Item
        </button>
      </div>
      <button className="w-full py-3.5 rounded-2xl border border-primary text-primary font-semibold flex items-center justify-center gap-2 mb-5">
        <Camera className="w-5 h-5" /> Scan Bill to Auto-Update
      </button>

      {/* Tabs */}
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

      {/* Items */}
      <div className="space-y-3">
        {filtered.map((it) => (
          <div key={it.name} className="bg-secondary rounded-2xl px-4 py-4 flex items-center gap-4">
            <span className="text-3xl">{it.emoji}</span>
            <div className="flex-1">
              <p className="font-bold text-foreground">{it.name}</p>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-card text-muted-foreground border border-border">
                {it.category}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQty(it.name, -1)}
                className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center"
              >
                <Minus className="w-4 h-4 text-foreground" />
              </button>
              <div className="text-center w-10">
                <p className="font-bold text-foreground text-lg leading-tight">{it.qty}</p>
                <p className="text-xs text-muted-foreground">{it.unit}</p>
              </div>
              <button
                onClick={() => updateQty(it.name, 1)}
                className="w-9 h-9 rounded-full bg-primary flex items-center justify-center"
              >
                <Plus className="w-4 h-4 text-primary-foreground" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default Inventory;
