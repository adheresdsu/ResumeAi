import { MobileNav } from "@/components/dashboard/mobile-nav";
import { UserMenu } from "@/components/dashboard/user-menu";

export function DashboardTopbar({
  email,
  fullName,
  avatarUrl,
}: {
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
}) {
  return (
    <header className="glass-panel sticky top-0 z-10 flex h-16 items-center justify-between border-x-0 border-t-0 px-4 sm:px-6">
      <div className="flex items-center gap-2">
        <MobileNav />
      </div>
      <UserMenu email={email} fullName={fullName} avatarUrl={avatarUrl} />
    </header>
  );
}
