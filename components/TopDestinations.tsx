import Image from "next/image";

const destinations = [
  {
    country: "Japan",
    city: "Kyoto",
    description:
      "The ancient capital is reinventing its traditional craft districts for a new generation of sustainable art seekers.",
    alt: "stunning red torii gates of Fushimi Inari Shrine in Kyoto winding through a lush green forest",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpjP4AayhOEkDWPwJ5i0ZFR04x6AFJk5u3QWo01ECf416Z_iKEeN8RgKvAHp1NZyWgp7Xj0BrYHzRHzMIiOHH193Eib2O3Zb9mDhSRDafEAPbJP6oTLPMbuBqh-ydnR0IoOxJD6OmMmxkvZIBtmDRNBNdVHXYQm9n3U_fH_Q3AEtEIlD3K3vjPQ3Taws20IXNV4pnKzjPl8IRRbjxWljSsUORW9MiKiH9kuZ8kochejmXMHX3GYS7aXoUVMLOmhd52FEMme2n7Czg",
    offsetTop: false,
  },
  {
    country: "Southeast Asia",
    city: "Vietnam",
    description:
      "From the rugged Ha Giang loop to the emerging eco-resorts of Phu Quoc, the landscape remains unparalleled.",
    alt: "scenic boat ride through the emerald waters of Ha Long Bay limestone karsts in northern Vietnam",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDq-o-GpdyG6A3WG-S6EhMa83NFAhmketw5ZPNozh0qW4lu1lzI91-cklRCw2t1wPxtckIoj61QeHMnht6ShFYZ1KmNwc4PHfMcjGXyi5J-Z3b2qb3298h7Bu8MfOaJjLu4ZIHQ0nqGaZrSGpkH6eoSgcOLentpMqfT5CLiGV_9e44fG5GO0PYE2dmyGFB5J9Hjrrjt0qzQQx3TFU48ygOYVlFm7W4EPPnFhTikLm0X8Oh7wJ21T-_1iXOGP7KTY33I4BCCg9qdd8g",
    offsetTop: true,
  },
  {
    country: "Saudi Arabia",
    city: "Neom",
    description:
      "The world's most ambitious urban experiment is finally opening its doors to the first wave of desert futurists.",
    alt: "futuristic architectural rendering of a sleek desert city with integrated high-tech sustainable gardens",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDlhaG3jtUGJ_2PRUwtmibA-tS3OowYWHBBiJsNrtjcvP9iMtftYNLIHN4YHcwsB8Q_Yb_VeeEx4JzJ2_TAn1xpCAHFo5ROi6LqYIHkvR6lQACp672q9ZM8_GdcirCqgJgP7gYrXa6DqFuNj2_taP6Fw81NhDNx0WAnowKmxSnB3kh-tkx_8GZ86D74aZ4aIy4WoEnzlsgv9x8aK_1L-tf1VGkQnWPdA10iVBQl2YABW_qcLo9bj_AZJLkYnIrVTB2dzmZwbjGUyMg",
    offsetTop: false,
  },
  {
    country: "Italy",
    city: "Basilicata",
    description:
      "Forget Tuscany. The rugged south of Italy offers cave-dwelling luxury and untouched culinary traditions.",
    alt: "historic cave dwellings of Matera, Basilicata carved into steep cliffs under a glowing twilight sky",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7--5bFQJMNw_nfLWq1x8eIYonBTQ5Pd70c8h6I1k5VWN-S4ANoiXugA-9leEnItfaY0CO_3gFdf8Z9uY05uBkSsXcUWmBSxErjWozDMoc7dqmZy-gpu0K2HcntiEnwee_n8CKpxNuND2o5CvEEpDWAYWqdFaRUX0iLKC3nkMJdzI8QQN8gZ6H_aKNOHHUc0OBQDMTJxuu6zVgJR_dsCg2Ycjls2oRYEUas6SuWRCiXmVviFsjnmEUD1fUvJabR1THXfp4Ds_iBgc",
    offsetTop: true,
  },
];

export default function TopDestinations() {
  return (
    <section
  className="py-24 px-6 lg:px-12 max-w-[1440px] mx-auto"
  id="destinations"
  aria-label="Top 2026 Destinations"
>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
        <div className="flex flex-col gap-2">
          <span className="font-label text-brand font-bold tracking-widest text-sm uppercase">
            Forward Thinking
          </span>
          <h2 className="font-headline text-4xl lg:text-5xl font-black text-on-surface">
            Top 2026 Destinations
          </h2>
        </div>
        <p className="font-body text-on-surface-variant max-w-md md:text-right">
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {destinations.map((dest) => (
          <div
            key={dest.city}
            className={`flex flex-col group ${dest.offsetTop ? "md:mt-12" : ""}`}
            id={`destination-${dest.city.toLowerCase()}`}
          >
            <div className="overflow-hidden rounded-xl aspect-[3/4] mb-6 relative">
              <Image
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                alt={dest.alt}
                src={dest.src}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                quality={75}
              />
            </div>
            <span className="font-label text-secondary font-bold text-xs uppercase tracking-widest mb-2">
              {dest.country}
            </span>
            <h3 className="font-headline text-2xl lg:text-3xl font-bold text-on-surface mb-3">
              {dest.city}
            </h3>
            <p className="font-body text-on-surface-variant line-clamp-3 text-sm lg:text-base">
              {dest.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
