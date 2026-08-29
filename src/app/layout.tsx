import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Patrick Romero | Developer & AI-Assisted Builder",
    template: "%s | Patrick Romero",
  },
  description:
    "Portfolio of Patrick Romero — enterprise developer, problem solver, and AI-assisted builder working across workflows, APIs, databases, and modern web applications.",
  keywords: [
    "Patrick Romero",
    "Developer Portfolio",
    "Next.js",
    "TypeScript",
    "Supabase",
    "AI-Assisted Development",
    "Web Development",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}