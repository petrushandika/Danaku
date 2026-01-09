
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, Calendar, ArrowRight } from "lucide-react"

export default function ReportPage() {
  return (
    <div className="space-y-10 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">
            Financial <span className="text-gradient-money">Reports</span>
          </h1>
          <p className="text-slate-500 font-medium mt-2">Deep dive into your financial habits and trends.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 border-slate-200 bg-white text-slate-700 font-bold hover:bg-slate-50 shadow-sm">
            <Calendar className="mr-2 h-4 w-4 text-slate-400" /> This Month
          </Button>
          <Button className="rounded-full px-6 bg-linear-to-r from-emerald-600 to-emerald-700 text-white font-bold shadow-sm">
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </Button>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="border-slate-200 shadow-none rounded-3xl bg-white overflow-hidden border group transition-all hover:border-slate-300">
          <CardHeader className="p-10">
            <div className="flex items-center gap-5 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-violet-50 border border-violet-100 flex items-center justify-center transition-transform group-hover:scale-105">
                <FileText className="w-7 h-7 text-violet-600" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-slate-800">Monthly Analysis</CardTitle>
                <CardDescription className="text-slate-500 font-medium">Comparison between budget and real spending.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-10 pt-0">
             <div className="aspect-video flex items-center justify-center border-2 border-dashed border-slate-100 rounded-3xl text-sm text-slate-400 bg-slate-50/50 font-medium italic">
               Comparison Chart Placeholder
             </div>
             <Button variant="ghost" className="w-full mt-8 rounded-2xl group/btn py-6 font-bold text-slate-600 border border-transparent hover:border-slate-100 hover:bg-slate-50">
                Detailed Analysis <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
             </Button>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-none rounded-3xl bg-white overflow-hidden border group transition-all hover:border-slate-300">
          <CardHeader className="p-10">
            <div className="flex items-center gap-5 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center transition-transform group-hover:scale-105">
                <FileText className="w-7 h-7 text-rose-600" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-slate-800">Category Distribution</CardTitle>
                <CardDescription className="text-slate-500 font-medium">Where does your money go exactly?</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-10 pt-0">
             <div className="aspect-video flex items-center justify-center border-2 border-dashed border-slate-100 rounded-3xl text-sm text-slate-400 bg-slate-50/50 font-medium italic">
               Pie Chart Placeholder
             </div>
             <Button variant="ghost" className="w-full mt-8 rounded-2xl group/btn py-6 font-bold text-slate-600 border border-transparent hover:border-slate-100 hover:bg-slate-50">
                Optimize Spending <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
             </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border-indigo-700 shadow-none rounded-3xl bg-linear-to-r from-indigo-600 to-violet-700 p-12 text-white overflow-hidden relative border shadow-sm">
         <div className="absolute top-0 right-0 p-12 opacity-10">
            <FileText className="w-64 h-64 text-white" />
         </div>
         <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl font-black mb-5 tracking-tight">Smart Financial Insights</h2>
            <p className="text-indigo-50 text-base leading-relaxed mb-10 font-medium">
              Based on your habits, you could save up to <b className="text-white underline underline-offset-4 decoration-indigo-300">Rp 1.500.000</b> more each month by reducing lifestyle spending in the "Coffee Shop" category.
            </p>
            <Button className="rounded-full px-10 bg-white text-indigo-700 font-black hover:bg-indigo-50 border border-transparent shadow-sm py-6">
               Generate AI Advice
            </Button>
         </div>
      </Card>
    </div>
  )
}
