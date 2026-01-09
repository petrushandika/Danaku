
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Settings2, ShieldCheck, CreditCard, PieChart, Coins, Briefcase } from "lucide-react"

export default function SetupPage() {
  const setupItems = [
    { title: "Account Summary", icon: CreditCard, color: "text-blue-500", bg: "bg-blue-50", borderColor: "hover:border-blue-200" },
    { title: "Income Sources", icon: Coins, color: "text-emerald-500", bg: "bg-emerald-50", borderColor: "hover:border-emerald-200" },
    { title: "Needs Categories", icon: ShieldCheck, color: "text-orange-500", bg: "bg-orange-50", borderColor: "hover:border-orange-200" },
    { title: "Wants Categories", icon: PieChart, color: "text-violet-500", bg: "bg-violet-50", borderColor: "hover:border-violet-200" },
    { title: "Savings Categories", icon: Settings2, color: "text-pink-500", bg: "bg-pink-50", borderColor: "hover:border-pink-200" },
    { title: "Account Assets", icon: Briefcase, color: "text-sky-500", bg: "bg-sky-50", borderColor: "hover:border-sky-200" },
  ]

  return (
    <div className="space-y-10 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">
            Project <span className="text-gradient-money">Setup</span>
          </h1>
          <p className="text-slate-500 font-medium mt-2">Configure your financial workspace and categories.</p>
        </div>
        <Button className="w-full sm:w-auto rounded-full px-6 bg-linear-to-r from-emerald-600 to-emerald-700 text-white font-bold shadow-sm">
          <Plus className="mr-2 h-4 w-4" /> New Category
        </Button>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {setupItems.map((item) => (
          <Card key={item.title} className={`border-slate-200 shadow-none rounded-3xl bg-white overflow-hidden group transition-all cursor-pointer border hover:shadow-sm ${item.borderColor}`}>
            <CardHeader className="p-6 md:p-8">
              <div className="flex items-center gap-5">
                <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center transition-all border border-transparent group-hover:border-slate-100 group-hover:scale-105`}>
                  <item.icon className={`w-7 h-7 ${item.color}`} />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-slate-800">{item.title}</CardTitle>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">Settings Module</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 md:p-8 pt-0">
               <div className="p-6 md:p-10 flex items-center justify-center border-2 border-dashed border-slate-100 rounded-3xl text-sm text-slate-400 group-hover:text-slate-600 font-medium italic bg-slate-50/50 group-hover:bg-white transition-all">
                 Configure {item.title}
               </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
