import { createContext, ReactNode, useState } from "react"

type Auth = {
  LOGIN: string
  SIGNUP: string
  FORGOT: string
}

type AuthContextType = {
  AUTH?: Auth
  toggleAuth?: string
  openDialog?: boolean
  handleToggleAuth?: (type?: string) => void
  handleOpenDialog?: () => void
}
export const AuthContext = createContext<AuthContextType>({})

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const AUTH = {
    LOGIN: "LOGIN",
    SIGNUP: "SIGNUP",
    FORGOT: "FORGOT",
  }
  const [toggleAuth, setToggleAuth] = useState<string>(AUTH.LOGIN)
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  const handleToggleAuth = (type?: string) => type && setToggleAuth(type)
  const handleOpenDialog = () => setOpenDialog(!openDialog)

  return (
    <AuthContext.Provider
      value={{
        AUTH,
        toggleAuth,
        openDialog,
        handleToggleAuth,
        handleOpenDialog,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
