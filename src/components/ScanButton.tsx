import { ScanLine, Camera } from "lucide-react";

interface ScanButtonProps {
  onClick: () => void;
  isScanning?: boolean;
}

const ScanButton = ({ onClick, isScanning = false }: ScanButtonProps) => {
  return (
    <button
      onClick={onClick}
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
  );
};

export default ScanButton;