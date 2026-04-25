"use client";

export default function TripMap({ destination }: { destination: string }) {
  const query = encodeURIComponent(destination || "world");
  const src = `https://www.google.com/maps?q=${query}&output=embed&z=10`;

  return (
    <div className="relative w-full h-full">
      <iframe
        key={query}
        title={`Map of ${destination}`}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="w-full h-full border-0"
      />
    </div>
  );
}
