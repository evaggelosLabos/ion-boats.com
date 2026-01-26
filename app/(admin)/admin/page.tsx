import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCookieName, verifySession } from "../../../lib/admin/auth";
import AdminClient from "./AdminClient";

export const runtime = "nodejs";

export default async function AdminPage() {
  const token = (await cookies()).get(getCookieName())?.value;
  const session = verifySession(token);

  if (!session) {
    redirect("/admin/login?next=/admin");
  }

  return <AdminClient />;
}
