import { getValidAuthKey } from "@/lib/portfolio";

export async function requireAuthKey(key: string | null | undefined) {
  if (!key) {
    return null;
  }

  return getValidAuthKey(key);
}
