import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const cuisines = [
  { emoji: "🍝", name: "Italian" }, { emoji: "🥢", name: "Chinese" }, { emoji: "🌮", name: "Mexican" },
  { emoji: "🍛", name: "Indian" }, { emoji: "🍣", name: "Japanese" }, { emoji: "🍜", name: "Thai" },
  { emoji: "🥙", name: "Mediterranean" }, { emoji: "🍔", name: "American" },
  { emoji: "🥐", name: "French" }, { emoji: "🍲", name: "Korean" },
  { emoji: "🧆", name: "Middle Eastern" }, { emoji: "🍵", name: "Vietnamese" },
];

const flavors = [
  { emoji: "🌶️", name: "Spicy" }, { emoji: "🧂", name: "Savory" }, { emoji: "🍯", name: "Sweet" },
  { emoji: "🍋", name: "Tangy" }, { emoji: "🥛", name: "Mild" }, { emoji: "🍄", name: "Umami" },
];

const SelectableChip = ({ emoji, name, selected, onClick }: { emoji: string; name: string; selected: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-medium transition-all ${
      selected
        ? "bg-chip-selected text-chip-selected-foreground"
        : "bg-chip text-foreground"
    }`}
  >
    <span>{emoji}</span>
    {name}
  </button>
);

const FoodPreferences = () => {
  const navigate = useNavigate();
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);

  const toggle = (arr: string[], set: React.Dispatch<React.SetStateAction<string[]>>, val: string) => {
    set(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  return (
    <div className="app-container bg-background px-6 pt-6 pb-8 min-h-screen flex flex-col">
      <button onClick={() => navigate(-1)} className="mb-4 text-foreground">
        <ArrowLeft className="w-6 h-6" />
      </button>

      <h1 className="text-2xl font-bold text-foreground mb-1">Food Preferences</h1>
      <p className="text-muted-foreground mb-6">Select your favorite cuisines and flavor profiles</p>

      <div className="animate-fade-in">
        <h2 className="text-lg font-bold text-foreground mb-1">Favorite Cuisines</h2>
        <p className="text-sm text-muted-foreground mb-3">Select at least 1</p>
        <div className="flex flex-wrap gap-2 mb-8">
          {cuisines.map((c) => (
            <SelectableChip key={c.name} {...c} selected={selectedCuisines.includes(c.name)} onClick={() => toggle(selectedCuisines, setSelectedCuisines, c.name)} />
          ))}
        </div>

        <h2 className="text-lg font-bold text-foreground mb-1">Flavor Preferences</h2>
        <p className="text-sm text-muted-foreground mb-3">Select at least 1</p>
        <div className="flex flex-wrap gap-2 mb-8">
          {flavors.map((f) => (
            <SelectableChip key={f.name} {...f} selected={selectedFlavors.includes(f.name)} onClick={() => toggle(selectedFlavors, setSelectedFlavors, f.name)} />
          ))}
        </div>
      </div>

      <div className="mt-auto pt-8">
        <button
          onClick={() => navigate("/dietary-restrictions")}
          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg shadow-lg shadow-primary/25 active:scale-[0.98] transition-transform"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default FoodPreferences;
