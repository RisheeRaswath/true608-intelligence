import { Link } from "react-router-dom";
import { Shield, LogIn, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <button onClick={scrollToTop} className="flex items-center gap-3 cursor-pointer">
          <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <span className="font-semibold text-foreground text-lg">True608</span>
        </button>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection("liability-audit")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Liability Audit
          </button>
          <button
            onClick={() => scrollToSection("compliance-manual")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Compliance Manual
          </button>
          <button
            onClick={() => scrollToSection("the-shield")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            The Shield
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-muted-foreground hover:text-foreground"
          >
            <Link to="/auth">
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </Link>
          </Button>
          <Button
            size="sm"
            asChild
            className="bg-primary hover:bg-primary/90"
          >
            <Link to="/auth?signup=true">
              <Lock className="w-4 h-4 mr-2" />
              Get Protected
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
