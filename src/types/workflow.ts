export type RequestStatus =
  | "Draft"
  | "Pending Approval"
  | "Approved"
  | "Rejected";

export type RequestPriority = "Low" | "Medium" | "High";

export type WorkflowRequest = {
  id: number;
  requestNumber: string;
  title: string;
  description: string;
  category: string;
  requester: string;
  priority: RequestPriority;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
};