import Navbar from "~/components/navbar";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Tasks App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <main id="wrapper">
      <Navbar />
    </main>
  );
}
