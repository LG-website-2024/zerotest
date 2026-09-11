"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { CtaButton } from "../CtaButton";
import { GlobalQuery } from "../../../tina/__generated__/types";

export default function Header({ data }: { data: GlobalQuery }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoUrl = data?.global?.logo;
  const logoAlt = data?.global?.logoAlt || "logo";

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isScrolled ? "bg-black/20 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:py-5 transition-all duration-300">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          {logoUrl && (
            <div className="relative w-45 h-8.75 md:w-65 md:h-11.25">
              <Image
                src={logoUrl}
                alt={logoAlt}
                fill
                className="object-contain"
                priority
              />
            </div>
          )}
        </Link>

        {/* CTA */}
        {data?.global?.ctaBtn && <CtaButton data={data?.global.ctaBtn} />}
      </div>
    </header>
  );
}
