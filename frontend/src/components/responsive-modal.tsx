"use client";

import * as React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useDragToClose } from "@/hooks/use-drag-to-close";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface ResponsiveModalProps {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  title: string;
  description?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function ResponsiveModal({
  children,
  trigger,
  title,
  description,
  open,
  onOpenChange,
  className,
}: ResponsiveModalProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { containerRef, isDragging } = useDragToClose({
    onClose: () => onOpenChange?.(false),
    threshold: 150,
  });

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
        <DialogContent
          className={cn(
            "sm:max-w-[500px] rounded-3xl border-border bg-card shadow-2xl animate-smooth-in",
            className
          )}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground">
              {title}
            </DialogTitle>
            {description && (
              <DialogDescription className="text-muted-foreground font-medium">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
          <div className="py-4">{children}</div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent
        ref={containerRef}
        side="bottom"
        className={cn(
          "rounded-t-[32px] border-t-0 bg-card p-6 pb-12 shadow-[0_-8px_30px_rgb(0,0,0,0.12)]",
          className
        )}
      >
        <div
          className={cn(
            "bottom-sheet-handle",
            isDragging && "bg-slate-400 dark:bg-slate-600"
          )}
        />
        <SheetHeader className="text-left mb-6">
          <SheetTitle className="text-2xl font-bold text-foreground">
            {title}
          </SheetTitle>
          {(description && (
            <SheetDescription className="text-muted-foreground font-medium">
              {description}
            </SheetDescription>
          )) || <div className="h-0" />}
        </SheetHeader>
        <div className="animate-smooth-in">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
