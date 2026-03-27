import Card_for_vd0 from "./Card_for_vd0";

function SectionRow({ title, videos = [], loading = false }) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight text-white md:text-2xl">{title}</h2>
      </div>

      {loading ? (
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="w-[280px] flex-none space-y-2">
              <div className="aspect-video rounded-xl shimmer" />
              <div className="h-3 w-3/4 rounded-full shimmer" />
              <div className="h-3 w-1/2 rounded-full shimmer" />
            </div>
          ))}
        </div>
      ) : videos.length > 0 ? (
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
          {videos.map((video) => (
            <div key={video._id} className="w-[280px] flex-none snap-start md:w-[320px]">
              <Card_for_vd0 video={video} compact />
            </div>
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-white/10 bg-[#181818] p-4 text-sm text-[#b3b3b3]">No videos available.</p>
      )}
    </section>
  );
}

export default SectionRow;