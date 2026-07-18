import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="text-muted-foreground mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm sm:flex-row sm:px-6">
        <p>&copy; {new Date().getFullYear()} ResumeAI. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link href="/login" className="hover:text-foreground transition-colors">
            Sign in
          </Link>
          <Link href="/signup" className="hover:text-foreground transition-colors">
            Sign up
          </Link>
        </div>
      </div>
    </footer>
  );
}
