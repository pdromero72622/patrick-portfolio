import NewRequestForm from "@/components/workflow/NewRequestForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workflow Operations Demo",
  description:
    "An interactive full-stack workflow demo built with Next.js, TypeScript, Supabase, PostgreSQL, and AI-assisted development.",
};
export default function NewRequestPage() {
  return <NewRequestForm />;
}