


"use client";
import NavbarClient from "./Navbar";
import { useUserVerification } from '@/hooks/useUserVerification';

export default function NavbarWrapper() {
  const { user } = useUserVerification();
  return <NavbarClient user={user} />;
}