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
    form: "bg-gradient-to-br from-black via-gray-900 to-green-900 p-6 rounded-lg shadow-2xl border border-green-500/30",
    input: "bg-gray-800 border border-green-500/50 p-3 mb-4 w-full rounded-md text-green-100 placeholder-green-400 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-500/50",
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        className={styles.input}
        type="file"
        onChange={(e) => setFile(e.target.files?.item(0) || null)}
      />
      <button
        className="bg-gradient-to-r from-green-600 to-green-500 text-white p-3 rounded-md w-full hover:from-green-700 hover:to-green-600 transition-all duration-200 font-medium shadow-lg hover:shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
        disabled={inProgress}
      >
        {inProgress ? "Uploading..." : "Upload"}
      </button>

      {preview && (
        <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-green-500/30">
          <Image 
            src={preview} 
            alt="Uploaded Image" 
            width={600} 
            height={600} 
            className="rounded-md border border-green-500/30"
          />
          <a
            href={preview}
            target="_blank"
            className="block mt-3 text-green-400 hover:text-green-300 underline transition-colors duration-200"
            rel="noopener noreferrer"
          >
            View in new tab
          </a>
        </div>
      )}
    </form>
  );
}
