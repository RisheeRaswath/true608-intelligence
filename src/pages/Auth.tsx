import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, LogIn, UserPlus, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

// BEAUTIFUL VALIDATION SCHEMA
const emailSchema = z.string().trim().email({ message: "Invalid email address" });
const passwordSchema = z.string().min(6, { message: "Password must be at least 6 characters" });

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        window.location.replace("/#/app/dashboard");
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        window.location.replace("/#/app/dashboard");
      } else {
        const { error } = await supabase.auth.signUp({ 
          email, 
          password, 
          options: { data: { full_name: fullName } } 
        });
        if (error) throw error;
        toast({ title: "ACCOUNT CREATED", description: "CHECK EMAIL FOR ACCESS LINK." });
      }
    } catch (err: any) {
      toast({ title: "SECURITY ALERT", description: err.message.toUpperCase(), variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 selection:bg-[#F97316]">
      {/* RETURN TO HQ BUTTON */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => window.location.href = "/#/"}
        className="absolute top-8 left-8 text-zinc-500 hover:text-[#F97316]"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> RETURN TO HQ
      </Button>

      {/* BEAUTIFUL LOVABLE LOGO */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded bg-[#F97316]/20 border-2 border-[#F97316]/40">
          <Shield className="w-8 h-8 text-[#F97316]" />
        </div>
        <div className="text-left">
          <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-white">
            TRUE<span className="text-[#F97316]">608</span>
          </h1>
          <p className="text-[10px] text-zinc-500 uppercase tracking-[0.4em] font-bold">Intelligence</p>
        </div>
      </div>

      {/* INDUSTRIAL AUTH CARD */}
      <div className="w-full max-w-md bg-zinc-950 border border-zinc-900 p-8 space-y-6 shadow-2xl">
        <div className="text-center">
          <h2 className="text-xl font-black text-white tracking-widest uppercase">
            {isLogin ? 'OPERATOR LOGIN' : 'CREATE ACCOUNT'}
          </h2>
          <div className="w-12 h-1 bg-[#F97316] mx-auto mt-4"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Full Name</Label>
              <Input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="bg-black border-zinc-800 text-white rounded-none h-12"
                required={!isLogin}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Personnel Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-black border-zinc-800 text-white rounded-none h-12"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Access Cipher</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-black border-zinc-800 text-white rounded-none h-12"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#F97316] hover:bg-white text-black font-black h-14 rounded-none transition-all tracking-widest"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'PROCESSING...' : isLogin ? 'LOGIN' : 'INITIALIZE'}
          </Button>
        </form>

        <div className="border-t border-zinc-900 pt-6">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="w-full text-center text-[10px] font-black text-zinc-500 hover:text-[#F97316] uppercase tracking-widest transition-colors"
          >
            {isLogin ? "NEW OPERATOR? REGISTER" : 'EXISTING PERSONNEL? LOGIN'}
          </button>
        </div>
      </div>

      <p className="mt-8 text-[9px] text-zinc-700 font-bold uppercase tracking-[0.3em]">
        EPA AIM Act 2026 Compliant • 40 CFR Part 84
      </p>
    </div>
  );
};

export default Auth;