import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CalendarDays, ChevronLeft, ChevronRight, ChevronUp, Flame, RefreshCw, X } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const mealAlternatives: Record<string, string[]> = {
  "Avocado Toast": ["Smoothie Bowl", "Oatmeal", "Eggs Benedict", "Pancakes"],
  "Caesar Salad": ["Grilled Chicken Wrap", "Quinoa Bowl", "Poke Bowl", "Falafel Plate"],
  "Thai Green Curry": ["Butter Chicken", "Pasta Primavera", "Stir-Fry Noodles", "Grilled Salmon"],
  "Oatmeal Bowl": ["French Toast", "Yogurt Parfait", "Scrambled Eggs"],
  "Smoothie": ["Acai Bowl", "Granola Bowl", "Fruit Salad"],
  "Eggs Benedict": ["Avocado Toast", "Pancakes", "Waffles"],
  "French Toast": ["Omelette", "Croissant", "Cereal Bowl"],
  "Smoothie Bowl": ["Chia Pudding", "Overnight Oats", "Fruit Bowl"],
  "Pancakes": ["Waffles", "Crepes", "French Toast"],
};

const initialWeekDays = [
  {
    day: "Mon", date: 18, calories: 1280, total: 2000,
    meals: [
      { type: "breakfast", icon: "☀️", label: "Breakfast", name: "Avocado Toast", cal: 320 },
      { type: "lunch", icon: "🌤️", label: "Lunch", name: "Caesar Salad", cal: 380 },
      { type: "dinner", icon: "🌙", label: "Dinner", name: "Thai Green Curry", cal: 580 },
    ],
  },
  { day: "Tue", date: 19, calories: 1350, total: 2000, meals: [{ type: "breakfast", icon: "☀️", label: "Breakfast", name: "Oatmeal Bowl", cal: 290 }] },
  { day: "Wed", date: 20, calories: 1500, total: 2000, meals: [{ type: "breakfast", icon: "☀️", label: "Breakfast", name: "Smoothie", cal: 220 }] },
  { day: "Thu", date: 21, calories: 1200, total: 2000, meals: [{ type: "breakfast", icon: "☀️", label: "Breakfast", name: "Eggs Benedict", cal: 450 }] },
  { day: "Fri", date: 22, calories: 1100, total: 2000, meals: [{ type: "breakfast", icon: "☀️", label: "Breakfast", name: "French Toast", cal: 380 }] },
  { day: "Sat", date: 23, calories: 1140, total: 2000, meals: [{ type: "breakfast", icon: "☀️", label: "Breakfast", name: "Smoothie Bowl", cal: 310 }] },
  { day: "Sun", date: 24, calories: 1400, total: 2000, meals: [{ type: "breakfast", icon: "☀️", label: "Breakfast", name: "Pancakes", cal: 420 }] },
];

const MealPlan = () => {
  const navigate = useNavigate();
  const [expandedDay, setExpandedDay] = useState(0);
  const [weekDays, setWeekDays] = useState(initialWeekDays);
  const [swapModal, setSwapModal] = useState<{ dayIdx: number; mealIdx: number } | null>(null);

  const swapMeal = (dayIdx: number, mealIdx: number, newName: string) => {
    setWeekDays((prev) =>
      prev.map((d, di) =>
        di === dayIdx
          ? { ...d, meals: d.meals.map((m, mi) => (mi === mealIdx ? { ...m, name: newName } : m)) }
          : d
      )
    );
    setSwapModal(null);
  };

  const currentMealName = swapModal ? weekDays[swapModal.dayIdx].meals[swapModal.mealIdx].name : "";
  const alternatives = mealAlternatives[currentMealName] || ["Grilled Chicken", "Salad Bowl", "Veggie Wrap"];

  return (
    <div className="app-container bg-background px-6 pt-6 pb-28 min-h-screen">
      <div className="flex items-center justify-between mb-1">
        <button onClick={() => navigate(-1)} className="text-foreground">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <CalendarDays className="w-6 h-6 text-primary" />
      </div>

      <h1 className="text-2xl font-bold text-foreground mb-0.5">Weekly Meal Plan</h1>
      <p className="text-muted-foreground mb-5">Nov 18 - Nov 24, 2024</p>

      <div className="bg-secondary rounded-2xl px-5 py-3.5 flex items-center gap-3 mb-4">
        <Flame className="w-5 h-5 text-primary" />
        <span className="text-foreground">Daily target: <span className="text-primary font-semibold">2000 cal</span></span>
      </div>

      <div className="bg-secondary rounded-2xl px-5 py-3 flex items-center justify-between mb-5">
        <ChevronLeft className="w-5 h-5 text-foreground" />
        <span className="font-semibold text-foreground">This Week</span>
        <ChevronRight className="w-5 h-5 text-foreground" />
      </div>

      <div className="space-y-3 mb-6">
        {weekDays.map((d, i) => {
          const isExpanded = expandedDay === i;
          return (
            <div key={d.date}>
              <button
                onClick={() => setExpandedDay(isExpanded ? -1 : i)}
                className={`w-full rounded-2xl p-4 text-left transition-all ${
                  isExpanded ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center font-bold ${
                    isExpanded ? "bg-card text-primary" : "bg-card text-foreground"
                  }`}>
                    <span className={`text-xs ${isExpanded ? "text-primary" : "text-muted-foreground"}`}>{d.day}</span>
                    <span className="text-lg">{d.date}</span>
                  </div>
                  <div className="flex-1">
                    {isExpanded ? (
                      <div className="space-y-1">
                        {d.meals.map((m) => (
                          <div key={m.type} className="flex items-center gap-2 text-sm opacity-90">
                            <span>{m.icon}</span><span>{m.name}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-2 text-sm">
                          <Flame className="w-4 h-4" /><span>{d.calories} / {d.total} cal</span>
                        </div>
                        <div className="text-sm opacity-70 flex items-center gap-2 mt-0.5">
                          <span>☀️</span><span>{d.meals[0]?.name}</span>
                        </div>
                      </>
                    )}
                  </div>
                  {isExpanded ? <ChevronUp className="w-5 h-5 opacity-70" /> : <ChevronRight className="w-5 h-5 opacity-50" />}
                </div>
              </button>

              {isExpanded && (
                <div className="bg-primary rounded-b-2xl -mt-3 pt-5 px-4 pb-4 space-y-3">
                  <div className="bg-primary-foreground/15 rounded-xl px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-primary-foreground">
                      <Flame className="w-4 h-4" /><span className="font-semibold">Daily Total</span>
                    </div>
                    <div className="text-right text-primary-foreground">
                      <span className="font-bold">{d.calories} cal</span>
                      <p className="text-xs opacity-70">{d.total - d.calories} remaining</p>
                    </div>
                  </div>

                  {d.meals.map((m, mi) => (
                    <div key={m.type} className="bg-primary-foreground/15 rounded-xl px-4 py-3 text-primary-foreground">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span>{m.icon}</span>
                          <span className="bg-primary-foreground/20 px-3 py-0.5 rounded-full text-sm font-medium">{m.label}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Flame className="w-3.5 h-3.5" /> {m.cal} cal
                        </div>
                      </div>
                      <p className="font-bold text-lg mb-2">{m.name}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate("/recipe/1")}
                          className="flex-1 py-2 rounded-xl bg-primary-foreground/20 font-semibold text-sm"
                        >
                          View
                        </button>
                        <button
                          onClick={() => setSwapModal({ dayIdx: i, mealIdx: mi })}
                          className="flex-1 py-2 rounded-xl bg-primary-foreground/20 font-semibold text-sm"
                        >
                          Swap
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg shadow-lg shadow-primary/25 active:scale-[0.98] transition-transform flex items-center justify-center gap-2 mb-3">
        <RefreshCw className="w-5 h-5" /> Auto-Generate Week
      </button>
      <button className="w-full py-4 rounded-2xl border border-border font-semibold text-foreground active:scale-[0.98] transition-transform mb-4">
        Save Plan
      </button>

      {/* Swap Modal */}
      {swapModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center" onClick={() => setSwapModal(null)}>
          <div className="bg-card w-full max-w-md rounded-t-3xl p-6 animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-foreground">Swap "{currentMealName}"</h3>
              <button onClick={() => setSwapModal(null)} className="text-muted-foreground"><X className="w-5 h-5" /></button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Choose an alternative:</p>
            <div className="space-y-2">
              {alternatives.map((alt) => (
                <button
                  key={alt}
                  onClick={() => swapMeal(swapModal.dayIdx, swapModal.mealIdx, alt)}
                  className="w-full py-3.5 px-4 rounded-2xl bg-secondary text-foreground font-medium text-left hover:bg-chip-selected hover:text-chip-selected-foreground transition-all"
                >
                  {alt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default MealPlan;
