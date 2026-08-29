import type { AIDevelopmentEntry } from "@/types/aiDevelopment";

export const aiDevelopmentEntries: AIDevelopmentEntry[] = [
  {
    id: 1,
    title: "Breaking the homepage into reusable components",
    stage: "Architecture",
    problem:
      "The initial portfolio page worked, but nearly all of the UI lived inside one large page component.",
    aiContribution:
      "AI helped identify logical component boundaries and suggested separating project data, types, layout components, and home sections.",
    humanDecision:
      "I kept the refactor focused on structure rather than changing the design, then verified the production build before continuing.",
    outcome:
      "The homepage became easier to maintain and provided a cleaner base for adding multiple routes and features.",
  },
  {
    id: 2,
    title: "Replacing an effect-based localStorage approach",
    stage: "React State",
    problem:
      "An early localStorage implementation synchronously updated state inside useEffect, which triggered a modern React lint warning about cascading renders.",
    aiContribution:
      "AI proposed a revised architecture using useSyncExternalStore to treat localStorage as an external source rather than suppressing the warning.",
    humanDecision:
      "I replaced the original implementation instead of disabling the lint rule, then retested persistence and filtering behavior.",
    outcome:
      "The local prototype remained reactive while conforming to the stricter React rules used by the current framework.",
  },
  {
    id: 3,
    title: "Using localStorage as a disposable prototype layer",
    stage: "Prototyping",
    problem:
      "The workflow needed persistence before introducing database configuration and authentication.",
    aiContribution:
      "AI suggested using browser storage temporarily so the form, request states, filtering, and approval flow could be validated independently.",
    humanDecision:
      "I used localStorage only as an intermediate step and deliberately avoided building additional features around it once the workflow behavior was proven.",
    outcome:
      "The application logic was validated before the database migration, reducing the number of moving parts introduced at once.",
  },
  {
    id: 4,
    title: "Migrating persistence to Supabase",
    stage: "Backend",
    problem:
      "Browser storage could not support cross-device persistence or behave like a real shared business application.",
    aiContribution:
      "AI helped structure the Supabase client, database tables, row mappers, and service functions used for reads, inserts, updates, and activity history.",
    humanDecision:
      "I migrated the application one layer at a time and kept the localStorage version intact until each database operation had been tested.",
    outcome:
      "Requests and activity history became persistent in PostgreSQL and were immediately visible across different browsers.",
  },
  {
    id: 5,
    title: "Securing the public demo",
    stage: "Security",
    problem:
      "The initial Supabase policies allowed anonymous visitors to modify shared showcase records.",
    aiContribution:
      "AI proposed anonymous authentication, ownership fields, and Row Level Security policies that separate public read access from user-specific modification rights.",
    humanDecision:
      "I tested the model in two separate browsers to confirm that a request created in one browser became read-only in the other.",
    outcome:
      "The demo remained interactive without allowing visitors to modify another user's records or the seeded portfolio data.",
  },
  {
    id: 6,
    title: "Adding operational reporting",
    stage: "Product Iteration",
    problem:
      "The workflow demonstrated data creation and approvals, but did not yet show how operational data could be summarized.",
    aiContribution:
      "AI helped outline lightweight reporting metrics and a dependency-free CSV export flow.",
    humanDecision:
      "I kept the reporting layer intentionally small so it strengthened the demo without turning the project into a large analytics product.",
    outcome:
      "The application gained status, priority, category, approval-rate, and CSV reporting using the same Supabase data source.",
  },
];