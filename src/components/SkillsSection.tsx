"use client";

import { Marquee } from "@/components/atom/magicui/marquee";

const skillCategories = [
  { title: "BACKEND", skills: ["springboot", "nodedotjs", "express"] },
  { title: "FRONTEND", skills: ["react", "nextdotjs", "html5", "css3", "javascript", "java"] },
  { title: "DATABASE", skills: ["mysql", "postgresql", "sqlite", "prisma"] },
  { title: "UX / UI", skills: ["tailwindcss", "shadcn", "magicui"] },
  { title: "TOOLS / DEVOPS", skills: ["git", "github", "vscode", "intellijidea", "netbeans", "docker", "vercel", "linux"] }
];

// Local icons for tech not on SimpleIcons
const customIcons = {
  css3: "/icons/css3.svg",
  java: "/icons/java.svg",
  shadcn: "/icons/shadcn.svg",
  magicui: "/icons/magicui.png",
  vscode: "/icons/vscode.svg",
  netbeans: "/icons/netbeans.svg"
};

// Flatten all skills into one list with category info
const allSkills = skillCategories.flatMap(category =>
  category.skills.map(skill => ({
    slug: skill,
    title: category.title,
    icon: customIcons[skill] || `https://cdn.simpleicons.org/${skill}`
  }))
);

const SkillCard = ({ slug, title, icon }: { slug: string; title: string; icon: string }) => {
  return (
    <div
      className="flex flex-col items-center justify-center gap-2 px-4 py-5 rounded-xl border shadow-md
        border-gray-200 dark:border-gray-700
        bg-white dark:bg-gray-800
        hover:shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer group"
    >
      <div className="relative flex items-center justify-center">
        <img
          src={icon}
          alt={slug}
          className="w-12 h-12 group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
      </div>
      <span className="text-sm font-medium text-gray-800 dark:text-gray-200 capitalize text-center">
        {slug.replace(/dotjs/, ".js").replace(/dotnet/, ".NET")}
      </span>
      <p className="text-xs text-gray-500 dark:text-gray-400">{title}</p>
    </div>
  );
};

export default function SkillsSection() {
  const half = Math.ceil(allSkills.length / 2);
  const firstRow = allSkills.slice(0, half);
  const secondRow = allSkills.slice(half);

  return (
    <section className="relative min-h-screen px-6 py-16 flex flex-col items-center justify-center overflow-hidden">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Development Stack
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
      </div>

      {/* Marquee Rows */}
      <div className="relative w-full max-w-7xl flex flex-col gap-8">
        <Marquee pauseOnHover className="[--duration:35s]">
          {firstRow.map(skill => (
            <SkillCard key={skill.slug} {...skill} />
          ))}
        </Marquee>

        <Marquee reverse pauseOnHover className="[--duration:35s]">
          {secondRow.map(skill => (
            <SkillCard key={skill.slug} {...skill} />
          ))}
        </Marquee>

        {/* Left & right gradient masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background"></div>
      </div>
    </section>
  );
}
