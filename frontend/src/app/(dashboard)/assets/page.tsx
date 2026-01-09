
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, PiggyBank, Landmark, Briefcase, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

export default function AssetsPage() {
  return (
    <div className="space-y-10 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">
            Asset <span className="text-gradient-money">Management</span>
          </h1>
          <p className="text-slate-500 font-medium mt-2">Monitor your long-term wealth and portfolio growth.</p>
        </div>
        <Button className="rounded-full px-6 bg-linear-to-r from-emerald-600 to-emerald-700 text-white font-bold shadow-sm">
          <Plus className="mr-2 h-4 w-4" /> Add Asset
        </Button>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        <AssetMiniCard title="Liquid Assets" amount="Rp 45.300.000" icon={Landmark} color="text-emerald-600" bg="bg-emerald-50" border="border-emerald-100" />
        <AssetMiniCard title="Non-Liquid" amount="Rp 112.500.000" icon={Briefcase} color="text-blue-600" bg="bg-blue-50" border="border-blue-100" />
        <AssetMiniCard title="Total Wealth" amount="Rp 157.800.000" icon={TrendingUp} color="text-violet-600" bg="bg-violet-50" border="border-violet-100" />
      </div>

      <Card className="border-slate-200 shadow-none rounded-3xl bg-white overflow-hidden border">
        <CardHeader className="p-10 pb-4">
          <div className="flex items-center gap-5">
             <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                <PiggyBank className="w-8 h-8 text-emerald-600" />
             </div>
             <div>
               <CardTitle className="text-2xl font-bold text-slate-800">Asset Breakdown</CardTitle>
               <CardDescription className="text-slate-500 font-medium tracking-tight">Detailed list of your holdings and wealth distribution.</CardDescription>
             </div>
          </div>
        </CardHeader>
        <CardContent className="p-10 pt-6">
           <div className="h-96 flex items-center justify-center border-2 border-dashed border-slate-100 rounded-3xl text-sm text-slate-400 font-medium italic bg-slate-50/50">
             Asset Portfolio Details Table Placeholder
           </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AssetMiniCard({ title, amount, icon: Icon, color, bg, border }: any) {
  return (
    <Card className={cn("border-slate-200 shadow-none rounded-3xl bg-white p-8 group transition-all border hover:border-slate-300 cursor-pointer")}>
       <div className="flex items-center gap-4 mb-5">
          <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-all border border-transparent group-hover:border-slate-100 group-hover:scale-105", bg, border)}>
             <Icon className={cn("w-6 h-6", color)} />
          </div>
          <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">{title}</span>
       </div>
       <div className="text-2xl font-black text-slate-900 tracking-tight">{amount}</div>
    </Card>
  )
}
