"use client"

import React, { useContext, useEffect, useState } from "react"
import { CreateWorkItemType } from "@/types"
import dayjs from "dayjs"
import { X } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

import { Spinner } from "@/components/spinner"
import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  Input,
  Textarea,
} from "@/components/ui"
import { DateTimePicker } from "@/components/ui/calendar/date-time-picker"

import { WorkSpaceContext } from "."
import {
  useCreateWorkItemMutation,
  useUpdateCardInfoMutation,
} from "../../_query"

const DialogCreateItem = () => {
  const {
    openCreateItem,
    dataList,
    dataCard,
    onToggleCreateItem,
    refetchList,
  } = useContext(WorkSpaceContext)

  const [valueTags, setValueTags] = useState<string>()
  const [tags, setTags] = useState<string[]>([])

  const { mutateAsync: createWorkItem, isPending } = useCreateWorkItemMutation()

  const { mutateAsync: mutateUpdateCarInfo, isPending: isPendingUpdate } =
    useUpdateCardInfoMutation()
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<CreateWorkItemType>({
    defaultValues: {
      date: null,
    },
  })

  const watchDate = watch("date")
  const onSubmit = (data: CreateWorkItemType) =>
    dataCard ? handleUpdateCardInfo(data) : handleCreateCard(data)

  const handleCreateCard = (data: CreateWorkItemType) => {
    const newBody = {
      ...data,
      date: watchDate
        ? dayjs(watchDate?.toString()).format("YYYY-MM-DDTHH:mm:ssZ")
        : null,
      workListId: dataList?.id ?? "",
      tags,
    }

    const promise = createWorkItem(newBody)
    toast.promise(promise, {
      loading: "Đang tạo thẻ...",
      success: () => {
        refetchList?.()
        onToggleCreateItem?.()
        reset(undefined)
        setTags([])
        return "Tạo thẻ thành công"
      },
    })
  }

  const handleUpdateCardInfo = (data: CreateWorkItemType) => {
    const newBody = {
      ...data,
      id: dataCard?.id as string,
      tags,
    }
    const promise = mutateUpdateCarInfo(newBody)
    toast.promise(promise, {
      loading: "Đang cập nhật thẻ...",
      success: () => {
        refetchList?.()
        onToggleCreateItem?.()
        reset(undefined)
        setTags([])
        return "Cập nhật thẻ thành công"
      },
    })
  }
  const handleKeyDownTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!valueTags) return
    if (e.key === "Enter" && e.keyCode === 13) {
      e.preventDefault()
      setTags((prev: any) => (prev ? [...prev, valueTags] : [valueTags]))
      setValueTags("")
    }
  }

  const handleRemoveTag = (idx: number) =>
    setTags(() => tags.filter((_, index) => index !== idx))

  useEffect(() => {
    if (dataCard) {
      reset({
        title: dataCard.title,
        content: dataCard.content,
        date: dataCard.date,
      })
      setTags(dataCard.tags)
    }
  }, [dataCard])

  useEffect(() => {
    if (!openCreateItem) {
      reset({
        title: undefined,
        date: undefined,
      })
    }
    return () => {
      reset(undefined)
      setTags([])
    }
  }, [openCreateItem])

  return (
    <Dialog open={openCreateItem} onOpenChange={onToggleCreateItem}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <h2 className="text-black font-medium text-lg">
            Thêm tiêu đề thẻ cho cột{" "}
            <span className="text-green-800">{dataList?.title}</span>
          </h2>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <Input
            {...register("title", {
              required: "Yêu cầu tiêu đề",
            })}
            error={!!errors?.title?.message}
            placeholder="Tiêu đề thẻ*"
          />
          <Textarea
            {...register("content")}
            className="resize-none h-10"
            cols={1}
            placeholder="Nội dung"
          />
          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <DateTimePicker
                value={field.value}
                onChange={field.onChange}
                granularity={"minute"}
              />
            )}
          />

          <Input
            value={valueTags}
            onChange={(e) => setValueTags(e.target.value)}
            onKeyDown={handleKeyDownTags}
            placeholder="#Hashtag"
          />
          <div className="flex gap-1.5 flex-wrap">
            {tags?.map((tag, idx) => (
              <Badge
                key={idx}
                className="flex items-center justify-between gap-1.5 rounded bg-[#1f845a]"
              >
                {tag}
                <div role="button" onClick={() => handleRemoveTag(idx)}>
                  <X className="w-4 h-4" />
                </div>
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-3 ml-auto">
            <Button onClick={handleSubmit(onSubmit)}>
              {isPending || isPendingUpdate ? (
                <Spinner />
              ) : dataCard ? (
                "Cập nhật thẻ"
              ) : (
                "Thêm thẻ"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onToggleCreateItem}
            >
              Huỷ
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default DialogCreateItem
