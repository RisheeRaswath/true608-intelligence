import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Shield, LogOut, Activity, Wrench, Radar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import FieldShield from "@/components/FieldShield";
import ControlTower from "@/components/ControlTower";

type ViewMode = "tower" | "field";

const Dashboard = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("tower");
  const { toast } = useToast();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        // Weld users back to the orange Auth gate if no session
        window.location.replace("/#/app");
      } else {
        setUserEmail(session.user.email?.split("@")[0].toUpperCase() || "OPERATOR");
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "TERMINATED", description: "Secure session ended." });
    window.location.replace("/#/");
  };

  if (loading) {
    return <div className="min-h-screen bg-[#F97316] selection:bg-black/20" />;
  }

  return (
    <div className="min-h-screen bg-[#F97316] text-black font-sans selection:bg-black/20">
      {/* ORANGE REALM NAVIGATION */}
      <nav className="border-b border-black/20 bg-[#F97316]/95 backdrop-blur-sm p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 border border-black/40 bg-black/10">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-black tracking-[0.3em] uppercase">True608 Tactical Vault</p>
            <h1 className="text-xl font-black tracking-tight uppercase">
              OPERATOR: <span className="underline decoration-black/60">{userEmail}</span>
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "tower" ? "default" : "outline"}
            size="sm"
            className="rounded-none border-black/40 bg-black text-[#F97316] hover:bg-black/90"
            onClick={() => setViewMode("tower")}
          >
            <Radar className="w-4 h-4 mr-1" />
            CONTROL TOWER
          </Button>
          <Button
            variant={viewMode === "field" ? "default" : "outline"}
            size="sm"
            className="rounded-none border-black/40 bg-black text-[#F97316] hover:bg-black/90"
            onClick={() => setViewMode("field")}
          >
            <Wrench className="w-4 h-4 mr-1" />
            FIELD-SHIELD
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="ml-2 text-black hover:text-black hover:bg-black/10 rounded-none font-bold tracking-widest text-[10px]"
          >
            <LogOut className="w-4 h-4 mr-2" /> EXIT VAULT
          </Button>
        </div>
      </nav>

      {/* ORANGE REALM BODY */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-10 space-y-6">
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          <div className="md:col-span-2">
            {viewMode === "tower" ? (
              <div className="bg-black text-[#F97316] border border-black/40 p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-[10px] font-black tracking-[0.4em] uppercase text-[#F97316]/70">
                      CONTROL TOWER ONLINE
                    </p>
                    <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase">
                      FEDERAL COMPLIANCE STACK
                    </h2>
                  </div>
                  <Activity className="w-10 h-10 text-[#F97316] animate-pulse" />
                </div>
                {/* Inject the full ControlTower intelligence view */}
                <ControlTower
                  onEnterFieldMode={() => setViewMode("field")}
                />
              </div>
            ) : (
              <div className="bg-black text-[#F97316] border border-black/40 p-4 md:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                <p className="text-[10px] font-black tracking-[0.4em] uppercase text-[#F97316]/70 mb-3">
                  FIELD MODE: ACTIVE
                </p>
                {/* Deploy the FieldShield scanner HUD */}
                <FieldShield onBack={() => setViewMode("tower")} />
              </div>
            )}
          </div>

          {/* SIDE STATUS COLUMN */}
          <aside className="space-y-4">
            <div className="bg-black text-[#F97316] border border-black/40 p-4 md:p-5">
              <p className="text-[10px] font-black tracking-[0.4em] uppercase text-[#F97316]/70 mb-2">
                SYSTEM STATUS
              </p>
              <p className="text-2xl font-black uppercase leading-tight">EPA AIM ACT 2026</p>
              <p className="text-xs font-bold uppercase tracking-[0.25em] mt-2 text-[#F97316]/80">
                40 CFR PART 84 • TRUE608 INTEL
              </p>
            </div>
            <div className="bg-black text-[#F97316] border border-black/40 p-4 md:p-5">
              <p className="text-[10px] font-black tracking-[0.4em] uppercase text-[#F97316]/70 mb-2">
                VAULT NOTE
              </p>
              <p className="text-xs font-bold uppercase leading-relaxed text-[#F97316]/85">
                Every logged pound is timestamped and GPS-locked. Treat this view as your last line of defense
                before an EPA audit.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;