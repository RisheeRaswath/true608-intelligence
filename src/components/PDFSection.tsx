import { useState } from "react";
import { FileText, AlertTriangle, ArrowRight, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const PDFSection = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [email, setEmail] = useState("");

  const handleDownloadPDF = (e: React.FormEvent) => {
    e.preventDefault(); // Stop the form from refreshing the page
    if (!email) return;

    // 1. Success Message
    toast({
      title: "Secure Protocol Sent",
      description: "The official compliance worksheet is downloading...",
    });

    // 2. Close Modal
    setIsDialogOpen(false);
    setEmail("");
    
    // 3. TRIGGER THE DOWNLOAD (Only happens here)
    const link = document.createElement("a");
    link.href = "/blueprint.pdf";
    link.download = "True608_Survival_Protocol_2026.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="compliance-manual" className="py-24 bg-slate-950 border-y border-red-900/30 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-950/20 via-slate-950 to-slate-950 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          
          {/* The "Trap" Card */}
          <div className="bg-slate-900/80 backdrop-blur-sm border border-red-800/50 rounded-2xl p-8 md:p-12 shadow-[0_0_50px_rgba(220,38,38,0.15)] text-center">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/50 border border-red-500/30 text-red-400 font-mono text-sm mb-8">
              <ShieldAlert className="w-4 h-4" />
              <span>FEDERAL COMPLIANCE WARNING</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              The Manual "Hard Way" Protocol
            </h2>
            
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-8">
              For firms choosing not to automate: Download the official <span className="text-slate-200 font-semibold">40 CFR Part 84 Survival Blueprint</span>.
            </p>

            <div className="bg-red-950/30 border border-red-900/50 rounded-lg p-4 mb-10 max-w-lg mx-auto">
              <p className="text-red-400 font-bold text-sm md:text-base flex items-center justify-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                WARNING: Manual errors carry a $44,539/day fine liability.
              </p>
            </div>

            {/* --- THE FIX: This is JUST a button. No 'href', no '<a>' tag. --- */}
            <Button
              variant="default"
              size="lg"
              className="bg-white text-slate-950 hover:bg-slate-200 font-bold py-8 px-10 text-lg rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all hover:scale-[1.02] cursor-pointer"
              onClick={() => setIsDialogOpen(true)}
            >
              <FileText className="w-5 h-5 mr-3 text-red-600" />
              DOWNLOAD SURVIVAL BLUEPRINT (PDF)
            </Button>

            <p className="text-xs text-slate-500 mt-6 font-mono tracking-wide uppercase">
              Est. manual labor time: 4-6 hours/month
            </p>
          </div>
        </div>
      </div>

      {/* Email Capture Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-slate-900 border border-red-900/50 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-red-500" />
              Download Secure Protocol
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Enter your email to receive the official 2026 Audit Worksheet.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleDownloadPDF} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="technician@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6">
              Send PDF to Email <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <p className="text-[10px] text-slate-600 text-center">
              Your email is secure. We do not sell data to the EPA.
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PDFSection;