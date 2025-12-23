import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

// 1. THE BYPASS: We add '?' to make these props optional
interface NavbarProps {
  userEmail?: string | null;
  handleLogout?: () => void;
}

// 2. THE DEFAULT VALUES: If no data comes in, we assume "Guest Mode"
const Navbar = ({ userEmail = null, handleLogout = () => {} }: NavbarProps) => {
  
  const scrollToPricing = () => {
    const element = document.getElementById('investment-tiers');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="border-b border-white/10 bg-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <img src="/logo.png" alt="TRUE608" className="h-7 w-auto object-contain" />
        
        <div className="flex items-center gap-8">
          <button 
            onClick={scrollToPricing}
            className="hidden md:block text-[10px] font-mono text-white/40 hover:text-blue-600 uppercase tracking-[0.3em] transition-all cursor-pointer font-black"
          >
            INVESTMENT TIERS
          </button>

          {/* LOGIC: Only show Access ID if a user actually exists */}
          <span className="hidden lg:block text-[10px] font-mono text-white/20 uppercase tracking-[0.3em]">
            ACCESS ID: {userEmail ? `${userEmail}@608.SECURE` : "GUEST.NODE"}
          </span>
          
          {/* LOGIC: Only show Logout if a user exists. Otherwise show Login? 
              For now, we keep it simple to fix the build. */}
          {userEmail && (
            <Button 
              variant="ghost" 
              size="sm" 
              // 3. THE CSS FIX: Removed 'hover:text-white' to stop the conflict. Kept Blue.
              className="text-white/40 hover:text-blue-600 hover:bg-blue-600/20 font-bold tracking-tighter" 
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" /> TERMINATE
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;