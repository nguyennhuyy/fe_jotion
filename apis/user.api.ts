import { api } from "@/lib"
import { UserInfoType, UserUpdateInfoType } from "@/types"

export const userInfoApi = async (): Promise<UserInfoType> => {
  const data = await api.get<UserInfoType>("/users/info")
  return data.data
}

export const userUpdateInfoApi = async (
  body: UserUpdateInfoType
): Promise<UserUpdateInfoType> => {
  const data = await api.post<UserUpdateInfoType>("/users/update", body)
  return data.data
}
