import React from "react"
import Image from "next/image"
import { cn } from "@/lib"

type Props = React.HTMLAttributes<HTMLDivElement> & {
  avatar?: string
  name?: string
  time?: string
  message?: string
  active?: boolean
}
const ChatUser = ({
  avatar,
  name,
  time,
  message,
  className,
  active,
  ...props
}: Props) => {
  return (
    <div
      className={cn(
        "flex items-center p-2 justify-between hover:bg-slate-100 cursor-pointer rounded-md hover:dark:bg-slate-400",
        active && "bg-slate-200 dark:bg-slate-500",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <Image
          src={avatar || "/logo.svg"}
          height={30}
          width={30}
          className="rounded-full"
          alt="avatar"
        />
        <div className="flex flex-col">
          <p className="text-base">{name}</p>
          <span className="text-xs">{message}</span>
        </div>
      </div>
      <span className="text-xs self-start leading-6 text-slate-400">
        {time}
      </span>
    </div>
  )
}

export default ChatUser
