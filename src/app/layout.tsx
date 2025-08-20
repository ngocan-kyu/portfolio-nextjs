import "./globals.css";
import { WarpBackground } from "@/components/magicui/warp-background";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <WarpBackground/>
        <body>
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
        </body>
    </html>
  );
}