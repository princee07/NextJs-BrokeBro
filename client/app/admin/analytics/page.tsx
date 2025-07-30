
"use client";
import React from "react";
import dynamic from "next/dynamic";

const ClickAnalyticsDashboard = dynamic(() => import("@/components/admin/ClickAnalyticsDashboard"), { ssr: false });

export default function AnalyticsPage() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Admin Click Analytics</h1>
      <ClickAnalyticsDashboard />
    </main>
  );
}
