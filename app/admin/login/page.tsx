import { Suspense } from "react";
import LoginClient from "./LoginClient";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div style={{ padding: 18, fontWeight: 900 }}>Loading…</div>}>
      <LoginClient />
    </Suspense>
  );
}
