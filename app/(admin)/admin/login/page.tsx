import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"

import AuthForm from "./components/auth-form"

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default function AuthenticationPage() {
  return (
    <>
      <div className="md:hidden"></div>
      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Image
              src="/logo.png"
              width={32}
              height={32}
              alt="Authentication"
              className="bg-white mr-2"
            />
            Jotion
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Đây là trang quản trị viên&rdquo;
              </p>
              <footer className="text-sm">Nguyễn Huy</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Đăng nhập trang quản trị
              </h1>
            </div>
            <AuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              Chọn tiếp tục, bạn đã đồng ý điều khoản của chúng tôi.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
