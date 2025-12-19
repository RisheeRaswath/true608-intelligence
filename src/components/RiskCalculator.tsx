import { useState } from "react";
import { Calculator } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const RiskCalculator = () => {
  const [technicians, setTechnicians] = useState("");
  const [gasLbs, setGasLbs] = useState("");
  const [liability, setLiability] = useState<number | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!technicians || !gasLbs) return;
    
    // lbs * 0.15 (ghost gas) * $44,539/day fine rate
    const calc = Number(gasLbs) * 0.15 * 44539;
    setLiability(Math.floor(calc));
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <section id="calculator" className="py-20 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
              <Calculator className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Calculate Your Unseen Liability
            </h2>
            <p className="text-muted-foreground">
              Enter your fleet details to see potential EPA exposure
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 md:p-8">
            <form onSubmit={handleCalculate} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Number of Technicians
                </label>
                <Input
                  type="number"
                  placeholder="e.g., 5"
                  value={technicians}
                  onChange={(e) => setTechnicians(e.target.value)}
                  className="bg-secondary border-border h-12"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Annual Refrigerant Purchase (lbs)
                </label>
                <Input
                  type="number"
                  placeholder="e.g., 500"
                  value={gasLbs}
                  onChange={(e) => setGasLbs(e.target.value)}
                  className="bg-secondary border-border h-12"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 h-12 text-base"
                disabled={!technicians || !gasLbs}
              >
                Calculate Liability
              </Button>
            </form>

            {liability !== null && (
              <div className="mt-8 pt-8 border-t border-border text-center">
                <p className="text-sm text-muted-foreground uppercase tracking-wide mb-3">
                  Estimated Annual Liability
                </p>
                <div className="font-mono text-5xl md:text-6xl font-bold text-destructive mb-4">
                  {formatCurrency(liability)}
                </div>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  Based on average 15% "Ghost Gas" wastage at $44,539/day fine rate under EPA enforcement.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RiskCalculator;
