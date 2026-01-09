
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Wallet, Target, Info } from "lucide-react"

export default function BudgetingPage() {
  return (
    <div className="space-y-10 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">
            Monthly <span className="text-gradient-money">Budgeting</span>
          </h1>
          <p className="text-slate-500 font-medium mt-2">Plan your income allocation for the next cycle.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 border-slate-200 bg-white text-slate-700 font-bold hover:bg-slate-50 shadow-sm">
            <Info className="mr-2 h-4 w-4" /> Guidelines
          </Button>
          <Button className="rounded-full px-6 bg-linear-to-r from-emerald-600 to-emerald-700 text-white font-bold shadow-sm">
            <Plus className="mr-2 h-4 w-4" /> Create Plan
          </Button>
        </div>
      </div>

      <div className="grid gap-8 grid-cols-1 xl:grid-cols-12">
        <Card className="xl:col-span-8 border-slate-200 shadow-none rounded-3xl bg-white overflow-hidden border">
          <CardHeader className="p-10">
            <div className="flex items-center gap-5 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                <Wallet className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-slate-800">Budget Planning</CardTitle>
                <CardDescription className="text-slate-500 font-medium">Allocate your funds across different categories.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-10 pt-0">
             <div className="aspect-video flex items-center justify-center border-2 border-dashed border-slate-100 rounded-3xl text-slate-400 bg-slate-50/50 font-medium italic">
               Interactive Budgeting Board Placeholder
             </div>
          </CardContent>
        </Card>

        <Card className="xl:col-span-4 border-emerald-700 shadow-none rounded-3xl bg-linear-to-br from-emerald-600 to-emerald-800 text-white overflow-hidden border relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Target className="w-32 h-32 text-white" />
          </div>
          <CardHeader className="p-10 relative z-10">
            <CardTitle className="text-2xl font-bold">Goal Tracker</CardTitle>
            <CardDescription className="text-emerald-100/80 font-medium">Monthly saving target status</CardDescription>
          </CardHeader>
          <CardContent className="p-10 pt-0 relative z-10 space-y-8">
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-black uppercase tracking-wider">
                <span>Saving Target</span>
                <span>75%</span>
              </div>
              <div className="h-2.5 w-full bg-white/20 rounded-full overflow-hidden border border-white/10 p-0.5">
                <div className="h-full bg-white rounded-full w-3/4" />
              </div>
            </div>
            <div className="space-y-5 pt-4">
              <p className="text-sm font-medium leading-relaxed text-emerald-50">
                You're doing great! You've allocated <b className="text-white">Rp 3.500.000</b> to your savings so far this month.
              </p>
              <Button className="w-full rounded-2xl bg-white text-emerald-700 font-black hover:bg-emerald-50 border border-transparent transition-all py-6">
                View Wealth Goals
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
