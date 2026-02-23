import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const goals = [
  { emoji: "📉", name: "Weight Loss" }, { emoji: "💪", name: "Muscle Gain" },
  { emoji: "⚖️", name: "Maintain Weight" }, { emoji: "⚡", name: "Boost Energy" },
  { emoji: "❤️", name: "General Health" }, { emoji: "✨", name: "No Specific Goals" },
];

const goalsHi = [
  { emoji: "📉", name: "वज़न कम करना" }, { emoji: "💪", name: "मांसपेशियाँ बढ़ाना" },
  { emoji: "⚖️", name: "वज़न बनाए रखना" }, { emoji: "⚡", name: "ऊर्जा बढ़ाना" },
  { emoji: "❤️", name: "सामान्य स्वास्थ्य" }, { emoji: "✨", name: "कोई विशेष लक्ष्य नहीं" },
];

const nutrition = [
  { emoji: "🥩", name: "High Protein" }, { emoji: "🥦", name: "Low Carb" },
  { emoji: "🥑", name: "Low Fat" }, { emoji: "⚖️", name: "Balanced" },
  { emoji: "🌾", name: "Fiber Rich" }, { emoji: "🍽️", name: "No Preference" },
];

const nutritionHi = [
  { emoji: "🥩", name: "अधिक प्रोटीन" }, { emoji: "🥦", name: "कम कार्ब" },
  { emoji: "🥑", name: "कम वसा" }, { emoji: "⚖️", name: "संतुलित" },
  { emoji: "🌾", name: "फ़ाइबर युक्त" }, { emoji: "🍽️", name: "कोई वरीयता नहीं" },
];

const HealthGoals = () => {
  const navigate = useNavigate();
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedNutrition, setSelectedNutrition] = useState<string[]>([]);
  const [calories, setCalories] = useState(1200);

  const lang = localStorage.getItem("mealmate_language") || "English";
  const isHindi = lang === "Hindi";

  const goalsList = isHindi ? goalsHi : goals;
  const nutritionList = isHindi ? nutritionHi : nutrition;

  const toggle = (arr: string[], set: React.Dispatch<React.SetStateAction<string[]>>, val: string) => {
    set(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  const handleContinue = () => {
    localStorage.setItem("mealmate_calories", String(calories));
    navigate("/household");
  };

  return (
    <div className="app-container bg-background px-6 pt-6 pb-8 min-h-screen flex flex-col">
      <button onClick={() => navigate(-1)} className="mb-4 text-foreground">
        <ArrowLeft className="w-6 h-6" />
      </button>

      <h1 className="text-2xl font-bold text-foreground mb-1">
        {isHindi ? "स्वास्थ्य लक्ष्य" : "Health Goals"}
      </h1>
      <p className="text-muted-foreground mb-6">
        {isHindi ? "आपके स्वास्थ्य और पोषण लक्ष्य क्या हैं?" : "What are your health and nutrition goals?"}
      </p>

      <div className="animate-fade-in">
        <h2 className="text-lg font-bold text-foreground mb-1">
          {isHindi ? "प्राथमिक लक्ष्य" : "Primary Goals"}
        </h2>
        <p className="text-sm text-muted-foreground mb-3">
          {isHindi ? "सभी लागू विकल्प चुनें" : "Select all that apply"}
        </p>
        <div className="flex flex-wrap gap-2 mb-8">
          {goalsList.map((g) => (
            <button
              key={g.name}
              onClick={() => toggle(selectedGoals, setSelectedGoals, g.name)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-medium transition-all ${
                selectedGoals.includes(g.name) ? "bg-chip-selected text-chip-selected-foreground" : "bg-chip text-foreground"
              }`}
            >
              <span>{g.emoji}</span>{g.name}
            </button>
          ))}
        </div>

        <h2 className="text-lg font-bold text-foreground mb-1">
          {isHindi ? "पोषण फ़ोकस" : "Nutrition Focus"}
        </h2>
        <p className="text-sm text-muted-foreground mb-3">
          {isHindi ? "अपनी मैक्रोन्यूट्रिएंट वरीयता चुनें" : "Select your macronutrient preferences"}
        </p>
        <div className="flex flex-wrap gap-2 mb-8">
          {nutritionList.map((n) => (
            <button
              key={n.name}
              onClick={() => toggle(selectedNutrition, setSelectedNutrition, n.name)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-medium transition-all ${
                selectedNutrition.includes(n.name) ? "bg-chip-selected text-chip-selected-foreground" : "bg-chip text-foreground"
              }`}
            >
              <span>{n.emoji}</span>{n.name}
            </button>
          ))}
        </div>

        <h2 className="text-lg font-bold text-foreground mb-1">
          {isHindi ? "दैनिक कैलोरी लक्ष्य" : "Daily Calorie Target"}
        </h2>
        <p className="text-sm text-muted-foreground mb-3">
          {isHindi ? "अपना दैनिक कैलोरी लक्ष्य सेट करें" : "Set your daily calorie goal"}
        </p>
        <div className="bg-secondary rounded-2xl p-5">
          <div className="flex justify-between items-center mb-3">
            <span className="text-muted-foreground">{isHindi ? "प्रतिदिन कैलोरी" : "Calories per day"}</span>
            <span className="text-lg font-bold text-foreground">{calories} cal</span>
          </div>
          <input
            type="range"
            min={800}
            max={4000}
            step={50}
            value={calories}
            onChange={(e) => setCalories(Number(e.target.value))}
            className="w-full accent-primary h-2 rounded-full appearance-none bg-primary/20 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-card [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:shadow"
          />
        </div>
      </div>

      <div className="mt-auto pt-8">
        <button
          onClick={handleContinue}
          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg shadow-lg shadow-primary/25 active:scale-[0.98] transition-transform"
        >
          {isHindi ? "जारी रखें" : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default HealthGoals;
