
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Settings, 
  Wallet, 
  ArrowUpRight, 
  FileText, 
  PiggyBank,
  ChevronRight
} from "lucide-react"

const items = [
  {
    title: "Summary",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Setup",
    href: "/setup",
    icon: Settings,
  },
  {
    title: "Budgeting",
    href: "/budgeting",
    icon: Wallet,
  },
  {
    title: "Spending",
    href: "/spending",
    icon: ArrowUpRight,
  },
  {
    title: "Report",
    href: "/report",
    icon: FileText,
  },
  {
    title: "Assets",
    href: "/assets",
    icon: PiggyBank,
  },
]

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <div className={cn("flex flex-col h-full w-64 bg-sidebar border-r border-sidebar-border", className)}>
      <div className="p-8">
        <span className="text-2xl font-black tracking-tighter text-gradient-money">
          Home Sweet Loan
        </span>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {items.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200",
                isActive
                  ? "bg-linear-to-r from-primary to-savings text-white shadow-lg shadow-primary/20 scale-[1.02]"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-muted-foreground group-hover:text-primary")} />
                {item.title}
              </div>
              {isActive && <ChevronRight className="w-4 h-4 text-white/70" />}
            </Link>
          )
        })}
      </nav>
      <div className="p-6">
        <div className="p-4 rounded-2xl bg-gradient-soft border border-primary/10">
          <div className="flex items-center gap-3 mb-3">
             <div className="w-8 h-8 rounded-full bg-linear-to-tr from-primary to-savings" />
             <div className="flex flex-col">
                <span className="text-sm font-bold">Pandawa</span>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-black">PRO PLAN</span>
             </div>
          </div>
          <div className="h-1.5 w-full bg-white rounded-full overflow-hidden">
             <div className="h-full bg-primary w-2/3" />
          </div>
          <p className="text-[10px] mt-2 text-muted-foreground">Budget usage: 66%</p>
        </div>
      </div>
    </div>
  )
}
