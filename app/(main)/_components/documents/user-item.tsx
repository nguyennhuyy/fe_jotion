"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCookie } from "@/hooks"
import { KeyCookie } from "@/lib"
import { userStore } from "@/store"
import { ChevronsLeftRight } from "lucide-react"

import { Button } from "@/components/ui"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const UserItem = () => {
  const router = useRouter()
  const { user } = userStore()
  const { removeItemCookie } = useCookie()

  const handleLogOut = () => {
    removeItemCookie(KeyCookie.Token)
    router.push("/")
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className="flex items-center text-sm p-3 w-full hover:bg-primary/5"
        >
          <div className="gap-x-2 flex items-center max-w-[150px]">
            <Avatar className="h-5 w-5">
              <AvatarImage src={user?.avatar || "/logo.svg"} />
            </Avatar>
            <span className="text-start font-medium line-clamp-1">
              {user?.fullname}&apos;s Jotion
            </span>
          </div>
          <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80"
        align="start"
        alignOffset={11}
        forceMount
      >
        <Link href="/account">
          <div className="flex flex-col space-y-4 p-2">
            <p className="text-xs font-medium leading-none text-muted-foreground">
              {user?.email}
            </p>
            <div className="flex items-center gap-x-2">
              <div className="rounded-md bg-secondary p-1">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar || "/logo.svg"} />
                </Avatar>
              </div>
              <div className="space-y-1">
                <p className="text-sm line-clamp-1">
                  {user?.fullname}&apos;s Jotion
                </p>
              </div>
            </div>
          </div>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className="w-full cursor-pointer text-muted-foreground"
        >
          <Button variant="ghost" onClick={handleLogOut}>
            Đăng xuất
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default UserItem
