
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Setup | HomeSweetLoan",
}

export default function SetupPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight text-primary">Setup & Configuration</h2>
      <p className="text-muted-foreground">Define your bank accounts, income sources, and expense categories.</p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder cards */}
        {["Account Summary", "Income Sources", "Needs Categories", "Wants Categories", "Savings Categories", "Account Assets"].map((title) => (
          <div key={title} className="p-6 bg-card border rounded-lg shadow-sm border-l-4 border-l-primary/30">
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <div className="h-20 flex items-center justify-center border border-dashed rounded text-muted-foreground">
              [Setup Component Placeholder]
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
