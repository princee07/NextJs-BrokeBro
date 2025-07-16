"use client";

import { useState } from "react";
import Image from "next/image";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [inProgress, setInProgress] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setInProgress(true);

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
      setPreview(data.url);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Check the console for details.");
    } finally {
      setInProgress(false);
    }
  };

  const styles = {
    form: "bg-gray-100 p-4 rounded-lg",
    input: "border p-2 mb-4 w-full border-gray-300 rounded",
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        className={styles.input}
        type="file"
        onChange={(e) => setFile(e.target.files?.item(0) || null)}
      />
      <button
        className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
        type="submit"
      >
        {inProgress ? "Uploading..." : "Upload"}
      </button>

      {preview && (
        <div className="mt-4">
          <Image src={preview} alt="Uploaded Image" width={600} height={600} />
          <a
            href={preview}
            target="_blank"
            className="block mt-2 text-blue-600 underline"
            rel="noopener noreferrer"
          >
            View in new tab
          </a>
        </div>
      )}
    </form>
  );
}
