import { Link, useLocation } from "react-router-dom"; // Added useLocation
import { LogIn, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const location = useLocation();

  // Function to handle "Home" click behavior
  const handleLogoClick = () => {
    // If we are already on the home page, just scroll to top
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // If we are on another page (like /auth), the <Link> component handles the routing automatically
  };

  const scrollToSection = (sectionId: string) => {
    // If we are NOT on home page, we need to go there first (this is a simple implementation, 
    // for now we assume nav links are mostly used on home)
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else if (location.pathname !== "/") {
      // Optional: Redirect to home then scroll (requires more logic, usually handled by a wrapper)
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* --- THE LOGO + BRAND NAME (Clickable Home Link) --- */}
        <Link 
          to="/" 
          onClick={handleLogoClick}
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity group"
        >
          {/* Logo Image */}
          <img 
            src="/logo.png" 
            alt="True608 HQ" 
            className="h-9 w-auto object-contain group-hover:scale-105 transition-transform" 
          />
          
          {/* Brand Name */}
          <span className="text-xl font-bold text-white tracking-tight leading-none">
            True608
          </span>
        </Link>

        {/* --- NAVIGATION & BUTTONS (Right Side) --- */}
        <div className="flex items-center gap-6">
          
          {/* Teleport Links */}
          <nav className="hidden md:flex items-center gap-6 mr-4">
            <button
              onClick={() => scrollToSection("liability-audit")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Liability Audit
            </button>
            <button
              onClick={() => scrollToSection("compliance-manual")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Compliance Manual
            </button>
            <button
              onClick={() => scrollToSection("the-shield")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              The Shield
            </button>
          </nav>

          {/* Action Buttons */}
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

      </div>
    </header>
  );
};

export default Navbar;