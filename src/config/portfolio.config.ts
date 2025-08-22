// types
import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";

export interface PortfolioConfig {
  name: string;
  title: string;
  description: string;
  location: string;
  email: string;

  socialLinks: {
    name: string;
    url: string;
    icon: LucideIcon | IconType; // <-- cho phép cả lucide-react và react-icons
  }[];

  seo: {
    ogImage: string;
    url: string;
    twitterHandle: string;
    keywords: string[];
    authors: { name: string; url: string }[];
  };

  about: {
    bio: string;
    hobbies: string[];
    personalInfo: {
      language: string;
      nationality: string;
      gender: string;
    };
  };

  skills: {
    roles: string[];
    programmingLanguages: { name: string; icon: string }[];
    frameworks: { name: string; icon: string }[];
    tools: { name: string; icon: string }[];
  };

  education: {
    degree: string;
    institution: string;
    location: string;
    period: string;
    description: string;
  }[];

  projects: {
    title: string;
    description: string;
    tags: string[];
    link: string;
  }[];

  moreLinks: {
    title: string;
    description: string;
    link: string;
  }[];

  apiKeys: {
    resendApiKey: string;
  };
}

// 👇 import icons
import { Github, Linkedin, Instagram, Facebook } from "lucide-react";
import { SiDiscord } from "react-icons/si"; // Discord brand icon

// actual config
export const portfolioConfig: PortfolioConfig = {
  name: "Ho Ngoc An",
  title: "Full-Stack Developer | AI & Web Enthusiast",
  description: "Passionate about building modern web apps and exploring AI technologies.",
  location: "Vietnam",
  email: "hngocan.forwork@gmail.com",

  socialLinks: [
    { name: "Facebook", url: "https://facebook.com/kyungdev", icon: Facebook },
    { name: "Instagram", url: "https://instagram.com/_.wscccc", icon: Instagram },
    { name: "LinkedIn", url: "https://linkedin.com/in/kyungdev", icon: Linkedin },
    { name: "Discord", url: "https://discord.com/users/467540097772945409", icon: SiDiscord },
    { name: "GitHub", url: "https://github.com/ngocan-kyu", icon: Github },
  ],

  seo: {
    ogImage: "/og-image.png",
    url: "https://ngocan-portfolio.com",
    twitterHandle: "@ngocan",
    keywords: ["Full-Stack", "Portfolio", "Next.js", "React", "AI"],
    authors: [{ name: "Ho Ngoc An", url: "https://github.com/ngocan-kyu" }],
  },

  about: {
    bio: "I’m Ho Ngoc An, a Full-Stack Developer from Vietnam. I love creating modern web applications, learning new technologies, and exploring AI projects.",
    hobbies: ["Coding", "Gaming", "Exploring AI", "Building side projects", "Learning new tech"],
    personalInfo: {
      language: "Vietnamese, English",
      nationality: "Vietnamese",
      gender: "Male",
    },
  },

  skills: {
    roles: ["Developer", "Freelancer", "Learner", "Creator"],
    programmingLanguages: [
      { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    ],
    frameworks: [
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    ],
    tools: [
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
    ],
  },

  education: [
    {
      degree: "Self-taught & Continuous Learning",
      institution: "Online Platforms & Personal Projects",
      location: "Vietnam",
      period: "Present",
      description: "Currently focusing on full-stack development and AI applications.",
    },
  ],

  projects: [
    {
      title: "Portfolio Website",
      description: "A personal portfolio showcasing my projects, skills, and journey.",
      tags: ["Next.js", "React", "TailwindCSS", "Framer Motion"],
      link: "https://github.com/ngocan-kyu",
    },
  ],

  moreLinks: [
    {
      title: "Discord",
      description: "Let’s connect on Discord!",
      link: "https://discord.com/users/467540097772945409",
    },
  ],

  apiKeys: {
    resendApiKey: "YOUR_RESEND_API_KEY",
  },
};
