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
import { useAuth } from "@/hooks/useAuth"

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
      url: "/dashboard/employees",
      icon: IdCardLanyard,
    },
    {
      title: "Inspections",
      url: "/dashboard/inspections",
      icon: ShieldCheck,
    },
    {
      title: "Reminders",
      url: "/dashboard/reminders",
      icon: Send,
    },
    {
      title: "Reports",
      url: "#",
      icon: FileText,
    },
    {
      title: "Billing",
      url: "/dashboard/billing",
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

  const { user } = useAuth()
  // safe fallback
  const sidebarUser = user
    ? {
      name: `${user.firstName} ${user.lastName ?? ""}`,
      email: user.email,
      avatar: "", // future e profile image thakle use korba
    }
    : null

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
          {sidebarUser && <NavUser user={sidebarUser} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

