import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Particles from "@/components/atom/Backgrounds/Particles";

// Define props interface for Particles component
interface ParticlesProps {
  particleColors: string[];
  particleCount: number;
  particleSpread: number;
  speed: number;
  particleBaseSize: number;
  moveParticlesOnHover: boolean;
  alphaParticles: boolean;
  disableRotation: boolean;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Particle configuration
  const particleConfig: ParticlesProps = {
    particleColors: ["#ffffff", "#000000"],
    particleCount: 500,
    particleSpread: 10,
    speed: 0.8,
    particleBaseSize: 100,
    moveParticlesOnHover: false,
    alphaParticles: true,
    disableRotation: true,
  };

  return (
    <html lang="en">
      <body className="h-full">
        {/* Background Particles Container */}
        <div className="absolute inset-0 z-10 pointer-events-auto">
          <div className="w-full h-[600px] relative">
            <Particles {...particleConfig} />
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-20">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}