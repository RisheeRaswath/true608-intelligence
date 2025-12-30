import { Shield, AlertTriangle } from "lucide-react";

interface StatusBadgeProps {
  status: "audit-ready" | "risk";
  size?: "sm" | "default";
}

const StatusBadge = ({ status, size = "default" }: StatusBadgeProps) => {
  if (status === "audit-ready") {
    return (
      <span className={`badge-audit-ready ${size === "sm" ? "text-[10px] px-2 py-1" : ""}`}>
        <Shield className={`${size === "sm" ? "w-3 h-3" : "w-4 h-4"}`} />
        AUDIT-READY
      </span>
    );
  }

  return (
    <span className={`badge-risk ${size === "sm" ? "text-[10px] px-2 py-1" : ""}`}>
      <AlertTriangle className={`${size === "sm" ? "w-3 h-3" : "w-4 h-4"}`} />
      RISK
    </span>
  );
};

export default StatusBadge;