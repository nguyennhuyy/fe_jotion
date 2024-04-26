import { api } from "@/lib"
import {
  LoginGoogleType,
  LoginResponse,
  LoginType,
  RegisterType,
  ResetPasswordType,
} from "@/types"

export const loginApi = async (body: LoginType): Promise<LoginResponse> => {
  const data = await api.post("/auth/login", body)
  return data.data
}
export const signUpApi = async (body: RegisterType): Promise<LoginResponse> => {
  const data = await api.post("/auth/register", body)
  return data.data
}

export const loginGoogleApi = async (
  body: LoginGoogleType
): Promise<LoginResponse> => {
  const data = await api.post("/auth/login-google", body)
  return data.data
}

export const forgotApi = async (email: string): Promise<LoginResponse> => {
  const data = await api.post("/auth/forgot-password", {
    email,
  })
  return data.data
}
export const resetPaswordApi = async (
  body: ResetPasswordType
): Promise<LoginResponse> => {
  const data = await api.post("/auth/reset-password", body)
  return data.data
}
