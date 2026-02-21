import { useNavigate } from "react-router-dom";

const features = [
  { emoji: "🍽️", text: "Personalized meal suggestions" },
  { emoji: "🧊", text: "Smart fridge inventory tracking" },
  { emoji: "👨‍👩‍👧‍👦", text: "Collaborative household planning" },
];

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container flex flex-col items-center bg-background px-6 pt-12 pb-8 min-h-screen">
      {/* Logo */}
      <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center mb-4">
        <span className="text-4xl">🍴</span>
      </div>

      <h1 className="text-2xl font-bold text-foreground mb-2">Welcome to MealMate</h1>
      <p className="text-muted-foreground text-center text-lg mb-10 max-w-xs">
        Let's get to know you better so we can create the perfect meal plan tailored just for you
      </p>

      <div className="w-full space-y-4 animate-fade-in">
        {features.map((f, i) => (
          <div
            key={i}
            className="w-full flex items-center gap-4 px-6 py-5 rounded-2xl bg-secondary"
          >
            <span className="text-xl text-primary">●</span>
            <span className="font-medium text-secondary-foreground">{f.text}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-12 w-full">
        <button
          onClick={() => navigate("/language")}
          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg shadow-lg shadow-primary/25 active:scale-[0.98] transition-transform"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Welcome;
