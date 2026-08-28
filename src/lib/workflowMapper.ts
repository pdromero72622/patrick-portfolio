import type {
  WorkflowActivityRow,
  WorkflowRequestRow,
} from "@/types/database";

import type {
  RequestActivity,
  WorkflowRequest,
} from "@/types/workflow";

export function mapRequestRow(
  row: WorkflowRequestRow
): WorkflowRequest {
  return {
    id: row.id,
    requestNumber: row.request_number,
    title: row.title,
    description: row.description,
    category: row.category,
    requester: row.requester,
    priority: row.priority,
    status: row.status,
    ownerId: row.owner_id,
    createdAt: new Date(
      row.created_at
    ).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    updatedAt: new Date(
      row.updated_at
    ).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  };
}

export function mapActivityRow(
  row: WorkflowActivityRow
): RequestActivity {
  return {
    id: row.id,
    requestNumber: row.request_number,
    type: row.activity_type,
    description: row.description,
    ownerId: row.owner_id,
    createdAt: row.created_at,
  };
}