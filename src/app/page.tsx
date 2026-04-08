import { AnchorSections } from "@/components/site/AnchorSections";
import { Cta } from "@/components/site/Cta";
import { Features } from "@/components/site/Features";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { ProductGrid } from "@/components/site/ProductGrid";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ProductGrid />
        <Features />
        <AnchorSections />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
