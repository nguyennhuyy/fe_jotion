"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { EventName, socket } from "@/lib"
import { userStore } from "@/store"
import { DetailGroupType, MessageType } from "@/types"
import { SendHorizonal } from "lucide-react"
import { useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"

import { detailGroupApi } from "@/apis/chat.api"
import { Spinner } from "@/components/spinner"
import { Button, Input } from "@/components/ui"

import MessageItem from "./message-item"

type Message = {
  message: string
}

const ContentMessage = () => {
  const { user } = userStore()
  const paramsId = useParams()

  const { data: detailGroup, isPending: isPendingDetail } = useQuery({
    queryKey: ["DetailGroup", paramsId?.messageId],
    queryFn: () => detailGroupApi(paramsId?.messageId as string),
  })

  const [dataMessage, setDataMessage] = useState<MessageType[]>()

  const { register, handleSubmit, reset } = useForm<Message>()

  const onsubmit = (data: Message) => {
    socket.emit(EventName.OnChat, {
      senderId: user?.id,
      conversationId: paramsId?.messageId,
      message: data?.message,
    })
    reset({ message: "" })
  }

  useEffect(() => {
    socket.on(EventName.OnChat, (data: MessageType) => {
      if (data && data.conversationId === paramsId?.messageId) {
        setDataMessage((prev: any) => {
          if (prev) {
            return [data, ...prev]
          }
          return [prev]
        })
      }
    })
  }, [])

  useEffect(() => {
    if (detailGroup) {
      setDataMessage(detailGroup?.messages)
    }
  }, [detailGroup])

  return (
    <div className="flex flex-1 rounded-lg shadow-frame-shadow bg-white dark:bg-slate-600 p-4 flex-col">
      <ContentMessage.Header
        avatar={detailGroup?.avatar as any}
        name={detailGroup?.fullname}
        email={detailGroup?.email}
      />

      {isPendingDetail ? (
        <div className="flex justify-center items-center h-full w-full">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col-reverse overflow-scroll flex-1 py-4 gap-2 -mr-6 pr-6">
          {dataMessage?.map((message, idx) => (
            <MessageItem
              key={idx}
              content={message?.message}
              role={user?.id === message?.senderId ? "send" : "receive"}
            />
          ))}
        </div>
      )}

      <div className="mt-auto sticky bottom-0 z-50">
        <form className="w-full" onSubmit={handleSubmit(onsubmit)}>
          <div className="flex items-center gap-2 pt-4">
            <Input {...register("message")} placeholder="Nhập tin nhắn" />
            <Button onClick={handleSubmit(onsubmit)}>
              <SendHorizonal className="h-5 w-5" />
            </Button>
          </div>
        </form>
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
