import React, { useState, useEffect } from "react";
import AppShell from "../layout/AppShell";
import AllVdo from "../vdoComponents/AllVdo";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Play, UploadCloud } from "lucide-react";

/**
 * Hero component redesigned to be a high-end product announcement section
 * following a premium light theme (Vercel-inspired).
 */
function Hero() {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState(null);

  useEffect(() => {
    setFeatured({
      title: "The future of video sharing is here.",
      subtitle: "NAVYA EAKSHAN",
      description: "Experience high-definition video streaming, professional content creation, and a global community of creators. Join us to redefine how you share and watch.",
      image: "/hero.jfif",
    });
  }, []);

  return (
    <AppShell>
      <section className="relative flex flex-col items-center justify-center py-20 px-6 text-center lg:py-32">
        {/* Background Decorative Element */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-indigo-200 to-indigo-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>

        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-indigo-100 bg-indigo-50/50 text-indigo-600 text-xs font-bold tracking-widest uppercase transition-colors hover:bg-indigo-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span>{featured?.subtitle || "NAVYA EAKSHAN"}</span>
          </div>

          <h1 className="text-6xl font-black md:text-8xl tracking-tight text-slate-900 leading-[0.9]">
            {featured?.title || "Share your vision with the world."}
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 font-medium leading-relaxed">
            {featured?.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => navigate("/login")}
              className="group relative inline-flex h-14 items-center justify-center gap-2 rounded-full bg-slate-900 px-10 text-base font-bold text-white shadow-xl transition-all hover:bg-slate-800 active:scale-95"
            >
              Get Started
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => navigate("/Upload")}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-10 text-base font-bold text-slate-900 shadow-sm transition-all hover:bg-slate-50 active:scale-95"
            >
              <UploadCloud className="w-4 h-4" />
              Upload Now
            </button>
          </div>
        </div>
      </section>

      {/* Featured Preview / Video Grid Section */}
      <section className="mt-12 px-2 animate-in fade-in duration-1000 delay-300">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900">Trending Now</h2>
            <p className="text-sm font-medium text-slate-500 mt-1">Discover the most popular creators today</p>
          </div>
          <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
            View All Content
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/50 pointer-events-none z-10 h-20 -top-20" />
          <div className="surface-card rounded-3xl p-1 shadow-sm border border-slate-100 overflow-hidden">
             <div className="bg-white rounded-[1.4rem] p-6 lg:p-8">
                <AllVdo />
             </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}

export default Hero;
