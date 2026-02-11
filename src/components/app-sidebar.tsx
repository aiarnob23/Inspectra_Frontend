"use client"

import * as React from "react"
import {
  CableCar,
  IdCardLanyard,
  LayoutDashboard,
  Users,
  ShieldCheck,
  Send,
  FileText,
  CreditCard,
  Settings,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { SidebarLogo } from "./nav-logo"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Overview",
      url: "#",
      icon: LayoutDashboard,
    },
    {
      title: "Clients",
      url: "/dashboard/clients",
      icon: Users,
    },
    {
      title: "Assets",
      url: "/dashboard/assets",
      icon: CableCar,
    },
    {
      title: "Employees",
      url: "#",
      icon: IdCardLanyard,
    },
    {
      title: "Inspections",
      url: "#",
      icon: ShieldCheck,
    },
    {
      title: "Reminders",
      url: "#",
      icon: Send,
    },
    {
      title: "Reports",
      url: "#",
      icon: FileText,
    },
    {
      title: "Billing",
      url: "#",
      icon: CreditCard,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

