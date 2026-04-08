import {
  contactInputSchema,
  createAdminAccessTemplate,
  createContactAcknowledgementTemplate,
  createOwnerContactTemplate,
  createAuthKey,
  createContact,
  env,
  listContacts,
  parsePositiveInt,
  requireAuthKey,
  sendMailBatch,
} from "@/lib/server";

export const runtime = "nodejs";
export const maxDuration = 10;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const auth = await requireAuthKey(searchParams.get("key"));

  if (!auth) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const page = parsePositiveInt(searchParams.get("page"), 1);
  const pageSize = parsePositiveInt(searchParams.get("pageSize"), 10);

  return Response.json(await listContacts(page, pageSize));
}

export async function POST(request: Request) {
  const payloadResult = contactInputSchema.safeParse(await request.json());

  if (!payloadResult.success) {
    return Response.json(
      { message: "Invalid contact payload", errors: payloadResult.error.flatten() },
      { status: 400 },
    );
  }

  const payload = payloadResult.data;
  const timeSinceStart = payload.formStartedAt
    ? Date.now() - payload.formStartedAt
    : Number.POSITIVE_INFINITY;

  if (payload.website) {
    return Response.json({ message: "Request accepted." }, { status: 202 });
  }

  if (timeSinceStart < 1200) {
    return Response.json(
      { message: "Please take a moment before submitting the form." },
      { status: 429 },
    );
  }

  const contact = await createContact(payload);
  const ownerTemplate = createOwnerContactTemplate(contact);

  const messages = [
    {
    to: env.PORTFOLIO_CONTACT_EMAIL,
      ...ownerTemplate,
    },
  ];

  if (contact.email === env.ADMIN_CONTACT_EMAIL) {
    const authKey = await createAuthKey(contact.email);
    const manageUrl = `${env.APP_URL}/manage/${authKey.authKey}`;
    const accessTemplate = createAdminAccessTemplate(contact.email, manageUrl);

    await sendMailBatch([
      ...messages,
      {
        to: contact.email,
        ...accessTemplate,
      },
    ]);

    return Response.json({
      contact,
      manageUrl,
      message: "Contact saved and admin access link issued.",
    });
  }

  const acknowledgementTemplate = createContactAcknowledgementTemplate(contact);

  await sendMailBatch([
    ...messages,
    {
      to: contact.email,
      ...acknowledgementTemplate,
    },
  ]);

  return Response.json({
    contact,
    message: "Contact saved successfully.",
  });
}
