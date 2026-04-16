import { Reveal } from "@/components/motion/Reveal";
import { ProjectInquiryForm } from "@/components/forms/ProjectInquiryForm";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";

/** Legacy index.html `#contact` — same structure: info column + form. */
export function HomeContactSection() {
  return (
    <section className="bg-bd-light-bg py-24 md:py-[110px]" id="contact" aria-labelledby="contact-heading">
      <Container>
        <Reveal>
          <SectionTag>Contact</SectionTag>
          <h2 id="contact-heading" className="font-heading text-3xl font-bold tracking-tight text-bd-light-text md:text-4xl">
            Start Your Project
          </h2>
          <p className="mt-4 max-w-2xl text-bd-light-secondary">
            Tell us about your vision and we&apos;ll bring it to life
          </p>
        </Reveal>

        <div className="mt-14 grid items-start gap-14 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <Reveal className="flex flex-col gap-7">
            <div className="flex gap-4">
              <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-xl border border-[rgba(37,104,160,0.18)] bg-[rgba(37,104,160,0.08)] text-bd-accent">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <h3 className="text-[0.9rem] font-semibold text-bd-light-text">Phone</h3>
                <a href="tel:6024569889" className="mt-1 block text-[0.9rem] text-bd-light-secondary hover:text-bd-accent">
                  602-456-9889
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-xl border border-[rgba(37,104,160,0.18)] bg-[rgba(37,104,160,0.08)] text-bd-accent">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <h3 className="text-[0.9rem] font-semibold text-bd-light-text">Email</h3>
                <a
                  href="mailto:info@banddservicing.com"
                  className="mt-1 block text-[0.9rem] text-bd-light-secondary hover:text-bd-accent"
                >
                  info@banddservicing.com
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-xl border border-[rgba(37,104,160,0.18)] bg-[rgba(37,104,160,0.08)] text-bd-accent">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <div>
                <h3 className="text-[0.9rem] font-semibold text-bd-light-text">Location</h3>
                <p className="mt-1 text-[0.9rem] leading-relaxed text-bd-light-secondary">
                  100% Remote
                  <br />
                  Serving clients nationwide
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-xl border border-[rgba(37,104,160,0.18)] bg-[rgba(37,104,160,0.08)] text-bd-accent">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <h3 className="text-[0.9rem] font-semibold text-bd-light-text">Availability</h3>
                <p className="mt-1 text-[0.9rem] leading-relaxed text-bd-light-secondary">
                  Mon - Fri: 9AM - 6PM
                  <br />
                  Remote support 24/7
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <ProjectInquiryForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
