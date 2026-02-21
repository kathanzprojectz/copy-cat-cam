import { Home as HomeIcon, CalendarDays, Package, BookOpen, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const tabs = [
  { icon: HomeIcon, label: "Home", path: "/home" },
  { icon: CalendarDays, label: "Plan", path: "/home" },
  { icon: Package, label: "Inventory", path: "/home" },
  { icon: BookOpen, label: "Recipes", path: "/home" },
  { icon: User, label: "Profile", path: "/home" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="max-w-md mx-auto flex justify-around py-2">
        {tabs.map((tab, i) => {
          const active = i === 0 && location.pathname === "/home";
          return (
            <button
              key={tab.label}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 text-xs font-medium transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
