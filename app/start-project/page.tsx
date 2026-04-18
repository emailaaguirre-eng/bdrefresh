import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectInquiryForm } from "@/components/forms/ProjectInquiryForm";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";

export const metadata: Metadata = {
  title: "Start a Project",
  description:
    "What happens after you reach out: quick acknowledgment, a low-pressure discovery touchpoint, and an honest next step, including when we are not the right fit.",
};

const steps = [
  {
    title: "We acknowledge quickly",
    body: "You get a human read, not a dead-end auto-reply. Most inquiries hear back within one business day.",
  },
  {
    title: "Short discovery touchpoint",
    body: "If there is fit, a short call or written follow-up. We cover goals, constraints, who uses the software, and rough shape. No interrogation, no deck theater.",
  },
  {
    title: "Clear proposal or redirect",
    body: "Either a scoped path forward, or a straight recommendation when another vendor, product, or phased DIY path is smarter. No vague \"circle back.\"",
  },
  {
    title: "How work usually begins",
    body: "No perfect spec. Most paths start small: discovery and one concrete milestone. Big decisions land before build hours stack up.",
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
        lead="Tight brief or rough notes both work. We'll review what you send, reply honestly on fit, ask a few clear questions, and suggest a sensible next step. If we are not the right fit, we will say so."
      />
      <section className="bg-bd-light-bg py-16 md:py-20" aria-labelledby="invite-heading">
        <Container>
          <Reveal>
            <SectionTag>Invitation</SectionTag>
            <h2 id="invite-heading" className="font-heading text-3xl font-bold md:text-4xl text-bd-light-text">
              You don&apos;t need a perfect spec
            </h2>
            <p className="mt-4 max-w-3xl text-bd-light-secondary">
              Tell us who the software serves, what hurts today, and what a good outcome looks like. We can help translate
              that into scope. Timelines, integrations, or compliance notes are helpful if you have them, but they are not
              required.
            </p>
            <p className="mt-5 max-w-3xl text-bd-light-secondary">
              A good fit is often an operations-heavy small business, a repeatable workflow stuck in email or spreadsheets,
              or a customer-facing flow that has to follow specific rules. If that does not sound like you, reach out
              anyway. We will answer honestly.
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
            <p className="mt-4 max-w-2xl text-bd-light-secondary">
              Plain language, low pressure. The first conversation is about clarity, not a pitch.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
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
            <p className="mt-4 max-w-2xl text-bd-light-secondary">
              Use the form, call, or email, whichever you prefer. The same team reads all three.
            </p>
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
                  <p className="mt-1 text-bd-light-secondary">100% remote, serving clients nationwide</p>
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
