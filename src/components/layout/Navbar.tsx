"use client";
import { cn } from "@/lib/utils";
import {
  HomeIcon,
  User,
  LightbulbIcon,
  FolderGit2,
  Mail,
} from "lucide-react";
import { Dock, DockIcon, DockItem, DockLabel } from "@/components/animation/DockAnimation";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const data = [
    { title: "Home", icon: <HomeIcon className="h-full w-full" />, href: "#home" },
    { title: "About", icon: <User className="h-full w-full" />, href: "#about" },
    { title: "Skills", icon: <LightbulbIcon className="h-full w-full" />, href: "#skills" },
    { title: "Projects", icon: <FolderGit2 className="h-full w-full" />, href: "#projects" },
    { title: "Contact", icon: <Mail className="h-full w-full" />, href: "#contact" },
  ];

  const [activeSection, setActiveSection] = useState("home");

  // Handle section change on link click
  const handleSectionChange = (title: string) => {
    setActiveSection(title.toLowerCase());
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = data.map((item) => document.querySelector(item.href) as HTMLElement | null);
      let current = "home";

      sections.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          const offsetTop = section.offsetTop - 100;
          // Check if section is in viewport or just scrolled past
          if (window.scrollY >= offsetTop && rect.bottom > 0) {
            current = data[index].title.toLowerCase();
          }
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-5 right-0 left-0 px-0 sm:px-5 m-auto w-full sm:w-fit bg-transparent z-[9999]">
      <Dock className="items-end pb-3 rounded-full">
        {data.map((item, idx) => (
          <Link
            href={item.href}
            key={idx}
            scroll={true}
            onClick={() => handleSectionChange(item.title)}
          >
            <DockItem
              className={cn(
                "aspect-square rounded-full bg-gray-200 dark:bg-neutral-800",
                activeSection === item.title.toLowerCase() &&
                  "bg-gray-100 border border-primary-sky"
              )}
            >
              <DockLabel>{item.title}</DockLabel>
              <DockIcon
                className={cn(
                  activeSection === item.title.toLowerCase() && "text-[#2f7df4]"
                )}
              >
                {item.icon}
              </DockIcon>
            </DockItem>
          </Link>
        ))}
      </Dock>
    </div>
  );
};

export default Navbar;