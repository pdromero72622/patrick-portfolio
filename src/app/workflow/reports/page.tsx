import WorkflowReports from "@/components/workflow/WorkflowReports";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workflow Operations Demo",
  description:
    "An interactive full-stack workflow demo built with Next.js, TypeScript, Supabase, PostgreSQL, and AI-assisted development.",
};
export default function WorkflowReportsPage() {
  return <WorkflowReports />;
}