import Image from "next/image";

const moodCards = [
  {
    title: "Feeling Adventurous",
    description: "Peak experiences and rugged trails",
    alt: "adventurous explorer standing on a rocky outcrop overlooking a vast desert canyon during golden hour",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxyp5hdK3OJZb5T2ULWL-pA7dWhnhUjEEVPsgUo7uHANA6xM98dU_se_FGPdUEgWP1m1hqIiHJOWWRSNHPjtRPwXB8jCIr50Zg_UUcOAHUSi988viFgYYixqqIvZdVEQ55OlmJ66aKUv6IjnDatz-BJkfm7Z1xBQQ9fDHUo-QWDGDXT6ehZnr64EOouW11lFcOLBDY2mpEQCwL_6KqJiJUc6kg0aNXZLS3QKHmT4vf-FNf5nQqTGzY8fJCQ4AM3PGcoRqFDwI_3O4",
  },
  {
    title: "Need a Retreat",
    description: "Quiet corners for total restoration",
    alt: "serene wellness retreat with minimalist wooden architecture and steaming thermal pools surrounded by misty trees",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBP02wMS7YP7UQAgqIAm62NGQ4vvVu_tv7wqJJUPSQrIryDHKlG8XO24nMBSYZnHfxCFVFLsmyEZLLJmBakT62hHdATjC6C7A_nleDStf-hEg5xTHFeXVfFDbviLd2X0f2RclTKKGVnjTs5NtUs2iAQhO6qigrwaH3vXnIyYvYZRwG4tz2ErdmAjS0bViOGvtpmzr4xGzh6cFq5q_-dGy6ed_G5aIp_gvy6-Xeg9CPsPyy2D-JQ1QYmPimo1ONFu-k7YV92RqBDrfM",
  },
  {
    title: "Pure Foodie",
    description: "Culinary journeys and local markets",
    alt: "colorful variety of authentic gourmet dishes on a rustic wooden table in a sunlit Mediterranean villa",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhJ30ZEG-CbzRZUR8DLp0oMo5vn_t-pczALOJ3fTc4c3_MFKvQ7Sp54EhIlpJ2wnlXqNkXASUqRwZhRjOYPBLUpvQ0V8Xi9DxabhelUjOSD8svh2qY5lGQE8OexeeNNRojU4LBPPHRdJzrY098w5k63IfAg3goYl7qKvv-7wmPbiLXt2h7WK8ZTf6RLlPnig0sMhHVnFC6JvHFVvgTgeSpmDYq7Lck9ZsTBkxGTEZHOBv9Fao36AGhvBxs2wx1qdddJObo6dHnNxU",
  },
  {
    title: "Cultural Deep-Dive",
    description: "Connecting with heritage and craft",
    alt: "vibrant street market scene in an old European city with historical architecture and bustling people",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQIpXyqlp7Gvg_Lil8VRYDVb9O6zufLY6WoYFVUI9z6jdyYDOyDlYyKRISajRLe6grywZHzJoEh5UHa3wPOXpztO_RB2nX7kQ1uMUIyohV-IFmsOw-ne3YVyf_3rupak9SRqY2GuYGQ3qi_AEWDbPfzzC7kdZJpy1lLg7JZR2IsTqINmJl-9NfBqIqIBvetralnJkdNd0Il32-LZHCHjNYsrcYJrvlOOG47CAWzoZ30xsIMyFwXEWhsbefxNEBzXSWpLE3ERtBa1c",
  },
];

export default function MoodGrid() {
  return (
    <section
  className="py-24 px-6 lg:px-12 max-w-[1440px] mx-auto"
  id="discover-mood"
  aria-label="Discover by Mood"
>
      <div className="flex flex-col gap-2 mb-12">
        <span className="font-label text-brand font-bold tracking-widest text-sm uppercase">
          Curated Exploration
        </span>
        <h2 className="font-headline text-4xl lg:text-5xl font-black text-on-surface">
          Discover by Mood
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {moodCards.map((card) => (
          <div
            key={card.title}
            className="group relative aspect-[4/5] rounded-xl overflow-hidden cursor-pointer transition-transform duration-500 hover:scale-[1.02]"
            id={`mood-${card.title.toLowerCase().replace(/\s+/g, "-")}`}
          >
            <Image
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              alt={card.alt}
              src={card.src}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
              quality={75}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 lg:p-8">
              <h3 className="font-headline text-xl lg:text-2xl font-bold text-surface">
                {card.title}
              </h3>
              <p className="text-surface/80 font-body mt-2 text-sm lg:text-base">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
