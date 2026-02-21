import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Minus, Plus } from "lucide-react";

const householdTypes = [
  { emoji: "🏠", name: "Living Solo" }, { emoji: "👫", name: "Couple" },
  { emoji: "👨‍👩‍👧‍👦", name: "Family" }, { emoji: "🤝", name: "Roommates" },
  { emoji: "🎓", name: "Student Flat" },
];

const ageGroups = [
  { emoji: "👶", name: "Kids (0-12)" }, { emoji: "👦", name: "Teens (13-17)" },
  { emoji: "🧑", name: "Adults (18+)" }, { emoji: "👴", name: "Seniors (65+)" },
];

const HouseholdSetup = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("");
  const [people, setPeople] = useState(1);
  const [selectedAges, setSelectedAges] = useState<string[]>([]);
  const [pickyEaters, setPickyEaters] = useState<string | null>(null);

  const toggleAge = (val: string) => {
    setSelectedAges((prev) => prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]);
  };

  return (
    <div className="app-container bg-background px-6 pt-6 pb-8 min-h-screen flex flex-col">
      <button onClick={() => navigate(-1)} className="mb-4 text-foreground">
        <ArrowLeft className="w-6 h-6" />
      </button>

      <h1 className="text-2xl font-bold text-foreground mb-1">Household Setup</h1>
      <p className="text-muted-foreground mb-6">Tell us about who you're cooking for</p>

      <div className="animate-fade-in">
        <h2 className="text-lg font-bold text-foreground mb-3">Household Type</h2>
        <div className="flex flex-wrap gap-2 mb-8">
          {householdTypes.map((h) => (
            <button
              key={h.name}
              onClick={() => setSelectedType(h.name)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-medium transition-all ${
                selectedType === h.name ? "bg-chip-selected text-chip-selected-foreground" : "bg-chip text-foreground"
              }`}
            >
              <span>{h.emoji}</span>{h.name}
            </button>
          ))}
        </div>

        <h2 className="text-lg font-bold text-foreground mb-3">Number of People</h2>
        <div className="bg-secondary rounded-2xl p-5 flex items-center justify-between mb-8">
          <button
            onClick={() => setPeople(Math.max(1, people - 1))}
            className="w-12 h-12 rounded-full bg-card flex items-center justify-center text-foreground shadow-sm"
          >
            <Minus className="w-5 h-5" />
          </button>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{people}</div>
            <div className="text-sm text-muted-foreground">people</div>
          </div>
          <button
            onClick={() => setPeople(people + 1)}
            className="w-12 h-12 rounded-full bg-card flex items-center justify-center text-primary shadow-sm"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <h2 className="text-lg font-bold text-foreground mb-1">Age Groups</h2>
        <p className="text-sm text-muted-foreground mb-3">Select all that apply</p>
        <div className="flex flex-wrap gap-2 mb-8">
          {ageGroups.map((a) => (
            <button
              key={a.name}
              onClick={() => toggleAge(a.name)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-medium transition-all ${
                selectedAges.includes(a.name) ? "bg-chip-selected text-chip-selected-foreground" : "bg-chip text-foreground"
              }`}
            >
              <span>{a.emoji}</span>{a.name}
            </button>
          ))}
        </div>

        <h2 className="text-lg font-bold text-foreground mb-3">Any Picky Eaters?</h2>
        <div className="flex gap-3">
          {["Yes", "No"].map((opt) => (
            <button
              key={opt}
              onClick={() => setPickyEaters(opt)}
              className={`flex-1 py-4 rounded-2xl font-medium transition-all ${
                pickyEaters === opt ? "bg-chip-selected text-chip-selected-foreground" : "bg-chip text-foreground"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-8">
        <button
          onClick={() => navigate("/home")}
          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg shadow-lg shadow-primary/25 active:scale-[0.98] transition-transform"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default HouseholdSetup;
