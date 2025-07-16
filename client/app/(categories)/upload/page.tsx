// app/page.tsx

import { UploadForm } from "@/components/form";


export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-8 text-black">
    
      
      <a
        href="/upload"
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
      >
        <UploadForm />
    
      </a>
    </main>
  );
}
