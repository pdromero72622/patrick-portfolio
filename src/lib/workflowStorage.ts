import type {
  RequestActivity,
  WorkflowRequest,
} from "@/types/workflow";

const STORAGE_KEY = "patrick-portfolio-workflow-requests";

const STORAGE_CHANGE_EVENT = "workflow-storage-change";

const ACTIVITY_STORAGE_KEY =
  "patrick-portfolio-workflow-activity";

const ACTIVITY_CHANGE_EVENT =
  "workflow-activity-change";

export function getStoredRequests(): WorkflowRequest[] {
  if (typeof window === "undefined") {
    return [];
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored) as WorkflowRequest[];
  } catch {
    return [];
  }
}

export function saveStoredRequests(requests: WorkflowRequest[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(requests)
  );

  window.dispatchEvent(
    new Event(STORAGE_CHANGE_EVENT)
  );
}

export function addStoredRequest(request: WorkflowRequest) {
  const existing = getStoredRequests();

  saveStoredRequests([
    request,
    ...existing,
  ]);
}

export function getWorkflowStorageSnapshot() {
  if (typeof window === "undefined") {
    return "[]";
  }

  return (
    window.localStorage.getItem(STORAGE_KEY) ?? "[]"
  );
}

export function getWorkflowServerSnapshot() {
  return "[]";
}

export function subscribeToWorkflowStorage(
  callback: () => void
) {
  function handleStorageChange() {
    callback();
  }

  window.addEventListener(
    "storage",
    handleStorageChange
  );

  window.addEventListener(
    STORAGE_CHANGE_EVENT,
    handleStorageChange
  );

  return () => {
    window.removeEventListener(
      "storage",
      handleStorageChange
    );

    window.removeEventListener(
      STORAGE_CHANGE_EVENT,
      handleStorageChange
    );
  };
}

export function getStoredActivities(): RequestActivity[] {
  if (typeof window === "undefined") {
    return [];
  }

  const stored =
    window.localStorage.getItem(ACTIVITY_STORAGE_KEY);

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored) as RequestActivity[];
  } catch {
    return [];
  }
}

export function saveStoredActivities(
  activities: RequestActivity[]
) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    ACTIVITY_STORAGE_KEY,
    JSON.stringify(activities)
  );

  window.dispatchEvent(
    new Event(ACTIVITY_CHANGE_EVENT)
  );
}

export function addStoredActivity(
  activity: RequestActivity
) {
  const existing = getStoredActivities();

  saveStoredActivities([
    activity,
    ...existing,
  ]);
}

export function getWorkflowActivitySnapshot() {
  if (typeof window === "undefined") {
    return "[]";
  }

  return (
    window.localStorage.getItem(
      ACTIVITY_STORAGE_KEY
    ) ?? "[]"
  );
}

export function getWorkflowActivityServerSnapshot() {
  return "[]";
}

export function subscribeToWorkflowActivity(
  callback: () => void
) {
  function handleActivityChange() {
    callback();
  }

  window.addEventListener(
    "storage",
    handleActivityChange
  );

  window.addEventListener(
    ACTIVITY_CHANGE_EVENT,
    handleActivityChange
  );

  return () => {
    window.removeEventListener(
      "storage",
      handleActivityChange
    );

    window.removeEventListener(
      ACTIVITY_CHANGE_EVENT,
      handleActivityChange
    );
  };
}

export function findStoredRequest(
  requestNumber: string
) {
  return getStoredRequests().find(
    (request) =>
      request.requestNumber === requestNumber
  );
}

export function updateStoredRequest(
  updatedRequest: WorkflowRequest
) {
  const existing = getStoredRequests();

  const updated = existing.map((request) =>
    request.requestNumber ===
    updatedRequest.requestNumber
      ? updatedRequest
      : request
  );

  saveStoredRequests(updated);
}