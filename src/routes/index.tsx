import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import {
  About,
  Books,
  Credibility,
  Experience,
  Offers,
  Skills,
  Testimonials,
  Workshops,
} from "@/components/site/Sections";
import { Contact, Footer } from "@/components/site/Contact";

const title = "Shweta Gupta — AI Agents Coach & Product Leader";
const description =
  "AI Agents educator and PLM product leader. 300+ live workshops, 5,000+ professionals trained to build AI agents, voice agents and no-code automations.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Credibility />
        <About />
        <Offers />
        <Experience />
        <Books />
        <Skills />
        <Testimonials />
        <Workshops />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
