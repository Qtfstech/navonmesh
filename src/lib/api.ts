import { z } from "zod";

const API_BASE_URL =
  import.meta.env["VITE_API_BASE_URL"] ??
  (typeof window !== "undefined" ? "" : "http://localhost:4000");

const yesNo = z.enum(["yes", "no"]);

export const organizationRegistrationSchema = z.object({
  companyName: z.string().trim().min(2, "Company name is required"),
  specialization: z.string().trim().min(2, "Area of specialization is required"),
  delegateName: z.string().trim().min(2, "Delegate name is required"),
  mobile: z
    .string()
    .trim()
    .min(7, "Enter a valid mobile number")
    .max(20, "Enter a valid mobile number"),
  email: z.string().trim().email("Enter a valid email address"),
  wantsToSponsor: yesNo,
  wantsToPresent: yesNo,
  nominateCompanyAward: yesNo,
  nominateIndividualAward: yesNo,
});

export type OrganizationRegistrationInput = z.infer<typeof organizationRegistrationSchema>;

export type OrganizationRegistrationRow = {
  id: number;
  companyName: string;
  specialization: string;
  delegateName: string;
  mobile: string;
  email: string;
  wantsToSponsor: "yes" | "no";
  wantsToPresent: "yes" | "no";
  nominateCompanyAward: "yes" | "no";
  nominateIndividualAward: "yes" | "no";
  createdAt: string;
};

export const studentRegistrationSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  institution: z.string().trim().min(2, "Institution is required"),
  email: z.string().trim().email("Enter a valid email address"),
  mobile: z
    .string()
    .trim()
    .min(7, "Enter a valid mobile number")
    .max(20, "Enter a valid mobile number"),
  hackathonInterest: yesNo,
  presentPrototype: yesNo,
});

export type StudentRegistrationInput = z.infer<typeof studentRegistrationSchema>;

export type StudentRegistrationRow = {
  id: number;
  name: string;
  institution: string;
  email: string;
  mobile: string;
  hackathonInterest: "yes" | "no";
  presentPrototype: "yes" | "no";
  createdAt: string;
};

async function postJson<T>(path: string, data: unknown): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Something went wrong submitting your registration.");
  }

  return res.json();
}

async function getJsonWithPassword<T>(path: string, password: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "x-admin-password": password },
  });

  if (res.status === 401) {
    throw new Error("Incorrect password.");
  }
  if (!res.ok) {
    throw new Error("Something went wrong loading registrations.");
  }

  return res.json();
}

export function registerOrganization(
  data: OrganizationRegistrationInput,
): Promise<{ id: number; wantsToSponsor: "yes" | "no" }> {
  return postJson("/api/organizations", data);
}

export function registerStudent(data: StudentRegistrationInput): Promise<{ id: number }> {
  return postJson("/api/students", data);
}

export function listOrganizationRegistrations(
  password: string,
): Promise<OrganizationRegistrationRow[]> {
  return getJsonWithPassword("/api/admin/organizations", password);
}

export function listStudentRegistrations(password: string): Promise<StudentRegistrationRow[]> {
  return getJsonWithPassword("/api/admin/students", password);
}

export type SubmissionSlug = "ideas" | "speakers" | "expo" | "oem" | "awards" | "individual" | "hackathon";

export type SubmissionRow = { id: number; createdAt: string } & Record<string, string | number>;

export function submitForm(
  slug: SubmissionSlug,
  data: Record<string, string>,
): Promise<{ id: number }> {
  return postJson(`/api/submissions/${slug}`, data);
}

export function listSubmissions(slug: SubmissionSlug, password: string): Promise<SubmissionRow[]> {
  return getJsonWithPassword(`/api/admin/submissions/${slug}`, password);
}

export type HackathonRegistrationRow = {
  id: number;
  name: string;
  institution: string;
  email: string;
  mobile: string;
  teamName: string;
  teamSize: string;
  createdAt: string;
};

export type HackathonAdminData = {
  registrations: HackathonRegistrationRow[];
  interestedStudents: StudentRegistrationRow[];
};

export function listHackathon(password: string): Promise<HackathonAdminData> {
  return getJsonWithPassword("/api/admin/hackathon", password);
}
