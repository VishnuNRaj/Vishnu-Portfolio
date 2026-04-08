import { getPortfolioProfile } from "@/lib/server";

export async function GET() {
  const profile = await getPortfolioProfile();
  return Response.json(profile);
}
