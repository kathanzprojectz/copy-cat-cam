import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const cuisinesEn = [
  { emoji: "🍝", name: "Italian" }, { emoji: "🥢", name: "Chinese" }, { emoji: "🌮", name: "Mexican" },
  { emoji: "🍛", name: "Indian" }, { emoji: "🍣", name: "Japanese" }, { emoji: "🍜", name: "Thai" },
  { emoji: "🥙", name: "Mediterranean" }, { emoji: "🍔", name: "American" },
  { emoji: "🥐", name: "French" }, { emoji: "🍲", name: "Korean" },
  { emoji: "🧆", name: "Middle Eastern" }, { emoji: "🍵", name: "Vietnamese" },
];

const cuisinesHi = [
  { emoji: "🍝", name: "इटालियन" }, { emoji: "🥢", name: "चाइनीज़" }, { emoji: "🌮", name: "मेक्सिकन" },
  { emoji: "🍛", name: "भारतीय" }, { emoji: "🍣", name: "जापानी" }, { emoji: "🍜", name: "थाई" },
  { emoji: "🥙", name: "मेडिटेरेनियन" }, { emoji: "🍔", name: "अमेरिकन" },
  { emoji: "🥐", name: "फ़्रेंच" }, { emoji: "🍲", name: "कोरियन" },
  { emoji: "🧆", name: "मध्य पूर्वी" }, { emoji: "🍵", name: "वियतनामी" },
];

const flavorsEn = [
  { emoji: "🌶️", name: "Spicy" }, { emoji: "🧂", name: "Savory" }, { emoji: "🍯", name: "Sweet" },
  { emoji: "🍋", name: "Tangy" }, { emoji: "🥛", name: "Mild" }, { emoji: "🍄", name: "Umami" },
];

const flavorsHi = [
  { emoji: "🌶️", name: "तीखा" }, { emoji: "🧂", name: "नमकीन" }, { emoji: "🍯", name: "मीठा" },
  { emoji: "🍋", name: "खट्टा" }, { emoji: "🥛", name: "हल्का" }, { emoji: "🍄", name: "उमामी" },
];

const dietTypesEn = [
  { emoji: "🥗", name: "Vegetarian" }, { emoji: "🍗", name: "Non-Vegetarian" },
  { emoji: "🌱", name: "Vegan" }, { emoji: "🥚", name: "Eggetarian" },
];

const dietTypesHi = [
  { emoji: "🥗", name: "शाकाहारी" }, { emoji: "🍗", name: "मांसाहारी" },
  { emoji: "🌱", name: "वीगन" }, { emoji: "🥚", name: "अंडाहारी" },
];

const SelectableChip = ({ emoji, name, selected, onClick }: { emoji: string; name: string; selected: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-medium transition-all ${
      selected ? "bg-chip-selected text-chip-selected-foreground" : "bg-chip text-foreground"
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
  const [selectedDiet, setSelectedDiet] = useState<string[]>([]);

  const lang = localStorage.getItem("mealmate_language") || "English";
  const isHindi = lang === "Hindi";

  const cuisines = isHindi ? cuisinesHi : cuisinesEn;
  const flavors = isHindi ? flavorsHi : flavorsEn;
  const dietTypes = isHindi ? dietTypesHi : dietTypesEn;

  const toggle = (arr: string[], set: React.Dispatch<React.SetStateAction<string[]>>, val: string) => {
    set(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  return (
    <div className="app-container bg-background px-6 pt-6 pb-8 min-h-screen flex flex-col">
      <button onClick={() => navigate(-1)} className="mb-4 text-foreground">
        <ArrowLeft className="w-6 h-6" />
      </button>

      <h1 className="text-2xl font-bold text-foreground mb-1">
        {isHindi ? "खाने की पसंद" : "Food Preferences"}
      </h1>
      <p className="text-muted-foreground mb-6">
        {isHindi ? "अपने पसंदीदा व्यंजन और स्वाद चुनें" : "Select your favorite cuisines and flavor profiles"}
      </p>

      <div className="animate-fade-in">
        <h2 className="text-lg font-bold text-foreground mb-1">
          {isHindi ? "आहार वरीयता" : "Diet Preference"}
        </h2>
        <p className="text-sm text-muted-foreground mb-3">
          {isHindi ? "अपना आहार प्रकार चुनें" : "Select your diet type"}
        </p>
        <div className="flex flex-wrap gap-2 mb-8">
          {dietTypes.map((d) => (
            <SelectableChip key={d.name} {...d} selected={selectedDiet.includes(d.name)} onClick={() => toggle(selectedDiet, setSelectedDiet, d.name)} />
          ))}
        </div>

        <h2 className="text-lg font-bold text-foreground mb-1">
          {isHindi ? "पसंदीदा व्यंजन" : "Favorite Cuisines"}
        </h2>
        <p className="text-sm text-muted-foreground mb-3">
          {isHindi ? "कम से कम 1 चुनें" : "Select at least 1"}
        </p>
        <div className="flex flex-wrap gap-2 mb-8">
          {cuisines.map((c) => (
            <SelectableChip key={c.name} {...c} selected={selectedCuisines.includes(c.name)} onClick={() => toggle(selectedCuisines, setSelectedCuisines, c.name)} />
          ))}
        </div>

        <h2 className="text-lg font-bold text-foreground mb-1">
          {isHindi ? "स्वाद वरीयता" : "Flavor Preferences"}
        </h2>
        <p className="text-sm text-muted-foreground mb-3">
          {isHindi ? "कम से कम 1 चुनें" : "Select at least 1"}
        </p>
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
          {isHindi ? "जारी रखें" : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default FoodPreferences;
