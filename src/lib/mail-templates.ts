import { env } from "@/lib/env";
import type { Contact } from "@/lib/portfolio/types";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderShell(title: string, content: string) {
  return `
    <div style="background:#f4efe4;padding:32px;font-family:Arial,Helvetica,sans-serif;color:#16120f;">
      <div style="max-width:640px;margin:0 auto;background:#fffdf8;border:1px solid rgba(22,18,15,.08);border-radius:24px;overflow:hidden;">
        <div style="padding:28px 28px 12px;border-bottom:1px solid rgba(22,18,15,.08);background:linear-gradient(180deg,#fffaf0 0%,#fffdf8 100%);">
          <p style="margin:0 0 10px;font-size:12px;letter-spacing:.28em;text-transform:uppercase;color:#8d6949;">Vishnu N Raj</p>
          <h1 style="margin:0;font-size:28px;line-height:1.1;">${escapeHtml(title)}</h1>
        </div>
        <div style="padding:28px;">${content}</div>
      </div>
    </div>
  `;
}

export function createOwnerContactTemplate(contact: Contact) {
  const subject = `New portfolio enquiry from ${contact.firstName} ${contact.lastName}`;
  const html = renderShell(
    subject,
    `
      <p style="margin:0 0 16px;font-size:16px;line-height:1.7;">A new contact request just came in from the portfolio.</p>
      <div style="display:grid;gap:12px;">
        <div><strong>Name:</strong> ${escapeHtml(contact.firstName)} ${escapeHtml(contact.lastName)}</div>
        <div><strong>Email:</strong> ${escapeHtml(contact.email)}</div>
        <div><strong>Phone:</strong> ${escapeHtml(contact.phone)}</div>
        <div><strong>Reason:</strong><br/>${escapeHtml(contact.reason)}</div>
      </div>
    `,
  );
  const text = [
    subject,
    `Name: ${contact.firstName} ${contact.lastName}`,
    `Email: ${contact.email}`,
    `Phone: ${contact.phone}`,
    `Reason: ${contact.reason}`,
  ].join("\n");

  return { subject, html, text };
}

export function createContactAcknowledgementTemplate(contact: Contact) {
  const subject = "Thanks for reaching out";
  const html = renderShell(
    subject,
    `
      <p style="margin:0 0 16px;font-size:16px;line-height:1.7;">Hi ${escapeHtml(contact.firstName)}, thanks for reaching out. I received your note and will get back to you soon.</p>
      <p style="margin:0;font-size:16px;line-height:1.7;">In the meantime, you can browse more work at <a href="${env.APP_URL}" style="color:#a14f2a;">${env.APP_URL}</a>.</p>
    `,
  );
  const text = `Hi ${contact.firstName}, thanks for reaching out. I received your note and will get back to you soon.\n\nPortfolio: ${env.APP_URL}`;

  return { subject, html, text };
}

export function createAdminAccessTemplate(email: string, manageUrl: string) {
  const subject = "Portfolio admin access";
  const html = renderShell(
    subject,
    `
      <p style="margin:0 0 16px;font-size:16px;line-height:1.7;">Your admin access link is ready.</p>
      <p style="margin:0 0 16px;"><a href="${manageUrl}" style="display:inline-block;padding:14px 20px;border-radius:999px;background:#a14f2a;color:#fff;text-decoration:none;">Open admin</a></p>
      <p style="margin:0;font-size:14px;line-height:1.7;color:#65584d;">This link is tied to ${escapeHtml(email)} and expires in 24 hours.</p>
    `,
  );
  const text = `Your admin access link: ${manageUrl}\nThis link is tied to ${email} and expires in 24 hours.`;

  return { subject, html, text };
}
