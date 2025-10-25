export default function Roadmap() {
  return (
    <section id="roadmap" className="w-full bg-zinc-50/50 dark:bg-zinc-900/50 py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6">Road Map</h2>
        
        <div className="rounded-lg border overflow-hidden card-shadow">
          <div className="overflow-auto max-h-[500px] bg-white roadmap-scroll">
            <div className="transform scale-[0.8] origin-top-left w-[125%] h-[125%]">
              <iframe
                src="https://power-veil-30b.notion.site/ebd/1ada40fcac2280fb9139fd6a7695ba78"
                width="100%"
                height="1000"
                allowFullScreen
                title="Notion Road Map"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
