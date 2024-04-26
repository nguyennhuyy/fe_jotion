import React, { useContext } from "react"

import { Login, SignUp, Social } from "."
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui"
import { AuthContext } from "./context"
import ForgotPassword from "./forgot-password"

type DialogAuthType = React.HTMLAttributes<HTMLDivElement> & {
  mode?: "Login" | "SignUp"
}
const DialogAuth = ({ mode = "Login", ...props }: DialogAuthType) => {
  const { AUTH, toggleAuth, openDialog, handleOpenDialog } =
    useContext(AuthContext)

  return (
    <Dialog open={openDialog} onOpenChange={handleOpenDialog} {...props}>
      {mode === "Login" ? (
        <Button variant="ghost" onClick={handleOpenDialog}>
          Đăng nhập
        </Button>
      ) : (
        <Button size="sm" onClick={handleOpenDialog}>
          Đăng ký miễn phí
        </Button>
      )}
      <DialogContent className="px-8 pt-[38px] pb-12">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-black">
            {toggleAuth === AUTH?.LOGIN && "Đăng nhập"}
            {toggleAuth === AUTH?.SIGNUP && "Đăng ký"}
            {toggleAuth === AUTH?.FORGOT && "Quên mật khẩu"}
            <p className="text-base text-black/60 font-normal mt-1">
              để tiếp tục với ứng dụng Jotion
            </p>
          </DialogTitle>
          <Social />

          {toggleAuth === AUTH?.LOGIN && <Login />}
          {toggleAuth === AUTH?.SIGNUP && <SignUp />}
          {toggleAuth === AUTH?.FORGOT && <ForgotPassword />}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default DialogAuth
