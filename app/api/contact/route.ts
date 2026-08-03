import { NextResponse } from "next/server";
import {
  sendInquiryEmail,
  validateContactForm,
  type ContactFormInput,
} from "@/lib/contactForm";

export const runtime = "nodejs";

function clientMessage(ok: boolean, message: string, status: number) {
  return NextResponse.json({ success: ok, message }, { status });
}

async function readInput(request: Request): Promise<ContactFormInput> {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const body = (await request.json()) as Record<string, unknown>;
    return {
      name: String(body.name ?? ""),
      email: String(body.email ?? ""),
      phone: String(body.phone ?? ""),
      service: String(body.service ?? ""),
      message: String(body.message ?? ""),
      _honey: String(body._honey ?? ""),
    };
  }

  const form = await request.formData();
  return {
    name: String(form.get("name") ?? ""),
    email: String(form.get("email") ?? ""),
    phone: String(form.get("phone") ?? ""),
    service: String(form.get("service") ?? ""),
    message: String(form.get("message") ?? ""),
    _honey: String(form.get("_honey") ?? ""),
  };
}

export async function POST(request: Request) {
  try {
    const input = await readInput(request);
    const validated = validateContactForm(input);

    if (!validated.ok) {
      return clientMessage(false, validated.message, 400);
    }

    // Honeypot: pretend success without sending.
    if (validated.honeypot) {
      return clientMessage(true, "Message sent successfully.", 200);
    }

    const result = await sendInquiryEmail(validated.data);
    if (!result.sent) {
      return clientMessage(
        false,
        "Unable to send your message right now. Please try again or email us directly at info@banddservicing.com.",
        503,
      );
    }

    return clientMessage(true, "Message sent successfully.", 200);
  } catch {
    console.error("[contact-form] unexpected handler error");
    return clientMessage(
      false,
      "Unable to send your message right now. Please try again or email us directly at info@banddservicing.com.",
      500,
    );
  }
}

export async function GET() {
  return clientMessage(false, "Method not allowed.", 405);
}
