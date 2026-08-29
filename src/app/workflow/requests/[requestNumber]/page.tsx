import RequestDetails from "@/components/workflow/RequestDetails";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workflow Operations Demo",
  description:
    "An interactive full-stack workflow demo built with Next.js, TypeScript, Supabase, PostgreSQL, and AI-assisted development.",
};
type RequestDetailsPageProps = {
  params: Promise<{
    requestNumber: string;
  }>;
};

export default async function RequestDetailsPage({
  params,
}: RequestDetailsPageProps) {
  const { requestNumber } = await params;

  return (
        <RequestDetails
            requestNumber={requestNumber}
        />
    );
}