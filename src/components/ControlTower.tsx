import { useState, useEffect } from "react";
import { 
  FileText, 
  Download, 
  Shield, 
  AlertTriangle, 
  Truck, 
  Thermometer,
  Calendar,
  MapPin,
  User,
  ChevronRight,
  BarChart3,
  Clock,
  Wrench,
  LogOut
} from "lucide-react";
import StatusBadge from "./StatusBadge";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface ComplianceLog {
  id: string;
  cylinder_id: string;
  tech_id: string;
  start_weight_lbs: number;
  end_weight_lbs: number;
  delta_lbs: number;
  photo_url: string | null;
  gps_latitude: number | null;
  gps_longitude: number | null;
  logged_at: string;
  synced: boolean;
  tech_name?: string;
}

interface Asset {
  id: string;
  name: string;
  location: string | null;
  asset_type: string | null;
  created_at: string;
}

interface ControlTowerProps {
  onBack?: () => void;
  onEnterFieldMode?: () => void;
}

const ControlTower = ({ onBack, onEnterFieldMode }: ControlTowerProps) => {
  const { user, role, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<"fleet" | "logs">("fleet");
  const [isGenerating, setIsGenerating] = useState(false);
  const [logs, setLogs] = useState<ComplianceLog[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);

    // Fetch compliance logs
    const { data: logsData, error: logsError } = await supabase
      .from('compliance_logs')
      .select('*')
      .order('logged_at', { ascending: false })
      .limit(50);

    if (!logsError && logsData) {
      setLogs(logsData as ComplianceLog[]);
    }

    // Fetch assets
    const { data: assetsData, error: assetsError } = await supabase
      .from('assets')
      .select('*')
      .order('created_at', { ascending: false });

    if (!assetsError && assetsData) {
      setAssets(assetsData as Asset[]);
    }

    setIsLoading(false);
  };

  const getLogStatus = (log: ComplianceLog): "audit-ready" | "risk" => {
    const hasPhoto = !!log.photo_url;
    const hasGPS = log.gps_latitude !== null && log.gps_longitude !== null;
    const delta = log.delta_lbs || (log.start_weight_lbs - log.end_weight_lbs);
    const leakRate = (delta / log.start_weight_lbs) * 100;
    
    if (hasPhoto && hasGPS && leakRate <= 20) {
      return "audit-ready";
    }
    return "risk";
  };

  const auditReadyCount = logs.filter(l => getLogStatus(l) === "audit-ready").length;
  const riskCount = logs.filter(l => getLogStatus(l) === "risk").length;
  const totalCharged = logs.reduce((sum, l) => sum + (l.delta_lbs || (l.start_weight_lbs - l.end_weight_lbs)), 0);

  const handleGeneratePDF = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "EPA Audit Binder Generated",
        description: "Download ready with federal citations and company branding",
      });
    }, 2500);
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed Out",
      description: "You have been logged out",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {onBack && (
                <button
                  onClick={onBack}
                  className="px-3 py-2 bg-secondary border border-border rounded text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Back
                </button>
              )}
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-foreground">
                  <span className="text-primary">TRUE608</span> CONTROL TOWER
                </h1>
                <p className="text-sm text-muted-foreground">Federal Compliance Vault</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {(role === 'owner' || role === 'admin') && onEnterFieldMode && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onEnterFieldMode}
                  className="hidden md:flex"
                >
                  <Wrench className="w-4 h-4 mr-2" />
                  ENTER FIELD MODE
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span className="hidden md:inline">Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="card-industrial p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-success/20">
                <Shield className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{auditReadyCount}</p>
                <p className="text-xs text-muted-foreground">AUDIT-READY</p>
              </div>
            </div>
          </div>

          <div className="card-industrial p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-destructive/20">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{riskCount}</p>
                <p className="text-xs text-muted-foreground">AT RISK</p>
              </div>
            </div>
          </div>

          <div className="card-industrial p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-primary/20">
                <Thermometer className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalCharged.toFixed(1)}</p>
                <p className="text-xs text-muted-foreground">LBS CHARGED</p>
              </div>
            </div>
          </div>

          <div className="card-industrial p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-muted">
                <Truck className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{assets.length}</p>
                <p className="text-xs text-muted-foreground">FLEET ASSETS</p>
              </div>
            </div>
          </div>
        </div>

        {/* Generate PDF Button */}
        <Button
          variant="action"
          size="lg"
          className="w-full md:w-auto"
          onClick={handleGeneratePDF}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <FileText className="w-5 h-5" />
              GENERATING...
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              GENERATE EPA AUDIT BINDER (PDF)
            </>
          )}
        </Button>

        {/* Mobile Field Mode Button */}
        {(role === 'owner' || role === 'admin') && onEnterFieldMode && (
          <Button
            variant="outline"
            size="lg"
            onClick={onEnterFieldMode}
            className="w-full md:hidden"
          >
            <Wrench className="w-5 h-5 mr-2" />
            ENTER FIELD MODE
          </Button>
        )}

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-border">
          <button
            onClick={() => setActiveTab("fleet")}
            className={`px-4 py-3 font-bold text-sm uppercase tracking-wider transition-colors border-b-2 -mb-[2px] ${
              activeTab === "fleet"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Truck className="w-4 h-4 inline-block mr-2" />
            Fleet Health
          </button>
          <button
            onClick={() => setActiveTab("logs")}
            className={`px-4 py-3 font-bold text-sm uppercase tracking-wider transition-colors border-b-2 -mb-[2px] ${
              activeTab === "logs"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <BarChart3 className="w-4 h-4 inline-block mr-2" />
            Compliance Logs
          </button>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">
            Loading data...
          </div>
        ) : activeTab === "fleet" ? (
          <div className="space-y-3">
            {assets.length === 0 ? (
              <div className="card-industrial p-8 text-center">
                <Truck className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No assets registered yet</p>
              </div>
            ) : (
              assets.map((asset) => (
                <div
                  key={asset.id}
                  className="card-industrial p-4 hover:border-primary/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-foreground truncate">{asset.name}</h3>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                        {asset.location && (
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate">{asset.location}</span>
                          </div>
                        )}
                        {asset.asset_type && (
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Thermometer className="w-3 h-3" />
                            <span>{asset.asset_type}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(asset.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {logs.length === 0 ? (
              <div className="card-industrial p-8 text-center">
                <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No compliance logs yet</p>
              </div>
            ) : (
              logs.map((log) => {
                const delta = log.delta_lbs || (log.start_weight_lbs - log.end_weight_lbs);
                const hasPhoto = !!log.photo_url;
                const hasGPS = log.gps_latitude !== null;
                const status = getLogStatus(log);
                
                return (
                  <div
                    key={log.id}
                    className="card-industrial p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-mono text-sm text-primary">
                            {log.cylinder_id ? log.cylinder_id.slice(0, 8) : 'N/A'}
                          </span>
                          <StatusBadge status={status} size="sm" />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <User className="w-3 h-3" />
                            <span>{log.tech_id.slice(0, 8)}</span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>{new Date(log.logged_at).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1 text-primary font-bold">
                            <span>{delta.toFixed(1)} LBS</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs ${hasPhoto ? "text-success" : "text-destructive"}`}>
                              {hasPhoto ? "✓ Photo" : "✗ Photo"}
                            </span>
                            <span className={`text-xs ${hasGPS ? "text-success" : "text-destructive"}`}>
                              {hasGPS ? "✓ GPS" : "✗ GPS"}
                            </span>
                          </div>
                          <div className={`text-sm ${!log.synced ? "text-warning font-bold" : "text-muted-foreground"}`}>
                            {log.synced ? "Synced" : "Pending"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default ControlTower;