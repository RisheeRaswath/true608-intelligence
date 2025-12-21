import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

// The Intelligence Engine
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* Visual Feedback Systems */}
      <Toaster />
      <Sonner />
      
      <BrowserRouter>
        <Routes>
          {/* Public Landing: The Trap */}
          <Route path="/" element={<Index />} />
          
          {/* Identity Verification: The Gate */}
          <Route path="/auth" element={<Auth />} />
          
          {/* Secure Command Center: The Vault */}
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Protocol Failure: 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;