import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File;

    if (!file || !file.name) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Add random suffix to avoid "already exists" error
    const blob = await put(file.name, file, {
      access: "public",
      addRandomSuffix: true,
    });

    console.log("✅ Upload successful:", blob.url);

    return NextResponse.json({ url: blob.url });
  } catch (err) {
    console.error("❌ Vercel Blob Upload Error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
