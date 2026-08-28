export type WorkflowRequestRow = {
  id: number;
  request_number: string;
  title: string;
  description: string;
  category: string;
  requester: string;
  priority: "Low" | "Medium" | "High";
  status:
    | "Draft"
    | "Pending Approval"
    | "Approved"
    | "Rejected";
  owner_id: string | null;
  created_at: string;
  updated_at: string;
};

export type WorkflowActivityRow = {
  id: number;
  request_number: string;
  activity_type:
    | "Created"
    | "Saved Draft"
    | "Submitted"
    | "Approved"
    | "Rejected";
  description: string;
  owner_id: string | null;
  created_at: string;
};