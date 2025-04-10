import sharp from "sharp";

export async function convertImageToWebPDataURL(
  buffer: ArrayBuffer,
): Promise<string> {
  const webpBuffer = await sharp(Buffer.from(buffer))
    .resize({ width: 400, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();
  return `data:image/webp;base64,${webpBuffer.toString("base64")}`;
}
