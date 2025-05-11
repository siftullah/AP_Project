import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import About from "@/components/landing/About";
import Testimonials from "@/components/landing/Testimonials";
import Demo from "@/components/landing/Demo";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <main>
        <Features />
        <About />
        <Testimonials />
        <Demo />
      </main>
      <Footer />
    </div>
  );
}
