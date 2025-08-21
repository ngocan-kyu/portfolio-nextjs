import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Particles from "@/components/atom/Backgrounds/Particles";
import Intro from "@/components/animation/Intro";
import type { ReactNode } from "react";

/** Particle configuration (kept outside to avoid re-renders) */
const particleConfig = {
  particleColors: ["#ffffff", "#00f2ff"],
  particleCount: 800,
  particleSpread: 12,
  speed: 0.5,
  particleBaseSize: 100,
  moveParticlesOnHover: true,
  particleHoverFactor: 0.5,
  alphaParticles: true,
  disableRotation: true,
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className="h-full bg-background text-foreground antialiased">
        <Intro />

        <div className="absolute inset-0 z-0">
          <Particles {...particleConfig} />
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;

