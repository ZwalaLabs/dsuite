import Hero from "@/components/ui/Hero";
import ProductDemo from "@/components/ui/ProductDemo";
import FeatureSection from "@/components/ui/FeatureSection";
import Navbar from "@/components/ui/navbar";

export default function Home() {
	return (
		<>
			<Navbar />
			<main className="pt-12">
				<Hero />
				<ProductDemo />
				<FeatureSection />
			</main>
		</>
	);
}
