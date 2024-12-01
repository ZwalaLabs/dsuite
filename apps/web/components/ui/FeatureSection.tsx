import { FEATURE_SECTION } from "@/lib/constant";
import Image from "next/image";

const FeatureList: React.FC = () => {
  return (
    <div className="mt-10">
      <div className="flex overflow-auto -mx-4 sm:mx-0">
        <ul
          className="flex-none inline-grid gap-x-2 px-4 sm:px-0 xl:gap-x-6"
          style={{ gridTemplateColumns: "repeat(4, minmax(6rem, 1fr))" }}
        >
          {FEATURE_SECTION.FEATURES.map(
            ({ IMAGE, TITLE }: { IMAGE: string; TITLE: string }) => (
              <li
                className="group text-sm font-semibold w-full flex flex-col items-center hover:text-pink-400 cursor-pointer"
                key={TITLE}
              >
                {/* image and title */}
                {IMAGE ? (
                  <Image src={IMAGE} alt={TITLE} width={260} height={260} />
                ) : null}
                {TITLE ? <p>{TITLE}</p> : null}
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

const FeatureSection: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      {/* <div className="w-16 h-16 p-[0.1875rem] rounded-full ring-1 ring-slate-900/10 shadow overflow-hidden dark:bg-pink-500 dark:highlight-white/30"> */}
        {/* Image similar to tailwind */}
        {/* <Image
					src=""
					alt="sticker"
					className="aspect-w-1 aspect-h-1 bg-[length:100%]"
				/> */}
      {/* </div> */}
      <h2 className="mt-8 font-semibold text-pink-500 dark:text-pink-400">
        {FEATURE_SECTION.FEATURE_SECTION_HEADING}
      </h2>
      <p className="mt-4 text-3xl sm:text-4xl text-slate-900 font-extrabold tracking-tight dark:text-slate-50 ">
        {FEATURE_SECTION.FEATURE_SECTION_SHORTDESC}
      </p>
      <p className="mt-4 max-w-3xl space-y-6 ">
        {FEATURE_SECTION.FEATURE_SECTION_LONGDESC}
      </p>

      <FeatureList />
    </div>
  );
};

export default FeatureSection;
