/** Dummy avatar imagery -- this product has no photo-upload capability for
 * doctors/patients yet (confirmed: no such column or upload endpoint
 * exists anywhere in careconnect-backend). DiceBear's initials style
 * generates a non-photographic avatar, seeded so the SAME name always
 * gets the SAME avatar -- deliberately NOT a stock photo of a real person
 * standing in for a specific named doctor.
 *
 * Themed photo slots (hero/department/recovery-story/news thumbnails) use
 * src/components/ui/ImageTile.tsx instead of a third-party photo API --
 * see that file's own comment for why (two photo placeholder services
 * tried first, one off-theme, one outright down). */
export function initialsAvatarUrl(seed: string): string {
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(seed)}&backgroundColor=00949e&textColor=ffffff`;
}
