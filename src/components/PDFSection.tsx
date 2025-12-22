import { FileText, AlertTriangle, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

const PDFSection = () => {
  // THE DIRECT STRIKE: Bypasses Dialogs, Bypasses Databases.
  const handleDownloadPDF = () => {
    const link = document.createElement("a");
    // Ensure your PDF is in the public folder with this exact name
    link.href = "/TRUE608_TIER1_BAIT.pdf"; 
    link.download = "TRUE608_2026_Risk_Briefing.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section 
      id="compliance-manual" 
      className="py-16 md:py-24 bg-slate-950 border-y border-red-900/30 relative overflow-hidden"
    >
      {/* TACTICAL VISUAL OVERLAY */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-950/20 via-slate-950 to-slate-950 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-900/80 backdrop-blur-sm border border-red-800/50 rounded-2xl p-6 md:p-12 shadow-[0_0_50px_rgba(220,38,38,0.15)] text-center">
            
            {/* STATUS BADGE */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/50 border border-red-500/30 text-red-400 font-mono text-[10px] sm:text-xs mb-6 sm:mb-8">
              <ShieldAlert className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>FEDERAL COMPLIANCE WARNING</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4 sm:mb-6 tracking-tight leading-tight uppercase">
              The Manual <br className="sm:hidden" /> "Hard Way" Protocol
            </h2>
            
            <p className="text-sm sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-6 sm:mb-8">
              For firms choosing not to automate: Download the official <span className="text-slate-200 font-semibold">40 CFR Part 84 Survival Blueprint</span>.
            </p>

            {/* THE THREAT INDICATOR */}
            <div className="bg-red-950/30 border border-red-900/50 rounded-lg p-3 sm:p-4 mb-8 sm:mb-10 max-w-lg mx-auto">
              <p className="text-red-400 font-bold text-xs sm:text-base flex items-center justify-center gap-2">
                <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                Liability: $44,539/day fine potential.
              </p>
            </div>

            {/* THE ONE-CLICK BUTTON */}
            <Button
              variant="default"
              size="lg"
              className="w-full sm:w-auto bg-white text-slate-950 hover:bg-slate-200 font-black py-6 sm:py-8 px-4 sm:px-10 text-sm sm:text-lg rounded-xl transition-all hover:scale-[1.02] shadow-xl shadow-red-600/10"
              onClick={handleDownloadPDF}
            >
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-red-600 shrink-0" />
              <span className="truncate uppercase tracking-tighter">Download 2026 Risk Briefing</span>
            </Button>

            <p className="text-[10px] text-slate-500 mt-6 font-mono tracking-wide uppercase">
              Encryption: Secure // Access: Public // Node: True608-Alpha
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PDFSection;