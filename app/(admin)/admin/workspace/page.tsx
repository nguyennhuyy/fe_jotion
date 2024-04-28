"use client"

import React, { useState } from "react"
import { cn } from "@/lib"
import dayjs from "dayjs"
import { Trash } from "lucide-react"
import { toast } from "sonner"
import { useMutation, useQuery } from "@tanstack/react-query"

import { deleteWorksAdminAPi, getAllWorkAdminApi } from "@/apis/admin.api"
import { Spinner } from "@/components/spinner"
import { Badge } from "@/components/ui"

const PageWorkSpace = () => {
  const [docId, setDocId] = useState<string>()
  const { data: dataWorks, refetch } = useQuery({
    queryKey: ["AdminWorkSpace"],
    queryFn: getAllWorkAdminApi,
  })

  console.log(">>>>>>>dataWorks", dataWorks)

  const { mutateAsync: mutateDelete, isPending: isPendingDelete } = useMutation(
    {
      mutationKey: ["DeleteWorkSpace"],
      mutationFn: deleteWorksAdminAPi,
    }
  )

  const handleDelete = (id: string) => {
    setDocId(id)
    const promise = mutateDelete(id)
    toast.promise(promise, {
      loading: "Đang xoá tài liệu",
      success: () => {
        refetch()
        return "Xoá tài liệu thành công"
      },
    })
  }

  const viewPreview = (id: string) => {
    const hostname = typeof window !== "undefined" && location.origin
    const linkPreview = `${hostname}/preview/${id}`

    window.open(linkPreview, "_blank")
  }
  return (
    <>
      <h1 className="font-bold text-xl mb-3">Danh sách bảng biểu</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {dataWorks?.map((doc) => (
          <div
            key={doc.id}
            style={{
              backgroundImage: `url(${doc.imageThumb})`,
            }}
            className="flex rounded-lg bg-cyan-900"
          >
            <button
              className={cn(
                "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all w-full backdrop-blur hover:backdrop-blur-0"
              )}
            >
              <div className="flex items-center justify-end w-full">
                {isPendingDelete && docId === doc?.id ? (
                  <Spinner />
                ) : (
                  <Trash
                    className="size-5 text-white"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(doc.id)
                    }}
                  />
                )}
              </div>
              <div className="flex w-full flex-col gap-1">
                <div className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold text-white">{doc?.title}</div>
                  </div>
                  <div className={cn("ml-auto text-xs text-white")}>
                    {doc?.userId?.fullname}
                  </div>
                </div>
                <div className="text-xs font-medium text-white">
                  {doc?.userId?.email}
                </div>
                <div className="text-xs font-medium text-white">
                  {doc?.userId?.phone}
                </div>
              </div>
              <div className="line-clamp-2 text-xs text-white">
                {dayjs(doc.createdAt).format("MM/DD/YYYY HH:mm")}
              </div>
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

export default PageWorkSpace
