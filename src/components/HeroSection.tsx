import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const scrollToCalculator = () => {
    document.getElementById("liability-audit")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground max-w-4xl mx-auto leading-tight mb-6">
          The Only Verified Legal Defense for HVAC Inventory
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          General software manages your schedule. True608 manages your freedom.
          Ensure 40 CFR Part 84 compliance before the audit hits.
        </p>
        <Button
          size="lg"
          onClick={scrollToCalculator}
          className="bg-primary hover:bg-primary/90 text-lg px-8 py-6"
        >
          Start Instant Audit
          <ArrowDown className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
