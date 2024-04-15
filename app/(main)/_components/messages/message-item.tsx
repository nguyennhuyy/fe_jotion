import React from "react"
import Image from "next/image"
import { cn } from "@/lib"

type Props = React.HTMLAttributes<HTMLDivElement> & {
  role?: "receive" | "send"
  avatar?: string
  content?: string
}
const MessageItem = ({ avatar, content, className, role, ...props }: Props) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2",
        role === "send" ? "flex-row-reverse text-right" : "flex-row text-left",
        className
      )}
      {...props}
    >
      <Image
        src={avatar || "logo.svg"}
        width={30}
        height={30}
        className="rounded-full"
        alt="avatar"
      />
      <div className="rounded-lg bg-slate-100 p-4 max-w-80 text-wrap">
        <p className="text-sm">{content}</p>
      </div>
    </div>
  )
}

export default MessageItem
