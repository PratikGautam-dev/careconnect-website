import { Newspaper } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ImageTile } from "@/components/ui/ImageTile";
import type { NewsItem } from "@/hooks/usePublicSite";

export function NewsSection({ items }: { items: NewsItem[] }) {
  if (items.length === 0) return null;
  return (
    <section className="border-line bg-card border-y px-space-4 py-space-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-display text-center">Latest Medical Updates &amp; News</h2>
        <div className="gap-space-4 mt-space-6 flex flex-wrap justify-center">
          {items.map((item) => (
            <Card key={item.id} elevation="interactive" className="w-full overflow-hidden p-0 sm:w-[300px]">
              {item.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element -- hospital-provided URL
                <img src={item.image_url} alt="" className="h-28 w-full object-cover" />
              ) : (
                <ImageTile seed={item.id} icon={Newspaper} className="h-28 w-full" iconSize={26} />
              )}
              <div className="p-space-4">
                <p className="text-ink-900 text-[14px] font-semibold">{item.title}</p>
                <p className="text-hint mt-space-1 text-[12.5px]">{item.summary}</p>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-600 mt-space-3 inline-block text-[12px] font-semibold"
                  >
                    Read Article →
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
