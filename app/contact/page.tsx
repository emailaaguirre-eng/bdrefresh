import { permanentRedirect } from "next/navigation";

/** Legacy/monitoring path — contact form lives on Start a Project. */
export default function ContactPage() {
  permanentRedirect("/start-project");
}
