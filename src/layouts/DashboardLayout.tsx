import { AppSidebar } from "@/components/app-sidebar"
import DashboardHeader from "@/components/Dashboard/Header"
import Modals from "@/components/Modal"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Outlet } from "react-router"

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-2" />
            <DashboardHeader/>
          </div>
        </header>
        <Outlet />
        <Modals/>
      </SidebarInset>
    </SidebarProvider>
  )
}
