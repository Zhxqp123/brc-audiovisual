import { useSmoothScroll } from "@/lib/useSmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CameraScroll from "@/components/CameraScroll";
import Portfolio from "@/components/Portfolio";
import ImpactSection from "@/components/ImpactSection";
import Clients from "@/components/Clients";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import About from "@/components/About";
import Process from "@/components/Process";
import Instagram from "@/components/Instagram";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function Home() {
  useSmoothScroll();

  return (
    <div className="relative bg-background">
      <Navbar />
      <main>
        <Hero />
        <CameraScroll />
        <Portfolio />
        <ImpactSection />
        <Clients />
        <Stats />
        <Services />
        <About />
        <Process />
        <Instagram />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}