import type React from "react"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AIAssistant } from "@/components/ai-assistant"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex-1">
        {children}
        <AIAssistant />
      </SidebarInset>
    </SidebarProvider>
  )
}
