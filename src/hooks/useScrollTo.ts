import { useCallback } from "react";

type SectionChangeCallback = (section: string) => void;

interface ScrollOptions {
  sectionId?: string;
  behavior?: ScrollBehavior;
}

const useScrollTo = (onSectionChange?: SectionChangeCallback) => {
  const scrollTo = useCallback(
    ({ sectionId = "home", behavior = "smooth" }: ScrollOptions = {}) => {
      try {
        if (sectionId === "home") {
          window.scrollTo({ top: 0, behavior });
        } else {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior, block: "start" });
          } else {
            console.warn(`Section with ID "${sectionId}" not found.`);
            window.scrollTo({ top: 0, behavior });
          }
        }
        onSectionChange?.(sectionId);
      } catch (error) {
        console.error("Error scrolling to section:", error);
      }
    },
    [onSectionChange]
  );

  return scrollTo;
};

export default useScrollTo;