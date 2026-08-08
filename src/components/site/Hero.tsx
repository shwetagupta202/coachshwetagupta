import { ArrowRight, Sparkles } from "lucide-react";
import portrait from "@/assets/shweta-portrait.jpg";
import { Reveal } from "./Reveal";
import { LINKEDIN_URL } from "./content";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl gap-14 px-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <Reveal>
            <span className="pill gap-2 text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              AI Agents Coach · Maharashtra, India
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 text-4xl leading-[1.05] font-bold sm:text-5xl lg:text-6xl">
              AI Agents Educator{" "}
              <span className="text-muted-foreground">|</span> Product Leader
              <span className="block text-gradient-cyan">
                Empowering Professionals to Build with AI
              </span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              15+ years turning enterprise product experience into practical AI skills for working
              professionals.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#contact" className="btn-base btn-cyan">
                Join a Workshop
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#about" className="btn-base btn-outline-soft">
                Read My Story
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-base btn-outline-soft"
              >
                LinkedIn Profile
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative mx-auto w-full max-w-sm">
          <div
            className="absolute -inset-6 rounded-full opacity-40 blur-3xl"
            style={{ background: "var(--gradient-cta)" }}
            aria-hidden="true"
          />
          <div className="panel relative overflow-hidden p-3">
            {/* PLACEHOLDER PHOTO — swap src/assets/shweta-portrait.jpg for the real headshot */}
            <img
              src={portrait}
              alt="Shweta Gupta, AI Agents Coach and Product Leader"
              width={1024}
              height={1280}
              className="w-full rounded-xl object-cover"
            />
          </div>
          <div className="panel mt-4 flex items-center justify-between px-5 py-4">
            <div>
              <p className="font-display text-sm font-semibold">Amazon Bestselling Author</p>
              <p className="text-xs text-muted-foreground">Speaker · Community Builder</p>
            </div>
            <span className="font-display text-2xl font-bold text-gold">15+</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
