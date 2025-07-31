import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import NavbarClient from "./Navbar";

export default async function NavbarWrapper() {
  const { getUser } = getKindeServerSession();
  const userRaw = await getUser();
  // Normalize user fields to undefined if null for type compatibility
  const user = userRaw
    ? {
      ...userRaw,
      email: userRaw.email ?? undefined,
      given_name: userRaw.given_name ?? undefined,
      family_name: userRaw.family_name ?? undefined,
      picture: userRaw.picture ?? undefined,
    }
    : null;
  return <NavbarClient user={user} />;
}