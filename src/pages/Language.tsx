import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

const languages = [
  { flag: "🇬🇧", name: "English", native: "English" },
  { flag: "🇮🇳", name: "हिन्दी", native: "Hindi" },
  { flag: "🇪🇸", name: "Español", native: "Spanish" },
  { flag: "🇫🇷", name: "Français", native: "French" },
  { flag: "🇩🇪", name: "Deutsch", native: "German" },
  { flag: "🇯🇵", name: "日本語", native: "Japanese" },
  { flag: "🇨🇳", name: "中文", native: "Chinese" },
  { flag: "🇸🇦", name: "العربية", native: "Arabic" },
];

const Language = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("English");

  return (
    <div className="app-container flex flex-col items-center bg-background px-6 pt-12 pb-8 min-h-screen">
      <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center mb-4">
        <span className="text-4xl">🌐</span>
      </div>

      <h1 className="text-xl font-bold text-foreground mb-1">Select your preferred language</h1>
      <p className="text-muted-foreground text-center mb-8">Choose the language you're most comfortable with</p>

      <div className="w-full space-y-3 animate-fade-in">
        {languages.map((lang) => (
          <button
            key={lang.native}
            onClick={() => setSelected(lang.native)}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${
              selected === lang.native
                ? "bg-secondary border-2 border-primary"
                : "bg-secondary border-2 border-transparent"
            }`}
          >
            <span className="text-2xl">{lang.flag}</span>
            <div className="text-left">
              <div className="font-semibold text-foreground">{lang.name}</div>
              <div className="text-sm text-muted-foreground">{lang.native}</div>
            </div>
            {selected === lang.native && (
              <div className="ml-auto w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                <Check className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="mt-auto pt-8 w-full">
        <button
          onClick={() => navigate("/food-preferences")}
          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg shadow-lg shadow-primary/25 active:scale-[0.98] transition-transform"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Language;
