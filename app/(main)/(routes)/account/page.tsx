"use client"

import React, { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { upload } from "@/apis"
import { userStore } from "@/store"
import { CameraIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"

import { Spinner } from "@/components/spinner"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Input,
  Label,
} from "@/components/ui"

import { useUpdateInfoMutation } from "../../_query"

type UserSchema = {
  fullname?: string
  email?: string
  phone?: string
  address?: string
}
const Account = () => {
  const router = useRouter()
  const { user } = userStore()

  const hiddenInputRef = useRef<HTMLInputElement>(null)

  const [selectedImage, setSelectedImage] = useState<string>(user?.avatar || "")

  const { mutateAsync: mutateUpdate, isPending } = useUpdateInfoMutation()
  const { mutateAsync: uploadFile, isPending: isPendingUpload } = useMutation({
    mutationKey: ["UploadFile"],
    mutationFn: upload,
  })

  const { register, handleSubmit, reset } = useForm<UserSchema>({
    defaultValues: {
      fullname: user?.fullname || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
    },
  })

  const onUpload = () => hiddenInputRef?.current?.click()

  const handleUploadedFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0]
    const types = /\.(jpe?g|png|heic)$/i

    if (file && (types.test(file.type) || types.test(file.name))) {
      setSelectedImage(URL.createObjectURL(file as File))
      const promiseFile = await uploadFile(file)

      const updatePromise = mutateUpdate({
        avatar: promiseFile?.url,
      })

      toast.promise(updatePromise, {
        loading: "Đang cập nhật thông tin",
        success: () => {
          return "Cập nhật thông tin thành công"
        },
      })
      router.refresh()
    }
  }

  const onSubmit = (data: UserSchema) => {
    const promise = mutateUpdate(data)
    toast.promise(promise, {
      loading: "Đang cập nhật thông tin",
      success: "Cập nhật thông tin thành công",
    })
  }

  useEffect(() => {
    if (user) {
      reset({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phone: user?.phone || "",
        address: user?.address || "",
      })
    }
  }, [user])

  return (
    <div className="flex flex-col p-6">
      <h1 className="text-xl font-semibold text-black">Cập nhật tài khoản</h1>

      <div className="flex justify-between flex-col lg:flex-row gap-6 mt-10">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative w-max">
            <Avatar className="size-20 mb-6">
              <AvatarImage src={selectedImage || user?.avatar} />
              <AvatarFallback>FN</AvatarFallback>
            </Avatar>
            <div
              className="bg-orange-100 absolute bottom-0 -right-3 cursor-pointer rounded-full p-2"
              onClick={onUpload}
            >
              {isPendingUpload ? <Spinner /> : <CameraIcon />}
            </div>
            <Input
              value=""
              type="file"
              accept="image/*"
              onChange={handleUploadedFile}
              ref={hiddenInputRef}
              className="hidden"
            />
          </div>
          <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col gap-1">
              <Label>
                Họ tên
                <span className="text-red-500">*</span>
              </Label>
              <Input
                {...register("fullname", {
                  required: "Bắt buộc có họ tên",
                })}
                placeholder="Nhập họ và tên của bạn"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label>
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                disabled
                {...register("email", {
                  required: "Bắt buộc có email",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Email phải đúng định dạng",
                  },
                })}
                placeholder="Nhập email của bạn"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label>Số điện thoại</Label>
              <Input
                {...register("phone")}
                placeholder="Cập nhật số điện thoại của bạn"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label>Địa chỉ</Label>
              <Input
                {...register("address")}
                placeholder="Cập nhật địa chỉ của bạn"
              />
            </div>

            <Button onClick={handleSubmit(onSubmit)}>
              {isPending ? <Spinner /> : "Cập nhật thông tin"}
            </Button>
          </div>
        </form>
        <div className="w-full"></div>
      </div>
    </div>
  )
}

export default Account
