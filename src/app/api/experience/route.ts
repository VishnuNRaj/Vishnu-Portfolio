import {
  createExperience,
  ensureMilvusCollections,
  experienceInputSchema,
  listExperience,
  parsePositiveInt,
  requireAuthKey,
  syncPortfolioToMilvus,
} from "@/lib/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parsePositiveInt(searchParams.get("page"), 1);
  const pageSize = parsePositiveInt(searchParams.get("pageSize"), 6);

  return Response.json(await listExperience(page, pageSize));
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const auth = await requireAuthKey(searchParams.get("key"));

  if (!auth) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const payloadResult = experienceInputSchema.safeParse(await request.json());

  if (!payloadResult.success) {
    return Response.json(
      { message: "Invalid experience payload", errors: payloadResult.error.flatten() },
      { status: 400 },
    );
  }

  const payload = payloadResult.data;
  const experience = await createExperience(payload);
  await ensureMilvusCollections();
  await syncPortfolioToMilvus();

  return Response.json({ experience });
}
