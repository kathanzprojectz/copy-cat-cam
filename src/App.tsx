import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Welcome from "./pages/Welcome";
import Language from "./pages/Language";
import FoodPreferences from "./pages/FoodPreferences";
import DietaryRestrictions from "./pages/DietaryRestrictions";
import Lifestyle from "./pages/Lifestyle";
import HealthGoals from "./pages/HealthGoals";
import HouseholdSetup from "./pages/HouseholdSetup";
import HomeDashboard from "./pages/HomeDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/signin" replace />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/language" element={<Language />} />
          <Route path="/food-preferences" element={<FoodPreferences />} />
          <Route path="/dietary-restrictions" element={<DietaryRestrictions />} />
          <Route path="/lifestyle" element={<Lifestyle />} />
          <Route path="/health-goals" element={<HealthGoals />} />
          <Route path="/household" element={<HouseholdSetup />} />
          <Route path="/home" element={<HomeDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
