"use client";

import { cn } from "@/lib/utils";
import {
  HomeIcon,
  User,
  LightbulbIcon,
  FolderGit2,
  Mail,
  Menu,
  X,
} from "lucide-react";
import {
  Dock,
  DockIcon,
  DockItem,
  DockLabel,
} from "@/components/animation/DockAnimation";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  useCallback,
  memo,
} from "react";
import { debounce } from "lodash";

// ------------------------ Types ------------------------
interface NavigationItem {
  title: string;
  icon: React.ReactNode;
  href: string;
}

// ------------------------ Constants ------------------------
const NAVIGATION_DATA: NavigationItem[] = [
  { title: "Home", icon: <HomeIcon className="h-full w-full" />, href: "#home" },
  { title: "About", icon: <User className="h-full w-full" />, href: "#about" },
  { title: "Skills", icon: <LightbulbIcon className="h-full w-full" />, href: "#skills" },
  { title: "Projects", icon: <FolderGit2 className="h-full w-full" />, href: "#projects" },
  { title: "Contact", icon: <Mail className="h-full w-full" />, href: "#contact" },
];

const SCROLL_THRESHOLD = 100;
const DEFAULT_SECTION = "home";

// Memoized DockItem to prevent unnecessary re-renders
const MemoizedDockItem = memo(DockItem);

const Navbar = () => {
  const [activeSection, setActiveSection] = useState<string>(DEFAULT_SECTION);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const lastScrollY = useRef<number>(0);

  /* ------------------------ Handle navbar visibility on scroll ------------------------ */
  const handleNavbarVisibility = useCallback(
    debounce(() => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY.current;

      // Ẩn navbar khi scroll xuống, hiện navbar khi scroll lên
      if (!isOpen) {
        setIsVisible(!scrollingDown || currentScrollY <= SCROLL_THRESHOLD);
      }
      lastScrollY.current = currentScrollY;
    }, 100),
    [isOpen]
  );

  /* ------------------------ Detect active section ------------------------ */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting);
        if (visibleSection) {
          setActiveSection(visibleSection.target.id);
        }
      },
      {
        root: null,
        threshold: 0.6, // 60% section visible = active
      }
    );

    NAVIGATION_DATA.forEach((item) => {
      const section = document.querySelector(item.href);
      if (section) {
        observer.observe(section);
      } else {
        console.warn(`Section not found for href: ${item.href}`);
      }
    });

    return () => observer.disconnect();
  }, []);

  /* ------------------------ Attach scroll listener ------------------------ */
  useEffect(() => {
    window.addEventListener("scroll", handleNavbarVisibility, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleNavbarVisibility);
      handleNavbarVisibility.cancel();
    };
  }, [handleNavbarVisibility]);

  /* ------------------------ Click handler ------------------------ */
  const handleNavigationClick = useCallback((href: string) => {
    setIsOpen(false); // Close mobile menu
    setActiveSection(href.replace("#", "").toLowerCase()); // Update active section immediately
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-5 inset-x-0 mx-auto w-full sm:w-fit px-0 sm:px-5 bg-transparent z-[9999]",
        "transform transition-transform duration-300 ease-in-out will-change-transform",
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      )}
    >
      {/* Mobile toggle button */}
      <div className="absolute right-5 top-2 sm:hidden flex items-center">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          className="p-2 rounded-full bg-gray-200 dark:bg-neutral-800 shadow-md transition-colors duration-200"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Navigation links */}
      <Dock
        className={cn(
          "items-end pb-3 rounded-full transition-all duration-300",
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 sm:max-h-screen sm:opacity-100"
        )}
      >
        {NAVIGATION_DATA.map((item, index) => {
          const isActive = activeSection === item.href.replace("#", "").toLowerCase();

          return (
            <Link
              href={item.href}
              key={`nav-${item.title}-${index}`}
              scroll={true}
              onClick={() => handleNavigationClick(item.href)}
              aria-label={`Navigate to ${item.title} section`}
              aria-current={isActive ? "page" : undefined}
            >
              <MemoizedDockItem
                className={cn(
                  "aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 transition-all duration-200",
                  isActive && "bg-gray-100 border border-primary-sky"
                )}
              >
                <DockLabel>{item.title}</DockLabel>
                <DockIcon
                  className={cn(
                    "transition-colors duration-200",
                    isActive ? "text-[#2f7df4]" : "text-gray-500"
                  )}
                >
                  {item.icon}
                </DockIcon>
              </MemoizedDockItem>
            </Link>
          );
        })}
      </Dock>
    </nav>
  );
};

export default Navbar;
