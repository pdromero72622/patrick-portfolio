"use client";

import Link from "next/link";
import { useMemo, useSyncExternalStore } from "react";

import {
  addStoredActivity,
  getWorkflowActivityServerSnapshot,
  getWorkflowActivitySnapshot,
  getWorkflowServerSnapshot,
  getWorkflowStorageSnapshot,
  subscribeToWorkflowActivity,
  subscribeToWorkflowStorage,
  updateStoredRequest,
} from "@/lib/workflowStorage";

import type {
  RequestActivity,
  RequestStatus,
  WorkflowRequest,
} from "@/types/workflow";

type RequestDetailsProps = {
  requestNumber: string;
  sampleRequests: WorkflowRequest[];
};

export default function RequestDetails({
  requestNumber,
  sampleRequests,
}: RequestDetailsProps) {
  const storedRequestsJson = useSyncExternalStore(
    subscribeToWorkflowStorage,
    getWorkflowStorageSnapshot,
    getWorkflowServerSnapshot
  );

  const storedActivitiesJson = useSyncExternalStore(
    subscribeToWorkflowActivity,
    getWorkflowActivitySnapshot,
    getWorkflowActivityServerSnapshot
  );

  const storedRequests = useMemo(() => {
    try {
      return JSON.parse(
        storedRequestsJson
      ) as WorkflowRequest[];
    } catch {
      return [];
    }
  }, [storedRequestsJson]);

  const activities = useMemo(() => {
    try {
      return JSON.parse(
        storedActivitiesJson
      ) as RequestActivity[];
    } catch {
      return [];
    }
  }, [storedActivitiesJson]);

  const allRequests = useMemo(
    () => [
      ...storedRequests,
      ...sampleRequests,
    ],
    [storedRequests, sampleRequests]
  );

  const request = allRequests.find(
    (item) =>
      item.requestNumber === requestNumber
  );

  const requestActivities = activities
    .filter(
      (activity) =>
        activity.requestNumber === requestNumber
    )
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );

    const nextActivityId =
    requestActivities.length === 0
        ? 1
        : Math.max(
            ...requestActivities.map(
            (activity) => activity.id
            )
        ) + 1;

  if (!request) {
    return (
      <div className="min-h-screen bg-[#f5f6f8]">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <Link
            href="/workflow"
            className="text-sm text-black/45 hover:text-black"
          >
            ← Back to Workflow
          </Link>

          <div className="mt-10 rounded-2xl border border-black/5 bg-white p-8">
            <h1 className="text-2xl font-semibold">
              Request not found
            </h1>

            <p className="mt-3 text-black/50">
              The request could not be located.
            </p>
          </div>
        </div>
      </div>
    );
  }

  function changeStatus(
    newStatus: RequestStatus,
    activityType:
      | "Submitted"
      | "Approved"
      | "Rejected",
    description: string
  ) {
    if (!request) {
      return;
    }

    const now = new Date();

    const updatedRequest: WorkflowRequest = {
      ...request,
      status: newStatus,
      updatedAt: now.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    const isStoredRequest = storedRequests.some(
      (item) =>
        item.requestNumber === request.requestNumber
    );

    if (!isStoredRequest) {
      return;
    }

    updateStoredRequest(updatedRequest);

    addStoredActivity({
        id: nextActivityId,
        requestNumber: request.requestNumber,
        type: activityType,
        description,
        createdAt: now.toISOString(),
    });
  }

  function getStatusStyle(status: RequestStatus) {
    switch (status) {
      case "Approved":
        return "bg-emerald-50 text-emerald-700";

      case "Pending Approval":
        return "bg-amber-50 text-amber-700";

      case "Rejected":
        return "bg-red-50 text-red-700";

      case "Draft":
        return "bg-slate-100 text-slate-600";
    }
  }

  const isStoredRequest = storedRequests.some(
    (item) =>
      item.requestNumber === request.requestNumber
  );

  return (
    <div className="min-h-screen bg-[#f5f6f8]">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <Link
          href="/workflow"
          className="mb-8 inline-flex text-sm text-black/45 transition hover:text-black"
        >
          ← Back to Workflow
        </Link>

        <div className="rounded-2xl border border-black/5 bg-white shadow-sm">
          <div className="border-b border-black/5 p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-medium text-black/35">
                  {request.requestNumber}
                </p>

                <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                  {request.title}
                </h1>
              </div>

              <span
                className={`inline-flex rounded-full px-3 py-1.5 text-xs font-medium ${getStatusStyle(
                  request.status
                )}`}
              >
                {request.status}
              </span>
            </div>
          </div>

          <div className="grid gap-8 p-7 md:grid-cols-2">
            <DetailItem
              label="Category"
              value={request.category}
            />

            <DetailItem
              label="Priority"
              value={request.priority}
            />

            <DetailItem
              label="Requested By"
              value={request.requester}
            />

            <DetailItem
              label="Created"
              value={request.createdAt}
            />

            <DetailItem
              label="Last Updated"
              value={request.updatedAt}
            />
          </div>

          <div className="border-t border-black/5 p-7">
            <p className="text-sm font-medium text-black/45">
              Description
            </p>

            <p className="mt-3 leading-7 text-black/70">
              {request.description}
            </p>
          </div>

          {isStoredRequest && (
            <div className="flex flex-wrap gap-3 border-t border-black/5 p-7">
              {request.status === "Draft" && (
                <button
                  type="button"
                  onClick={() =>
                    changeStatus(
                      "Pending Approval",
                      "Submitted",
                      "Request submitted for approval."
                    )
                  }
                  className="rounded-xl bg-[#171717] px-5 py-3 text-sm font-medium text-white transition hover:bg-black/80"
                >
                  Submit for Approval
                </button>
              )}

              {request.status ===
                "Pending Approval" && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      changeStatus(
                        "Approved",
                        "Approved",
                        "Request approved."
                      )
                    }
                    className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-700"
                  >
                    Approve
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      changeStatus(
                        "Rejected",
                        "Rejected",
                        "Request rejected."
                      )
                    }
                    className="rounded-xl bg-red-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-700"
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        <div className="mt-8 rounded-2xl border border-black/5 bg-white p-7 shadow-sm">
          <h2 className="text-xl font-semibold">
            Activity Timeline
          </h2>

          {requestActivities.length === 0 ? (
            <p className="mt-5 text-sm text-black/40">
              No activity has been recorded for this request yet.
            </p>
          ) : (
            <div className="mt-6 space-y-6">
              {requestActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex gap-4"
                >
                  <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-black" />

                  <div>
                    <p className="font-medium">
                      {activity.type}
                    </p>

                    <p className="mt-1 text-sm text-black/55">
                      {activity.description}
                    </p>

                    <p className="mt-1 text-xs text-black/35">
                      {new Date(
                        activity.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

type DetailItemProps = {
  label: string;
  value: string;
};

function DetailItem({
  label,
  value,
}: DetailItemProps) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-black/35">
        {label}
      </p>

      <p className="mt-2 text-sm font-medium">
        {value}
      </p>
    </div>
  );
}