
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Assets | HomeSweetLoan",
}

export default function AssetsPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight text-primary">Assets Management</h2>
      <p className="text-muted-foreground">Monitor your net worth and asset growth over time.</p>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-card border rounded-lg p-6 shadow-sm border-b-4 border-b-savings">
          <h3 className="text-sm font-medium text-muted-foreground">Total Liquid Assets</h3>
          <p className="text-2xl font-bold text-savings">Rp 45.300.000</p>
        </div>
        <div className="bg-card border rounded-lg p-6 shadow-sm border-b-4 border-b-needs">
          <h3 className="text-sm font-medium text-muted-foreground">Total Non-Liquid Assets</h3>
          <p className="text-2xl font-bold text-needs">Rp 112.500.000</p>
        </div>
        <div className="bg-card border rounded-lg p-6 shadow-sm border-b-4 border-b-primary">
          <h3 className="text-sm font-medium text-muted-foreground">Net Worth</h3>
          <p className="text-2xl font-bold text-primary">Rp 157.800.000</p>
        </div>
      </div>
      <div className="bg-card border rounded-lg p-6 shadow-sm mt-6">
        <h3 className="font-semibold mb-4">Asset Breakdown</h3>
        <div className="h-48 flex items-center justify-center border border-dashed rounded text-muted-foreground">
          [Assets Data Table Placeholder]
        </div>
      </div>
    </div>
  )
}
