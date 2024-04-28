import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios"
import Cookies from "js-cookie"
import { toast } from "sonner"

import { KeyCookie } from "."

export const apiAdmin = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
})

const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const token: string | null = Cookies.get(KeyCookie.TokenAdmin) || null
  config.headers["Authorization"] = `Bearer ${token}`
  return config
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error)
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response
}

const onResponseError = (error: AxiosError | any): Promise<AxiosError> => {
  if (error?.response?.data?.code === 401) {
    Cookies.remove(KeyCookie.TokenAdmin)
    location.href = "/admin/login"
  }
  toast.error(error?.response?.data?.message)
  return Promise.reject(error)
}

apiAdmin.interceptors.request.use(onRequest, onRequestError)
apiAdmin.interceptors.response.use(onResponse, onResponseError)
