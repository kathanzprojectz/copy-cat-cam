import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/welcome");
  };

  return (
    <div className="app-container flex flex-col items-center bg-background px-6 pt-12 pb-8">
      {/* Logo */}
      <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center mb-4">
        <span className="text-4xl">🍳</span>
      </div>

      <h1 className="text-3xl font-bold text-foreground mb-1">MealMate</h1>
      <p className="text-muted-foreground text-lg mb-8">Welcome back! Sign in to continue</p>

      {/* Form Card */}
      <div className="w-full bg-card rounded-3xl p-6 shadow-sm animate-fade-in">
        <form onSubmit={handleSignIn} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-input/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-input/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="text-right">
            <button type="button" className="text-primary font-medium text-sm">
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg shadow-lg shadow-primary/25 active:scale-[0.98] transition-transform"
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-muted-foreground text-sm">or continue with</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <button className="w-full py-3.5 rounded-2xl border border-border flex items-center justify-center gap-3 text-foreground font-medium active:scale-[0.98] transition-transform">
          <span className="text-xl">G</span>
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;
