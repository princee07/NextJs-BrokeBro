import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
export default async function Dashboard() {
    const {getUser} = getKindeServerSession();
const user = await getUser();
  return (
    <div>
      <h1>This is Dashboard</h1>
      <p>Welcome to the dashboard!</p>
      <p>Here you can manage your account and settings.</p>
      <div>Hey {user?.given_name}
        <LogoutLink>Sign Out</LogoutLink>
      </div>
    </div>
  );
}



