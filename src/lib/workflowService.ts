import { supabase } from "@/lib/supabase";

import {
  mapActivityRow,
  mapRequestRow,
} from "@/lib/workflowMapper";

import type {
  RequestActivityType,
  RequestStatus,
  WorkflowRequest,
} from "@/types/workflow";

import type {
  WorkflowActivityRow,
  WorkflowRequestRow,
} from "@/types/database";

export async function getWorkflowRequests() {
  const { data, error } = await supabase
    .from("workflow_requests")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return (
    (data as WorkflowRequestRow[] | null)?.map(
      mapRequestRow
    ) ?? []
  );
}

export async function getWorkflowRequestByNumber(
  requestNumber: string
) {
  const { data, error } = await supabase
    .from("workflow_requests")
    .select("*")
    .eq("request_number", requestNumber)
    .single();

  if (error) {
    throw error;
  }

  return mapRequestRow(
    data as WorkflowRequestRow
  );
}

export async function createWorkflowRequest(
  request: Omit<WorkflowRequest, "id">
) {
  const { data, error } = await supabase
    .from("workflow_requests")
    .insert({
      request_number: request.requestNumber,
      title: request.title,
      description: request.description,
      category: request.category,
      requester: request.requester,
      priority: request.priority,
      status: request.status,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return mapRequestRow(
    data as WorkflowRequestRow
  );
}

export async function updateWorkflowRequestStatus(
  requestNumber: string,
  status: RequestStatus
) {
  const { data, error } = await supabase
    .from("workflow_requests")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("request_number", requestNumber)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return mapRequestRow(
    data as WorkflowRequestRow
  );
}

export async function getWorkflowActivities(
  requestNumber: string
) {
  const { data, error } = await supabase
    .from("workflow_activity")
    .select("*")
    .eq("request_number", requestNumber)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return (
    (data as WorkflowActivityRow[] | null)?.map(
      mapActivityRow
    ) ?? []
  );
}

export async function createWorkflowActivity(
  requestNumber: string,
  type: RequestActivityType,
  description: string
) {
  const { data, error } = await supabase
    .from("workflow_activity")
    .insert({
      request_number: requestNumber,
      activity_type: type,
      description,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return mapActivityRow(
    data as WorkflowActivityRow
  );
}