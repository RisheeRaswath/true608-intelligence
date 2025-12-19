import { Shield, Lock, Server } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">True608 Intelligence</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span>256-bit Encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4" />
              <span>SOC 2 Compliant</span>
            </div>
            <span>40 CFR Part 84 Ready</span>
          </div>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} True608 Intelligence
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
