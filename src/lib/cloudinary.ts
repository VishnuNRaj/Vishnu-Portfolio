import { v2 as cloudinary } from "cloudinary";
import { env } from "./env";

export async function uploadImage(file: File): Promise<string> {
  if (!env.CLOUDINARY_CLOUD_NAME || !env.CLOUDINARY_API_KEY) {
    throw new Error("Cloudinary environment variables are not configured.");
  }

  cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
    secure: true,
  });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder: "portfolio/skills",
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          reject(error);
          return;
        }
        if (!result) {
          reject(new Error("Upload failed: No result from Cloudinary"));
          return;
        }
        resolve(result.secure_url);
      }
    ).end(buffer);
  });
}
