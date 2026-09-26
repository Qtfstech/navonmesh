import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Code2, Download, LogOut, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  listHackathon,
  listOrganizationRegistrations,
  listStudentRegistrations,
  listSubmissions,
  type HackathonAdminData,
  type HackathonRegistrationRow,
  type OrganizationRegistrationRow,
  type StudentRegistrationRow,
  type SubmissionRow,
  type SubmissionSlug,
} from "@/lib/api";
import { submissionForms as allSubmissionForms, type SubmissionForm } from "@/data/submission-forms";

// Hackathon has its own admin section; the rest share the generic submissions tab.
const submissionForms = allSubmissionForms.filter((form) => form.slug !== "hackathon");

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin | Navonmesh Summit 2026" }, { name: "robots", content: "noindex" }],
  }),
  component: AdminPage,
});

function formatDate(value: string) {
  const iso = value.includes("T") ? value : `${value.replace(" ", "T")}Z`;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
}

function yesNoLabel(value: "yes" | "no") {
  return value === "yes" ? "Yes" : "No";
}

function toCsvValue(value: string | number | null | undefined) {
  const text = value == null ? "" : String(value);
  if (/[",\n]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
}

function downloadCsv(filenamePrefix: string, header: string[], rows: string[][]) {
  const lines = [header, ...rows].map((cols) => cols.map(toCsvValue).join(","));
  // BOM prefix so Excel detects UTF-8 correctly instead of mangling special characters.
  const csv = "﻿" + lines.join("\r\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const stamp = new Date().toISOString().slice(0, 10);
  link.href = url;
  link.download = `${filenamePrefix}-${stamp}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

const ORG_HEADER = [
  "ID",
  "Company",
  "Specialization",
  "Delegate",
  "Mobile",
  "Email",
  "Wants to sponsor",
  "Wants to present",
  "Nominate company award",
  "Nominate individual award",
  "Registered at",
];

function exportOrganizations(rows: OrganizationRegistrationRow[]) {
  downloadCsv(
    "navonmesh-organizations",
    ORG_HEADER,
    rows.map((row) => [
      String(row.id),
      row.companyName,
      row.specialization,
      row.delegateName,
      row.mobile,
      row.email,
      yesNoLabel(row.wantsToSponsor),
      yesNoLabel(row.wantsToPresent),
      yesNoLabel(row.nominateCompanyAward),
      yesNoLabel(row.nominateIndividualAward),
      row.createdAt,
    ]),
  );
}

const STUDENT_HEADER = [
  "ID",
  "Name",
  "Institution",
  "Email",
  "Mobile",
  "Hackathon interest",
  "Present prototype",
  "Registered at",
];

function exportStudents(rows: StudentRegistrationRow[], filenamePrefix = "navonmesh-students") {
  downloadCsv(
    filenamePrefix,
    STUDENT_HEADER,
    rows.map((row) => [
      String(row.id),
      row.name,
      row.institution,
      row.email,
      row.mobile,
      yesNoLabel(row.hackathonInterest),
      yesNoLabel(row.presentPrototype),
      row.createdAt,
    ]),
  );
}

const HACKATHON_HEADER = [
  "ID",
  "Lead participant",
  "Institution",
  "Email",
  "Mobile",
  "Team name",
  "Team size",
  "Registered at",
];

function exportHackathon(rows: HackathonRegistrationRow[]) {
  downloadCsv(
    "navonmesh-hackathon",
    HACKATHON_HEADER,
    rows.map((row) => [
      String(row.id),
      row.name,
      row.institution,
      row.email,
      row.mobile,
      row.teamName,
      row.teamSize,
      row.createdAt,
    ]),
  );
}

function exportSubmissions(form: SubmissionForm, rows: SubmissionRow[]) {
  downloadCsv(
    `navonmesh-${form.slug}`,
    ["ID", ...form.fields.map((f) => f.label), "Submitted at"],
    rows.map((row) => [
      String(row.id),
      ...form.fields.map((f) => String(row[f.key] ?? "")),
      row.createdAt,
    ]),
  );
}

type SubmissionRows = Partial<Record<SubmissionSlug, SubmissionRow[]>>;

const emptyHackathon: HackathonAdminData = { registrations: [], interestedStudents: [] };

function HackathonTab({ data, loading }: { data: HackathonAdminData; loading: boolean }) {
  const { registrations, interestedStudents } = data;
  const participants = registrations.reduce((n, row) => n + (parseInt(row.teamSize, 10) || 0), 0);
  const stats: [string, number][] = [
    ["Team registrations", registrations.length],
    ["Total participants", participants],
    ["Interested students", interestedStudents.length],
  ];

  return (
    <TabsContent value="hackathon" className="mt-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map(([label, value]) => (
          <div key={label} className="rounded-lg border border-navy/10 bg-white p-5">
            <p className="text-xs font-bold uppercase tracking-[.14em] text-navy/50">{label}</p>
            <p className="mt-2 font-display text-3xl font-semibold">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-semibold">HackFest registrations</h2>
          <p className="text-sm text-navy/60">Teams registered through the HackFest form.</p>
        </div>
        <Button
          onClick={() => exportHackathon(registrations)}
          disabled={registrations.length === 0}
          className="rounded-full bg-signal text-paper hover:bg-signal/90"
        >
          <Download className="size-4" />
          Export to Excel
        </Button>
      </div>
      <div className="mt-4 overflow-hidden rounded-lg border border-navy/10 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Lead participant</TableHead>
              <TableHead>Institution</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead>Team name</TableHead>
              <TableHead>Team size</TableHead>
              <TableHead>Registered at</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {registrations.length === 0 && !loading && (
              <TableRow>
                <TableCell colSpan={7} className="py-10 text-center text-navy/50">
                  No hackathon registrations yet.
                </TableCell>
              </TableRow>
            )}
            {registrations.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row.name}</TableCell>
                <TableCell>{row.institution}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.mobile}</TableCell>
                <TableCell>{row.teamName || <span className="text-navy/30">—</span>}</TableCell>
                <TableCell>{row.teamSize}</TableCell>
                <TableCell className="whitespace-nowrap">{formatDate(row.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-10 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-semibold">Interested students</h2>
          <p className="text-sm text-navy/60">
            Students who said "Yes" to the HackFest on the student registration form.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => exportStudents(interestedStudents, "navonmesh-hackathon-interested")}
          disabled={interestedStudents.length === 0}
          className="rounded-full"
        >
          <Download className="size-4" />
          Export to Excel
        </Button>
      </div>
      <div className="mt-4 overflow-hidden rounded-lg border border-navy/10 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Institution</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead>Present prototype?</TableHead>
              <TableHead>Registered at</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {interestedStudents.length === 0 && !loading && (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-navy/50">
                  No interested students yet.
                </TableCell>
              </TableRow>
            )}
            {interestedStudents.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row.name}</TableCell>
                <TableCell>{row.institution}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.mobile}</TableCell>
                <TableCell>{yesNoLabel(row.presentPrototype)}</TableCell>
                <TableCell className="whitespace-nowrap">{formatDate(row.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </TabsContent>
  );
}

function SubmissionsTab({
  form,
  rows,
  loading,
}: {
  form: SubmissionForm;
  rows: SubmissionRow[];
  loading: boolean;
}) {
  return (
    <TabsContent value={form.slug} className="mt-6">
      <div className="flex justify-end">
        <Button
          onClick={() => exportSubmissions(form, rows)}
          disabled={rows.length === 0}
          className="rounded-full bg-signal text-paper hover:bg-signal/90"
        >
          <Download className="size-4" />
          Export to Excel
        </Button>
      </div>
      <div className="mt-4 overflow-hidden rounded-lg border border-navy/10 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              {form.fields.map((field) => (
                <TableHead key={field.key}>{field.label}</TableHead>
              ))}
              <TableHead>Submitted at</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 && !loading && (
              <TableRow>
                <TableCell
                  colSpan={form.fields.length + 1}
                  className="py-10 text-center text-navy/50"
                >
                  No submissions yet.
                </TableCell>
              </TableRow>
            )}
            {rows.map((row) => (
              <TableRow key={row.id}>
                {form.fields.map((field, index) => (
                  <TableCell
                    key={field.key}
                    className={
                      field.kind === "longtext"
                        ? "min-w-64 max-w-md whitespace-normal align-top"
                        : index === 0
                          ? "font-medium"
                          : undefined
                    }
                  >
                    {String(row[field.key] ?? "") || <span className="text-navy/30">—</span>}
                  </TableCell>
                ))}
                <TableCell className="whitespace-nowrap">{formatDate(row.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </TabsContent>
  );
}

function AdminPage() {
  const [password, setPassword] = useState("");
  const [authedPassword, setAuthedPassword] = useState<string | null>(null);
  const [orgRows, setOrgRows] = useState<OrganizationRegistrationRow[]>([]);
  const [studentRows, setStudentRows] = useState<StudentRegistrationRow[]>([]);
  const [submissionRows, setSubmissionRows] = useState<SubmissionRows>({});
  const [hackathon, setHackathon] = useState<HackathonAdminData>(emptyHackathon);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadRegistrations(pwd: string) {
    setLoading(true);
    setError(null);
    try {
      const [organizations, students, hackathonData, ...submissions] = await Promise.all([
        listOrganizationRegistrations(pwd),
        listStudentRegistrations(pwd),
        listHackathon(pwd),
        ...submissionForms.map((form) => listSubmissions(form.slug, pwd)),
      ]);
      setOrgRows(organizations);
      setStudentRows(students);
      setHackathon(hackathonData);
      setSubmissionRows(
        Object.fromEntries(submissionForms.map((form, i) => [form.slug, submissions[i] ?? []])),
      );
      setAuthedPassword(pwd);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setAuthedPassword(null);
    } finally {
      setLoading(false);
    }
  }

  function handleUnlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void loadRegistrations(password);
  }

  function handleLogout() {
    setAuthedPassword(null);
    setPassword("");
    setOrgRows([]);
    setStudentRows([]);
    setSubmissionRows({});
    setHackathon(emptyHackathon);
  }

  if (!authedPassword) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-night px-5 text-night-foreground">
        <form
          onSubmit={handleUnlock}
          className="w-full max-w-sm rounded-lg border border-night-foreground/10 bg-night-surface p-8"
        >
          <p className="text-xs font-bold uppercase tracking-[.18em] text-tech">Admin</p>
          <h1 className="mt-3 font-display text-2xl font-semibold">Registrations</h1>
          <p className="mt-2 text-sm text-night-foreground/60">
            Enter the admin password to view registrations.
          </p>

          <div className="mt-6 grid gap-1.5">
            <Label htmlFor="admin-password" className="text-night-foreground/80">
              Password
            </Label>
            <Input
              id="admin-password"
              type="password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-night-foreground/20 bg-night text-night-foreground"
            />
          </div>

          {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

          <Button
            type="submit"
            disabled={loading || password.length === 0}
            className="mt-6 w-full rounded-full bg-signal text-paper hover:bg-signal/90"
          >
            {loading ? "Checking…" : "Unlock"}
          </Button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-paper py-12 text-navy">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-signal">Admin</p>
            <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">Registrations</h1>
            <p className="mt-1 text-sm text-navy/60">
              {orgRows.length} organizations · {studentRows.length} students ·{" "}
              {hackathon.registrations.length} HackFest teams ·{" "}
              {submissionForms.reduce((n, f) => n + (submissionRows[f.slug]?.length ?? 0), 0)} form
              submissions
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={() => void loadRegistrations(authedPassword)}
              disabled={loading}
              className="rounded-full"
            >
              <RefreshCw className="size-4" />
              Refresh
            </Button>
            <Button variant="ghost" onClick={handleLogout} className="rounded-full">
              <LogOut className="size-4" />
              Log out
            </Button>
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

        <Tabs defaultValue="organizations" className="mt-8">
          <TabsList className="h-auto flex-wrap justify-start gap-1 rounded-2xl bg-navy/5 p-1">
            <TabsTrigger value="organizations" className="rounded-full">
              Organizations ({orgRows.length})
            </TabsTrigger>
            <TabsTrigger value="students" className="rounded-full">
              Students ({studentRows.length})
            </TabsTrigger>
            <TabsTrigger value="hackathon" className="rounded-full">
              <Code2 className="size-4" />
              HackFest ({hackathon.registrations.length})
            </TabsTrigger>
            {submissionForms.map((form) => (
              <TabsTrigger key={form.slug} value={form.slug} className="rounded-full">
                {form.title} ({submissionRows[form.slug]?.length ?? 0})
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="organizations" className="mt-6">
            <div className="flex justify-end">
              <Button
                onClick={() => exportOrganizations(orgRows)}
                disabled={orgRows.length === 0}
                className="rounded-full bg-signal text-paper hover:bg-signal/90"
              >
                <Download className="size-4" />
                Export to Excel
              </Button>
            </div>
            <div className="mt-4 overflow-hidden rounded-lg border border-navy/10 bg-white">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Specialization</TableHead>
                    <TableHead>Delegate</TableHead>
                    <TableHead>Mobile</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Sponsor?</TableHead>
                    <TableHead>Present?</TableHead>
                    <TableHead>Company award?</TableHead>
                    <TableHead>Individual award?</TableHead>
                    <TableHead>Registered at</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orgRows.length === 0 && !loading && (
                    <TableRow>
                      <TableCell colSpan={10} className="py-10 text-center text-navy/50">
                        No organization registrations yet.
                      </TableCell>
                    </TableRow>
                  )}
                  {orgRows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-medium">{row.companyName}</TableCell>
                      <TableCell>{row.specialization}</TableCell>
                      <TableCell>{row.delegateName}</TableCell>
                      <TableCell>{row.mobile}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{yesNoLabel(row.wantsToSponsor)}</TableCell>
                      <TableCell>{yesNoLabel(row.wantsToPresent)}</TableCell>
                      <TableCell>{yesNoLabel(row.nominateCompanyAward)}</TableCell>
                      <TableCell>{yesNoLabel(row.nominateIndividualAward)}</TableCell>
                      <TableCell className="whitespace-nowrap">
                        {formatDate(row.createdAt)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="students" className="mt-6">
            <div className="flex justify-end">
              <Button
                onClick={() => exportStudents(studentRows)}
                disabled={studentRows.length === 0}
                className="rounded-full bg-signal text-paper hover:bg-signal/90"
              >
                <Download className="size-4" />
                Export to Excel
              </Button>
            </div>
            <div className="mt-4 overflow-hidden rounded-lg border border-navy/10 bg-white">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Institution</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Mobile</TableHead>
                    <TableHead>Hackathon?</TableHead>
                    <TableHead>Present prototype?</TableHead>
                    <TableHead>Registered at</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentRows.length === 0 && !loading && (
                    <TableRow>
                      <TableCell colSpan={7} className="py-10 text-center text-navy/50">
                        No student registrations yet.
                      </TableCell>
                    </TableRow>
                  )}
                  {studentRows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-medium">{row.name}</TableCell>
                      <TableCell>{row.institution}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.mobile}</TableCell>
                      <TableCell>{yesNoLabel(row.hackathonInterest)}</TableCell>
                      <TableCell>{yesNoLabel(row.presentPrototype)}</TableCell>
                      <TableCell className="whitespace-nowrap">
                        {formatDate(row.createdAt)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          <HackathonTab data={hackathon} loading={loading} />
          {submissionForms.map((form) => (
            <SubmissionsTab
              key={form.slug}
              form={form}
              rows={submissionRows[form.slug] ?? []}
              loading={loading}
            />
          ))}
        </Tabs>
      </div>
    </main>
  );
}
