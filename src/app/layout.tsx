import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Intro from "@/components/animation/Intro";
import type { ReactNode } from "react";
import { InteractiveGridPattern } from "@/components/atom/Backgrounds/interactive-grid-pattern";


interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className="h-full bg-background text-foreground antialiased">
        <Intro /> 

        {/* Fixed: Remove pointer-events-auto and let the grid handle its own pointer events */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <InteractiveGridPattern 
            className="pointer-events-auto"
            squareClassName="pointer-events-auto"
          />
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