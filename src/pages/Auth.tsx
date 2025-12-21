import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Shield, Mail, Lock, ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const [isSignUp, setIsSignUp] = useState(searchParams.get("signup") === "true");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // THE BIFROST REDIRECT: Watch for session changes and teleport user
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        console.log("Authentication event:", event);
        navigate("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        // PROTOCOL: Create Account
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        if (data.user && data.session) {
            // If email confirmation is OFF, they go straight in
            toast({
              title: "IDENTITY VERIFIED",
              description: "Access granted. Entering Command Center...",
            });
            navigate("/dashboard");
        } else {
            // Fallback for verification
            toast({
              title: "PROTOCOL INITIATED",
              description: "Check your email to verify your firm's credentials.",
            });
        }
      } else {
        // PROTOCOL: Access Vault (Login)
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast({
        title: "SECURITY ALERT",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col font-sans selection:bg-red-500/30">
      {/* High-Authority Header */}
      <header className="border-b border-slate-800 bg-black/40 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="text-slate-400 hover:text-white hover:bg-slate-800/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            RETURN TO HQ
          </Button>
        </div>
      </header>

      {/* Auth HUD */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm bg-slate-900/40 border border-slate-800 p-8 rounded-2xl backdrop-blur-sm shadow-2xl shadow-black">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-red-600/10 border border-red-500/20 rounded-xl mb-4 shadow-inner">
              <Shield className="w-7 h-7 text-red-500" />
            </div>
            <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">
              {isSignUp ? "Initialize" : "Authenticate"}
            </h1>
            <p className="text-slate-500 text-xs font-mono uppercase tracking-widest mt-2">
              {isSignUp ? "Secure Firm Registration" : "Encrypted Vault Access"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Personnel Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <Input
                  type="email"
                  placeholder="name@firm.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-black/50 border-slate-800 focus:border-red-500/50 text-slate-200 pl-10 h-12 rounded-lg transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Access Cipher</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-black/50 border-slate-800 focus:border-red-500/50 text-slate-200 pl-10 h-12 rounded-lg transition-all"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold h-12 rounded-lg shadow-lg shadow-red-900/20 transition-all active:scale-95 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                isSignUp ? "CREATE SECURE ACCOUNT" : "UNLOCK VAULT"
              )}
            </Button>
          </form>

          <div className="mt-8 text-center border-t border-slate-800 pt-6">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs font-mono text-slate-500 hover:text-red-400 transition-colors uppercase tracking-tight"
            >
              {isSignUp
                ? "Already Registered? Switch to Secure Login"
                : "New Firm? Initialize Compliance ID"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Auth;