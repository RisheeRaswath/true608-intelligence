import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, User, Plus, Shield, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface Record {
  id: string;
  timestamp: string;
  technician: string;
  gasType: string;
  netWeight: number;
  status: "SECURED";
}

const mockRecords: Record[] = [
  { id: "1", timestamp: "2024-12-15 14:32:18", technician: "J. Martinez", gasType: "R-410A", netWeight: 12.5, status: "SECURED" },
  { id: "2", timestamp: "2024-12-14 09:15:42", technician: "S. Williams", gasType: "R-22", netWeight: 8.0, status: "SECURED" },
  { id: "3", timestamp: "2024-12-14 08:22:09", technician: "J. Martinez", gasType: "R-134A", netWeight: 4.2, status: "SECURED" },
  { id: "4", timestamp: "2024-12-13 16:45:33", technician: "M. Johnson", gasType: "R-410A", netWeight: 15.0, status: "SECURED" },
  { id: "5", timestamp: "2024-12-12 11:28:57", technician: "S. Williams", gasType: "R-407C", netWeight: 6.8, status: "SECURED" },
];

const Dashboard = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState<Record[]>(mockRecords);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newRecord, setNewRecord] = useState({
    technician: "",
    gasType: "",
    netWeight: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        setLoading(false);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed Out",
      description: "Session terminated securely.",
    });
    navigate("/");
  };

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const timestamp = now.toISOString().replace("T", " ").substring(0, 19);
    
    const record: Record = {
      id: Date.now().toString(),
      timestamp,
      technician: newRecord.technician,
      gasType: newRecord.gasType,
      netWeight: Number(newRecord.netWeight),
      status: "SECURED",
    };
    setRecords([record, ...records]);
    setNewRecord({ technician: "", gasType: "", netWeight: "" });
    setIsDialogOpen(false);
    toast({
      title: "Record Encrypted",
      description: "Compliance log secured in vault.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Initializing secure session...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-semibold text-foreground">True608 Vault</h1>
              <p className="text-xs text-muted-foreground">Federal Compliance Layer</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              <span>{user?.email}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-border"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Status Banner */}
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-8 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-accent" />
          <span className="text-accent font-medium">COMPLIANCE SECURED</span>
          <span className="text-muted-foreground text-sm">
            — All records encrypted and vault-protected
          </span>
        </div>

        {/* Records Table */}
        <div className="bg-card border border-border rounded-lg">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold text-foreground">Compliance Records</h2>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  New Record
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-border">
                <DialogHeader>
                  <DialogTitle className="text-foreground">Add Compliance Record</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddRecord} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Technician</label>
                    <Input
                      value={newRecord.technician}
                      onChange={(e) => setNewRecord({ ...newRecord, technician: e.target.value })}
                      placeholder="Technician name"
                      className="bg-secondary border-border"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Gas Type</label>
                    <Select
                      value={newRecord.gasType}
                      onValueChange={(value) => setNewRecord({ ...newRecord, gasType: value })}
                    >
                      <SelectTrigger className="bg-secondary border-border">
                        <SelectValue placeholder="Select refrigerant" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="R-410A">R-410A</SelectItem>
                        <SelectItem value="R-22">R-22</SelectItem>
                        <SelectItem value="R-134A">R-134A</SelectItem>
                        <SelectItem value="R-407C">R-407C</SelectItem>
                        <SelectItem value="R-32">R-32</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Net Weight (lbs)</label>
                    <Input
                      type="number"
                      step="0.1"
                      value={newRecord.netWeight}
                      onChange={(e) => setNewRecord({ ...newRecord, netWeight: e.target.value })}
                      placeholder="0.0"
                      className="bg-secondary border-border"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Encrypt & Save
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground font-medium">TIMESTAMP</TableHead>
                  <TableHead className="text-muted-foreground font-medium">TECHNICIAN</TableHead>
                  <TableHead className="text-muted-foreground font-medium">GAS TYPE</TableHead>
                  <TableHead className="text-muted-foreground font-medium text-right">NET WEIGHT</TableHead>
                  <TableHead className="text-muted-foreground font-medium">STATUS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((record) => (
                  <TableRow key={record.id} className="border-border">
                    <TableCell className="font-mono text-sm text-foreground">{record.timestamp}</TableCell>
                    <TableCell className="text-foreground">{record.technician}</TableCell>
                    <TableCell className="text-foreground">{record.gasType}</TableCell>
                    <TableCell className="font-mono text-foreground text-right tabular-nums">
                      {record.netWeight.toFixed(1)} lbs
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        {record.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
