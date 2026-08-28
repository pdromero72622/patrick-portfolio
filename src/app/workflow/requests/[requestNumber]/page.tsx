import RequestDetails from "@/components/workflow/RequestDetails";

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