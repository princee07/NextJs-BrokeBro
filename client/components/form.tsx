"use client";

import { useState } from "react";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file as Blob);

    const response = await fetch("/api/file", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      console.error("Upload failed");
    } else {
      console.log("Upload successful");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.item(0) || null)}
      />
      <button type="submit">Upload</button>
    </form>
  );
}