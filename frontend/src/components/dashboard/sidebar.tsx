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

export function Sidebar({ className, onItemClick }: { className?: string, onItemClick?: () => void }) {
  const pathname = usePathname()

  return (
    <div className={cn("flex flex-col h-full w-64 bg-white dark:bg-slate-900 border-r border-border transition-colors duration-300 overflow-y-auto no-scrollbar", className)}>
      <div className="p-8">
        <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
          Home Sweet <span className="text-emerald-600">Loan</span>
        </span>
      </div>
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto emerald-scrollbar">
        {items.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onItemClick}
              className={cn(
                "group flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 border border-transparent",
                isActive
                  ? "bg-linear-to-r from-emerald-600 to-emerald-700 text-white border-emerald-800/20"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-sm"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn("w-5 h-5 transition-colors duration-300", isActive ? "text-white" : "text-slate-400 group-hover:text-emerald-500")} />
                {item.title}
              </div>
              {isActive && <ChevronRight className="w-4 h-4 text-white/70 animate-in slide-in-from-left-1 duration-300" />}
            </Link>
          )
        })}
      </nav>
      <div className="p-6 pt-0">
        <Link 
          href="/profile"
          className="p-4 block rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-border cursor-pointer hover:bg-white dark:hover:bg-slate-800 hover:border-emerald-500/20 hover:shadow-sm transition-all duration-500 group/profile"
        >
          <div className="flex items-center gap-3 mb-3">
             <div className="w-10 h-10 rounded-full border border-emerald-100 dark:border-emerald-800 p-0.5 overflow-hidden bg-white dark:bg-slate-900 transition-transform duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80" 
                  alt="Profile" 
                  className="w-full h-full rounded-full object-cover group-hover/profile:scale-110 transition-transform duration-700"
                />
             </div>
             <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-800 dark:text-white transition-colors duration-300">User</span>
                <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold transition-colors duration-300">PRO PLAN</span>
             </div>
          </div>
          <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden transition-colors duration-300">
             <div className="h-full bg-emerald-600 w-2/3 transition-all duration-1000" />
          </div>
          <p className="text-[10px] mt-2 text-slate-500 dark:text-slate-400 font-medium tracking-wide transition-colors duration-300">Budget usage: 66%</p>
        </Link>
      </div>
    </div>
  )
}
