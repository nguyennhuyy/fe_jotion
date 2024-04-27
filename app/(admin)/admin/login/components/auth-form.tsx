"use client"

import React from "react"
import { useCookie } from "@/hooks"
import { KeyCookie } from "@/lib"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"

import { loginAdminApi } from "@/apis/admin.api"
import { Spinner } from "@/components/spinner"
import { Button, Input, Label, Validator } from "@/components/ui"

type LoginType = {
  fullname: string
  password: string
}
const AuthForm = () => {
  const { mutateAsync: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationKey: ["LoginApi"],
    mutationFn: loginAdminApi,
  })

  const { setItemCookie } = useCookie()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>()

  const onSubmit: SubmitHandler<LoginType> = async (data: LoginType) => {
    const response = await mutateLogin(data)
    setItemCookie(KeyCookie.TokenAdmin, response.accessToken)
    toast.success("Đăng nhập thành công")
    location.href = "/admin/dashboard"
  }

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 !mt-8 min-w-96"
      >
        <div className="flex flex-col w-full gap-1.5">
          <Label htmlFor="fullname">Tên người dùng</Label>
          <Input
            type="fullname"
            id="fullname"
            error={errors.fullname}
            {...register("fullname", {
              required: "Yêu cầu tên người dùng",
            })}
          />
          <Validator className="mt-0" error={errors.fullname}>
            {errors.fullname?.message}
          </Validator>
        </div>
        <div className="flex flex-col w-full gap-1.5">
          <Label htmlFor="password">Mật khẩu</Label>
          <Input
            type="password"
            id="password"
            error={errors.password}
            {...register("password", {
              required: "Yêu cầu mật khẩu",
              minLength: {
                value: 6,
                message: "Độ dài tối thiếu 6 kí tự",
              },
            })}
          />
          <Validator className="mt-0" error={errors.password}>
            {errors.password?.message}
          </Validator>
        </div>
        <Button type="submit" onSubmit={handleSubmit(onSubmit)}>
          {isPendingLogin ? <Spinner /> : "Đăng nhập"}
        </Button>
      </form>
    </div>
  )
}

export default AuthForm
