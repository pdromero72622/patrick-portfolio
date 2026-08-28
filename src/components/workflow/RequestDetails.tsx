"use client";

import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  useEffect,
  useState,
} from "react";

import {
  createWorkflowActivity,
  getWorkflowActivities,
  getWorkflowRequestByNumber,
  updateWorkflowRequestStatus,
} from "@/lib/workflowService";

import type {
  RequestActivity,
  RequestStatus,
  WorkflowRequest,
} from "@/types/workflow";

type RequestDetailsProps = {
  requestNumber: string;
};

export default function RequestDetails({
  requestNumber,
}: RequestDetailsProps) {
  const [request, setRequest] =
    useState<WorkflowRequest | null>(null);

  const [activities, setActivities] =
    useState<RequestActivity[]>([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [isUpdating, setIsUpdating] =
    useState(false);

  const [loadError, setLoadError] =
    useState("");

  const [actionError, setActionError] =
    useState("");

    const [currentUserId, setCurrentUserId] =
    useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    async function loadRequestDetails() {
      try {
        setLoadError("");

        const [
          requestData,
          activityData,
        ] = await Promise.all([
          getWorkflowRequestByNumber(
            requestNumber
          ),
          getWorkflowActivities(
            requestNumber
          ),
        ]);

        const {
            data: { session },
        } = await supabase.auth.getSession();

        if (isActive) {
          setRequest(requestData);
          setActivities(activityData);

            setCurrentUserId(
                session?.user?.id ?? null
            );
        }
      } catch (error) {
        console.error(error);

        if (isActive) {
          setLoadError(
            "The request could not be loaded."
          );
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    loadRequestDetails();

    return () => {
      isActive = false;
    };
  }, [requestNumber]);

  async function changeStatus(
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

    setIsUpdating(true);
    setActionError("");

    try {
      const updatedRequest =
        await updateWorkflowRequestStatus(
          request.requestNumber,
          newStatus
        );

      const newActivity =
        await createWorkflowActivity(
          request.requestNumber,
          activityType,
          description
        );

      setRequest(updatedRequest);

      setActivities((current) => [
        newActivity,
        ...current,
      ]);
    } catch (error) {
      console.error(error);

      setActionError(
        "Unable to update the request. Please try again."
      );
    } finally {
      setIsUpdating(false);
    }
  }

  function getStatusStyle(
    status: RequestStatus
  ) {
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f5f6f8]">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <p className="text-sm text-black/45">
            Loading request...
          </p>
        </div>
      </div>
    );
  }

  if (loadError || !request) {
    return (
      <div className="min-h-screen bg-[#f5f6f8]">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <Link
            href="/workflow"
            className="text-sm text-black/45 transition hover:text-black"
          >
            ← Back to Workflow
          </Link>

          <div className="mt-10 rounded-2xl border border-black/5 bg-white p-8">
            <h1 className="text-2xl font-semibold">
              Request not found
            </h1>

            <p className="mt-3 text-black/50">
              {loadError ||
                "The request could not be located."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const canModify =
  currentUserId !== null &&
  request.ownerId === currentUserId;

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

          {!canModify && (
                <div className="border-t border-black/5 px-7 py-5">
                    <p className="text-sm text-black/45">
                        This is a read-only showcase request. Create your own
                        request from the workflow dashboard to test the approval
                        flow.
                    </p>
                </div>
            )}

          {actionError && (
            <div className="border-t border-black/5 px-7 py-5">
              <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {actionError}
              </div>
            </div>
          )}

          {canModify && (
            <div className="flex flex-wrap gap-3 border-t border-black/5 p-7">
            {request.status === "Draft" && (
              <button
                type="button"
                disabled={isUpdating}
                onClick={() =>
                  changeStatus(
                    "Pending Approval",
                    "Submitted",
                    "Request submitted for approval."
                  )
                }
                className="rounded-xl bg-[#171717] px-5 py-3 text-sm font-medium text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isUpdating
                  ? "Submitting..."
                  : "Submit for Approval"}
              </button>
            )}

            {request.status ===
              "Pending Approval" && (
              <>
                <button
                  type="button"
                  disabled={isUpdating}
                  onClick={() =>
                    changeStatus(
                      "Approved",
                      "Approved",
                      "Request approved."
                    )
                  }
                  className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isUpdating
                    ? "Updating..."
                    : "Approve"}
                </button>

                <button
                  type="button"
                  disabled={isUpdating}
                  onClick={() =>
                    changeStatus(
                      "Rejected",
                      "Rejected",
                      "Request rejected."
                    )
                  }
                  className="rounded-xl bg-red-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isUpdating
                    ? "Updating..."
                    : "Reject"}
                </button>
              </>
            )}
          </div>)}
        </div>
        

        <div className="mt-8 rounded-2xl border border-black/5 bg-white p-7 shadow-sm">
          <h2 className="text-xl font-semibold">
            Activity Timeline
          </h2>

          {activities.length === 0 ? (
            <p className="mt-5 text-sm text-black/40">
              No activity has been recorded for this request yet.
            </p>
          ) : (
            <div className="mt-6 space-y-6">
              {activities.map((activity) => (
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