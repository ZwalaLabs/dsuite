import { FEATURE_SECTION } from "@/lib/constant";

const FeatureList: React.FC = () => {
  return (
    <div className="mt-10 mb-32">
      <ul
        className="flex gap-24 items-center justify-center flex-col"
        style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
      >
        {FEATURE_SECTION.FEATURES.map(({ IMAGE, TITLE }: { IMAGE: string; TITLE: string }) => (
          <li
            className="group text-sm font-semibold w-full flex flex-col items-center hover:text-primary cursor-pointer gap-4"
            key={TITLE}
          >
            {IMAGE ? (
              <div className="overflow-hidden rounded-md">
                <video
                  src={IMAGE}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="rounded-md w-[50rem] hover:scale-110 transition-all duration-300 transform"
                />
              </div>
            ) : null}
            {TITLE ? <p className="text-2xl">{TITLE}</p> : null}
          </li>
        ))}
      </ul>
    </div>
  );
};

const FeatureSection: React.FC = () => {
  return (
    <div className="container mx-auto mt-12 md:mt-32 p-10">
      <h2 className="mt-8 text-3xl font-semibold text-primary">
        {FEATURE_SECTION.FEATURE_SECTION_HEADING}
      </h2>
      <p className="mt-4 text-2xl md:text-5xl text-slate-900 font-extrabold tracking-tight dark:text-slate-50 ">
        {FEATURE_SECTION.FEATURE_SECTION_SHORTDESC}
      </p>

      <FeatureList />
    </div>
  );
};

export default FeatureSection;
