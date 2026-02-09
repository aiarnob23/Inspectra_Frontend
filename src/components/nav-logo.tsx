"use client"

import { Bell } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

export function SidebarLogo() {
    const { state } = useSidebar() // "expanded" | "collapsed"

    return (
        <div className="flex items-center gap-2 px-2 py-2">
            {/* Logo */}
            <div
                className={cn(
                    "flex size-8 items-center justify-center rounded-md transition-colors",
                    state === "expanded"
                        ? "bg-primary text-sidebar-primary-foreground"
                        : "text-foreground"
                )}
            >
                <Bell className="size-4" />
            </div>

            {/* Name (only when expanded) */}
            {state === "expanded" && (
                <span className="text-sm font-semibold tracking-tight">
                    Inspectra
                </span>
            )}
        </div>
    )
}
