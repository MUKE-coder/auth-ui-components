import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/auth/logout-button";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="text-lg mb-8">Welcome, {session.user.name}!</p>
      <div className="bg-muted p-4 rounded-lg mb-6">
        <p>Your Role: <span className="font-mono font-bold">{session.user.role || "user"}</span></p>
        <p>Email: {session.user.email}</p>
      </div>
      <LogoutButton />
    </div>
  );
}
