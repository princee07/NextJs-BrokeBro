import Image from "next/image";
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">MyApp</div>
        <div className="flex items-center space-x-2">
          <a href="/" className="text-gray-300 hover:text-white px-3 py-2">Home</a>
          <a href="/about" className="text-gray-300 hover:text-white px-3 py-2">About</a>
          <a href="/contact" className="text-gray-300 hover:text-white px-3 py-2">Contact</a>
          {!user && (
            <>
              <RegisterLink className="text-gray-300 hover:text-white px-3 py-2">Sign Up</RegisterLink>
              <LoginLink className="text-gray-300 hover:text-white px-3 py-2">Login</LoginLink>
            </>
          )}
          {user && (
            <>
              <span className="text-gray-300 px-3 py-2">Hi, {user.given_name || user.email}</span>
              {user.picture && (
                <Image
                  src={user.picture}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <LogoutLink className="text-gray-300 hover:text-white px-3 py-2">Logout</LogoutLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}