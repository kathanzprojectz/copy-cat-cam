import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, Leaf, Heart, Award, Users, Bell, Globe, Settings, HelpCircle, LogOut } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const stats = [
  { value: 24, label: "Recipes\nTried" },
  { value: 3, label: "Household" },
  { value: 18, label: "Days Streak" },
];

const preferences = [
  { icon: Leaf, label: "Diet Type", value: "Vegetarian, Healthy" },
  { icon: Heart, label: "Allergies", value: "Nuts, Dairy" },
  { icon: Award, label: "Cooking Level", value: "Intermediate" },
];

const settings = [
  { icon: Users, label: "Household Members", path: "/household" },
  { icon: Bell, label: "Notifications", path: null },
  { icon: Globe, label: "Language", path: "/language" },
  { icon: Settings, label: "App Settings", path: null },
  { icon: HelpCircle, label: "Help & Support", path: null },
];

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container bg-background min-h-screen pb-24">
      <div className="px-6 pt-6">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="text-foreground">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-foreground">Profile</h1>
        </div>

        {/* Profile Card */}
        <div className="bg-card rounded-3xl p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
              E
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Emil</h2>
              <p className="text-muted-foreground text-sm">emil@email.com</p>
              <span className="inline-block mt-1 px-3 py-1 rounded-full bg-muted text-foreground text-xs font-medium">
                Premium Member
              </span>
            </div>
          </div>
          <button className="w-full py-3 rounded-2xl border border-border text-foreground font-medium">
            Edit Profile
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="bg-card rounded-2xl p-4 text-center">
              <p className="text-2xl font-bold text-primary">{s.value}</p>
              <p className="text-xs text-muted-foreground whitespace-pre-line mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Preferences */}
        <h2 className="text-lg font-bold text-foreground mb-3">Your Preferences</h2>
        <div className="bg-card rounded-3xl divide-y divide-border mb-8">
          {preferences.map((p) => (
            <button
              key={p.label}
              onClick={() => {
                if (p.label === "Diet Type") navigate("/food-preferences");
                if (p.label === "Allergies") navigate("/dietary-restrictions");
                if (p.label === "Cooking Level") navigate("/lifestyle");
              }}
              className="w-full flex items-center gap-4 px-5 py-4"
            >
              <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                <p.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-foreground">{p.label}</p>
                <p className="text-sm text-muted-foreground">{p.value}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>

        {/* Settings */}
        <h2 className="text-lg font-bold text-foreground mb-3">Settings</h2>
        <div className="bg-card rounded-3xl divide-y divide-border mb-6">
          {settings.map((s) => (
            <button
              key={s.label}
              onClick={() => s.path && navigate(s.path)}
              className="w-full flex items-center gap-4 px-5 py-5"
            >
              <s.icon className="w-5 h-5 text-primary" />
              <span className="flex-1 text-left font-medium text-foreground">{s.label}</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>

        {/* Log Out */}
        <button
          onClick={() => navigate("/signin")}
          className="w-full py-4 rounded-2xl border border-primary text-primary font-medium flex items-center justify-center gap-2 mb-4"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
