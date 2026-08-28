export default function WorkflowPreview() {
  return (
    <section id="workflow-demo" className="bg-[#171717] text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-2">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/40">
            Interactive Project
          </p>

          <h2 className="mt-4 text-4xl font-semibold tracking-tight">
            Workflow Operations Demo
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-white/55">
            A small business workflow application built to demonstrate the full
            loop: creating a request, saving drafts, submitting for review,
            approving or rejecting work, and tracking activity.
          </p>

          <div className="mt-8">
            <span className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/60">
              Coming next
            </span>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div>
              <p className="text-sm text-white/40">Request</p>
              <p className="mt-1 font-medium">REQ-0012</p>
            </div>

            <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/70">
              Pending Approval
            </span>
          </div>

          <div className="space-y-6 py-6">
            <div>
              <p className="text-xs uppercase tracking-wider text-white/35">
                Title
              </p>

              <p className="mt-2">Supplier Delivery Schedule Adjustment</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-white/35">
                  Category
                </p>

                <p className="mt-2 text-white/75">Operations</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-white/35">
                  Priority
                </p>

                <p className="mt-2 text-white/75">High</p>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <p className="text-xs uppercase tracking-wider text-white/35">
                Recent Activity
              </p>

              <div className="mt-5 space-y-4 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-white/70">
                    Submitted for approval
                  </span>
                  <span className="text-white/35">09:41</span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-white/70">Saved as draft</span>
                  <span className="text-white/35">09:36</span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-white/70">Request created</span>
                  <span className="text-white/35">09:32</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}