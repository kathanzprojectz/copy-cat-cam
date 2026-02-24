import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Share2, Play, Clock, ChefHat, Users, Flame, Minus, Plus, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import pastaImg from "@/assets/pasta-recipe.jpg";

const RECIPE_VIDEO_URL = "https://www.youtube.com/watch?v=bJUiWdM__Qw";

const nutritionFacts = [
  { label: "Protein", value: "18g" },
  { label: "Carbohydrates", value: "62g" },
  { label: "Fats", value: "22g" },
  { label: "Fiber", value: "4g" },
];

const ingredients = [
  { name: "Pasta (spaghetti or linguine)", amount: "400g", available: true, calories: 560, protein: "19g", carbs: "110g", fat: "2.4g", fiber: "4g" },
  { name: "Heavy cream", amount: "1 cup", available: true, calories: 340, protein: "2.8g", carbs: "3.3g", fat: "36g", fiber: "0g" },
  { name: "Garlic cloves", amount: "6 cloves", available: true, calories: 27, protein: "1.1g", carbs: "6g", fat: "0.1g", fiber: "0.4g" },
  { name: "Parmesan cheese", amount: "1 cup", available: true, calories: 431, protein: "38g", carbs: "3.7g", fat: "29g", fiber: "0g" },
  { name: "Butter", amount: "3 tbsp", available: true, calories: 306, protein: "0.4g", carbs: "0g", fat: "34.5g", fiber: "0g" },
  { name: "Olive oil", amount: "2 tbsp", available: true, calories: 239, protein: "0g", carbs: "0g", fat: "27g", fiber: "0g" },
  { name: "Fresh parsley", amount: "1/4 cup", available: false, calories: 5, protein: "0.5g", carbs: "0.9g", fat: "0.1g", fiber: "0.5g" },
  { name: "Red pepper flakes", amount: "1/2 tsp", available: false, calories: 3, protein: "0.1g", carbs: "0.5g", fat: "0.2g", fiber: "0.3g" },
];

const steps = [
  "Bring a large pot of salted water to boil. Cook pasta according to package directions until al dente.",
  "While pasta cooks, mince the garlic cloves finely.",
  "In a large pan, melt butter and olive oil over medium heat. Add garlic and sauté for 1-2 minutes until fragrant.",
  "Pour in the heavy cream and bring to a gentle simmer. Cook for 3-4 minutes, stirring occasionally.",
  "Add grated Parmesan cheese and stir until melted and sauce is smooth.",
  "Drain the pasta, reserving 1 cup of pasta water. Add pasta to the sauce.",
  "Toss everything together, adding pasta water as needed to reach desired consistency.",
  "Season with salt and pepper. Garnish with fresh parsley and extra Parmesan.",
  "Serve immediately while hot and creamy. Enjoy!",
];

const RecipeDetail = () => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [servings, setServings] = useState(1);
  const [expandedIngredient, setExpandedIngredient] = useState<string | null>(null);
  const [isCooking, setIsCooking] = useState(false);
  const availableCount = ingredients.filter((i) => i.available).length;

  return (
    <div className="app-container bg-background pb-28 min-h-screen">
      {/* Hero image */}
      <div className="relative">
        <img src={pastaImg} alt="Creamy Garlic Pasta" className="w-full h-72 object-cover" />
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 w-10 h-10 rounded-full bg-card/80 backdrop-blur flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="absolute top-4 right-4 flex gap-2">
          <button onClick={() => setLiked(!liked)} className="w-10 h-10 rounded-full bg-card/80 backdrop-blur flex items-center justify-center">
            <Heart className={`w-5 h-5 ${liked ? "fill-primary text-primary" : "text-primary"}`} />
          </button>
          <button className="w-10 h-10 rounded-full bg-card/80 backdrop-blur flex items-center justify-center">
            <Share2 className="w-5 h-5 text-foreground" />
          </button>
        </div>
        <button
          onClick={() => window.open(RECIPE_VIDEO_URL, "_blank")}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-16 h-16 rounded-full bg-card/80 backdrop-blur flex items-center justify-center">
            <Play className="w-7 h-7 text-primary ml-1" />
          </div>
        </button>
      </div>

      <div className="px-6 pt-5">
        <h1 className="text-2xl font-bold text-foreground mb-1">Creamy Garlic Pasta</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 25 min</span>
          <span className="flex items-center gap-1"><ChefHat className="w-4 h-4" /> Easy</span>
          <span className="flex items-center gap-1"><Users className="w-4 h-4" /> 4 servings</span>
        </div>

        {/* Description */}
        <div className="bg-card rounded-2xl p-5 shadow-sm mb-6">
          <p className="text-foreground leading-relaxed">
            A rich and creamy pasta dish with roasted garlic, perfect for a cozy dinner. This recipe is simple yet incredibly flavorful.
          </p>
        </div>

        {/* Nutrition */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">Nutrition Facts</h2>
          <button
            onClick={() => window.open(RECIPE_VIDEO_URL, "_blank")}
            className="flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium"
          >
            <Play className="w-3.5 h-3.5" /> Video
          </button>
        </div>

        <div className="bg-secondary rounded-2xl p-4 mb-3">
          <div className="flex items-center justify-between mb-3">
            <span className="text-muted-foreground">Serving Size</span>
            <div className="flex items-center gap-3">
              <button onClick={() => setServings(Math.max(1, servings - 1))} className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center">
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-bold text-foreground">{servings}x</span>
              <button onClick={() => setServings(servings + 1)} className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <Flame className="w-5 h-5 text-primary" />
          <span className="text-lg font-bold text-foreground">{520 * servings} calories</span>
          <span className="text-muted-foreground text-sm">({servings} serving{servings > 1 ? "s" : ""})</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {nutritionFacts.map((n) => (
            <div key={n.label} className="bg-card rounded-2xl p-4 shadow-sm">
              <p className="text-sm text-muted-foreground mb-1">{n.label}</p>
              <p className="text-xl font-bold text-foreground">{n.value}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-4 mb-6">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Sodium</span>
            <span className="font-bold text-foreground">380mg</span>
          </div>
        </div>

        {/* Ingredients */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-foreground">Ingredients</h2>
          <span className="bg-secondary px-3 py-1 rounded-full text-sm font-medium text-foreground">
            {availableCount}/{ingredients.length} available
          </span>
        </div>

        <div className="border-2 border-dashed border-primary/40 rounded-2xl p-4 mb-4">
          <p className="text-primary text-sm">
            You're missing {ingredients.length - availableCount} ingredients. Tap each ingredient to see its nutrition details.
          </p>
        </div>

        <div className="bg-secondary rounded-2xl divide-y divide-border mb-8">
          {ingredients.map((ing) => {
            const isExpanded = expandedIngredient === ing.name;
            return (
              <div key={ing.name}>
                <button
                  onClick={() => setExpandedIngredient(isExpanded ? null : ing.name)}
                  className="w-full px-4 py-3.5 flex items-center gap-3"
                >
                  {ing.available ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-primary shrink-0" />
                  )}
                  <div className="flex-1 text-left">
                    <p className={`font-semibold ${ing.available ? "text-foreground" : "text-primary"}`}>{ing.name}</p>
                    <p className="text-sm text-muted-foreground">{ing.amount}</p>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                  )}
                </button>
                {isExpanded && (
                  <div className="px-4 pb-3 ml-9">
                    <div className="bg-card rounded-xl p-3 grid grid-cols-2 gap-2">
                      <div className="flex justify-between">
                        <span className="text-xs text-muted-foreground">Calories</span>
                        <span className="text-xs font-bold text-foreground">{ing.calories}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-muted-foreground">Protein</span>
                        <span className="text-xs font-bold text-foreground">{ing.protein}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-muted-foreground">Carbs</span>
                        <span className="text-xs font-bold text-foreground">{ing.carbs}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-muted-foreground">Fat</span>
                        <span className="text-xs font-bold text-foreground">{ing.fat}</span>
                      </div>
                      <div className="flex justify-between col-span-2">
                        <span className="text-xs text-muted-foreground">Fiber</span>
                        <span className="text-xs font-bold text-foreground">{ing.fiber}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Instructions */}
        <h2 className="text-xl font-bold text-foreground mb-4">Instructions</h2>
        <div className="bg-secondary rounded-2xl p-5 mb-8 space-y-5">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0">
                {i + 1}
              </div>
              <p className="text-foreground leading-relaxed pt-1">{step}</p>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <button
          onClick={() => navigate("/meal-plan")}
          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg shadow-lg shadow-primary/25 active:scale-[0.98] transition-transform mb-3"
        >
          Add to Meal Plan
        </button>
        <button
          onClick={() => {
            setIsCooking(!isCooking);
            if (!isCooking) {
              // Reduce inventory for available ingredients
              const stored = localStorage.getItem("mealmate_inventory");
              const inv: { name: string; qty: number }[] = stored ? JSON.parse(stored) : [];
              const updated = [...inv];
              ingredients.filter(i => i.available).forEach(ing => {
                const idx = updated.findIndex(item => item.name.toLowerCase().includes(ing.name.split(" ")[0].toLowerCase()));
                if (idx !== -1) updated[idx].qty = Math.max(0, updated[idx].qty - 1);
              });
              localStorage.setItem("mealmate_inventory", JSON.stringify(updated));
            }
          }}
          className={`w-full py-4 rounded-2xl font-semibold text-lg active:scale-[0.98] transition-transform mb-3 flex items-center justify-center gap-2 ${
            isCooking
              ? "bg-primary/15 text-primary border-2 border-primary"
              : "bg-secondary text-foreground"
          }`}
        >
          {isCooking ? "✅ Marked as Cooking" : "🍳 I'm Making This"}
        </button>
        <button
          onClick={() => window.open(RECIPE_VIDEO_URL, "_blank")}
          className="w-full py-4 rounded-2xl bg-secondary font-semibold text-foreground active:scale-[0.98] transition-transform mb-4 flex items-center justify-center gap-2"
        >
          <Play className="w-5 h-5" /> Watch Cooking Video
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default RecipeDetail;
