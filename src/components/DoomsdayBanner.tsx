import { useState, useEffect } from "react";

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
    <section className="bg-background py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-sm md:text-base text-muted-foreground uppercase tracking-widest mb-6">
            Federal Enforcement Window Closing In:
          </p>
          
          <div className="flex items-center justify-center gap-3 md:gap-6">
            <div className="text-center">
              <span className="block text-5xl md:text-7xl font-bold font-mono text-[#ff0000]">
                {String(timeLeft.days).padStart(3, "0")}
              </span>
              <span className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide mt-2 block">
                Days
              </span>
            </div>
            <span className="text-4xl md:text-6xl font-bold text-[#ff0000]">:</span>
            <div className="text-center">
              <span className="block text-5xl md:text-7xl font-bold font-mono text-[#ff0000]">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide mt-2 block">
                Hours
              </span>
            </div>
            <span className="text-4xl md:text-6xl font-bold text-[#ff0000]">:</span>
            <div className="text-center">
              <span className="block text-5xl md:text-7xl font-bold font-mono text-[#ff0000]">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide mt-2 block">
                Minutes
              </span>
            </div>
            <span className="text-4xl md:text-6xl font-bold text-[#ff0000]">:</span>
            <div className="text-center">
              <span className="block text-5xl md:text-7xl font-bold font-mono text-[#ff0000]">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
              <span className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide mt-2 block">
                Seconds
              </span>
            </div>
          </div>
          
          <p className="text-sm md:text-base text-muted-foreground uppercase tracking-widest mt-8">
            Mandatory Asset Tracking Protocol Activates
          </p>
        </div>
      </div>
    </section>
  );
};

export default DoomsdayBanner;
