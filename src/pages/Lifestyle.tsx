import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const cookingTimes = [
  { emoji: "⚡", label: "15 min or less" }, { emoji: "⏲️", label: "15-30 min" },
  { emoji: "⏰", label: "30-45 min" }, { emoji: "🕐", label: "45-60 min" },
  { emoji: "🔍", label: "60+ min" },
];
const mealsPerDay = [
  { emoji: "🍽️", label: "1 meal" }, { emoji: "🍽️🍽️", label: "2 meals" },
  { emoji: "🍽️🍽️🍽️", label: "3 meals" }, { emoji: "🍽️+", label: "4+ meals" },
];
const frequencies = [
  { emoji: "📅", label: "Daily" }, { emoji: "📆", label: "4-5 times/week" },
  { emoji: "📋", label: "2-3 times/week" }, { emoji: "📄", label: "Weekly" },
  { emoji: "🌙", label: "Rarely" },
];
const mealTypes = [
  { emoji: "🌅", label: "Breakfast" }, { emoji: "☀️", label: "Lunch" },
  { emoji: "🌆", label: "Dinner" }, { emoji: "🍿", label: "Snacks" },
];

type SectionProps = { title: string; items: { emoji: string; label: string }[]; selected: string; onSelect: (v: string) => void };
const Section = ({ title, items, selected, onSelect }: SectionProps) => (
  <div className="mb-8">
    <h2 className="text-lg font-bold text-foreground mb-3">{title}</h2>
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <button
          key={item.label}
          onClick={() => onSelect(item.label)}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-medium transition-all ${
            selected === item.label ? "bg-chip-selected text-chip-selected-foreground" : "bg-chip text-foreground"
          }`}
        >
          <span>{item.emoji}</span>{item.label}
        </button>
      ))}
    </div>
  </div>
);

type MultiSectionProps = { title: string; items: { emoji: string; label: string }[]; selected: string[]; onToggle: (v: string) => void };
const MultiSection = ({ title, items, selected, onToggle }: MultiSectionProps) => (
  <div className="mb-8">
    <h2 className="text-lg font-bold text-foreground mb-3">{title}</h2>
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <button
          key={item.label}
          onClick={() => onToggle(item.label)}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-medium transition-all ${
            selected.includes(item.label) ? "bg-chip-selected text-chip-selected-foreground" : "bg-chip text-foreground"
          }`}
        >
          <span>{item.emoji}</span>{item.label}
        </button>
      ))}
    </div>
  </div>
);

const Lifestyle = () => {
  const navigate = useNavigate();
  const [cookTime, setCookTime] = useState("");
  const [meals, setMeals] = useState("");
  const [freq, setFreq] = useState("");
  const [mealTypesSelected, setMealTypesSelected] = useState<string[]>([]);

  const toggleMealType = (v: string) => {
    setMealTypesSelected((prev) => prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]);
  };

  return (
    <div className="app-container bg-background px-6 pt-6 pb-8 min-h-screen flex flex-col">
      <button onClick={() => navigate(-1)} className="mb-4 text-foreground">
        <ArrowLeft className="w-6 h-6" />
      </button>

      <h1 className="text-2xl font-bold text-foreground mb-1">Lifestyle & Routine</h1>
      <p className="text-muted-foreground mb-6">Tell us about your cooking habits</p>

      <div className="animate-fade-in">
        <Section title="Cooking Time Available" items={cookingTimes} selected={cookTime} onSelect={setCookTime} />
        <Section title="Meals Per Day" items={mealsPerDay} selected={meals} onSelect={setMeals} />
        <Section title="Cooking Frequency" items={frequencies} selected={freq} onSelect={setFreq} />
        <MultiSection title="Which Meals Do You Cook?" items={mealTypes} selected={mealTypesSelected} onToggle={toggleMealType} />
      </div>

      <div className="mt-auto pt-8">
        <button
          onClick={() => navigate("/health-goals")}
          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg shadow-lg shadow-primary/25 active:scale-[0.98] transition-transform"
        >
          Finish Setup
        </button>
      </div>
    </div>
  );
};

export default Lifestyle;
