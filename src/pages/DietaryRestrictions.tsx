import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";

const dietsEn = [
  { emoji: "🥗", name: "Vegetarian" }, { emoji: "🌱", name: "Vegan" },
  { emoji: "🐟", name: "Pescatarian" }, { emoji: "🥑", name: "Keto" }, { emoji: "🍖", name: "Paleo" },
  { emoji: "🐠", name: "Gluten-Free" }, { emoji: "🥛", name: "Dairy-Free" },
  { emoji: "🟢", name: "Halal" }, { emoji: "✡️", name: "Kosher" },
  { emoji: "✨", name: "No Restrictions" },
];

const dietsHi = [
  { emoji: "🥗", name: "शाकाहारी" }, { emoji: "🌱", name: "वीगन" },
  { emoji: "🐟", name: "मछलीहारी" }, { emoji: "🥑", name: "कीटो" }, { emoji: "🍖", name: "पैलियो" },
  { emoji: "🐠", name: "ग्लूटेन-फ़्री" }, { emoji: "🥛", name: "डेयरी-फ़्री" },
  { emoji: "🟢", name: "हलाल" }, { emoji: "✡️", name: "कोशर" },
  { emoji: "✨", name: "कोई प्रतिबंध नहीं" },
];

const allergiesEn = ["Nuts", "Dairy", "Eggs", "Shellfish", "Soy", "Wheat", "Fish"];
const allergiesHi = ["मेवे", "डेयरी", "अंडे", "शेलफ़िश", "सोया", "गेहूँ", "मछली"];

const DietaryRestrictions = () => {
  const navigate = useNavigate();
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [customAllergy, setCustomAllergy] = useState("");

  const lang = localStorage.getItem("mealmate_language") || "English";
  const isHindi = lang === "Hindi";
  const diets = isHindi ? dietsHi : dietsEn;
  const allergies = isHindi ? allergiesHi : allergiesEn;

  const toggle = (arr: string[], set: React.Dispatch<React.SetStateAction<string[]>>, val: string) => {
    set(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  const addCustom = () => {
    if (customAllergy.trim() && !selectedAllergies.includes(customAllergy.trim())) {
      setSelectedAllergies([...selectedAllergies, customAllergy.trim()]);
      setCustomAllergy("");
    }
  };

  return (
    <div className="app-container bg-background px-6 pt-6 pb-8 min-h-screen flex flex-col">
      <button onClick={() => navigate(-1)} className="mb-4 text-foreground">
        <ArrowLeft className="w-6 h-6" />
      </button>

      <h1 className="text-2xl font-bold text-foreground mb-1">
        {isHindi ? "आहार प्रतिबंध" : "Dietary Restrictions"}
      </h1>
      <p className="text-muted-foreground mb-6">
        {isHindi ? "अपनी आहार ज़रूरतों के बारे में बताएँ" : "Help us understand your dietary needs"}
      </p>

      <div className="animate-fade-in">
        <h2 className="text-lg font-bold text-foreground mb-3">
          {isHindi ? "आहार प्रकार" : "Diet Type"}
        </h2>
        <div className="flex flex-wrap gap-2 mb-8">
          {diets.map((d) => (
            <button
              key={d.name}
              onClick={() => toggle(selectedDiets, setSelectedDiets, d.name)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-medium transition-all ${
                selectedDiets.includes(d.name) ? "bg-chip-selected text-chip-selected-foreground" : "bg-chip text-foreground"
              }`}
            >
              <span>{d.emoji}</span>{d.name}
            </button>
          ))}
        </div>

        <h2 className="text-lg font-bold text-foreground mb-3">
          {isHindi ? "एलर्जी और असहनशीलता" : "Allergies & Intolerances"}
        </h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {allergies.map((a) => (
            <button
              key={a}
              onClick={() => toggle(selectedAllergies, setSelectedAllergies, a)}
              className={`px-5 py-3 rounded-2xl font-medium transition-all ${
                selectedAllergies.includes(a) ? "bg-chip-selected text-chip-selected-foreground" : "bg-chip text-foreground"
              }`}
            >
              {a}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder={isHindi ? "कस्टम एलर्जी जोड़ें..." : "Add custom allergy..."}
            value={customAllergy}
            onChange={(e) => setCustomAllergy(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addCustom()}
            className="flex-1 px-4 py-3 rounded-2xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
          />
          <button onClick={addCustom} className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="mt-auto pt-8">
        <button
          onClick={() => navigate("/lifestyle")}
          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg shadow-lg shadow-primary/25 active:scale-[0.98] transition-transform"
        >
          {isHindi ? "जारी रखें" : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default DietaryRestrictions;
