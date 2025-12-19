import { useNavigate } from "react-router-dom";
import { FileText, Shield, Clock, AlertTriangle, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const PricingChoice = () => {
  const navigate = useNavigate();

  const scrollToManual = () => {
    document.getElementById("compliance-manual")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="the-shield" className="py-20 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-3">
            Choose Your Compliance Path
          </h2>
          <p className="text-muted-foreground">
            Manual tracking vs. automated protection
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Manual Path */}
          <div className="bg-card border border-border rounded-lg p-6 md:p-8 relative">
            <div className="absolute top-4 right-4">
              <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded">
                FREE
              </span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">The Hard Way</h3>
            </div>

            <p className="text-muted-foreground text-sm mb-6">
              Official Manual Worksheet for 40 CFR Part 84 compliance documentation.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Takes ~4 hours/month</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                <span>High audit risk</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <X className="w-4 h-4 text-destructive" />
                <span>Manual calculations</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <X className="w-4 h-4 text-destructive" />
                <span>No encryption</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full border-border"
              onClick={scrollToManual}
            >
              View Manual Option
            </Button>
          </div>

          {/* Automated Path */}
          <div className="bg-card border-2 border-primary rounded-lg p-6 md:p-8 relative">
            <div className="absolute top-4 right-4">
              <span className="text-xs font-medium text-primary-foreground bg-primary px-2 py-1 rounded">
                RECOMMENDED
              </span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">The Smart Way</h3>
                <p className="text-sm text-muted-foreground">True608 Intelligence</p>
              </div>
            </div>

            <p className="text-2xl font-bold text-foreground mb-1">
              $299<span className="text-base font-normal text-muted-foreground">/month</span>
            </p>
            <p className="text-muted-foreground text-sm mb-6">
              Automated compliance with federal-grade security.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Check className="w-4 h-4 text-accent" />
                <span>Automated encryption</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Check className="w-4 h-4 text-accent" />
                <span>Zero-math logging</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Check className="w-4 h-4 text-accent" />
                <span>3-year secure vault</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Check className="w-4 h-4 text-accent" />
                <span>Audit-ready reports</span>
              </div>
            </div>

            <Button
              className="w-full bg-primary hover:bg-primary/90"
              onClick={() => navigate("/auth?signup=true")}
            >
              Secure My Business
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingChoice;
