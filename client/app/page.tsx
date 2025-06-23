import Image from "next/image";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import Navbar from "@/components/layout/Navbar";
export default function Home() {
  return (
   <div>
    <h1>This is Kinde App</h1>
    <Navbar/>
    
    </div>
  );
}
