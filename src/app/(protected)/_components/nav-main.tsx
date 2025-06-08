"use client"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { type LucideIcon } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

import { Collapsible } from "@/components/ui/collapsible"

interface NavItem {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean  
}

export function NavMain({items}: {items: NavItem[]}) {
  const router = useRouter();
  const pathname = usePathname();
  
  const handleClick = (url: string) => {    
    router.push(url)
  } 

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Navegação</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
            <SidebarMenuItem>
              <SidebarMenuButton isActive={pathname === item.url} tooltip={item.title} onClick={()=>{handleClick(item.url)}}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>                
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
