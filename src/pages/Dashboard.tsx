import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ShieldCheck, Lock, Zap, MessageSquare, AlertTriangle, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      } else {
        // Personalization: Take the name before the '@'
        const email = session.user.email;
        setUserEmail(email?.split('@')[0].toUpperCase() || "TECHNICIAN");
        setLoading(false);
      }
    };
    checkUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "Session Terminated", description: "Secure logout successful." });
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="text-red-500 font-mono animate-pulse uppercase tracking-widest">
          Initializing Secure Session...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-red-500/30">
      {/* Top Navigation */}
      <nav className="border-b border-slate-800 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center font-bold text-white shadow-lg shadow-red-900/20">608</div>
            <span className="font-bold tracking-tighter text-xl">TRUE<span className="text-red-500">608</span></span>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center gap-2 text-xs font-mono text-slate-500">
              <User className="w-3 h-3" />
              <span>{userEmail}@TRUE608.SECURE</span>
            </div>
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" /> Log Out
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Header HUD */}
        <div className="mb-12 border-l-4 border-red-600 pl-6 py-2">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-2">
            Welcome, <span className="text-red-500">{userEmail}</span>
          </h1>
          <p className="text-slate-400 font-mono text-sm uppercase tracking-widest">
            Protocol Status: <span className="text-green-500 animate-pulse">Priority-1 Queue Active</span>
          </p>
        </div>

        {/* The Grid of Hope */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-xl">
            <Lock className="w-8 h-8 text-red-500 mb-4" />
            <h3 className="font-bold mb-2">Vault Security</h3>
            <p className="text-sm text-slate-400">Your cylinder data will be secured with AES-256 encryption. We handle the technical load; you handle the business.</p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-xl">
            <ShieldCheck className="w-8 h-8 text-red-500 mb-4" />
            <h3 className="font-bold mb-2">EPA Part 84</h3>
            <p className="text-sm text-slate-400">HFC Allowance tracking activates on January 1st. Your firm is registered for the automated reporting cycle.</p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-xl">
            <Zap className="w-8 h-8 text-red-500 mb-4" />
            <h3 className="font-bold mb-2">The Shield Engine</h3>
            <p className="text-sm text-slate-400">Eliminating the 4-6 hours/month of manual compliance labor. You fix the units; we fix the paperwork.</p>
          </div>
        </div>

        {/* System Briefing Section */}
        <section className="bg-red-950/10 border border-red-900/20 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <AlertTriangle className="text-red-500" /> SYSTEM BRIEFING: JAN 1ST LAUNCH
          </h2>
          <div className="space-y-4 text-slate-300">
            <p>True608 Intelligence is currently in <strong>Final Calibration</strong>. We are building the most secure refrigerant tracking engine in the industry.</p>
            <p><strong>Check your inbox:</strong> A Welcome Briefing has been dispatched. It contains the technical roadmap and how we protect your business from the $44,539/day liability risk.</p>
          </div>
        </section>

        {/* Contact/Support */}
        <div className="text-center bg-slate-900/20 py-12 rounded-2xl border border-dashed border-slate-800">
          <MessageSquare className="w-12 h-12 text-slate-700 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Questions for HQ?</h2>
          <p className="text-slate-400 mb-6 font-mono text-sm">SECURE COMMS: HQ@TRUE608.COM</p>
          <Button 
            className="bg-red-600 hover:bg-red-700 text-white px-8"
            onClick={() => window.location.href = 'mailto:hq@true608.com'}
          >
            MESSAGE THE FOUNDER
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;