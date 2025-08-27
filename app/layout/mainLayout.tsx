import { Outlet } from "react-router";
import { getUserSession } from "~/.server/session";
import Navbar from "~/components/navbar";
import type { Route } from "../+types/root";

export async function loader({ request }: Route.LoaderArgs) {
  const { loggedIn, session } = await getUserSession(request);

  return { loggedIn };
}

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main id="wrapper">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
