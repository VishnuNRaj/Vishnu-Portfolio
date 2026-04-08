import { ensureMilvusCollections, requireAuthKey, syncPortfolioToMilvus } from "@/lib/server";

export async function GET() {
  const status = await ensureMilvusCollections();
  return Response.json({
    enabled: status.enabled,
    message: status.enabled
      ? "Milvus collections are ready."
      : "Milvus is not configured. Add env values to enable it.",
  });
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const auth = await requireAuthKey(searchParams.get("key"));

  if (!auth) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  await ensureMilvusCollections();
  const result = await syncPortfolioToMilvus();

  return Response.json({
    enabled: result.enabled,
    message: result.enabled
      ? "Milvus sync completed."
      : "Milvus is not configured. Add env values to enable it.",
  });
}
