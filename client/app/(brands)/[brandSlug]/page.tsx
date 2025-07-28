import React from "react";

interface BrandPageProps {
  params: Promise<{ brandSlug: string }>;
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { brandSlug } = await params;
  
  return (
    <div>
      <h1>This is Page in Brand Slug: {brandSlug}</h1>
    </div>
  );
}