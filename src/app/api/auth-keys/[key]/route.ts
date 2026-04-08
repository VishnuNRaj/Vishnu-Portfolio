import { requireAuthKey } from "@/lib/server";

export async function GET(
  _request: Request,
  context: { params: Promise<{ key: string }> },
) {
  const { key } = await context.params;
  const auth = await requireAuthKey(key);

  if (!auth) {
    return Response.json({ valid: false }, { status: 404 });
  }

  return Response.json({ valid: true, auth });
}
