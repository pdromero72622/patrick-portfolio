import type { WorkflowRequest } from "@/types/workflow";

const STORAGE_KEY = "patrick-portfolio-workflow-requests";

const STORAGE_CHANGE_EVENT = "workflow-storage-change";

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