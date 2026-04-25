import Image from "next/image"; 
import Link from "next/link"; 
export default function FeaturedNarrative() 
{
   return ( 
   <section className="bg-surface lg:py-32" id="stories" aria-label="Featured narrative" >
    <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
      {/* Text */} 
      <div className="order-2 md:order-1 mb-16 md:mb-0">
         <span className="font-label text-tertiary font-bold tracking-widest text-sm uppercase mb-4 block"> The Weekly Feature </span>
          <h2 className="font-headline text-5xl lg:text-7xl font-black text-on-surface leading-none mb-8"> The Silence of the Cyclades </h2>
           <p className="font-body text-lg lg:text-xl text-on-surface-variant leading-relaxed mb-10 max-w-lg"> Beyond the neon crowds of Santorini lies a quiet archipelago where time is measured in the rhythmic pulse of the Aegean. Discover the hidden coves and white-washed secrets of Greece&apos;s most meditative islands. </p>
            <Link href="#" className="inline-flex items-center gap-3 bg-gradient-to-br from-brand to-brand-light text-white px-8 py-4 rounded-lg font-label font-bold transition-transform hover:scale-[1.03]" id="read-story-btn" > 
            Read the Story 
            <span className="material-symbols-outlined">arrow_forward</span> 
            </Link> 
            </div> 
            {/* Image */} 
            <div className="order-1 md:order-2">
               <div className="relative w-full">
                <Image className="relative z-10 w-full rounded-xl shadow-2xl ml-[60px] mt-[32px]" alt="iconic white-washed buildings with bright blue domes overlooking the deep azure Aegean Sea in Oia, Greece" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkNRaimRYHAyrDA2C0174ArqoSehVk1WDjwJ3AlCq3v_lcOFyAup4cCMbAykxiZ4PDC3zHdXFCnv7ovLdYFBvAARTxus5Fgy3Q6ixnLaeFa_a2FlwbdG3ggVk0OzTgKSIYi_ZjR-FQ-e6u7B0qs1V4Qsy8UNzh6PHfxcQN8zn_HxLo7hapK_hwg8EFAzZ3z0nMQemUzJIOVt3jjcrR8Pp-zJYNSd4Tz0CVpPi1D6koxJDGksjcFGUwgMSkCLn6XrpZYKudN_CpcTQ" width={720} height={480} sizes="(max-width: 1000px) 100vw, 50vw" quality={75} loading="eager" /> 
                </div>
                </div>
                </div>
                </section> ); }