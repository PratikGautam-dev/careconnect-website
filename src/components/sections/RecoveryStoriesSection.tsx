import { Hospital, PlayCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ImageTile } from "@/components/ui/ImageTile";
import type { RecoveryStoryItem } from "@/hooks/usePublicSite";

export function RecoveryStoriesSection({ items }: { items: RecoveryStoryItem[] }) {
  if (items.length === 0) return null;
  return (
    <section className="px-space-4 py-space-8 mx-auto max-w-5xl">
      <h2 className="text-display text-center">Clinical Recovery Stories</h2>
      <div className="gap-space-4 mt-space-6 grid grid-cols-1 sm:grid-cols-2">
        {items.map((story) => (
          <Card key={story.id} elevation="interactive" className="overflow-hidden p-0">
            <div className="relative">
              {story.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element -- hospital-provided URL
                <img src={story.image_url} alt="" className="h-32 w-full object-cover" />
              ) : (
                <ImageTile seed={story.id} icon={Hospital} className="h-32 w-full" />
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <PlayCircle size={36} className="text-white/90" />
              </div>
            </div>
            <div className="p-space-4">
              <p className="text-ink-900 text-[14px] font-semibold">{story.title}</p>
              <p className="text-hint mt-space-1 text-[12.5px]">{story.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
