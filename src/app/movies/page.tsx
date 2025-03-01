import { redirect } from "next/navigation";
export default function Page() {
    redirect("/");
    return <p>Movie Details Page</p>;
  }