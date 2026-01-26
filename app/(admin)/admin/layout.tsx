import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCookieName, verifySession } from "../../../lib/admin/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get(getCookieName())?.value;

  // no cookie => force login
  if (!token) {
    redirect("/admin/login?next=/admin");
  }

  // cookie exists but invalid/expired/tampered => force login
  const session = verifySession(token);
  if (!session) {
    redirect("/admin/login?next=/admin");
  }

  return <>{children}</>;
}
