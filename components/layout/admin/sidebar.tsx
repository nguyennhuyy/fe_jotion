"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { File, Home, Table, User } from "lucide-react"

import { cn } from "@/lib/utils"

export default function Sidebar() {
  const pathname = usePathname()
  const links = [
    {
      title: "Trang chủ",
      href: "/admin/dashboard",
      icon: Home,
      active: ["/admin/dashboard"].includes(pathname),
    },
    {
      title: "Người dùng",
      href: "/admin/users",
      icon: User,
      active: ["/admin/users"].includes(pathname),
    },
    {
      title: "Bài Viết",
      href: "/admin/documents",
      icon: File,
      active: ["/admin/documents"].includes(pathname),
    },
    {
      title: "Bảng biểu",
      href: "/admin/workspace",
      icon: Table,
      active: ["/admin/workspace"].includes(pathname),
    },
  ]
  return (
    <div className="min-w-[300px] bg-cyan-900">
      <Image
        src="/logo.svg"
        width={60}
        height={60}
        alt="logo"
        className="p-2"
      />
      <nav className="flex gap-4 flex-col px-2 mt-4">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={cn(
              "flex items-center gap-2 text-sm",
              "justify-start hover:bg-cyan-800/70 p-3 rounded-xl text-white",
              link.active && "bg-cyan-800/70"
            )}
          >
            <link.icon className="mr-2 h-5 w-5" />
            {link.title}
          </Link>
        ))}
      </nav>
    </div>
  )
}
