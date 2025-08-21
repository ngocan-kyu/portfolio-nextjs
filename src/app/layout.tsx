import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Particles from "@/components/atom/Backgrounds/Particles";
import Intro from "@/components/animation/Intro";
import type { ReactNode } from "react";

/** Particle configuration (kept outside to avoid re-renders) */
const particleConfig = {
  particleColors: ["#000000", "#ffffff"],
  particleCount: 500,
  particleSpread: 10,
  speed: 0.8,
  particleBaseSize: 100,
  moveParticlesOnHover: true,
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

        <div className="absolute inset-0 z-0 pointer-events-none">
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

