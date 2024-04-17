import React, { useContext } from "react"
import { useRouter } from "next/navigation"
import { useCookie } from "@/hooks"
import { KeyCookie } from "@/lib"
import { LoginType } from "@/types"
import Cookies from "js-cookie"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

import { useLoginMutation } from "."
import { Spinner } from "../spinner"
import { Button, Input, Label, Validator } from "../ui"
import { AuthContext } from "./context"

const Login = () => {
  const router = useRouter()

  const { handleToggleAuth, handleOpenDialog } = useContext(AuthContext)
  const { setItemCookie } = useCookie()

  const { mutateAsync: mutateLogin, isPending: isPendingLogin } =
    useLoginMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>()

  const onSubmit: SubmitHandler<LoginType> = async (data: LoginType) => {
    const response = await mutateLogin(data)
    setItemCookie(KeyCookie.Token, response.accessToken)
    toast.success("Đăng nhập thành công")
    handleOpenDialog?.()
    router.push("/documents")
    router.refresh()
  }
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 !mt-8"
      >
        <div className="flex flex-col w-full gap-1.5">
          <Label htmlFor="email">Email</Label>
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
          <Validator className="mt-0" error={errors.email}>
            {errors.email?.message}
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
      <div className="flex justify-start items-center gap-1 !mt-8">
        <span className="text-sm font-normal text-black/60 leading-4">
          Chưa có tài khoản?
        </span>
        <span
          className="text-sm font-medium leading-4 cursor-pointer hover:underline"
          onClick={handleToggleAuth}
        >
          Đăng ký
        </span>
      </div>
    </>
  )
}

export default Login
