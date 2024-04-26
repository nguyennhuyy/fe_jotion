"use client"

import React, { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { cn, EventName, socket } from "@/lib"
import { documentStore, userStore } from "@/store"
import { DocumentItem } from "@/types"
import { FileIcon } from "lucide-react"
import { toast } from "sonner"

import { Item } from "."

const DocumentList = () => {
  const params = useParams()
  const router = useRouter()
  const { user } = userStore()

  const { documents, setDocuments, updateIcon, updateTitle, updateDelete } =
    documentStore()

  const onRedirect = (documentId: string) =>
    router.replace(`/documents/${documentId}`)

  const onDelete = (id: string) => {
    socket.emit(EventName.DeleteDocument, {
      userId: user?.id,
      id: id,
    })
  }

  useEffect(() => {
    socket.emit(EventName.GetDocument, {
      userId: user?.id,
    })

    socket.on(EventName.GetDocument, (data: any) => {
      setDocuments(data)
    })

    socket.on(EventName.UpdateTitleDocument, (data: DocumentItem) => {
      updateTitle(data)
    })

    socket.on(EventName.UpdateIconDocument, (data: DocumentItem) => {
      updateIcon(data)
    })

    return () => {
      socket.off(EventName.GetDocument)
      socket.off(EventName.CreateDocument)
    }
  }, [])

  useEffect(() => {
    socket.on(EventName.DeleteDocument, (data: DocumentItem) => {
      toast.success("Xoá tài liệu thành công")
      if (params?.documentId === data.id) {
        router.push("/documents")
      }
      updateDelete(data)
    })
    return () => {
      socket.off(EventName.DeleteDocument)
    }
  }, [params])

  return (
    <>
      <p
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80 pl-[25px]"
        )}
      >
        No pages inside
      </p>
      {documents?.map((document: DocumentItem, idx: number) => (
        <Item
          key={document?.id + idx}
          id={document.id}
          onClick={() => onRedirect(document.id)}
          onDelete={() => onDelete(document.id)}
          label={document.title}
          icon={document.icon || FileIcon}
          documentIcon={document.icon}
          active={params?.documentId === document.id}
        />
      ))}
    </>
  )
}

export default DocumentList
