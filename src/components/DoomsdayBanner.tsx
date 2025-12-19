import { useState, useEffect } from "react";
import { AlertTriangle } from "lucide-react";

const DoomsdayBanner = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("2026-01-01T00:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-destructive/10 border-b border-destructive/20 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-center gap-2 text-sm">
          <AlertTriangle className="w-4 h-4 text-destructive" />
          <span className="text-destructive font-medium">
            EPA AIM ACT ENFORCEMENT PROTOCOL ACTIVATES IN:
          </span>
          <span className="font-mono text-destructive font-semibold tabular-nums">
            {timeLeft.days}D {String(timeLeft.hours).padStart(2, "0")}H{" "}
            {String(timeLeft.minutes).padStart(2, "0")}M{" "}
            {String(timeLeft.seconds).padStart(2, "0")}S
          </span>
        </div>
      </div>
    </div>
  );
};

export default DoomsdayBanner;
