const Hero = () => {
  return (
    <div className="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32">
      <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      </h1>
      <p className="mt-6 text-lg text-slate-600 text-center max-w-3xl mx-auto dark:text-slate-400">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti
        dignissimos incidunt libero sed sit eius, aut, culpa ex inventore unde
        ut est qui saepe consequuntur provident amet cum nostrum eos?
      </p>
      <div className="mt-6 sm:mt-10 flex justify-center space-x-6 text-sm">
        <a
          href=""
          className="bg-slate-900 hover:bg-slate-700 focus:outline-none text-white font-semibold h-12 px-6 rounded-lg flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
        >
          Start Meeting
        </a>
      </div>
    </div>
  );
};

export default Hero;
