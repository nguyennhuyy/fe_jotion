"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { toast } from "sonner"
import { useDebounce } from "usehooks-ts"
import { useMutation } from "@tanstack/react-query"

import { createGroupChatApi } from "@/apis/chat.api"
import { Spinner } from "@/components/spinner"
import { Input } from "@/components/ui"

import { ChatUser } from "."
import { useSearchChatMutation } from "../../_query"

const Sidebar = () => {
  const router = useRouter()

  const [isFocus, setIsFocus] = useState<boolean>(false)
  const [textSearch, setTextSearch] = useState<string>()
  const debouncedSearchTerm = useDebounce(textSearch, 700)

  const {
    mutateAsync: mutateSearch,
    data: dataSearch,
    isPending,
  } = useSearchChatMutation()

  const { mutateAsync: mutateCreateGroup } = useMutation({
    mutationKey: ["CreateGroup"],
    mutationFn: createGroupChatApi,
  })

  const onFocus = () => setIsFocus(true)

  const handleCreate = async (id: string) => {
    const group = await mutateCreateGroup({
      name: "",
      userId: id,
    })
    router.push(`/messages/${group.id}`)
  }

  useEffect(() => {
    mutateSearch(textSearch)
  }, [debouncedSearchTerm])

  return (
    <div className="max-w-80 w-full rounded-lg shadow-frame-shadow bg-white py-4 px-2 flex flex-col gap-1 overflow-auto dark:bg-slate-600">
      <div className="flex items-center gap-2">
        {isFocus && (
          <ArrowLeft
            className="cursor-pointer"
            onClick={() => setIsFocus(false)}
          />
        )}
        <Input
          value={textSearch}
          onChange={(e) => setTextSearch(e.target.value)}
          placeholder="Tìm kiếm...."
          onFocus={onFocus}
        />
      </div>

      {isFocus ? (
        isPending ? (
          <div className="flex justify-center items-center h-32">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col gap-1 mt-2">
            {dataSearch && dataSearch.length > 0 ? (
              <>
                {(dataSearch || [])?.map((user, idx) => (
                  <div
                    key={idx}
                    className={
                      "flex items-center p-2 justify-between hover:bg-slate-100 cursor-pointer rounded-md hover:dark:bg-slate-400"
                    }
                    onClick={() => handleCreate(user?.id)}
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src={user?.avatar || "/logo.svg"}
                        height={30}
                        width={30}
                        className="rounded-full"
                        alt="avatar"
                      />
                      <p className="text-base">{user?.fullname}</p>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="flex justify-center items-center h-32">
                <p>Không tìm thấy người dùng</p>
              </div>
            )}
          </div>
        )
      ) : (
        <div className="flex flex-col gap-1 mt-2">
          <ChatUser name="Thai Hong Ngan" message="Ok" time="7:00 AM" />
          <ChatUser name="Thai Hong Ngan" message="Ok" time="7:00 AM" />
          <ChatUser name="Thai Hong Ngan" message="Ok" time="7:00 AM" />
          <ChatUser name="Thai Hong Ngan" message="Ok" time="7:00 AM" active />
          <ChatUser name="Thai Hong Ngan" message="Ok" time="7:00 AM" />
        </div>
      )}
    </div>
  )
}

export default Sidebar
