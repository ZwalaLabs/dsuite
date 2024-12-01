import Hero from "@/components/ui/Hero";
import ProductDemo from "@/components/ui/ProductDemo";
import FeatureSection from "@/components/ui/FeatureSection";

export default function Home() {
  return (
    <main className="pt-12">
      <Hero />
      <ProductDemo />
      <FeatureSection />
    </main>
  );
}
