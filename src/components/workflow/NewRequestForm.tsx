"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { addStoredRequest } from "@/lib/workflowStorage";
import type {
  RequestPriority,
  RequestStatus,
  WorkflowRequest,
} from "@/types/workflow";

type FormErrors = {
  title?: string;
  category?: string;
  requester?: string;
  description?: string;
};

const categories = [
  "Operations",
  "Planning",
  "Reporting",
  "Master Data",
  "Access",
];

const priorities: RequestPriority[] = [
  "Low",
  "Medium",
  "High",
];

export default function NewRequestForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] =
    useState<RequestPriority>("Medium");
  const [requester, setRequester] = useState("");
  const [description, setDescription] = useState("");

  const [errors, setErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState("");

  function validateForm() {
    const newErrors: FormErrors = {};

    if (!title.trim()) {
      newErrors.title = "Request title is required.";
    }

    if (!category) {
      newErrors.category = "Please select a category.";
    }

    if (!requester.trim()) {
      newErrors.requester = "Requester is required.";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function generateRequestNumber() {
    const timestamp = Date.now().toString().slice(-5);

    return `REQ-${timestamp}`;
  }

  function createRequest(status: RequestStatus) {
    if (!validateForm()) {
      setMessage("");
      return;
    }

    const now = new Date();

    const newRequest: WorkflowRequest = {
      id: Date.now(),
      requestNumber: generateRequestNumber(),
      title: title.trim(),
      description: description.trim(),
      category,
      requester: requester.trim(),
      priority,
      status,
      createdAt: now.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      updatedAt: now.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    addStoredRequest(newRequest);

    if (status === "Draft") {
      setMessage("Request saved as draft.");
    } else {
      setMessage("Request submitted for approval.");
    }

    setTimeout(() => {
      router.push("/workflow");
    }, 700);
  }

  return (
    <div className="min-h-screen bg-[#f5f6f8]">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <Link
          href="/workflow"
          className="mb-8 inline-flex text-sm text-black/45 transition hover:text-black"
        >
          ← Back to Workflow
        </Link>

        <div className="rounded-2xl border border-black/5 bg-white shadow-sm">
          <div className="border-b border-black/5 px-7 py-6">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-black/40">
              Workflow Request
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight">
              Create New Request
            </h1>

            <p className="mt-2 text-sm leading-6 text-black/45">
              Create an internal request and either save it as
              a draft or submit it for review.
            </p>
          </div>

          <div className="space-y-7 p-7">
            <FormField
              label="Request Title"
              error={errors.title}
            >
              <input
                type="text"
                value={title}
                onChange={(event) =>
                  setTitle(event.target.value)
                }
                placeholder="e.g. Supplier Delivery Schedule Adjustment"
                className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none transition placeholder:text-black/25 focus:border-black/30"
              />
            </FormField>

            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                label="Category"
                error={errors.category}
              >
                <select
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value)
                  }
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/30"
                >
                  <option value="">
                    Select category
                  </option>

                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label="Priority">
                <select
                  value={priority}
                  onChange={(event) =>
                    setPriority(
                      event.target.value as RequestPriority
                    )
                  }
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/30"
                >
                  {priorities.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </FormField>
            </div>

            <FormField
              label="Requested By"
              error={errors.requester}
            >
              <input
                type="text"
                value={requester}
                onChange={(event) =>
                  setRequester(event.target.value)
                }
                placeholder="e.g. Operations Team"
                className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none transition placeholder:text-black/25 focus:border-black/30"
              />
            </FormField>

            <FormField
              label="Description"
              error={errors.description}
            >
              <textarea
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
                rows={6}
                placeholder="Describe what is being requested and why..."
                className="w-full resize-none rounded-xl border border-black/10 px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-black/25 focus:border-black/30"
              />
            </FormField>

            {message && (
              <div className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                {message}
              </div>
            )}

            <div className="flex flex-col-reverse gap-3 border-t border-black/5 pt-6 sm:flex-row sm:justify-end">
              <Link
                href="/workflow"
                className="rounded-xl border border-black/10 px-5 py-3 text-center text-sm font-medium text-black/60 transition hover:bg-black/[0.03]"
              >
                Cancel
              </Link>

              <button
                type="button"
                onClick={() => createRequest("Draft")}
                className="rounded-xl border border-black/10 px-5 py-3 text-sm font-medium transition hover:bg-black/[0.03]"
              >
                Save Draft
              </button>

              <button
                type="button"
                onClick={() =>
                  createRequest("Pending Approval")
                }
                className="rounded-xl bg-[#171717] px-5 py-3 text-sm font-medium text-white transition hover:bg-black/80"
              >
                Submit for Approval
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type FormFieldProps = {
  label: string;
  error?: string;
  children: React.ReactNode;
};

function FormField({
  label,
  error,
  children,
}: FormFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        {label}
      </label>

      {children}

      {error && (
        <p className="mt-2 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}