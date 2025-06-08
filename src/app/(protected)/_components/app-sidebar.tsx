"use client"

import {
  GalleryVerticalEnd,
  Home,
  ShoppingCart,
} from "lucide-react"
import type * as React from "react"

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth-client"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"

// This is sample data.
const data = {  
  appName: [
    {
      name: "AALMEIDA.dev",
      logo: GalleryVerticalEnd,
      plan: "MyOrders",
    }    
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,      
    }
  ],  
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {  
  const session = authClient.useSession();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.appName} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />        
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={session.data?.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
