"use client"

import { useEffect, useMemo } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import { useCookie } from "@/hooks"
import { KeyCookie } from "@/lib"
import { userStore } from "@/store"
import { CommentType } from "@/types"
import { useForm } from "react-hook-form"

import { Cover } from "@/components/cover"
import { Spinner } from "@/components/spinner"
import Toolbar from "@/components/toolbar"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Textarea,
} from "@/components/ui"
import { Skeleton } from "@/components/ui/skeleton"

import {
  useCommentDocumentMutation,
  useGetPublicDocsQuery,
} from "./_query/operation"

interface DocumentIdPageProps {
  params: {
    documentId: string
  }
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    []
  )

  const { getItemCookie } = useCookie()

  const { data: document, refetch } = useGetPublicDocsQuery(params.documentId)
  const { mutateAsync: mutateComment, isPending: isPendingComment } =
    useCommentDocumentMutation()

  const onChange = (content: string) => {}

  const { register, handleSubmit, reset } = useForm<CommentType>({
    defaultValues: {
      userId: getItemCookie(KeyCookie.UserID) || "",
      documentId: params?.documentId,
      content: "",
    },
  })
  const handleComment = async (data: CommentType) => {
    await mutateComment({
      content: data?.content,
      userId: getItemCookie(KeyCookie.UserID) || "",
      documentId: params?.documentId,
    })
    refetch()
    reset({
      content: "",
    })
  }

  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    )
  }

  if (document === null) {
    return (
      <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">
        <Image
          src="/documents.png"
          fill
          className="object-contain dark:hidden"
          alt="Documents"
        />
      </div>
    )
  }

  if (!document?.isPublished) {
    return (
      <div className="flex justify-center items-center flex-col h-full">
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">
          <Image
            src="/documents.png"
            fill
            className="object-contain dark:hidden"
            alt="Documents"
          />
        </div>
        <p className="text-lg font-medium">Website chưa được công khai.</p>
      </div>
    )
  }

  return (
    <div className="pb-40">
      <Cover preview url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar preview initialData={document} />
        <Editor
          editable={false}
          onChange={onChange}
          initialContent={document.content}
        />

        <div className="mt-20 border-t py-6 flex flex-col gap-4">
          <h3 className="font-semibold mb-2">Bình luận bài viết</h3>

          {document?.comments?.map((attr) => (
            <div key={attr?.id} className="flex gap-2">
              <Avatar>
                <AvatarImage
                  src={attr?.userId?.avatar || "/logo.svg"}
                  width={32}
                  height={32}
                  alt="avatar"
                />
                <AvatarFallback>J</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-base font-semibold">
                  {attr?.userId?.fullname || "Người lạ"}
                </p>
                <p className="text-sm font-normal">{attr?.content}</p>
              </div>
            </div>
          ))}
        </div>

        <form className="w-full" onSubmit={handleSubmit(handleComment)}>
          <div className="mt-20 border-t py-6 flex flex-col">
            <h3 className="font-semibold mb-2">Bình luận</h3>
            <Textarea
              {...register("content")}
              placeholder="Góp ý về bài viết"
            />
            <Button
              className="mt-4 ml-auto"
              onClick={handleSubmit(handleComment)}
            >
              {isPendingComment ? <Spinner /> : "Gửi"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DocumentIdPage
