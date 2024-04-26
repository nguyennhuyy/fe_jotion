import React, { useContext } from "react"
import { useRouter } from "next/navigation"
import { ResetPasswordType } from "@/types"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

import { useForgotMutation, useResetPasswordMutation } from "."
import { Spinner } from "../spinner"
import { Button, Input, Label, Validator } from "../ui"
import { AuthContext } from "./context"

const ForgotPassword = () => {
  const router = useRouter()
  const { AUTH, handleToggleAuth } = useContext(AuthContext)

  const { mutateAsync: mutateForgot, isPending: isPendingForgot } =
    useForgotMutation()
  const { mutateAsync: mutateReset, isPending: isPedingReset } =
    useResetPasswordMutation()

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordType>()

  const watchEmail = watch("email")
  const onSubmit: SubmitHandler<ResetPasswordType> = async (
    data: ResetPasswordType
  ) => {
    const promise = mutateReset(data)

    toast.promise(promise, {
      loading: "Đang cập nhật mật khẩu",
      success: () => {
        reset({
          email: "",
          otp: "",
          password: "",
        })
        return "Cập nhật mật khẩu thành công"
      },
    })
    handleToggleAuth?.(AUTH?.LOGIN)
  }

  const handleSendCode = async () => {
    if (!!errors.email?.message) {
      toast.info(errors.email?.message)
    } else {
      const promise = mutateForgot(watchEmail)
      toast.promise(promise, {
        loading: "Đang gửi mã OTP",
        success: "Gửi mã OTP thành công",
      })
    }
  }
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 !mt-8"
      >
        <div className="flex flex-col w-full gap-1.5">
          <Label htmlFor="email">Email</Label>
          <div className="flex items-start gap-2">
            <div className="flex flex-col w-full">
              <Input
                type="email"
                id="email"
                error={errors.email}
                {...register("email", {
                  required: "Yêu cầu email",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email không đúng định dạng",
                  },
                })}
              />
              <Validator className="mt-1.5" error={errors.email}>
                {errors.email?.message}
              </Validator>
            </div>
            <Button onClick={handleSendCode}>
              {isPendingForgot ? <Spinner /> : "Gửi mã"}
            </Button>
          </div>
        </div>
        <div className="flex flex-col w-full gap-1.5">
          <Label htmlFor="otp">Mã OTP</Label>
          <Input
            id="otp"
            type="number"
            error={errors.otp}
            {...register("otp", {
              required: "Yêu cầu mã OTP",
              minLength: {
                value: 6,
                message: "Độ dài tối thiếu 6 kí tự",
              },
            })}
          />
          <Validator className="mt-0" error={errors.otp}>
            {errors.otp?.message}
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
          {isPedingReset ? <Spinner /> : "Cập nhật mật khẩu"}
        </Button>
      </form>
      <div className="flex justify-start items-center gap-1 !mt-8">
        <span className="text-sm font-normal text-black/60 leading-4">
          Đã có tài khoản?
        </span>
        <span
          className="text-sm font-medium leading-4 cursor-pointer hover:underline"
          onClick={() => handleToggleAuth?.(AUTH?.LOGIN)}
        >
          Đăng nhập
        </span>
      </div>
    </>
  )
}

export default ForgotPassword
