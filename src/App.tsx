import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom"; // Changed to HashRouter
import Index from "./pages/Index";
import Auth from "./pages/Auth"; 
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter> {/* Changed to HashRouter */}
        <Routes>
          {/* true608.com/#/ -> Marketing Page */}
          <Route path="/" element={<Index />} /> 
          
          {/* true608.com/#/app -> Orange Login Page */}
          <Route path="/app" element={<Auth />} /> 
          
          {/* true608.com/#/app/dashboard -> The Asset */}
          <Route path="/app/dashboard" element={<Dashboard />} />
          
          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;