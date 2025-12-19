import { Link, useNavigate } from "react-router-dom";
import { Shield, LogIn, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-14 z-40">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <span className="font-semibold text-foreground text-lg">True608</span>
        </Link>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/auth")}
            className="text-muted-foreground hover:text-foreground"
          >
            <LogIn className="w-4 h-4 mr-2" />
            Login
          </Button>
          <Button
            size="sm"
            onClick={() => navigate("/auth?signup=true")}
            className="bg-primary hover:bg-primary/90"
          >
            <Lock className="w-4 h-4 mr-2" />
            Get Protected
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
