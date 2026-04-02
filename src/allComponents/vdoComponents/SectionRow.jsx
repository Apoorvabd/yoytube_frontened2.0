import Card_for_vd0 from "./Card_for_vd0";
import { ChevronRight } from "lucide-react";

function SectionRow({ title, videos = [], loading = false }) {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between px-4">
        <h2 className="text-2xl font-black tracking-tighter text-foreground md:text-3xl">
          {title}<span className="text-primary">.</span>
        </h2>
        <button className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-muted-foreground transition-all hover:text-primary hover:gap-2 group">
          See All <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {loading ? (
        <div className="flex gap-6 overflow-hidden px-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="w-[300px] flex-none space-y-4">
              <div className="aspect-video rounded-2xl bg-muted animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-3/4 rounded-full bg-muted animate-pulse" />
                <div className="h-3 w-1/2 rounded-full bg-muted animate-pulse opacity-60" />
              </div>
            </div>
          ))}
        </div>
      ) : videos.length > 0 ? (
        <div className="relative group">
          <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8 px-4 no-scrollbar scroll-smooth transition-all">
            {videos.map((video) => (
              <div 
                key={video._id} 
                className="w-[300px] flex-none snap-start md:w-[340px] transition-transform duration-300 hover:scale-[1.02]"
              >
                <Card_for_vd0 video={video} compact />
              </div>
            ))}
          </div>
          {/* Subtle scroll indication gradients */}
          <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-background to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-background to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      ) : (
        <div className="mx-4 rounded-[2rem] border-2 border-dashed border-border bg-muted/30 p-12 text-center transition-colors hover:border-primary/30">
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">No content found in this section</p>
        </div>
      )}
    </section>
  );
}

export default SectionRow;
