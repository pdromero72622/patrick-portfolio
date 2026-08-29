import AboutSection from "@/components/home/AboutSection";
import AIWorkflowSection from "@/components/home/AIWorkflowSection";
import BeyondBuildSection from "@/components/home/BeyondBuildSection";
import ContactSection from "@/components/home/ContactSection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import HeroSection from "@/components/home/HeroSection";
import WorkflowPreview from "@/components/home/WorkflowPreview";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";


export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f7f5] text-[#171717]">
      <Navbar />

      <HeroSection />

      <AboutSection />

      <FeaturedProjects />

      <WorkflowPreview />

      <AIWorkflowSection />

      <BeyondBuildSection />

      <ContactSection />

      <Footer />
    </main>
  );
}