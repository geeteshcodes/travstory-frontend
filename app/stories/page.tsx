import ParallaxHero from "@/components/ParallaxHero";
import MoodGrid from "@/components/MoodGrid";
import FeaturedNarrative from "@/components/FeaturedNarrative";
import TravelReels from "@/components/TravelReels";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import SectionSpacer from "@/components/SectionSpacer";


export default function StoriesPage() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-fixed bg-no-repeat overflow-hidden"
      style={{ backgroundImage: "url('/cloud.jpg')" }}
    >
      {/* Soft white overlay for readability */}
      <div className="absolute inset-0 bg-white/50 pointer-events-none" />



      <div className="relative">
        <ParallaxHero />

        <div className="relative isolate" style={{ zIndex: 3 }}>
          <MoodGrid />
          <SectionSpacer />

          <div className="h-24 lg:h-40" />

          <FeaturedNarrative />
          <SectionSpacer />

          <div className="h-24 lg:h-40" />

          <TravelReels />
          <SectionSpacer />

          <div className="h-24 lg:h-40" />

          <Newsletter />
          <SectionSpacer />

          <div className="h-24 lg:h-40" />

          <Footer />
        </div>
      </div>
    </div>
  );
}
