import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link href={href}>
      <Button
        variant="ghost"
        className={cn(
          "text-zinc-600 dark:text-zinc-400 text-sm rounded-lg antialiased hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100/60 dark:hover:bg-zinc-700/40 transition-colors duration-200",
          active && "text-zinc-800 dark:text-zinc-200 bg-zinc-100/70 dark:bg-zinc-700/60"
        )}
      >
        {children}
      </Button>
    </Link>
  )
}
