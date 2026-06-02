import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { TrustBar } from "@/components/site/TrustBar";
import { StatsBar } from "@/components/site/StatsBar";
import { PainPoints } from "@/components/site/PainPoints";
import { CasesPreview } from "@/components/site/CasesPreview";
import { Features } from "@/components/site/Features";
import { ProductGrid } from "@/components/site/ProductGrid";
import { Testimonials } from "@/components/site/Testimonials";
import { Cta } from "@/components/site/Cta";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <StatsBar />
        <PainPoints />
        <CasesPreview />
        <Features />
        <ProductGrid />
        <Testimonials />
        <Cta />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
