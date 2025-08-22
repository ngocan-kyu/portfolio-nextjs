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
import Link from "next/link";
import { useEffect, useRef, useState, useCallback, memo } from "react";
import { debounce } from "lodash";
import MobileMenu from "../atom/MobileMenu";

interface NavigationItem {
  title: string;
  icon: React.ReactNode;
  href: string;
}

const NAVIGATION_DATA: NavigationItem[] = [
  { title: "Home", icon: <HomeIcon />, href: "#home" },
  { title: "About", icon: <User />, href: "#about" },
  { title: "Skills", icon: <LightbulbIcon />, href: "#skills" },
  { title: "Projects", icon: <FolderGit2 />, href: "#projects" },
  { title: "Contact", icon: <Mail />, href: "#contact" },
];

const SCROLL_THRESHOLD = 150;

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const lastScrollY = useRef(0);
  const activeSectionRef = useRef("home"); // ref để scroll handler luôn có giá trị mới

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  // IntersectionObserver detect section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      { root: null, threshold: 0.3 }
    );

    NAVIGATION_DATA.forEach((item) => {
      const section = document.querySelector(item.href);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Scroll handler
  const handleNavbarVisibility = useCallback(
    debounce(() => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY.current;

      // Chỉ hide navbar khi ở Home
      if (!isOpen) {
        if (activeSectionRef.current === "home") {
          setIsVisible(!scrollingDown || currentScrollY <= SCROLL_THRESHOLD);
        } else {
          setIsVisible(true); // luôn show ở các section khác
        }
      }

      lastScrollY.current = currentScrollY;
    }, 50),
    [isOpen]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleNavbarVisibility, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleNavbarVisibility);
      handleNavbarVisibility.cancel();
    };
  }, [handleNavbarVisibility]);

  const handleNavigationClick = useCallback((href?: string) => {
    setIsOpen(false);
    if (href) setActiveSection(href.replace("#", "").toLowerCase());
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-5 inset-x-0 mx-auto w-full sm:w-fit z-[9999]",
        "transform transition-transform duration-300 ease-in-out will-change-transform",
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      )}
    >
      {/* Mobile Menu Button */}
      <div className="absolute right-5 top-2 sm:hidden flex items-center">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          className="p-2 rounded-full bg-gray-200 dark:bg-neutral-800 shadow-md transition-colors duration-200"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex gap-3 p-3 rounded-full bg-gray-200 dark:bg-neutral-800 shadow-md">
        {NAVIGATION_DATA.map((item) => {
          const isActive = activeSection === item.href.replace("#", "").toLowerCase();
          return (
            <Link
              key={item.title}
              href={item.href}
              scroll={true}
              onClick={() => handleNavigationClick(item.href)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full transition-colors duration-200",
                isActive
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700"
              )}
            >
              <span className="w-5 h-5">{item.icon}</span>
              <span>{item.title}</span>
            </Link>
          );
        })}
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isOpen}
        activeSection={activeSection}
        handleNavigationClick={handleNavigationClick}
        navigationData={NAVIGATION_DATA}
      />
    </nav>
  );
};

export default memo(Navbar);
