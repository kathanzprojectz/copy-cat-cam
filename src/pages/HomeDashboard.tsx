import { useNavigate } from "react-router-dom";
import { Clock, ChefHat, Play, Flame, CalendarDays, Package, Sparkles, BookOpen, Users } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import pastaImg from "@/assets/pasta-recipe.jpg";

const CalorieRing = ({ current, total }: { current: number; total: number }) => {
  const pct = Math.min(current / total, 1);
  const r = 50;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct);

  return (
    <div className="relative w-32 h-32">
      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="hsl(var(--secondary))" strokeWidth="10" />
        <circle cx="60" cy="60" r={r} fill="none" stroke="hsl(var(--primary))" strokeWidth="10" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold text-foreground">{current}</span>
        <span className="text-xs text-muted-foreground">/ {total}</span>
      </div>
    </div>
  );
};

const meals = [
  { name: "Breakfast", cal: 420, pct: 0.55 },
  { name: "Lunch", cal: 580, pct: 0.75 },
  { name: "Dinner", cal: 250, pct: 0.3 },
];

const HomeDashboard = () => {
  const navigate = useNavigate();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const greetEmoji = hour < 18 ? "☀️" : "🌙";

  const storedCalories = localStorage.getItem("mealmate_calories");
  const calorieTarget = storedCalories ? Number(storedCalories) : 2000;
  const currentCalories = Math.round(calorieTarget * 0.625);
  const remaining = calorieTarget - currentCalories;

  const quickActions = [
    { icon: CalendarDays, title: "Meal Plan", desc: "View weekly schedule", path: "/meal-plan" },
    { icon: Package, title: "Inventory", desc: "Manage your fridge", path: "/inventory" },
    { icon: Sparkles, title: "AI Suggestions", desc: "Get recipe ideas", path: "/recipe/1" },
    { icon: BookOpen, title: "Recipes", desc: "Browse collection", path: "/recipe/1" },
  ];

  return (
    <div className="app-container bg-background px-6 pt-10 pb-24 min-h-screen">
      {/* Header */}
      <p className="text-muted-foreground">{greeting}, Emil! {greetEmoji}</p>
      <h1 className="text-2xl font-bold text-foreground mb-1">What are we cooking today?</h1>
      <p className="text-muted-foreground mb-6">Let's make cooking easier together</p>

      {/* Calorie Card */}
      <div className="bg-card rounded-3xl p-5 shadow-sm mb-6 animate-fade-in">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 text-primary" />
          <h2 className="font-bold text-foreground">Today's Calories</h2>
        </div>
        <div className="flex gap-4">
          <CalorieRing current={currentCalories} total={calorieTarget} />
          <div className="flex-1 space-y-3">
            {meals.map((m) => (
              <div key={m.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{m.name}</span>
                  <span className="font-medium text-foreground">{Math.round(m.cal * (calorieTarget / 2000))} cal</span>
                </div>
                <div className="h-1.5 rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${m.pct * 100}%` }} />
                </div>
              </div>
            ))}
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Remaining</span>
              <span className="font-medium text-primary">{remaining} cal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recipe Card */}
      <div className="bg-card rounded-3xl overflow-hidden shadow-sm mb-6 animate-fade-in">
        <div className="relative">
          <img src={pastaImg} alt="Creamy Garlic Pasta" className="w-full h-48 object-cover" />
          <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-primary" /> AI Pick
          </div>
          <button
            onClick={() => window.open("https://www.youtube.com/watch?v=bJUiWdM__Qw", "_blank")}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-12 h-12 rounded-full bg-card/80 backdrop-blur flex items-center justify-center">
              <Play className="w-5 h-5 text-primary ml-0.5" />
            </div>
          </button>
          <div className="absolute bottom-3 left-3 bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-primary" /> 520 cal
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-bold text-foreground mb-1">Creamy Garlic Pasta</h3>
          <p className="text-sm text-muted-foreground mb-3">Perfect for tonight! Uses ingredients you already have</p>
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 25 min</span>
            <span className="flex items-center gap-1"><ChefHat className="w-4 h-4" /> Easy</span>
          </div>
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => window.open("https://www.youtube.com/watch?v=bJUiWdM__Qw", "_blank")}
              className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-card border border-primary/30 text-primary font-medium"
            >
              <Play className="w-3 h-3" /> Video
            </button>
            <span className="text-xs px-3 py-1.5 rounded-full bg-chip font-medium text-foreground">Fits your budget</span>
            <span className="text-xs px-3 py-1.5 rounded-full bg-chip font-medium text-foreground">High protein</span>
          </div>
          <button
            onClick={() => navigate("/recipe/1")}
            className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 active:scale-[0.98] transition-transform"
          >
            View Recipe
          </button>
        </div>
      </div>

      {/* Household Poll */}
      <div className="bg-card rounded-3xl p-5 shadow-sm mb-6 animate-fade-in">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            <h2 className="font-bold text-foreground">Household Poll</h2>
          </div>
          <span className="text-sm text-muted-foreground">2 votes pending</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">Your flatmates are deciding on tomorrow's dinner</p>
        <button
          onClick={() => navigate("/meal-plan")}
          className="w-full py-3.5 rounded-2xl border border-border font-semibold text-foreground active:scale-[0.98] transition-transform"
        >
          Cast Your Vote
        </button>
      </div>

      {/* Quick Actions */}
      <h2 className="text-lg font-bold text-foreground mb-3">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {quickActions.map((a) => (
          <button
            key={a.title}
            onClick={() => navigate(a.path)}
            className="bg-secondary rounded-2xl p-5 text-left"
          >
            <a.icon className="w-7 h-7 text-primary mb-3" />
            <h3 className="font-bold text-foreground mb-1">{a.title}</h3>
            <p className="text-xs text-muted-foreground">{a.desc}</p>
          </button>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default HomeDashboard;
