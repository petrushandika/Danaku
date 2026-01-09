
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Search, Filter, ArrowUpRight, History } from "lucide-react"

export default function SpendingPage() {
  return (
    <div className="space-y-10 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">
            Spending <span className="text-gradient-money">Tracker</span>
          </h1>
          <p className="text-slate-500 font-medium mt-2">Log your daily transactions and monitor budget usage.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
           <div className="hidden sm:flex items-center gap-3 px-5 py-2.5 bg-white rounded-full border border-slate-200 shadow-sm focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/5 transition-all">
              <Search className="w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search logs..." className="bg-transparent border-none outline-none text-sm w-32 text-slate-700 placeholder:text-slate-400 font-medium" />
           </div>
          <Button className="w-full sm:w-auto rounded-full px-6 bg-linear-to-r from-emerald-600 to-emerald-700 text-white font-bold shadow-sm">
            <Plus className="mr-2 h-4 w-4" /> Add Transaction
          </Button>
        </div>
      </div>

      <div className="grid gap-8 grid-cols-1 xl:grid-cols-12">
        <Card className="xl:col-span-4 border-slate-200 shadow-none rounded-3xl bg-white overflow-hidden border">
          <CardHeader className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-5">
               <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center">
                  <ArrowUpRight className="w-6 h-6 text-orange-600" />
               </div>
               <Button variant="ghost" size="sm" className="rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:bg-slate-50 border border-transparent hover:border-slate-100">Reset Form</Button>
            </div>
            <CardTitle className="text-2xl font-bold text-slate-800">New Transaction</CardTitle>
            <CardDescription className="text-slate-500 font-medium">Enter spending details manually.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8 pt-0">
             <div className="h-64 flex items-center justify-center border-2 border-dashed border-slate-100 rounded-3xl text-slate-400 bg-slate-50/50 font-medium italic">
               Expense Input Form Placeholder
             </div>
          </CardContent>
        </Card>

        <Card className="xl:col-span-8 border-slate-200 shadow-none rounded-3xl bg-white overflow-hidden border">
          <CardHeader className="p-6 md:p-8 pb-4">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-violet-50 border border-violet-100 flex items-center justify-center">
                     <History className="w-6 h-6 text-violet-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold text-slate-800">Transaction History</CardTitle>
                    <CardDescription className="text-slate-500 font-medium">Your spending logs for this month.</CardDescription>
                  </div>
               </div>
               <Button variant="outline" size="sm" className="rounded-full border-slate-200 bg-white font-bold text-slate-600 hover:bg-slate-50 shadow-sm">
                  <Filter className="mr-2 h-3.5 w-3.5" /> Filter
               </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6 md:p-10 pt-4">
             <div className="h-96 flex items-center justify-center border-2 border-dashed border-slate-100 rounded-3xl text-slate-400 bg-slate-50/50 font-medium italic">
               Spending Data Table Placeholder
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
