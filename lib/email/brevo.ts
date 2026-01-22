// lib/email/brevo.ts

type BrevoSendPayload = {
  sender: { name?: string; email: string };
  to: Array<{ email: string; name?: string }>;
  subject: string;
  htmlContent: string;
  textContent?: string;
  headers?: Record<string, string>;
  tags?: string[];
};

function mustEnv(name: string): string {
  const v = process.env[name];
  if (!v || typeof v !== "string" || v.trim().length === 0) {
    throw new Error(`Missing ${name} in environment variables`);
  }
  return v.trim();
}

async function sleep(ms: number) {
  await new Promise((r) => setTimeout(r, ms));
}

async function brevoPostWithRetry(url: string, init: RequestInit, tries = 3) {
  let lastText = "";

  for (let i = 0; i < tries; i++) {
    const res = await fetch(url, init);

    if (res.ok) return res;

    const status = res.status;
    lastText = await res.text().catch(() => "");

    // Retry only on rate limits + transient server errors
    if (status === 429 || (status >= 500 && status <= 599)) {
      await sleep(500 * Math.pow(2, i)); // 500ms, 1s, 2s
      continue;
    }

    throw new Error(`Brevo error ${status}: ${lastText}`);
  }

  throw new Error(`Brevo send failed after retries: ${lastText}`);
}

export async function sendBrevoEmail(args: {
  toEmail: string;
  toName?: string;
  subject: string;
  html: string;
  text?: string;
  reservationId?: string;
}) {
  const apiKey = mustEnv("BREVO_API_KEY");
  const fromEmail = mustEnv("BREVO_SENDER_EMAIL");
const fromName = process.env.BREVO_SENDER_NAME || "ION Boats";


  const payload: BrevoSendPayload = {
    sender: { name: fromName, email: fromEmail },
    to: [{ email: args.toEmail, name: args.toName }],
    subject: args.subject,
    htmlContent: args.html,
    ...(args.text ? { textContent: args.text } : {}),
    headers: args.reservationId
      ? {
          "X-Reservation-Id": args.reservationId,
        }
      : undefined,
    tags: ["ion-boats", "booking-confirmed"],
  };

  const res = await brevoPostWithRetry("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify(payload),
  });

  return await res.json().catch(() => ({}));
}
