import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "production-planning",
    title: "Production Planning & Sequencing Platform",
    summary:
      "Enterprise manufacturing platform supporting planning, scheduling, sequencing, reporting, and system integration.",
    description:
      "A large internal enterprise system used to support manufacturing planning workflows across multiple operational processes.",
    tags: [
      "Enterprise Systems",
      "ASP.NET",
      "SQL Server",
      "REST APIs",
      "Azure DevOps",
    ],
    role:
      "Application Developer working across frontend, backend, database logic, reporting, and deployment support.",
    environment:
      "Established enterprise codebase with multiple environments, complex business rules, SQL procedures, APIs, and release pipelines.",
    problem:
      "The system had to coordinate planning data across multiple stages, enforce operational sequencing rules, produce reports, and keep data consistent across connected applications and environments.",
    contribution: [
      "Implemented and refined production planning and sequencing workflows.",
      "Worked across application UI, backend logic, REST APIs, and SQL Server stored procedures.",
      "Improved scheduling, reporting, and data-processing behavior based on business requirements.",
      "Investigated production and environment-specific issues across Dev, Test, and deployment pipelines.",
      "Supported integration with external enterprise systems and database processes.",
    ],
    challenges: [
      "Business rules were distributed across UI code, application logic, and stored procedures.",
      "Changes often required tracing behavior through several layers before identifying the correct implementation point.",
      "Legacy architecture meant improvements had to preserve compatibility with existing workflows.",
      "Production sequencing required careful handling of ordering, dates, identifiers, and operational constraints.",
    ],
    tools: [
      "ASP.NET Core",
      "JavaScript",
      "SQL Server",
      "REST APIs",
      "Azure DevOps",
      "Git",
      "ChatGPT",
      "Claude",
    ],
    lessons: [
      "Understanding system behavior matters more than changing the first piece of code that appears related.",
      "Business-rule debugging often requires tracing data across several layers.",
      "AI is most useful when given enough context to reason about dependencies rather than being asked for isolated code snippets.",
    ],
    improvements: [
      "Use clearer service and API boundaries.",
      "Introduce stronger automated testing around sequencing and business rules.",
      "Reduce dependency on large stored procedures where application-layer logic would be easier to maintain.",
      "Document critical workflows and system dependencies earlier.",
    ],
  },
  {
    slug: "delivery-scheduling",
    title: "Delivery Scheduling & Approval Platform",
    summary:
      "Enterprise delivery and logistics workflow covering schedules, suppliers, approvals, reporting, and operational business rules.",
    description:
      "An established enterprise application used to manage delivery scheduling and approval workflows for operational planning.",
    tags: [
      "Workflow Design",
      "ASP.NET MVC",
      "SQL Server",
      "Business Logic",
      "Approvals",
    ],
    role:
      "Application Developer responsible for understanding and enhancing an existing enterprise workflow.",
    environment:
      "Mature ASP.NET Core MVC system with controllers, views, commands, database logic, approval flows, and existing operational dependencies.",
    problem:
      "Enhancements had to be introduced into a large legacy application without breaking established scheduling, approval, reporting, and data-management behavior.",
    contribution: [
      "Worked on delivery schedule creation and maintenance workflows.",
      "Investigated approval and draft behavior across controllers, views, and supporting database logic.",
      "Analyzed business requirements and traced related files before implementing changes.",
      "Debugged issues caused by environment data, application logic, and existing dependencies.",
      "Supported reporting and operational workflows tied to delivery scheduling.",
    ],
    challenges: [
      "The application contained many related legacy files and implicit dependencies.",
      "A visible issue in the UI was often caused by data or logic elsewhere in the system.",
      "Changes had to fit existing MVC conventions and company implementation standards.",
      "Environment resets and restored datasets could change application behavior independently of code changes.",
    ],
    tools: [
      "ASP.NET Core MVC",
      "C#",
      "JavaScript",
      "SQL Server",
      "Git",
      "Azure DevOps",
      "ChatGPT",
      "Claude",
    ],
    lessons: [
      "When working in a legacy system, finding all affected dependencies is often the hardest part of the task.",
      "Not every application error is caused by the latest code change; environment and data state must also be verified.",
      "AI-assisted analysis works best when it is used to inspect relationships between files and business rules rather than generate replacements blindly.",
    ],
    improvements: [
      "Use more modular service boundaries.",
      "Reduce coupling between view behavior and backend workflow logic.",
      "Introduce automated integration tests for approval and scheduling flows.",
      "Add clearer technical documentation for cross-module dependencies.",
    ],
  },
  {
    slug: "workflow-operations",
    title: "Workflow Operations Demo",
    summary:
      "A modern full-stack internal-tool demo built with Next.js, Supabase, TypeScript, and AI-assisted development.",
    description:
      "A portfolio project designed to demonstrate how I approach modern application development, AI-assisted problem solving, business workflows, database integration, and deployment-ready architecture.",
    tags: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "RLS",
      "AI-Assisted",
    ],
    role:
      "Designer and developer of the application architecture, workflow, database model, interface, and implementation.",
    environment:
      "Modern Next.js application using Supabase for persistence, authentication, authorization, and PostgreSQL storage.",
    problem:
      "Build a small but realistic business application that demonstrates more than static portfolio content and reflects the kinds of workflow problems found in real enterprise systems.",
    contribution: [
      "Designed a draft-to-approval workflow with multiple states.",
      "Implemented filtering, search, request creation, request details, and activity history.",
      "Migrated persistence from local browser storage to Supabase/PostgreSQL.",
      "Added anonymous authentication and ownership-based Row Level Security.",
      "Implemented reporting and CSV export.",
      "Structured the application around reusable React components and service-layer abstractions.",
    ],
    challenges: [
      "Adapting to stricter React rules around effects and component purity.",
      "Migrating from localStorage to database-backed persistence without rewriting the entire UI.",
      "Keeping seeded showcase records readable while protecting them from anonymous modification.",
      "Designing a demo that remains useful to recruiters without exposing real company data.",
    ],
    tools: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Git",
      "ChatGPT",
    ],
    lessons: [
      "A small application becomes much easier to evolve when data access is separated from UI components.",
      "Database security should not depend on whether the frontend happens to hide a button.",
      "AI is most useful as an implementation partner when its suggestions are validated against framework rules and real runtime behavior.",
    ],
    improvements: [
      "Add automated tests for workflow state transitions.",
      "Move more server-side data access into dedicated Next.js server patterns.",
      "Add richer reporting and audit views.",
      "Introduce a polished deployment and monitoring setup.",
    ],
  },
];