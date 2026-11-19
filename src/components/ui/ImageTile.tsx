import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

/** Stands in for a real photo slot (hero/department/recovery-story/news
 * thumbnails) -- this product has no logo/photo upload capability for
 * hospitals, doctors, or patients yet. Tried two third-party stock-photo
 * placeholder services first (picsum.photos: returns a totally unthemed
 * random photo -- got a back-alley fire-escape shot on a hospital hero
 * section; loremflickr.com: themed by keyword, but was outright down,
 * 500ing on every request including its own homepage demo). A generated
 * gradient + icon tile has no such failure mode -- no network call, never
 * off-theme, never down -- at the cost of looking generated rather than
 * photographic. `seed` just varies the gradient angle/shade slightly so a
 * row of these doesn't look like one tile copy-pasted. */
const SHADES = ["brand-400", "brand-600", "clay-300", "brand-300"] as const;

function hashSeed(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return hash;
}

export function ImageTile({
  seed,
  icon: Icon,
  className,
  iconSize = 32,
}: {
  seed: string;
  icon: LucideIcon;
  className?: string;
  iconSize?: number;
}) {
  const shade = SHADES[hashSeed(seed) % SHADES.length];
  const angle = 45 + (hashSeed(seed + "angle") % 90);
  return (
    <div
      className={cn("flex items-center justify-center", className)}
      style={{
        background: `linear-gradient(${angle}deg, var(--${shade}) 0%, var(--ink-900) 160%)`,
      }}
    >
      <Icon size={iconSize} className="text-white/85" strokeWidth={1.5} />
    </div>
  );
}
