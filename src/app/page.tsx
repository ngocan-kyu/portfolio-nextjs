import HeroSection from "@/components/HeroSection"
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <section id="home">
       <HeroSection />
      </section>
      <section id="about">
       <AboutSection/>
      </section>
      <section id="skills">
       <SkillsSection/>
      </section>
      <section id="projects">
       <ProjectsSection/>
      </section>
      <section id="contact">
       <ContactSection/>
       </section>
    </main>
  );
}
