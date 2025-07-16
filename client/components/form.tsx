"use client";

import { useState } from "react";
import Image from "next/image";

export function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [inProgress, setInProgress] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setInProgress(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/file", {
        method: "POST",
        body: formData,
      });

      const contentType = response.headers.get("content-type");
      if (!response.ok || !contentType?.includes("application/json")) {
        const text = await response.text();
        throw new Error(`Server error: ${response.status} - ${text}`);
      }

      const data = await response.json();
      if (!data.url) throw new Error("No URL returned in response");

      setPreview(data.url);
    } catch (err: any) {
      console.error("Upload failed:", err);
      setError(err.message || "Upload failed");
    } finally {
      setInProgress(false);
    }
  };

  const styles = {
    form: "bg-gray-100 p-4 rounded-lg",
    input: "border p-2 mb-4 w-full border-gray-300 rounded",
  };

  const isExternalUrl = (url: string) => url.startsWith("http");

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        className={styles.input}
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button
        className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
        type="submit"
        disabled={inProgress}
      >
        {inProgress ? "Uploading..." : "Upload"}
      </button>

      {error && <p className="text-red-600 mt-2">{error}</p>}

      {preview && (
        <div className="mt-4">
          {isExternalUrl(preview) ? (
            <img
              src={preview}
              alt="Uploaded Image"
              width={600}
              height={600}
              className="rounded"
            />
          ) : (
            <Image
              src={preview}
              alt="Uploaded Image"
              width={600}
              height={600}
              className="rounded"
            />
          )}
        </div>
      )}
    </form>
  );
}
