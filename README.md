# Patrick Romero — Portfolio & Workflow Operations Demo

A modern developer portfolio and full-stack workflow application built to demonstrate practical software engineering, AI-assisted development, business workflow design, database integration, reporting, and deployment-ready architecture.

## Live Demo

[View the deployed portfolio](https://patrick-portfolio-five-omega.vercel.app/)

## Overview

This project combines a personal portfolio with a working internal-tool style application.

The portfolio includes:

- Professional background and project case studies
- AI-assisted development log
- Personal photography gallery
- Contact section
- Responsive navigation and layout

The Workflow Operations demo includes:

- Request creation
- Draft and approval states
- Search and filtering
- Request detail pages
- Activity history
- Approval and rejection actions
- Reporting and CSV export
- Supabase/PostgreSQL persistence
- Anonymous authentication
- Row Level Security and request ownership

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Supabase
- PostgreSQL
- Git
- Vercel
- Lucide React
- ChatGPT

## Workflow Architecture

```text
Browser / React UI
        ↓
Next.js Application
        ↓
Workflow Service Layer
        ↓
Supabase
        ↓
PostgreSQL