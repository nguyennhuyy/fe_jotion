import React from "react"
import Image from "next/image"
import { SendHorizonal } from "lucide-react"

import { Button, Input } from "@/components/ui"

import MessageItem from "./message-item"

const ContentMessage = () => {
  return (
    <div className="flex flex-1 rounded-lg shadow-frame-shadow bg-white dark:bg-slate-600 p-4 flex-col">
      <ContentMessage.Header name="Thai Hong Ngan" email="thn@gmail.com" />

      <div className="flex flex-col-reverse overflow-scroll flex-1 py-4 gap-2 -mr-6 pr-6">
        <MessageItem content="Hello huy" role="send" />
        <MessageItem content="Hello huy" role="send" />
        <MessageItem content="Hello huy" role="send" />
        <MessageItem content="Hello huy" role="send" />
        <MessageItem content="Hello huy" role="send" />
        <MessageItem content="Hello huy" role="send" />
        <MessageItem content="Hello huy" role="send" />
        <MessageItem content="Hello huy" role="send" />
        <MessageItem content="Hello huy" role="send" />
        <MessageItem content="Hello huy" role="send" />
        <MessageItem content="Hello huy" role="send" />
        <MessageItem content="Hello huy" role="send" />
        <MessageItem content="Hello huy" role="send" />
        <MessageItem content="Hello huy" role="send" />
        <MessageItem content="Hello huy" role="send" />
        <MessageItem content="Hello huy" role="send" />
        <MessageItem content="Hello huy" role="send" />
        <MessageItem content="Hello huy" role="send" />
        <MessageItem
          content="When the prompt input includes only text, use the gemini-pro model with the generateContent method to generate text output"
          role="send"
        />
      </div>

      <div className="mt-auto sticky bottom-0 z-50">
        <div className="flex items-center gap-2 pt-4">
          <Input placeholder="Nhập tin nhắn" />
          <Button>
            <SendHorizonal className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ContentMessage

type HeaderProps = Partial<{
  avatar: string
  name: string
  email: string
}>

ContentMessage.Header = function Header({ avatar, name, email }: HeaderProps) {
  return (
    <div className="flex items-center gap-2 pb-4 border-b sticky top-0 z-50">
      <Image
        src={avatar || "/logo.svg"}
        height={30}
        width={30}
        className="rounded-full"
        alt="avatar"
      />
      <div className="flex flex-col">
        <p className="text-base">{name}</p>
        <span className="text-xs">{email}</span>
      </div>
    </div>
  )
}
