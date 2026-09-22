import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

export function CountdownTimer({ compact = false }: { compact?: boolean }) {
  // Summit target: 29 October 2026 09:00:00 IST
  const targetDate = new Date("2026-10-29T09:00:00+05:30").getTime();

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINS", value: timeLeft.minutes },
    { label: "SECS", value: timeLeft.seconds },
  ];

  if (compact) {
    return (
      <div className="inline-flex items-center gap-2 rounded-xl sm:rounded-2xl border border-signal/40 bg-gradient-to-b from-night-surface/90 to-night-deep/95 px-3 sm:px-3.5 py-1.5 backdrop-blur-xl shadow-[0_4px_20px_rgba(255,107,0,0.18)] ring-1 ring-white/10 hover:border-signal/70 transition-all group">
        <div className="flex items-center gap-1.5 border-r border-white/15 pr-2.5">
          <div className="relative flex items-center justify-center">
            <span className="absolute size-2 rounded-full bg-signal animate-ping opacity-75" />
            <Clock className="size-3.5 text-signal" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-signal">
              LIVE COUNTDOWN
            </span>
            <span className="text-[10px] font-medium text-night-foreground/60 hidden sm:inline">
              IST Launch
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-1.5 font-mono tabular-nums">
          <div className="flex flex-col items-center justify-center rounded-lg bg-black/40 border border-white/10 px-1.5 py-0.5 min-w-[28px] sm:min-w-[32px]">
            <span className="text-xs sm:text-sm font-black text-white leading-tight">
              {String(timeLeft.days).padStart(2, "0")}
            </span>
            <span className="text-[7px] sm:text-[8px] font-bold text-night-foreground/50 uppercase tracking-tighter">
              Days
            </span>
          </div>
          <span className="font-mono text-xs font-bold text-signal animate-pulse">:</span>

          <div className="flex flex-col items-center justify-center rounded-lg bg-black/40 border border-white/10 px-1.5 py-0.5 min-w-[28px] sm:min-w-[32px]">
            <span className="text-xs sm:text-sm font-black text-white leading-tight">
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            <span className="text-[7px] sm:text-[8px] font-bold text-night-foreground/50 uppercase tracking-tighter">
              Hrs
            </span>
          </div>
          <span className="font-mono text-xs font-bold text-signal animate-pulse">:</span>

          <div className="flex flex-col items-center justify-center rounded-lg bg-black/40 border border-white/10 px-1.5 py-0.5 min-w-[28px] sm:min-w-[32px]">
            <span className="text-xs sm:text-sm font-black text-white leading-tight">
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
            <span className="text-[7px] sm:text-[8px] font-bold text-night-foreground/50 uppercase tracking-tighter">
              Min
            </span>
          </div>
          <span className="font-mono text-xs font-bold text-signal animate-pulse">:</span>

          <div className="flex flex-col items-center justify-center rounded-lg bg-signal/15 border border-signal/40 px-1.5 py-0.5 min-w-[28px] sm:min-w-[32px]">
            <span className="text-xs sm:text-sm font-black text-signal leading-tight">
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
            <span className="text-[7px] sm:text-[8px] font-bold text-signal/80 uppercase tracking-tighter">
              Sec
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-tech/25 bg-night/70 px-3 py-1 text-[11px] font-mono uppercase tracking-widest text-tech backdrop-blur-md">
        <Clock className="size-3.5 text-signal animate-spin [animation-duration:8s]" />
        <span>Conclave Countdown</span>
      </div>

      <div className="mt-2.5 flex items-center gap-2 sm:gap-2.5">
        {units.map((unit, idx) => (
          <div key={unit.label} className="flex items-center gap-2 sm:gap-2.5">
            <div className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-night-deep/85 px-2.5 py-1 backdrop-blur-md shadow-md sm:px-3 sm:py-1.5 min-w-[50px] sm:min-w-[58px]">
              <span className="font-mono text-base font-bold text-white sm:text-xl tabular-nums">
                {String(unit.value).padStart(2, "0")}
              </span>
              <span className="text-[8px] font-semibold tracking-wider text-night-foreground/60 sm:text-[9px]">
                {unit.label}
              </span>
            </div>
            {idx < units.length - 1 && (
              <span className="font-mono text-base font-bold text-tech/50 sm:text-lg -mt-1">
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
