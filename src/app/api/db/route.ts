import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return Response.json({ status: "ok", message: "Database is connected." });
  } catch (error) {
    console.error("[db] health check failed:", error);
    return Response.json(
      { status: "error", message: "Database connection failed." },
      { status: 500 },
    );
  }
}
