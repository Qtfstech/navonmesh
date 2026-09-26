import type { ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { SubmissionFormDialog } from "@/components/registration/submission-form-dialog";
import { submissionForms } from "@/data/submission-forms";
import type { SubmissionSlug } from "@/lib/api";

/**
 * Deliberately lightweight page shell for direct form links (/register, /speakers, ...):
 * no 3D canvases, images or home-page code, so the form popup is usable almost immediately.
 */
export function FormPageShell({ eyebrow, children }: { eyebrow: string; children: ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-night text-night-foreground">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[600px] -translate-x-1/2 rounded-full bg-tech/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -left-32 size-80 rounded-full bg-signal/10 blur-3xl" />
      <header className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <Link to="/" aria-label="Navonmesh home">
          <img
            src="/navonmesh-logo.jpeg"
            alt="Navonmesh — Ideas, Innovation, Impact"
            className="h-12 w-auto rounded-lg bg-white object-contain sm:h-14"
          />
        </Link>
        <Link to="/" className="text-sm font-medium text-night-foreground/70 hover:text-tech">
          ← Back to home
        </Link>
      </header>
      <section className="relative mx-auto max-w-3xl px-5 pt-16 text-center sm:px-8">
        <p className="text-xs font-bold uppercase tracking-[.18em] text-tech">{eyebrow}</p>
        <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">Navonmesh Summit 2026</h1>
        <p className="mt-4 text-night-foreground/60">29–31 October 2026 · CMR Group of Institutions, Hyderabad</p>
      </section>
      {children}
    </main>
  );
}

/** A Get involved form opened directly from its own URL; closing it goes to the home page. */
export function SubmissionFormPage({ slug }: { slug: SubmissionSlug }) {
  const navigate = useNavigate();
  const form = submissionForms.find((f) => f.slug === slug)!;

  return (
    <FormPageShell eyebrow={form.audience}>
      <SubmissionFormDialog
        form={form}
        open
        onOpenChange={(open) => {
          if (!open) void navigate({ to: "/" });
        }}
      />
    </FormPageShell>
  );
}
