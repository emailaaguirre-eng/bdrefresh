import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectInquiryForm } from "@/components/forms/ProjectInquiryForm";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";

export const metadata: Metadata = {
  title: "Start a Project",
  description:
    "Tell us what you’re building. We respond with honest fit, clarifying questions, and a sensible first step.",
};

const steps = [
  {
    title: "We acknowledge quickly",
    body: "You’ll get a human read, not an auto-responder that goes nowhere. Expect a reply within one business day for most inquiries.",
  },
  {
    title: "Short discovery touchpoint",
    body: "If there’s fit, we’ll propose a focused call or written follow-up to confirm goals, constraints, and rough shape of work.",
  },
  {
    title: "Clear proposal or redirect",
    body: "You’ll either get a scoped path forward, or a straight recommendation if another approach is smarter. No vague “let’s circle back.”",
  },
];

export default function StartProjectPage() {
  return (
    <>
      <PageHero
        eyebrow="Start a project"
        title={
          <>
            Tell us what you’re <span className="shimmer-text">building</span>
          </>
        }
        lead="Whether you have a tight brief or a rough idea, we’ll read it carefully and reply with honest fit, clarifying questions, and what a sensible first step looks like."
      />
      <section className="bg-bd-light-bg py-16 md:py-20" aria-labelledby="invite-heading">
        <Container>
          <Reveal>
            <SectionTag>Invitation</SectionTag>
            <h2 id="invite-heading" className="font-heading text-3xl font-bold md:text-4xl text-bd-light-text">
              You don’t need a perfect spec
            </h2>
            <p className="mt-4 max-w-2xl text-bd-light-secondary">
              Share context: who the software serves, what’s painful today, and what would count as a win. We handle the
              translation into scope.
            </p>
          </Reveal>
          <Reveal className="mt-8 max-w-3xl text-bd-light-secondary">
            <p>
              If you already have timelines, integrations, or compliance constraints, include them. If not, that’s fine
              too. We’ll help you surface the decisions that matter early.
            </p>
          </Reveal>
        </Container>
      </section>
      <section className="dot-grid-bg py-16 md:py-20" aria-labelledby="next-heading">
        <Container>
          <Reveal>
            <SectionTag>What happens next</SectionTag>
            <h2 id="next-heading" className="font-heading text-3xl font-bold md:text-4xl text-bd-light-text">
              After you reach out
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <article className="h-full rounded-2xl border border-bd-light-border bg-white p-6 shadow-card">
                  <h3 className="font-heading text-lg font-bold">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-bd-light-secondary">{s.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <section id="contact" className="bg-bd-light-alt py-16 md:py-24" aria-labelledby="contact-heading">
        <Container>
          <Reveal>
            <SectionTag>Contact</SectionTag>
            <h2 id="contact-heading" className="font-heading text-3xl font-bold md:text-4xl text-bd-light-text">
              Project inquiry
            </h2>
            <p className="mt-4 text-bd-light-secondary">Use the form below or call or email. We monitor both.</p>
          </Reveal>
          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,320px)_1fr]">
            <Reveal>
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-bd-light-muted">Phone</h3>
                  <a href="tel:6024569889" className="mt-1 block text-lg font-semibold text-bd-accent hover:underline">
                    602-456-9889
                  </a>
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-bd-light-muted">Email</h3>
                  <a
                    href="mailto:info@banddservicing.com"
                    className="mt-1 block text-lg font-semibold text-bd-accent hover:underline"
                  >
                    info@banddservicing.com
                  </a>
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-bd-light-muted">Location</h3>
                  <p className="mt-1 text-bd-light-secondary">100% remote — serving clients nationwide</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-bd-light-muted">Availability</h3>
                  <p className="mt-1 text-bd-light-secondary">Mon–Fri, 9am–6pm · Remote support 24/7</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <ProjectInquiryForm />
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
