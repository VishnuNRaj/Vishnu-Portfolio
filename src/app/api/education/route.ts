import {
  createEducation,
  educationInputSchema,
  ensureMilvusCollections,
  listEducation,
  parsePositiveInt,
  requireAuthKey,
  syncPortfolioToMilvus,
} from "@/lib/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parsePositiveInt(searchParams.get("page"), 1);
  const pageSize = parsePositiveInt(searchParams.get("pageSize"), 6);

  return Response.json(await listEducation(page, pageSize));
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const auth = await requireAuthKey(searchParams.get("key"));

  if (!auth) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const payloadResult = educationInputSchema.safeParse(await request.json());

  if (!payloadResult.success) {
    return Response.json(
      { message: "Invalid education payload", errors: payloadResult.error.flatten() },
      { status: 400 },
    );
  }

  const payload = payloadResult.data;
  const education = await createEducation(payload);
  await ensureMilvusCollections();
  await syncPortfolioToMilvus();

  return Response.json({ education });
}
