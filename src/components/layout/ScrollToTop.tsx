"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; // Adjust path if needed
import { cn } from "@/lib/utils";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button
      onClick={scrollToTop}
      className={cn(
        "fixed flex bottom-6 md:bottom-10 right-4 md:right-10 z-50 p-0! w-12 h-12 md:w-18 md:h-18 bg-primary text-white rounded-full items-center justify-center transition-all duration-300",
        "hover:bg-primary/90 hover:scale-110 active:scale-95 shadow-lg",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="shrink-0! w-6! h-6!"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.0391 4.56001C11.0391 6.90049 8.90787 9.03361 6.56547 9.03361H5.60547V10.9536H6.56547C8.26851 10.9536 9.86595 10.2067 11.0391 9.03457V20.88H12.9591V9.03457C14.1322 10.2067 15.7296 10.9536 17.4327 10.9536H18.3927V9.03361H17.4327C15.0912 9.03361 12.9591 6.90049 12.9591 4.56001V3.60001H11.0391V4.56001Z"
          fill="white"
        />
      </svg>
    </Button>
  );
}