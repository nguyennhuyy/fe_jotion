import React from "react"

import { ChatUser } from "."

const Sidebar = () => {
  return (
    <div className="max-w-80 w-full rounded-lg shadow-frame-shadow bg-white py-4 px-2 flex flex-col gap-1 overflow-auto dark:bg-slate-600">
      <ChatUser name="Thai Hong Ngan" message="Ok" time="7:00 AM" />
      <ChatUser name="Thai Hong Ngan" message="Ok" time="7:00 AM" />
      <ChatUser name="Thai Hong Ngan" message="Ok" time="7:00 AM" />
      <ChatUser name="Thai Hong Ngan" message="Ok" time="7:00 AM" active />
      <ChatUser name="Thai Hong Ngan" message="Ok" time="7:00 AM" />
    </div>
  )
}

export default Sidebar
