import { Header } from "@/components/modules/landing/Header";
import { Hero } from "@/components/modules/landing/Hero";
import { LandingContent } from "@/components/modules/landing/LandingContent";
import { Footer } from "@/components/modules/landing/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <LandingContent />
      </main>
      <Footer />
    </>
  );
}

export function generateMetadata() {
  return {
    title: "StoreFront - Your Premium Shopping Destination",
    description: "Discover quality products at great prices",
  };
}
