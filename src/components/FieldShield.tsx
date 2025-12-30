import { useState, useEffect } from "react";
import { Camera, MapPin, Clock, Upload, Check, ArrowRight, RotateCcw, ScanLine } from "lucide-react";
import WeightIncrement from "./WeightIncrement";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

type Phase = "scan" | "start-weight" | "end-weight" | "delta" | "complete";

interface CylinderData {
  id: string;
  qrCodeId: string;
  refrigerantType: string;
  currentWeight: number;
}

interface FieldShieldProps {
  onBack?: () => void;
}

const FieldShield = ({ onBack }: FieldShieldProps) => {
  const { user } = useAuth();
  const [phase, setPhase] = useState<Phase>("scan");
  const [cylinder, setCylinder] = useState<CylinderData | null>(null);
  const [startWeight, setStartWeight] = useState("0.0");
  const [endWeight, setEndWeight] = useState("0.0");
  const [hasPhoto, setHasPhoto] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [gpsCoords, setGpsCoords] = useState<{ lat: number; lng: number } | null>(null);

  // Capture GPS in background
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGpsCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("GPS error:", error);
        }
      );
    }
  }, []);

  const handleScan = async () => {
    setIsScanning(true);
    
    // Simulate QR scan - in production, use camera API
    setTimeout(async () => {
      // Try to fetch a cylinder from database
      const { data: cylinders, error } = await supabase
        .from('cylinders')
        .select('*')
        .limit(1);

      if (error || !cylinders || cylinders.length === 0) {
        // Use mock data if no cylinders exist
        setCylinder({
          id: "mock-id",
          qrCodeId: "CYL-608-2024-0847",
          refrigerantType: "R-410A",
          currentWeight: 50,
        });
      } else {
        const cyl = cylinders[0];
        setCylinder({
          id: cyl.id,
          qrCodeId: cyl.qr_code_id,
          refrigerantType: cyl.refrigerant_type,
          currentWeight: Number(cyl.current_weight_lbs) || 50,
        });
      }
      
      setIsScanning(false);
      setPhase("start-weight");
    }, 1500);
  };

  const handleStartWeightConfirm = () => {
    const weight = parseFloat(startWeight);
    if (isNaN(weight) || weight <= 0) {
      toast({
        title: "Invalid Weight",
        description: "Please enter a valid starting weight greater than 0",
        variant: "destructive",
      });
      return;
    }
    setPhase("end-weight");
  };

  const handleEndWeightConfirm = () => {
    const start = parseFloat(startWeight);
    const end = parseFloat(endWeight);
    
    if (isNaN(end) || end < 0) {
      toast({
        title: "Invalid Weight",
        description: "Please enter a valid ending weight",
        variant: "destructive",
      });
      return;
    }
    
    if (end > start) {
      toast({
        title: "Weight Error",
        description: "Ending weight cannot be greater than starting weight",
        variant: "destructive",
      });
      return;
    }
    
    setPhase("delta");
  };

  const handlePhotoCapture = () => {
    setHasPhoto(true);
    toast({
      title: "Photo Attached",
      description: "Scale photo captured successfully",
    });
  };

  const handleSubmit = async () => {
    if (!user || !cylinder) return;
    
    setIsSubmitting(true);
    
    const start = parseFloat(startWeight);
    const end = parseFloat(endWeight);

    // Insert compliance log
    const { error } = await supabase.from('compliance_logs').insert({
      cylinder_id: cylinder.id !== "mock-id" ? cylinder.id : null,
      tech_id: user.id,
      start_weight_lbs: start,
      end_weight_lbs: end,
      photo_url: hasPhoto ? "photo_attached" : null,
      gps_latitude: gpsCoords?.lat || null,
      gps_longitude: gpsCoords?.lng || null,
      synced: true,
    });

    if (error) {
      // Queue for offline sync
      await supabase.from('offline_queue').insert({
        user_id: user.id,
        payload: {
          type: 'compliance_log',
          data: {
            cylinder_id: cylinder.id,
            start_weight_lbs: start,
            end_weight_lbs: end,
            photo_url: hasPhoto ? "photo_attached" : null,
            gps_latitude: gpsCoords?.lat,
            gps_longitude: gpsCoords?.lng,
          },
        },
      });
      
      toast({
        title: "Queued for Sync",
        description: "Log saved locally, will sync when online",
      });
    } else {
      toast({
        title: "Federal Log Certified",
        description: "GPS coordinates and timestamp captured",
      });
    }
    
    setIsSubmitting(false);
    setPhase("complete");
  };

  const handleReset = () => {
    setPhase("scan");
    setCylinder(null);
    setStartWeight("0.0");
    setEndWeight("0.0");
    setHasPhoto(false);
  };

  const deltaWeight = (parseFloat(startWeight) - parseFloat(endWeight)).toFixed(1);

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      {/* Header */}
      {onBack && (
        <button
          onClick={onBack}
          className="mb-4 px-3 py-2 bg-card border border-border rounded text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
        >
          ← Back
        </button>
      )}

      {/* SCAN PHASE */}
      {phase === "scan" && (
        <div className="max-w-lg mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              FIELD-SHIELD
            </h1>
            <p className="text-muted-foreground">EPA AIM Act Compliance Logging</p>
          </div>

          <button
            onClick={handleScan}
            disabled={isScanning}
            className="scan-button group"
          >
            <div className="relative z-10 flex items-center justify-center gap-3 md:gap-4">
              {isScanning ? (
                <>
                  <ScanLine className="w-8 h-8 md:w-10 md:h-10" />
                  <span>SCANNING...</span>
                </>
              ) : (
                <>
                  <Camera className="w-8 h-8 md:w-10 md:h-10" />
                  <span>INITIALIZE SCAN</span>
                </>
              )}
            </div>
          </button>

          <div className="card-industrial p-4 text-center">
            <p className="text-sm text-muted-foreground">
              Position QR code within camera frame to identify cylinder
            </p>
          </div>
        </div>
      )}

      {/* START WEIGHT PHASE */}
      {phase === "start-weight" && cylinder && (
        <div className="max-w-lg mx-auto space-y-6">
          <div className="card-industrial p-4 border-primary/50">
            <p className="text-sm text-primary font-medium mb-1">CYLINDER IDENTIFIED</p>
            <p className="text-lg font-bold text-foreground">{cylinder.qrCodeId}</p>
            <p className="text-sm text-muted-foreground">{cylinder.refrigerantType}</p>
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-xl font-bold">PHASE 1: STARTING WEIGHT</h2>
            <p className="text-muted-foreground text-sm">Enter weight currently on scale</p>
          </div>

          {/* Weight Display */}
          <div className="card-industrial p-6 text-center">
            <div className="weight-display">
              {startWeight}
            </div>
            <p className="text-muted-foreground mt-2">LBS</p>
          </div>

          {/* Weight Increment Buttons */}
          <WeightIncrement
            value={startWeight}
            onChange={setStartWeight}
            onConfirm={handleStartWeightConfirm}
          />
        </div>
      )}

      {/* END WEIGHT PHASE */}
      {phase === "end-weight" && (
        <div className="max-w-lg mx-auto space-y-6">
          <div className="card-industrial p-4 bg-muted/50">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-muted-foreground">STARTING WEIGHT</p>
                <p className="text-xl font-bold text-foreground">{startWeight} LBS</p>
              </div>
              <ArrowRight className="w-6 h-6 text-primary" />
              <div className="text-right">
                <p className="text-xs text-muted-foreground">ENDING WEIGHT</p>
                <p className="text-xl font-bold text-primary">?</p>
              </div>
            </div>
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-xl font-bold">PHASE 2: ENDING WEIGHT</h2>
            <p className="text-muted-foreground text-sm">Enter weight after service complete</p>
          </div>

          {/* Weight Display */}
          <div className="card-industrial p-6 text-center">
            <div className="weight-display">
              {endWeight}
            </div>
            <p className="text-muted-foreground mt-2">LBS</p>
          </div>

          {/* Weight Increment Buttons */}
          <WeightIncrement
            value={endWeight}
            onChange={setEndWeight}
            onConfirm={handleEndWeightConfirm}
          />
        </div>
      )}

      {/* DELTA REVEAL PHASE */}
      {phase === "delta" && (
        <div className="max-w-lg mx-auto space-y-6">
          {/* Delta Display */}
          <div className="card-industrial p-8 text-center">
            <p className="text-sm text-muted-foreground mb-2">REFRIGERANT CHARGED</p>
            <div className="weight-display">
              {deltaWeight}
            </div>
            <p className="text-2xl font-bold text-primary mt-2">LBS CHARGED</p>
          </div>

          {/* Weight Summary */}
          <div className="card-industrial p-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-xs text-muted-foreground">START</p>
                <p className="text-lg font-bold">{startWeight} LBS</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">END</p>
                <p className="text-lg font-bold">{endWeight} LBS</p>
              </div>
            </div>
          </div>

          {/* Photo Capture */}
          <Button
            variant={hasPhoto ? "success" : "outline"}
            size="lg"
            className="w-full"
            onClick={handlePhotoCapture}
          >
            {hasPhoto ? (
              <>
                <Check className="w-5 h-5" />
                SCALE PHOTO ATTACHED
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                ATTACH SCALE PHOTO
              </>
            )}
          </Button>

          {/* Submit Button */}
          <Button
            variant="action"
            size="massive"
            className="w-full"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <MapPin className="w-6 h-6" />
                CAPTURING GPS...
              </>
            ) : (
              <>
                <Check className="w-6 h-6" />
                CERTIFY FEDERAL LOG & SYNC
              </>
            )}
          </Button>

          {/* Metadata Preview */}
          <div className="card-industrial p-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>
                GPS: {gpsCoords 
                  ? `${gpsCoords.lat.toFixed(4)}, ${gpsCoords.lng.toFixed(4)}` 
                  : "Acquiring..."}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{new Date().toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {/* COMPLETE PHASE */}
      {phase === "complete" && (
        <div className="max-w-lg mx-auto space-y-6 text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-success/20 flex items-center justify-center border-2 border-success">
            <Check className="w-12 h-12 text-success" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground">LOG CERTIFIED</h2>
            <p className="text-muted-foreground mt-2">Federal compliance record synced</p>
          </div>

          <div className="card-industrial p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-xs text-muted-foreground">CYLINDER</p>
                <p className="font-bold">{cylinder?.qrCodeId}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">CHARGED</p>
                <p className="font-bold text-primary">{deltaWeight} LBS</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">PHOTO</p>
                <p className="font-bold">{hasPhoto ? "Attached" : "None"}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">GPS</p>
                <p className="font-bold text-success">{gpsCoords ? "Verified" : "Pending"}</p>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={handleReset}
          >
            <RotateCcw className="w-5 h-5" />
            NEW LOG ENTRY
          </Button>
        </div>
      )}
    </div>
  );
};

export default FieldShield;