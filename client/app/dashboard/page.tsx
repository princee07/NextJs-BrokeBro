import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
<<<<<<< HEAD
export default async function Dashboard() {
    const {getUser} = getKindeServerSession();
const user = await getUser();
=======
import Image from "next/image";
export default async function Dashboard() {
    const {getUser} = getKindeServerSession();
const user = await getUser();
console.log(user);
console.log("Profile Picture URL:", user?.picture);

>>>>>>> lavanya
  return (
    <div>
      <h1>This is Dashboard</h1>
      <p>Welcome to the dashboard!</p>
      <p>Here you can manage your account and settings.</p>
<<<<<<< HEAD
      <div>Hey {user?.given_name}
        <LogoutLink>Sign Out</LogoutLink>
      </div>
    </div>
=======
      <div>Welcome, {user?.given_name} </div>
      <div>
  {user?.picture && (
    <Image
      src={user.picture}
      alt="Profile"
      width={96}
      height={96}
    />
  )}
</div>
        <LogoutLink>Sign Out</LogoutLink>
      </div>

>>>>>>> lavanya
  );
}



