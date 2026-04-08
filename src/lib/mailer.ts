import nodemailer from "nodemailer";
import { env } from "@/lib/env";

function hasMailConfig() {
  return Boolean(env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS);
}

export async function sendMail(options: {
  to: string;
  subject: string;
  text: string;
  html: string;
}) {
  if (!hasMailConfig()) {
    return { skipped: true as const };
  }

  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_PORT === 465,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: env.SMTP_FROM ?? env.PORTFOLIO_CONTACT_EMAIL,
    ...options,
  });

  return { skipped: false as const };
}

export async function sendMailBatch(
  messages: Array<{
    to: string;
    subject: string;
    text: string;
    html: string;
  }>,
) {
  const results = await Promise.allSettled(messages.map((message) => sendMail(message)));
  return results;
}
