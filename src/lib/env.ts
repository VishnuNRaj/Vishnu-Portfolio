import { z } from "zod";

function normalizeOptionalEmail(value: unknown) {
  if (typeof value !== "string") {
    return value;
  }

  const normalized = value.trim().replace(/^['"]|['"]$/g, "");

  if (normalized === "") {
    return undefined;
  }

  return normalized;
}

const optionalEmail = z.preprocess((value) => {
  return normalizeOptionalEmail(value);
}, z.string().email().optional());

const envSchema = z.object({
  APP_URL: z.string().url().default("http://localhost:3000"),
  PORTFOLIO_CONTACT_EMAIL: z
    .string()
    .email()
    .default("vishnu8240.achu@gmail.com"),
  ADMIN_CONTACT_EMAIL: z.string().email().default("vishnu8240.achu@gmail.com"),
  ADMIN_ACCESS_SECRET: z
    .string()
    .min(16)
    .default("vishnu-n-raj-portfolio-admin-secret"),
  MILVUS_ENABLED: z
    .enum(["true", "false"])
    .default("false")
    .transform((value) => value === "true"),
  SMTP_HOST: z.string().default(""),
  SMTP_PORT: z.coerce.number().default(587),
  SMTP_USER: z.string().default(""),
  SMTP_PASS: z.string().default(""),
  SMTP_FROM: optionalEmail,
  MILVUS_ADDRESS: z.string().default(""),
  MILVUS_USERNAME: z.string().default(""),
  MILVUS_PASSWORD: z.string().default(""),
  MILVUS_COLLECTION_PREFIX: z.string().default("portfolio"),
});

export const env = envSchema.parse({
  APP_URL: process.env.APP_URL,
  PORTFOLIO_CONTACT_EMAIL: process.env.PORTFOLIO_CONTACT_EMAIL,
  ADMIN_CONTACT_EMAIL: process.env.ADMIN_CONTACT_EMAIL,
  ADMIN_ACCESS_SECRET: process.env.ADMIN_ACCESS_SECRET,
  MILVUS_ENABLED: process.env.MILVUS_ENABLED,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  SMTP_FROM: normalizeOptionalEmail(process.env.SMTP_FROM),
  MILVUS_ADDRESS: process.env.MILVUS_ADDRESS,
  MILVUS_USERNAME: process.env.MILVUS_USERNAME,
  MILVUS_PASSWORD: process.env.MILVUS_PASSWORD,
  MILVUS_COLLECTION_PREFIX: process.env.MILVUS_COLLECTION_PREFIX,
});
