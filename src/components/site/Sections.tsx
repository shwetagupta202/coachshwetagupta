import {
  Bot,
  Gauge,
  Briefcase,
  Linkedin,
  TrendingUp,
  Mic,
  Users,
  CalendarCheck,
  Quote,
  ArrowUpRight,
} from "lucide-react";
import type { ComponentType } from "react";
import aboutPortraitAsset from "@/assets/shweta-about.png.asset.json";
import bookLinkedIn from "@/assets/book-linkedin-mastery.png.asset.json";
import bookCoach from "@/assets/book-i-can-coach.png.asset.json";
import { Reveal } from "./Reveal";
import {
  COMPANIES,
  LINKEDIN_URL,
  OFFERS,
  SKILLS,
  STATS,
  TESTIMONIALS,
  TIMELINE,
  VIDEO_EMBEDS,
  WORKSHOPS_URL,
} from "./content";

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  bot: Bot,
  gauge: Gauge,
  briefcase: Briefcase,
  linkedin: Linkedin,
  trending: TrendingUp,
};

function SectionHeading({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <Reveal className="max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{title}</h2>
      {lead ? <p className="mt-4 text-muted-foreground">{lead}</p> : null}
    </Reveal>
  );
}

export function Credibility() {
  return (
    <section className="border-y border-border bg-surface/40 py-14">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {COMPANIES.map((c) => (
            <span
              key={c}
              className="font-display text-sm font-semibold tracking-wide text-muted-foreground transition-colors hover:text-foreground sm:text-base"
            >
              {c}
            </span>
          ))}
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className="panel panel-hover px-6 py-7">
              <p className="font-display text-3xl font-bold text-primary">{s.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2 lg:items-center">
        <Reveal className="order-2 lg:order-1">
          <div className="panel overflow-hidden p-3">
            <img
              src={aboutPortraitAsset.url}
              alt="Shweta Gupta speaking about AI agents"
              loading="lazy"
              width={1024}
              height={1280}
              className="w-full rounded-xl object-cover"
            />
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading eyebrow="About" title="From enterprise PLM to AI education" />
          <Reveal delay={100}>
            <div className="mt-6 space-y-5 text-muted-foreground">
              <p>
                I've spent 15+ years inside enterprise technology — Cisco, Huawei, Technia AB in
                Sweden, Addnode India and today Tata Technologies — leading product lifecycle
                management programmes for global manufacturers. That work taught me how real
                systems get designed, integrated and shipped under pressure.
              </p>
              <p>
                In 2024 I turned that experience outward. I now coach working professionals to build
                AI agents, voice agents and no-code automations with tools like n8n, Bolna AI and
                ChatGPT — through 300+ live workshops, structured cohorts and an active community of
                learners.
              </p>
              <p className="border-l-2 border-gold pl-5 font-display text-lg leading-snug text-foreground">
                "AI won't replace professionals — but professionals who know how to use AI will
                outperform those who don't."
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Offers() {
  return (
    <section className="bg-surface/40 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="What I Help You Achieve"
          title="Practical outcomes, not AI theory"
          lead="Every workshop and coaching track is built around something you can ship the same week."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {OFFERS.map((offer, i) => {
            const Icon = ICONS[offer.icon] ?? Bot;
            return (
              <Reveal
                key={offer.title}
                delay={i * 70}
                as="article"
                className="panel panel-hover p-7"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{offer.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{offer.body}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" className="py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Experience"
          title="15+ years of building enterprise systems"
        />
        <ol className="relative mt-12 space-y-10 border-l border-primary/40 pl-8 sm:pl-10">
          {TIMELINE.map((item, i) => (
            <Reveal key={item.role} delay={i * 90} as="li" className="relative">
              <span
                className="absolute -left-[2.4rem] top-1.5 h-3.5 w-3.5 rounded-full bg-gold ring-4 ring-background sm:-left-[2.9rem]"
                aria-hidden="true"
              />
              <div className="panel panel-hover p-6">
                <p className="text-xs tracking-wide text-primary">{item.period}</p>
                <h3 className="mt-2 text-lg font-semibold">{item.role}</h3>
                <p className="text-sm text-muted-foreground">{item.org}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

const BOOKS = [
  {
    cover: bookLinkedIn.url,
    title: "LinkedIn Mastery for Professionals",
    tag: "Amazon Bestseller · Solo Author",
    body: "A practical playbook for professionals who want visibility that converts — positioning, content systems and networking without the hustle theatre.",
    link: "https://www.amazon.in/LinkedIn-Mastery-Professionals-Personal-attract-ebook/dp/B0CV5PBNNS",
    cta: "View on Amazon",
  },
  {
    cover: bookCoach.url,
    title: "I Can Coach Vol. 3",
    tag: "Co-Author",
    body: "A collection of coaching stories and frameworks from practitioners, featuring my chapter on turning technical expertise into teaching impact.",
    link: "https://icancoach.com/3",
    cta: "View the Book",
  },
];

export function Books() {
  return (
    <section id="books" className="bg-surface/40 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading eyebrow="Author" title="Books & published work" />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {BOOKS.map((book, i) => (
            <Reveal
              key={book.title}
              delay={i * 90}
              as="article"
              className="panel panel-hover flex flex-col gap-6 p-6 sm:flex-row"
            >
              {/* PLACEHOLDER COVER — replace with the official Amazon cover artwork */}
              <img
                src={book.cover}
                alt={`${book.title} book cover`}
                loading="lazy"
                width={768}
                height={1024}
                className="h-44 w-32 shrink-0 rounded-lg object-cover"
              />
              <div className="min-w-0">
                <p className="text-xs tracking-wide text-gold">{book.tag}</p>
                <h3 className="mt-2 text-lg font-semibold">{book.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{book.body}</p>
                <a
                  href={book.link}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-base btn-outline-soft mt-5"
                >
                  {book.cta}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading eyebrow="Skills & Tools" title="The stack I teach and build with" />
        <Reveal delay={100} className="mt-10 flex flex-wrap gap-3">
          {SKILLS.map((skill) => (
            <span key={skill} className="pill">
              {skill}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="bg-surface/40 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Community"
          title="What workshop attendees say"
          lead="Placeholder quotes — real testimonials from cohort members and coaching clients drop in here."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <Reveal
              key={t.quote}
              delay={i * 80}
              as="article"
              className="panel panel-hover p-7"
            >
              <Quote className="h-6 w-6 text-gold" />
              <p className="mt-4 text-sm leading-relaxed text-foreground/90">"{t.quote}"</p>
              <div className="mt-6">
                <p className="font-display text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {VIDEO_EMBEDS.map((v, i) => (
            <Reveal key={v.src} delay={i * 90} className="panel overflow-hidden p-2">
              <div className="aspect-video overflow-hidden rounded-xl">
                <iframe
                  src={v.src}
                  title={v.title}
                  loading="lazy"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Workshops() {
  const items = [
    {
      icon: Mic,
      title: "Live, hands-on format",
      body: "Every session is delivered live — you build alongside me and leave with a working automation, not slides.",
    },
    {
      icon: CalendarCheck,
      title: "300+ sessions delivered",
      body: "Corporate teams, communities and open cohorts across India and beyond, refined over hundreds of runs.",
    },
    {
      icon: Users,
      title: "5,000+ professionals trained",
      body: "Engineers, analysts, product folks and consultants — most starting with no coding background.",
    },
  ];

  return (
    <section id="workshops" className="py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Speaking & Workshops"
          title="Live AI training for teams and communities"
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 80} className="panel panel-hover p-7">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold/15 text-gold">
                <item.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200} className="mt-10 flex flex-wrap gap-3">
          <a
            href={WORKSHOPS_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-base btn-cyan"
          >
            View Upcoming Workshops
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-base btn-outline-soft"
          >
            Book Me to Speak
          </a>
        </Reveal>
      </div>
    </section>
  );
}
