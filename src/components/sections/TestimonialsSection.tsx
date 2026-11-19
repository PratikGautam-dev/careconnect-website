import { Star } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { TestimonialItem } from "@/hooks/usePublicSite";

export function TestimonialsSection({ items }: { items: TestimonialItem[] }) {
  if (items.length === 0) return null;
  const avgRating = items.reduce((sum, r) => sum + r.rating, 0) / items.length;
  return (
    <section className="border-line bg-card border-y px-space-4 py-space-8">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-display">Patient Testimonials</h2>
        <p className="text-hint mt-space-2 text-[13px]">
          TrustScore <span className="text-ink-900 font-semibold">{avgRating.toFixed(1)}</span> ·{" "}
          {items.length} verified patient {items.length === 1 ? "review" : "reviews"}
        </p>
        <div className="gap-space-4 mt-space-6 flex flex-wrap justify-center text-left">
          {items.map((review) => (
            <Card key={review.id} elevation="interactive" className="p-space-4 w-full sm:w-[320px]">
              <div className="gap-space-1 mb-space-3 flex">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    size={13}
                    className={i < review.rating ? "fill-success text-success" : "text-line"}
                  />
                ))}
              </div>
              <p className="text-ink-600 text-[12.5px] italic">&ldquo;{review.quote}&rdquo;</p>
              <div className="mt-space-3 border-line flex items-center justify-between border-t pt-space-3">
                <span className="text-ink-900 text-[12.5px] font-semibold">{review.name}</span>
                <span className="text-success text-[11px] font-semibold">✓ Verified Patient</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
