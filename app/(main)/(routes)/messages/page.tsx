import React from "react"

import { Sidebar } from "../../_components/messages"

const MessagePage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-2 p-2 bg-slate-100 h-[calc(100%_-_58px)] w-full dark:bg-secondary">
      <Sidebar />
      {children}
    </div>
  )
}

export default MessagePage
