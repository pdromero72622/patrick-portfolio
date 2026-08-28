import { getWorkflowRequests } from "@/lib/workflowService";

export default async function DatabaseTestPage() {
  let requests = [];

  try {
    requests = await getWorkflowRequests();
  } catch (error) {
    console.error(error);

    return (
      <main className="p-10">
        <h1 className="text-2xl font-semibold">
          Supabase connection failed
        </h1>

        <p className="mt-4 text-red-600">
          Check the terminal for the database error.
        </p>
      </main>
    );
  }

  return (
    <main className="p-10">
      <h1 className="text-2xl font-semibold">
        Supabase connection successful
      </h1>

      <p className="mt-4">
        Workflow request count: {requests.length}
      </p>
    </main>
  );
}