"use client"

import React from "react"
import { useCookie } from "@/hooks"
import { cn, KeyCookie } from "@/lib"
import { LogOut } from "lucide-react"

const Header = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
  const { removeItemCookie, getItemCookie } = useCookie()
  const handleLogOut = () => {
    removeItemCookie(KeyCookie.TokenAdmin)
    location.href = "/admin/login"
  }
  if (!getItemCookie(KeyCookie.TokenAdmin)) return null

  return (
    <div>
      <nav
        className={cn(
          "flex items-center space-x-4 lg:space-x-6 p-4 h-[72px] bg-white shadow",
          className
        )}
        {...props}
      >
        <div
          onClick={handleLogOut}
          className="flex items-center gap-2 ml-auto cursor-pointer"
        >
          <LogOut />
          Đăng xuất
        </div>
      </nav>
    </div>
  )
}

export default Header
