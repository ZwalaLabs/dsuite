import { HOMEPAGE } from "@/lib/constant";
import Link from "next/link";
import React from "react";
import { Button } from "./button";

const Hero = () => {
  return (
    <div className="relative max-w-5xl mx-auto pt-20 p-10 sm:pt-24 lg:pt-32">
      <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
        {HOMEPAGE.HERO_SECTION_HEADING}
      </h1>
      <p className="mt-6 text-lg text-slate-600 text-center max-w-3xl mx-auto dark:text-slate-400">
        {HOMEPAGE.HERO_SECTION_DESCRIPTION}
      </p>

      <Link href="/dashboard" className="mt-6 sm:mt-10 flex justify-center space-x-6 text-sm">
        <Button variant="gradientButton" className="text-3xl font-black p-8">
          {HOMEPAGE.HERO_SECTION_BUTTON}
        </Button>
      </Link>
    </div>
  );
};

export default Hero;
