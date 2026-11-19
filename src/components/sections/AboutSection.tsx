export function AboutSection({
  hospitalName,
  text,
  hideHeading = false,
}: {
  hospitalName: string;
  text: string;
  hideHeading?: boolean;
}) {
  if (!text) return null;
  return (
    <section id="about" className="border-line bg-card border-y px-space-4 py-space-8">
      <div className="mx-auto max-w-2xl text-center">
        {!hideHeading && <h2 className="text-display">About {hospitalName}</h2>}
        <p className={hideHeading ? "text-body" : "text-hint mt-space-3 text-[13px]"}>{text}</p>
      </div>
    </section>
  );
}
