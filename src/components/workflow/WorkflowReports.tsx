"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { getWorkflowRequests } from "@/lib/workflowService";
import type { WorkflowRequest } from "@/types/workflow";

export default function WorkflowReports() {
  const [requests, setRequests] = useState<WorkflowRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let isActive = true;

    async function loadReports() {
      try {
        const data = await getWorkflowRequests();

        if (isActive) {
          setRequests(data);
        }
      } catch (error) {
        console.error(error);

        if (isActive) {
          setLoadError("Unable to load report data.");
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    loadReports();

    return () => {
      isActive = false;
    };
  }, []);

  const metrics = useMemo(() => {
    const total = requests.length;

    const approved = requests.filter(
      (request) => request.status === "Approved"
    ).length;

    const pending = requests.filter(
      (request) => request.status === "Pending Approval"
    ).length;

    const rejected = requests.filter(
      (request) => request.status === "Rejected"
    ).length;

    const drafts = requests.filter(
      (request) => request.status === "Draft"
    ).length;

    const approvalRate =
      total === 0
        ? 0
        : Math.round((approved / total) * 100);

    return {
      total,
      approved,
      pending,
      rejected,
      drafts,
      approvalRate,
    };
  }, [requests]);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();

    requests.forEach((request) => {
      counts.set(
        request.category,
        (counts.get(request.category) ?? 0) + 1
      );
    });

    return Array.from(counts.entries())
      .map(([label, value]) => ({
        label,
        value,
      }))
      .sort((a, b) => b.value - a.value);
  }, [requests]);

  const priorities = useMemo(() => {
    return ["High", "Medium", "Low"].map((priority) => ({
      label: priority,
      value: requests.filter(
        (request) => request.priority === priority
      ).length,
    }));
  }, [requests]);

  function exportCsv() {
    const headers = [
      "Request Number",
      "Title",
      "Category",
      "Requester",
      "Priority",
      "Status",
      "Created",
      "Updated",
    ];

    const rows = requests.map((request) => [
      request.requestNumber,
      request.title,
      request.category,
      request.requester,
      request.priority,
      request.status,
      request.createdAt,
      request.updatedAt,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) =>
            `"${String(value).replaceAll('"', '""')}"`
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "workflow-report.csv";
    anchor.click();

    URL.revokeObjectURL(url);
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f5f6f8] p-10">
        <p className="text-sm text-black/45">
          Loading reports...
        </p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-screen bg-[#f5f6f8] p-10">
        <p className="font-medium text-red-600">
          {loadError}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f6f8]">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link
              href="/workflow"
              className="mb-6 inline-flex text-sm text-black/45 transition hover:text-black"
            >
              ← Back to Workflow
            </Link>

            <p className="text-sm font-medium uppercase tracking-[0.2em] text-black/40">
              Operations Analytics
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight">
              Workflow Reports
            </h1>

            <p className="mt-3 max-w-2xl text-black/55">
              A lightweight view of request volume, status,
              priority, and operational distribution.
            </p>
          </div>

          <button
            type="button"
            onClick={exportCsv}
            className="rounded-xl bg-[#171717] px-5 py-3 text-sm font-medium text-white transition hover:bg-black/80"
          >
            Export CSV
          </button>
        </div>

        <section className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Total Requests"
            value={metrics.total}
          />

          <MetricCard
            label="Approved"
            value={metrics.approved}
          />

          <MetricCard
            label="Pending"
            value={metrics.pending}
          />

          <MetricCard
            label="Approval Rate"
            value={`${metrics.approvalRate}%`}
          />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <ReportCard title="Requests by Status">
            <BarRow
              label="Approved"
              value={metrics.approved}
              total={metrics.total}
            />

            <BarRow
              label="Pending Approval"
              value={metrics.pending}
              total={metrics.total}
            />

            <BarRow
              label="Draft"
              value={metrics.drafts}
              total={metrics.total}
            />

            <BarRow
              label="Rejected"
              value={metrics.rejected}
              total={metrics.total}
            />
          </ReportCard>

          <ReportCard title="Requests by Priority">
            {priorities.map((item) => (
              <BarRow
                key={item.label}
                label={item.label}
                value={item.value}
                total={metrics.total}
              />
            ))}
          </ReportCard>

          <ReportCard title="Requests by Category">
            {categories.length === 0 ? (
              <p className="text-sm text-black/40">
                No category data available.
              </p>
            ) : (
              categories.map((item) => (
                <BarRow
                  key={item.label}
                  label={item.label}
                  value={item.value}
                  total={metrics.total}
                />
              ))
            )}
          </ReportCard>

          <ReportCard title="Workflow Summary">
            <div className="grid grid-cols-2 gap-4">
              <SummaryBox
                label="Approved"
                value={metrics.approved}
              />

              <SummaryBox
                label="Rejected"
                value={metrics.rejected}
              />

              <SummaryBox
                label="Pending"
                value={metrics.pending}
              />

              <SummaryBox
                label="Draft"
                value={metrics.drafts}
              />
            </div>
          </ReportCard>
        </section>
      </div>
    </div>
  );
}

type MetricCardProps = {
  label: string;
  value: number | string;
};

function MetricCard({
  label,
  value,
}: MetricCardProps) {
  return (
    <article className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
      <p className="text-sm text-black/45">
        {label}
      </p>

      <p className="mt-4 text-3xl font-semibold tracking-tight">
        {value}
      </p>
    </article>
  );
}

type ReportCardProps = {
  title: string;
  children: React.ReactNode;
};

function ReportCard({
  title,
  children,
}: ReportCardProps) {
  return (
    <article className="rounded-2xl border border-black/5 bg-white p-7 shadow-sm">
      <h2 className="text-lg font-semibold">
        {title}
      </h2>

      <div className="mt-6 space-y-5">
        {children}
      </div>
    </article>
  );
}

type BarRowProps = {
  label: string;
  value: number;
  total: number;
};

function BarRow({
  label,
  value,
  total,
}: BarRowProps) {
  const width =
    total === 0
      ? 0
      : Math.round((value / total) * 100);

  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-black/60">
          {label}
        </span>

        <span className="font-medium">
          {value}
        </span>
      </div>

      <div className="mt-2 h-2 overflow-hidden rounded-full bg-black/[0.05]">
        <div
          className="h-full rounded-full bg-black"
          style={{
            width: `${width}%`,
          }}
        />
      </div>
    </div>
  );
}

type SummaryBoxProps = {
  label: string;
  value: number;
};

function SummaryBox({
  label,
  value,
}: SummaryBoxProps) {
  return (
    <div className="rounded-xl bg-[#f5f6f8] p-5">
      <p className="text-sm text-black/45">
        {label}
      </p>

      <p className="mt-2 text-2xl font-semibold">
        {value}
      </p>
    </div>
  );
}