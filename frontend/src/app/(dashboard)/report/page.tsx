
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Reports | HomeSweetLoan",
}

export default function ReportPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight text-primary">Financial Reports</h2>
      <p className="text-muted-foreground">Detailed analysis of your financial habits and trends.</p>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-card border rounded-lg p-6 shadow-sm border-t-4 border-t-wants">
          <h3 className="font-semibold mb-4">Budget vs Actual</h3>
          <div className="h-48 flex items-center justify-center border border-dashed rounded text-muted-foreground">
            [Comparison Chart Placeholder]
          </div>
        </div>
        <div className="bg-card border rounded-lg p-6 shadow-sm border-t-4 border-t-needs">
          <h3 className="font-semibold mb-4">Category Distribution</h3>
          <div className="h-48 flex items-center justify-center border border-dashed rounded text-muted-foreground">
            [Pie Chart Placeholder]
          </div>
        </div>
      </div>
    </div>
  )
}
