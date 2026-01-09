
"use client"

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Download,
  PiggyBank,
  Plus,
  ArrowRight
} from "lucide-react"
import { 
  Bar, 
  BarChart, 
  XAxis, 
  CartesianGrid
} from "recharts"
import { 
  ChartConfig, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"

const chartData = [
  { month: "Jan", income: 12500000, expenses: 4200000 },
  { month: "Feb", income: 12500000, expenses: 5100000 },
  { month: "Mar", income: 15000000, expenses: 4800000 },
  { month: "Apr", income: 12500000, expenses: 6200000 },
  { month: "May", income: 13000000, expenses: 4500000 },
  { month: "Jun", income: 14000000, expenses: 4900000 },
]

const chartConfig = {
  income: {
    label: "Income",
    color: "var(--income)",
  },
  expenses: {
    label: "Expenses",
    color: "var(--expenses)",
  },
} satisfies ChartConfig

export default function DashboardPage() {
  return (
    <div className="space-y-10 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-foreground">
            Financial <span className="text-gradient-money">Summary</span>
          </h1>
          <p className="text-muted-foreground mt-2">Welcome back, Pandawa! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-full px-6 hover:bg-secondary">
            <Download className="mr-2 h-4 w-4" /> Export Data
          </Button>
          <Button className="rounded-full px-6 bg-gradient-money shadow-lg shadow-primary/25 hover:opacity-90">
            <Plus className="mr-2 h-4 w-4" /> Add Transaction
          </Button>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Monthly Income" 
          amount="Rp 12,500,000" 
          trend="+12%" 
          positive 
          icon={TrendingUp} 
          gradient="from-emerald-500/20 to-emerald-500/5" 
          borderColor="border-income/20"
          textColor="text-income"
        />
        <StatsCard 
          title="Monthly Spending" 
          amount="Rp 4,230,000" 
          trend="-4%" 
          positive 
          icon={TrendingDown} 
          gradient="from-orange-500/20 to-orange-500/5" 
          borderColor="border-expenses/20"
          textColor="text-expenses"
        />
        <StatsCard 
          title="Total Savings" 
          amount="Rp 45,000,000" 
          trend="82%" 
          icon={PiggyBank} 
          gradient="from-emerald-600/20 to-emerald-600/5" 
          borderColor="border-savings/20"
          textColor="text-savings"
          subtitle="Target: DP Rumah"
        />
        <StatsCard 
          title="Net Worth" 
          amount="Rp 157,800,000" 
          trend="+Rp 15M" 
          positive 
          icon={Wallet} 
          gradient="from-violet-500/20 to-violet-500/5" 
          borderColor="border-primary/20"
          textColor="text-violet-500"
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-none shadow-xl shadow-slate-200/50 rounded-3xl overflow-hidden bg-white/50 backdrop-blur-sm">
          <CardHeader className="p-8 pb-0">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold">Cash Flow</CardTitle>
                <CardDescription>Visualizing your income vs expenses</CardDescription>
              </div>
              <Tabs defaultValue="6m" className="w-fit">
                <TabsList className="rounded-full bg-slate-100 p-1">
                  <TabsTrigger value="1m" className="rounded-full px-4 text-xs">1M</TabsTrigger>
                  <TabsTrigger value="6m" className="rounded-full px-4 text-xs">6M</TabsTrigger>
                  <TabsTrigger value="1y" className="rounded-full px-4 text-xs">1Y</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="p-8 pt-6">
            <ChartContainer config={chartConfig} className="h-[350px] w-full">
              <BarChart data={chartData}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                />
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Bar dataKey="income" fill="var(--color-income)" radius={[6, 6, 0, 0]} barSize={24} />
                <Bar dataKey="expenses" fill="var(--color-expenses)" radius={[6, 6, 0, 0]} barSize={24} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-none shadow-xl shadow-slate-200/50 rounded-3xl bg-white/50 backdrop-blur-sm overflow-hidden text-clip">
          <CardHeader className="p-8 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">Recent Activity</CardTitle>
              <Button variant="ghost" size="sm" className="rounded-full text-primary hover:bg-primary/5">
                View All <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-8 pt-0 space-y-6">
            {[
              { name: "Sembako Bulanan", category: "Needs", amount: "- Rp 850,000", date: "Today, 14:20", color: "text-orange-500", icon: Wallet, bg: "bg-orange-50" },
              { name: "Coffee & Chill", category: "Wants", amount: "- Rp 45,000", date: "Today, 10:15", color: "text-violet-500", icon: TrendingDown, bg: "bg-violet-50" },
              { name: "Salary Transfer", category: "Income", amount: "+ Rp 12,000,000", date: "Jan 25", color: "text-emerald-500", icon: TrendingUp, bg: "bg-emerald-50" },
              { name: "Listrik & Air", category: "Needs", amount: "- Rp 450,000", date: "Jan 24", color: "text-orange-500", icon: Wallet, bg: "bg-orange-50" },
              { name: "Tabungan Emas", category: "Savings", amount: "- Rp 1,000,000", date: "Jan 23", color: "text-pink-500", icon: PiggyBank, bg: "bg-pink-50" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center group cursor-pointer">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mr-4 transition-transform group-hover:scale-110", item.bg)}>
                  <item.icon className={cn("w-6 h-6", item.color)} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm leading-none mb-1 group-hover:text-primary transition-colors">{item.name}</h4>
                  <p className="text-xs text-muted-foreground">{item.category} • {item.date}</p>
                </div>
                <div className={cn("font-black text-sm text-right", item.amount.startsWith("+") ? "text-emerald-500" : "text-foreground")}>
                  {item.amount}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StatsCard({ 
  title, 
  amount, 
  trend, 
  positive, 
  icon: Icon, 
  gradient, 
  borderColor, 
  textColor,
  subtitle 
}: any) {
  return (
    <Card className={cn("border-none shadow-xl shadow-slate-200/50 rounded-3xl overflow-hidden relative group", borderColor)}>
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50 transition-opacity group-hover:opacity-80", gradient)} />
      <CardHeader className="p-6 relative z-10 pb-2">
        <div className="flex items-center justify-between mb-2">
          <div className={cn("w-10 h-10 rounded-2xl bg-white shadow-md flex items-center justify-center")}>
            <Icon className={cn("w-5 h-5", textColor)} />
          </div>
          <div className={cn(
            "text-[10px] font-black px-2 py-1 rounded-full",
            positive ? "bg-emerald-100 text-emerald-600" : "bg-orange-100 text-orange-600"
          )}>
            {trend}
          </div>
        </div>
        <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-widest">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0 relative z-10">
        <div className="text-2xl font-black tracking-tight">{amount}</div>
        {subtitle && <p className="text-[10px] font-bold text-muted-foreground mt-1">{subtitle}</p>}
      </CardContent>
    </Card>
  )
}
