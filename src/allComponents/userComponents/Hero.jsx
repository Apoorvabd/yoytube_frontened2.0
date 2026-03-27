import React, { useState, useEffect } from "react";
import AppShell from "../layout/AppShell";
import AllVdo from "../vdoComponents/AllVdo";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function Hero() {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState(null);

  useEffect(() => {
    setFeatured({
      title: "Welcome to NAVYA EAKSHAN",
      description: "Create, share, and explore amazing videos with our premium platform.",
      image: "/hero.png",
    });
  }, []);

  return (
    <AppShell>
      {/* Hero Banner */}
      {featured && (
        <section className="surface-glass relative h-[360px] overflow-hidden md:h-[480px]">
          <img
            src={featured.image}
            alt="Featured"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-hero" />

          <div className="relative flex h-full flex-col items-start justify-end p-6 md:p-10">
            <h1 className="max-w-2xl text-4xl font-black leading-tight text-white md:text-5xl">
              {featured.title}
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-7 text-[#d8d8d8]">{featured.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="accent-btn inline-flex items-center gap-2"
              >
                Get Started <ArrowRight size={18} />
              </button>
              <button
                type="button"
                onClick={() => navigate("/Upload")}
                className="rounded-xl border border-white/20 bg-white/10 px-6 py-2.5 font-semibold text-white transition hover:bg-white/20"
              >
                Upload Now
              </button>
            </div>
          </div>
        </section>
      )}

      {/* All Videos Grid */}
      <AllVdo />
    </AppShell>
  );
}

export default Hero;
