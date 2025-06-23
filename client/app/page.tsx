import Image from "next/image";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
export default function Home() {
  return (
   <div>
    <h1>This is Kinde App</h1>
    <RegisterLink>Sign Up</RegisterLink>
    <LoginLink>Login</LoginLink>
    </div>
  );
}
