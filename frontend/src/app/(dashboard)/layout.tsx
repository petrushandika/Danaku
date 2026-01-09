
"use client"

import { Sidebar } from "@/components/dashboard/sidebar"
import { Separator } from "@/components/ui/separator"
import { Menu, Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <Sidebar className="hidden lg:flex" />

      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-20 flex items-center px-6 border-b bg-white/80 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-4 flex-1">
             {/* Mobile Menu Trigger */}
             <Sheet open={open} onOpenChange={setOpen}>
               <SheetTrigger asChild>
                 <Button variant="ghost" size="icon" className="lg:hidden hover:bg-primary/10">
                   <Menu className="w-6 h-6 text-primary" />
                 </Button>
               </SheetTrigger>
               <SheetContent side="left" className="p-0 w-72">
                 <Sidebar className="w-full border-none" />
               </SheetContent>
             </Sheet>

             <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-full w-72 border border-transparent focus-within:border-primary/20 transition-all">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Quick search..." 
                  className="bg-transparent border-none outline-none text-sm w-full"
                />
             </div>
          </div>

          <div className="flex items-center gap-4">
             <Button variant="ghost" size="icon" className="relative hover:bg-primary/10 rounded-full">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-white" />
             </Button>
             <Separator orientation="vertical" className="h-6" />
             <div className="flex items-center gap-3 pl-2">
                <div className="w-10 h-10 rounded-full bg-gradient-vibrant p-[2px]">
                   <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                      <div className="w-full h-full bg-linear-to-tr from-primary to-savings" />
                   </div>
                </div>
                <div className="hidden sm:flex flex-col">
                   <span className="text-sm font-bold">Pandawa</span>
                   <span className="text-[10px] text-muted-foreground font-medium">Verified User</span>
                </div>
             </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10">
          <div className="max-w-7xl mx-auto space-y-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
