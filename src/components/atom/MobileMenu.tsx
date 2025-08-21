import { useEffect, useMemo } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface NavigationItem {
  title: string;
  href: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  activeSection: string;
  handleNavigationClick: (href?: string) => void;
  navigationData: NavigationItem[];
}

const MobileMenu = ({
  isOpen,
  activeSection,
  handleNavigationClick,
  navigationData,
}: MobileMenuProps) => {
  // Prevent background scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Allow closing menu with ESC key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        handleNavigationClick();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, handleNavigationClick]);

  // Generate menu items
  const menuItems = useMemo(() => {
    return navigationData.map((item) => {
      const isActive = activeSection === item.href.replace("#", "").toLowerCase();
      return (
        <Link
          key={item.title}
          href={item.href}
          scroll={true}
          onClick={() => handleNavigationClick(item.href)}
          className={cn(
            "text-2xl font-semibold transition-colors duration-300",
            isActive
              ? "text-blue-500"
              : "text-gray-800 dark:text-gray-200 hover:text-blue-400",
            "focus:outline-none focus:ring-2 focus:ring-blue-500"
          )}
        >
          {item.title}
        </Link>
      );
    });
  }, [activeSection, handleNavigationClick, navigationData]);

  return (
    <div
    role="navigation"
    aria-expanded={isOpen}
    className={cn(
    "fixed top-0 left-0 w-screen h-screen z-[9998] flex flex-col items-center justify-center gap-8 bg-white dark:bg-neutral-900 transition-all duration-300 ease-in-out sm:hidden",
    isOpen
        ? "opacity-100 translate-y-0 pointer-events-auto"
        : "opacity-0 -translate-y-full pointer-events-none"
    )}
>
      {/* Close Button */}
      <button
        onClick={() => handleNavigationClick()}
        aria-label="Close menu"
        className="absolute top-4 right-4 text-gray-800 dark:text-gray-200 hover:text-red-500 transition-colors"
      >
         <X size={28} />
      </button>

      {/* Menu Items */}
      {navigationData.length > 0 ? (
        menuItems
      ) : (
        <p className="text-gray-500">No menu items available</p>
      )}
    </div>
  );
};

export default MobileMenu;
