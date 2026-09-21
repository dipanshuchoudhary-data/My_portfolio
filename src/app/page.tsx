import Navigation from "@/components/layout/Navigation";
import CustomCursor from "@/components/layout/CustomCursor";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import { ProjectsHeader, ProjectDetail } from "@/components/sections/Projects";
import ProjectSnapZone from "@/components/sections/ProjectSnapZone";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Achievements from "@/components/sections/Achievements";
import Contact from "@/components/sections/Contact";
import GalaxyBackground from "@/components/three/GalaxyBackground";

export default function Home() {
  return (
    <>
      <GalaxyBackground />

      <main className="relative z-10">
        <Navigation />

        <section id="hero" aria-label="Introduction" className="paper-section relative z-20">
          <Hero />
        </section>

        <section id="about" aria-label="About me" className="paper-section">
          <About />
        </section>

        <div className="project-journey">
          <section id="projects" aria-label="Featured projects" className="project-stage">
            <ProjectsHeader />
          </section>

          <ProjectSnapZone>
            <section id="project-0" aria-label="Project: Quizzer" className="project-panel">
              <ProjectDetail index={0} />
            </section>
            <div className="project-break" aria-hidden="true" />
            <section id="project-1" aria-label="Project: Life Route AI" className="project-panel">
              <ProjectDetail index={1} />
            </section>
            <div className="project-break" aria-hidden="true" />
            <section id="project-2" aria-label="Project: Maantra" className="project-panel">
              <ProjectDetail index={2} />
            </section>
            <div className="project-break" aria-hidden="true" />
            <section id="project-3" aria-label="Project: MemoGraph" className="project-panel">
              <ProjectDetail index={3} />
            </section>
          </ProjectSnapZone>
        </div>

        <section id="skills" aria-label="Technical skills" className="paper-section">
          <Skills />
        </section>

        <section id="experience" aria-label="Experience" className="paper-section">
          <Experience />
        </section>

        <section id="achievements" aria-label="Achievements" className="paper-section">
          <Achievements />
        </section>

        <section id="contact" aria-label="Contact" className="paper-section">
          <Contact />
          <Footer />
        </section>
      </main>

      <CustomCursor />
    </>
  );
}
