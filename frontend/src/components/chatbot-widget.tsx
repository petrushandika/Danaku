"use client"

import { useState } from "react"
import { MessageCircle, X, Send, ChevronRight, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)

  const generalQuestions = [
    { text: "How do I create a new budget?", icon: "💰" },
    { text: "What are the benefits of Premium?", icon: "✨" },
    { text: "How to reset my password?", icon: "🔒" },
    { text: "Where can I find financial reports?", icon: "📊" },
    { text: "Can I change my default currency?", icon: "💱" }
  ]

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">
      {/* Chat Window */}
      <div className={cn(
        "bg-white dark:bg-slate-900 border border-border rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 origin-bottom-right w-[calc(100vw-2rem)] md:w-[380px] max-h-[80vh] pointer-events-auto flex flex-col",
        isOpen 
          ? "scale-100 opacity-100 translate-y-0" 
          : "scale-95 opacity-0 translate-y-10 pointer-events-none hidden"
      )}>
        {/* Header */}
        <div className="bg-emerald-600 p-5 flex items-center justify-between relative overflow-hidden shrink-0">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/5 rounded-full blur-xl -ml-10 -mb-10" />

            <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/10 shadow-inner">
                    <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h3 className="font-black text-white text-base tracking-tight">Home Sweet AI</h3>
                    <div className="flex items-center gap-1.5 opacity-90">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                        <p className="text-emerald-100 text-[11px] font-bold">Online & Ready to Help</p>
                    </div>
                </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 rounded-xl h-8 w-8 relative z-10 transition-colors">
                <X className="w-5 h-5" />
            </Button>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 bg-slate-50 dark:bg-slate-950 flex flex-col min-h-0 h-[400px]">
            <div className="flex-1 overflow-y-auto space-y-4 emerald-scrollbar pr-2 mb-3">
                
                {/* Welcome Message */}
                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800">
                         <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400 fill-current" />
                    </div>
                    <div className="space-y-2 max-w-[85%]">
                        <div className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl rounded-tl-none border border-border shadow-sm">
                            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                <span className="font-bold text-slate-800 dark:text-white block mb-1">Hi there! 👋</span>
                                I'm your intelligent finance assistant. I can help you with budgeting, reports, or general questions.
                            </p>
                        </div>
                         <div className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl rounded-tl-none border border-border shadow-sm">
                             <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">What would you like to know today?</p>
                         </div>
                    </div>
                </div>

                {/* Suggested Questions */}
                <div className="pl-11 space-y-2">
                    {generalQuestions.map((q, i) => (
                        <button 
                            key={i} 
                            className="w-full text-left bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 border border-border hover:border-emerald-200 dark:hover:border-emerald-800 p-3 rounded-2xl text-xs sm:text-sm text-slate-700 dark:text-slate-300 transition-all duration-200 group flex items-center gap-3 shadow-sm hover:translate-x-1"
                        >
                            <span className="text-base">{q.icon}</span>
                            <span className="font-medium">{q.text}</span>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-helper:text-emerald-500 transition-colors ml-auto" />
                        </button>
                    ))}
                </div>
            </div>
            
             {/* Input Area */}
             <div className="relative mt-auto shrink-0 flex items-center gap-2">
                <input 
                    type="text" 
                    placeholder="Type your question..." 
                    className="flex-1 bg-white dark:bg-slate-900 border border-border rounded-2xl pl-4 pr-10 py-3 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm placeholder:text-slate-400 text-slate-700 dark:text-slate-200"
                />
                <button className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
                    <Send className="w-4 h-4 ml-0.5" />
                </button>
             </div>
             
             <div className="text-center mt-3 shrink-0">
                 <p className="text-[9px] text-slate-400 font-medium">Powered by Home Sweet <span className="text-emerald-500">AI</span></p>
             </div>
        </div>
      </div>

      {/* Floating Button */}
      <Button 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
            "h-14 w-14 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-500 relative pointer-events-auto border-2 border-white dark:border-slate-800",
            isOpen ? "bg-slate-800 dark:bg-white hover:bg-slate-900 dark:hover:bg-slate-100 rotate-90 scale-90" : "bg-emerald-600 hover:bg-emerald-500 hover:-translate-y-1 hover:scale-105"
        )}
      >
        {isOpen ? (
            <X className={cn("w-6 h-6 transition-colors", isOpen ? "text-white dark:text-slate-900" : "text-white")} />
        ) : (
            <MessageCircle className="w-7 h-7 text-white fill-current" />
        )}
        
        {!isOpen && (
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-white dark:border-slate-950 animate-bounce" />
        )}
      </Button>
    </div>
  )
}
