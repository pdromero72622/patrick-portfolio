import RequestDetails from "@/components/workflow/RequestDetails";
import { workflowRequests } from "@/data/workflowRequests";

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
      sampleRequests={workflowRequests}
    />
  );
}