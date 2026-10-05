import { useState } from "react";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Youtube } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "./Reveal";
import {
  COACHING_URL,
  CONTACT_EMAIL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  YOUTUBE_URL,
} from "./content";

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="gradient-cta rounded-3xl p-1">
          <div className="rounded-[calc(var(--radius-3xl))] bg-background/90 px-6 py-12 text-center sm:px-12">
            <h2 className="text-3xl font-bold sm:text-4xl">Ready to Build Your AI Edge?</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Join an upcoming workshop, or book a free call to map the fastest path from where you
              are to shipping your first AI agent.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={COACHING_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-base btn-cyan"
              >
                Book a Call
              </a>
              <div className="flex items-center gap-3">
                {[
                  { href: YOUTUBE_URL, label: "YouTube", Icon: Youtube },
                  { href: INSTAGRAM_URL, label: "Instagram", Icon: Instagram },
                  { href: LINKEDIN_URL, label: "LinkedIn", Icon: Linkedin },
                  { href: FACEBOOK_URL, label: "Facebook", Icon: Facebook },
                ].map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="panel p-8">
            <h3 className="text-xl font-semibold">Let's talk</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Workshops, corporate training, speaking invitations or 1:1 coaching — send a note and
              I'll get back to you.
            </p>
            <ul className="mt-7 space-y-4 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                Maharashtra, India
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="transition-colors hover:text-primary"
                >
                  shwetagupta202@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Linkedin className="h-4 w-4 shrink-0 text-primary" />
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-primary"
                >
                  linkedin.com/in/shwetagupta2021
                </a>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={100} className="panel p-8">
            <form
              className="grid gap-4 sm:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
                toast.success("Thanks! Your message has been noted.");
              }}
            >
              <label className="text-sm sm:col-span-1">
                <span className="text-muted-foreground">Name</span>
                <input
                  required
                  name="name"
                  className="mt-2 w-full rounded-xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                  placeholder="Your name"
                />
              </label>
              <label className="text-sm sm:col-span-1">
                <span className="text-muted-foreground">Email</span>
                <input
                  required
                  type="email"
                  name="email"
                  className="mt-2 w-full rounded-xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                  placeholder="you@company.com"
                />
              </label>
              <label className="text-sm sm:col-span-2">
                <span className="text-muted-foreground">What would you like help with?</span>
                <textarea
                  required
                  name="message"
                  rows={5}
                  className="mt-2 w-full resize-none rounded-xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                  placeholder="Tell me about your team, goals or the workshop you're interested in."
                />
              </label>
              <div className="sm:col-span-2">
                <button type="submit" className="btn-base btn-cyan w-full sm:w-auto">
                  {sent ? "Message Sent" : "Send Message"}
                </button>
                <p className="mt-3 text-xs text-muted-foreground">
                  Placeholder form — connect it to email or a CRM when you're ready.
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto grid max-w-6xl gap-4 px-5 sm:flex sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="font-display text-sm font-semibold">Shweta Gupta</p>
          <p className="text-xs text-muted-foreground">
            AI Agents Coach · Product Leader · Author · Speaker
          </p>
        </div>
        <div className="flex items-center gap-5 text-sm text-muted-foreground">
          {[
            { href: YOUTUBE_URL, label: "YouTube" },
            { href: INSTAGRAM_URL, label: "Instagram" },
            { href: LINKEDIN_URL, label: "LinkedIn" },
            { href: FACEBOOK_URL, label: "Facebook" },
          ].map(({ href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-primary"
            >
              {label}
            </a>
          ))}
        </div>
          <a href="#workshops" className="transition-colors hover:text-primary">
            Workshops
          </a>
          <a href="#books" className="transition-colors hover:text-primary">
            Books
          </a>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Shweta Gupta. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
