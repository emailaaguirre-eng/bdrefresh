const formAction =
  process.env.NEXT_PUBLIC_CONTACT_FORM_ACTION?.trim() || "/contact/send.php";

export function ProjectInquiryForm() {
  return (
    <form
      action={formAction}
      method="post"
      className="space-y-5 rounded-2xl border border-bd-light-border bg-bd-light-card p-10 shadow-[0_4px_12px_rgba(0,0,0,0.07),0_2px_4px_rgba(0,0,0,0.04)]"
      aria-label="Project inquiry form"
    >
      <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-[0.85rem] font-medium text-bd-light-secondary">
            Name *
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="Your full name"
            className="mt-2 w-full rounded-lg border border-bd-light-border bg-[#f8f9fc] px-4 py-3 text-[0.95rem] text-bd-light-text outline-none transition focus:border-bd-accent focus:ring-[3px] focus:ring-bd-accent/35"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-[0.85rem] font-medium text-bd-light-secondary">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className="mt-2 w-full rounded-lg border border-bd-light-border bg-[#f8f9fc] px-4 py-3 text-[0.95rem] text-bd-light-text outline-none transition focus:border-bd-accent focus:ring-[3px] focus:ring-bd-accent/35"
          />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="block text-[0.85rem] font-medium text-bd-light-secondary">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(555) 123-4567"
            className="mt-2 w-full rounded-lg border border-bd-light-border bg-[#f8f9fc] px-4 py-3 text-[0.95rem] text-bd-light-text outline-none transition focus:border-bd-accent focus:ring-[3px] focus:ring-bd-accent/35"
          />
        </div>
        <div>
          <label htmlFor="service" className="block text-[0.85rem] font-medium text-bd-light-secondary">
            Service Needed
          </label>
          <select
            id="service"
            name="service"
            className="mt-2 w-full rounded-lg border border-bd-light-border bg-[#f8f9fc] px-4 py-3 text-[0.95rem] text-bd-light-text outline-none transition focus:border-bd-accent focus:ring-[3px] focus:ring-bd-accent/35"
            defaultValue=""
          >
            <option value="">Select a service</option>
            <option value="website-builds">Website Builds</option>
            <option value="custom-app">Custom Web Applications</option>
            <option value="internal-tools">Internal Tools &amp; Dashboards</option>
            <option value="automation">Automation &amp; API Integrations</option>
            <option value="managed-hosting">Managed Hosting</option>
            <option value="website-care">Website Care</option>
            <option value="seo">SEO</option>
            <option value="web-copy">Web Copy</option>
            <option value="graphic-design">Graphic Design</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block text-[0.85rem] font-medium text-bd-light-secondary">
          Tell Us About Your Project *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Context, goals, who uses it, constraints (rough notes are fine)."
          className="mt-2 min-h-[120px] w-full resize-y rounded-lg border border-bd-light-border bg-[#f8f9fc] px-4 py-3 text-[0.95rem] text-bd-light-text outline-none transition focus:border-bd-accent focus:ring-[3px] focus:ring-bd-accent/35"
        />
      </div>
      <button
        type="submit"
        className="bd-btn-magnetic inline-flex w-full items-center justify-center gap-2 rounded-xl bg-bd-accent py-3.5 text-sm font-semibold text-white transition hover:bg-bd-accent-light sm:w-full"
      >
        <span>Send Message</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </button>
    </form>
  );
}
