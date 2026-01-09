
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Spending | HomeSweetLoan",
}

export default function SpendingPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight text-primary">Spending Tracker</h2>
      <p className="text-muted-foreground">Log your daily expenses and keep track of your budget usage.</p>
      <div className="grid gap-6">
        <div className="bg-card border rounded-lg p-6 shadow-sm border-l-4 border-l-expenses">
           <h3 className="font-semibold mb-4">Add New Spending</h3>
           <div className="h-32 flex items-center justify-center border border-dashed rounded text-muted-foreground">
             [Spending Form Component Placeholder]
           </div>
        </div>
        <div className="bg-card border rounded-lg p-6 shadow-sm">
           <h3 className="font-semibold mb-4">Recent Spending History</h3>
           <div className="h-48 flex items-center justify-center border border-dashed rounded text-muted-foreground">
             [Spending Table Component Placeholder]
           </div>
        </div>
      </div>
    </div>
  )
}
