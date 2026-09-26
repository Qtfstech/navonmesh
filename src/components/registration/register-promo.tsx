import { useEffect, useState } from "react";
import { CalendarDays, ChevronRight, MapPin, Minus, Sparkles } from "lucide-react";

/**
 * "Register for Summit" popup fixed to the bottom-right of the home page, above the chat
 * button. It slides in shortly after load and always stays on screen: minimising it shrinks
 * it to a small "Register" pill, which expands it again.
 */
export function RegisterPromo({ onRegister, suppressed }: { onRegister: () => void; suppressed: boolean }) {
  const [ready, setReady] = useState(false);
  const [minimised, setMinimised] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 800);
    return () => window.clearTimeout(timer);
  }, []);

  if (!ready || suppressed) return null;

  if (minimised) {
    return (
      <button
        type="button"
        onClick={() => setMinimised(false)}
        aria-label="Show registration"
        className="fixed bottom-24 right-4 z-40 inline-flex items-center gap-1.5 rounded-full border-2 border-signal/70 bg-night-deep/95 px-4 py-2 text-sm font-bold text-white shadow-[0_0_30px_rgba(255,107,0,0.45)] backdrop-blur-xl transition-transform animate-in fade-in zoom-in-90 duration-300 hover:scale-105 sm:right-6"
      >
        <Sparkles className="size-4 animate-pulse text-signal" />
        Register
      </button>
    );
  }

  return (
    <aside
      aria-label="Register for Navonmesh Summit 2026"
      className="fixed bottom-24 right-4 left-4 z-40 animate-in fade-in slide-in-from-right-full duration-700 sm:left-auto sm:right-6 sm:w-80"
    >
      <div className="relative overflow-hidden rounded-2xl border-2 border-signal/70 bg-night-deep/95 p-5 text-night-foreground shadow-[0_0_40px_rgba(255,107,0,0.35)] backdrop-blur-xl">
        <div className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-signal/20 blur-3xl" />
        <button
          type="button"
          onClick={() => setMinimised(true)}
          aria-label="Minimise"
          className="absolute right-3 top-3 grid size-7 place-items-center rounded-full text-night-foreground/60 transition-colors hover:bg-night-foreground/10 hover:text-white"
        >
          <Minus className="size-4" />
        </button>
        <p className="text-xs font-bold uppercase tracking-[.18em] text-signal">Registrations open</p>
        <h2 className="mt-1.5 pr-6 font-display text-2xl font-bold text-white">Register for Summit</h2>
        <div className="mt-2 grid gap-1 text-sm text-night-foreground/70">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-4 text-tech" /> 29–31 October 2026
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-4 text-emerald-400" /> CMR Campus, Hyderabad
          </span>
        </div>
        <button
          type="button"
          onClick={onRegister}
          className="relative mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-signal px-5 py-2.5 text-sm font-bold text-paper shadow-lg shadow-signal/40 transition-transform hover:scale-[1.02]"
        >
          Register now
          <ChevronRight className="size-4" />
        </button>
      </div>
    </aside>
  );
}
