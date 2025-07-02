'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TemplateRedirect() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedResumeTemplate', 'modern');
      router.replace('/resume-builder/generate');
    }
  }, [router]);
  return null;
} 