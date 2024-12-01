import { HOMEPAGE } from "@/lib/constant";
import Link  from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32">
      <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
        {HOMEPAGE.HERO_SECTION_HEADING}
      </h1>
      <p className="mt-6 text-lg text-slate-600 text-center max-w-3xl mx-auto dark:text-slate-400">
        {HOMEPAGE.HERO_SECTION_DESCRIPTION}
      </p>
      <div className="mt-6 sm:mt-10 flex justify-center space-x-6 text-sm">
        <Link
        // add meeting link if logged in else navigate to login link
          href=""
          className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
        >
          {HOMEPAGE.HERO_SECTION_BUTTON}
        </Link>
      </div>
    </div>
  );
};

export default Hero;
