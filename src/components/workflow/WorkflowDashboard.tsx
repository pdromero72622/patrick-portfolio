"use client";

import Link from "next/link";
import {
  useEffect,
  useMemo,
  useState,
} from "react";
import { getWorkflowRequests } from "@/lib/workflowService";
import type {
  RequestPriority,
  RequestStatus,
  WorkflowRequest,
} from "@/types/workflow";

type StatusFilter = "All" | RequestStatus;
type PriorityFilter = "All" | RequestPriority;

export default function WorkflowDashboard() {
    const [allRequests, setAllRequests] =
        useState<WorkflowRequest[]>([]);

    const [isLoading, setIsLoading] = useState(true);

    const [loadError, setLoadError] = useState("");

    useEffect(() => {
        let isActive = true;

        async function loadRequests() {
            try {
                setLoadError("");

                const data = await getWorkflowRequests();

                if (isActive) {
                    setAllRequests(data);
                }
            } catch (error) {
                console.error(error);

                if (isActive) {
                    setLoadError(
                        "Unable to load workflow requests."
                    );
                }
            } finally {
                if (isActive) {
                    setIsLoading(false);
                }
            }
        }

        loadRequests();

        return () => {
            isActive = false;
        };
    }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>("All");
  const [priorityFilter, setPriorityFilter] =
    useState<PriorityFilter>("All");

  const filteredRequests = useMemo(() => {
    return allRequests.filter((request) => {
      const searchableText = [
        request.requestNumber,
        request.title,
        request.category,
        request.requester,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchableText.includes(
        searchTerm.toLowerCase()
      );

      const matchesStatus =
        statusFilter === "All" || request.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" ||
        request.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  },[
        allRequests,
        searchTerm,
        statusFilter,
        priorityFilter,
    ]);

  const totalRequests = allRequests.length;

  const pendingRequests = allRequests.filter(
    (request) => request.status === "Pending Approval"
  ).length;

  const approvedRequests = allRequests.filter(
    (request) => request.status === "Approved"
  ).length;

  const draftRequests = allRequests.filter(
    (request) => request.status === "Draft"
  ).length;

  function getStatusStyle(status: RequestStatus) {
    switch (status) {
      case "Approved":
        return "bg-emerald-50 text-emerald-700 ring-emerald-600/10";

      case "Pending Approval":
        return "bg-amber-50 text-amber-700 ring-amber-600/10";

      case "Rejected":
        return "bg-red-50 text-red-700 ring-red-600/10";

      case "Draft":
        return "bg-slate-100 text-slate-600 ring-slate-500/10";
    }
  }

  function getPriorityStyle(priority: RequestPriority) {
    switch (priority) {
      case "High":
        return "text-red-600";

      case "Medium":
        return "text-amber-600";

      case "Low":
        return "text-emerald-600";
    }
  }

  function clearFilters() {
    setSearchTerm("");
    setStatusFilter("All");
    setPriorityFilter("All");
  }

  return (
    <div className="min-h-screen bg-[#f5f6f8]">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <Link
            href="/"
            className="mb-8 inline-flex text-sm text-black/45 transition hover:text-black"
        >
            ← Back to Portfolio
        </Link>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-black/40">
              Operations Workspace
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#171717]">
              Workflow Operations
            </h1>

            <p className="mt-3 max-w-2xl text-black/55">
              Explore a working request and approval workflow. Showcase records are read-only; create your own request to test the full flow.
            </p>
          </div>

            <div className="flex flex-wrap gap-3">
                <Link
                    href="/workflow/reports"
                    className="rounded-xl border border-black/10 bg-white px-5 py-3 text-center text-sm font-medium text-black/65 transition hover:bg-black/[0.03]"
                >
                    View Reports
                </Link>

                <Link
                    href="/workflow/new"
                    className="rounded-xl bg-[#171717] px-5 py-3 text-center text-sm font-medium text-white transition hover:bg-black/80"
                >
                    + New Request
                </Link>
            </div>
        </div>

        <section className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            label="Total Requests"
            value={totalRequests}
            helper="All workflow records"
          />

          <SummaryCard
            label="Pending Approval"
            value={pendingRequests}
            helper="Requires attention"
          />

          <SummaryCard
            label="Approved"
            value={approvedRequests}
            helper="Completed successfully"
          />

          <SummaryCard
            label="Drafts"
            value={draftRequests}
            helper="Not yet submitted"
          />
        </section>

        <section className="mt-8 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
          <div className="border-b border-black/5 p-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-[#171717]">
                  Requests
                </h2>

                <p className="mt-1 text-sm text-black/45">
                  Search, filter, and review workflow activity.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(event.target.value)
                  }
                  placeholder="Search requests..."
                  className="min-w-[230px] rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm outline-none transition placeholder:text-black/30 focus:border-black/30"
                />

                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(
                      event.target.value as StatusFilter
                    )
                  }
                  className="rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-black/30"
                >
                  <option value="All">All statuses</option>
                  <option value="Draft">Draft</option>
                  <option value="Pending Approval">
                    Pending Approval
                  </option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>

                <select
                  value={priorityFilter}
                  onChange={(event) =>
                    setPriorityFilter(
                      event.target.value as PriorityFilter
                    )
                  }
                  className="rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-black/30"
                >
                  <option value="All">All priorities</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="rounded-xl border border-black/10 px-4 py-2.5 text-sm text-black/55 transition hover:bg-black/[0.03] hover:text-black"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            {isLoading && (
                <div className="px-6 py-12 text-center">
                    <p className="text-sm text-black/45">
                        Loading requests...
                    </p>
                </div>
            )}

            {loadError && (
                <div className="px-6 py-12 text-center">
                    <p className="font-medium text-red-600">
                        {loadError}
                    </p>

                    <p className="mt-2 text-sm text-black/40">
                        Check your database connection and try again.
                    </p>
                </div>
            )}
            
            {!isLoading && !loadError && (
            <table className="w-full min-w-[950px] text-left">
              <thead className="bg-[#fafafa] text-xs uppercase tracking-wider text-black/40">
                <tr>
                  <th className="px-6 py-4 font-medium">Request</th>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium">Requester</th>
                  <th className="px-6 py-4 font-medium">Priority</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Created</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-black/5">
                {filteredRequests.map((request) => (
                  <tr
                    key={request.id}
                    className="cursor-pointer transition hover:bg-black/[0.015]"
                  >
                    <td className="px-6 py-5">
                        <div>
                            <p className="text-xs font-medium text-black/35">
                                {request.requestNumber}
                            </p>

                            <Link
                                href={`/workflow/requests/${request.requestNumber}`}
                                className="mt-1 inline-block font-medium text-[#171717] transition hover:underline"
                            >
                                {request.title}
                            </Link>
                        </div>
                    </td>

                    <td className="px-6 py-5 text-sm text-black/55">
                      {request.category}
                    </td>

                    <td className="px-6 py-5 text-sm text-black/55">
                      {request.requester}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`text-sm font-medium ${getPriorityStyle(
                          request.priority
                        )}`}
                      >
                        {request.priority}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${getStatusStyle(
                          request.status
                        )}`}
                      >
                        {request.status}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-sm text-black/45">
                      {request.createdAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            )}

            {!isLoading &&
                !loadError &&
                filteredRequests.length === 0 && (
              <div className="px-6 py-16 text-center">
                <p className="font-medium text-black/65">
                  No requests found
                </p>

                <p className="mt-2 text-sm text-black/40">
                  Try changing your search or filters.
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-black/5 px-6 py-4 text-sm text-black/40">
            <span>
              Showing {filteredRequests.length} of {allRequests.length} requests
            </span>

            <span>Demo workspace</span>
          </div>
        </section>
      </div>
    </div>
  );
}

type SummaryCardProps = {
  label: string;
  value: number;
  helper: string;
};

function SummaryCard({
  label,
  value,
  helper,
}: SummaryCardProps) {
  return (
    <article className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
      <p className="text-sm text-black/45">{label}</p>

      <p className="mt-4 text-3xl font-semibold tracking-tight text-[#171717]">
        {value}
      </p>

      <p className="mt-2 text-xs text-black/35">{helper}</p>
    </article>
  );
}