import { useState } from "react";
import { FileText, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const PDFSection = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [email, setEmail] = useState("");

  const handleDownloadPDF = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    toast({
      title: "PDF Sent",
      description: "Check your inbox for the compliance worksheet.",
    });
    setIsDialogOpen(false);
    setEmail("");
    
    // Trigger actual download
    const link = document.createElement("a");
    link.href = "/guide.pdf";
    link.download = "2026-Audit-Worksheet.pdf";
    link.click();
  };

  return (
    <section id="compliance-manual" className="py-20 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-muted-foreground" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-foreground mb-4">
            The Manual Compliance Protocol
          </h2>
          <p className="text-sm text-muted-foreground uppercase tracking-widest mb-6">
            Free Resource
          </p>

          <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
            For firms choosing not to automate: Download the official 40 CFR Part 84 Worksheet.
          </p>

          <div className="flex items-center justify-center gap-2 text-sm text-destructive mb-8">
            <AlertTriangle className="w-4 h-4" />
            <span>Warning: Manual calculation requires 4+ hours of labor per month.</span>
          </div>

          <Button
            variant="outline"
            size="lg"
            className="border-2 border-border hover:border-muted-foreground px-8 py-6 text-base"
            onClick={() => setIsDialogOpen(true)}
          >
            <FileText className="w-5 h-5 mr-2" />
            Download 2026 Audit Worksheet (PDF)
          </Button>
        </div>
      </div>

      {/* Email Capture Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              Download Compliance Worksheet
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleDownloadPDF} className="space-y-4 mt-4">
            <p className="text-sm text-muted-foreground">
              Enter your email to receive the official 40 CFR Part 84 manual worksheet.
            </p>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-secondary border-border"
              required
            />
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              Send PDF to Email
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PDFSection;
