import React, { useContext } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useCookie } from "@/hooks"
import { KeyCookie } from "@/lib"
import { useGoogleLogin } from "@react-oauth/google"
import { toast } from "sonner"

import { useLoginGoogleMutation } from "."
import { Button } from "../ui"
import { AuthContext } from "./context"

const Social = () => {
  const router = useRouter()
  const { handleOpenDialog } = useContext(AuthContext)

  const { setItemCookie } = useCookie()

  const { mutateAsync: loginGoogle } = useLoginGoogleMutation()

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      loginGoogle({ accessToken: tokenResponse.access_token }).then(
        (response) => {
          setItemCookie(KeyCookie.Token, response?.accessToken)
          toast.success("Đăng nhập thành công")
          handleOpenDialog?.()
          location.href = "/documents"
        }
      )
    },
  })

  return (
    <div className="flex flex-col gap-2 !mt-8">
      <Button
        onClick={() => login()}
        variant="outline"
        className="py-4 gap-2 justify-start"
      >
        <Image width={25} height={25} src="/google.svg" alt="google" />
        <span>Đăng nhập với Google</span>
      </Button>
      <Button variant="outline" className="py-4 gap-2 justify-start">
        <Image width={25} height={25} src="/facebook.svg" alt="google" />
        <span>Đăng nhập với Facebook </span>
      </Button>
    </div>
  )
}

export default Social
