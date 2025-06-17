import CTASection from "@/components/CTAsection";
import FeatureSection from "@/components/featureSection";
import Hero from "@/components/Hero";
import StatsSection from "@/components/statsSection";


export default function Home() {
  return (
     <div className="min-h-screen bg-black relative">
      {/* Fixed Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        <Hero />
        <FeatureSection />
        <StatsSection />
        <CTASection />
      </div>
    </div>
  );
}
