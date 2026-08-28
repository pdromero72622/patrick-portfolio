import WorkflowDashboard from "@/components/workflow/WorkflowDashboard";
import { workflowRequests } from "@/data/workflowRequests";

export default function WorkflowPage() {
  return <WorkflowDashboard requests={workflowRequests} />;
}