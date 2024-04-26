import { api } from "@/lib"
import { UserInfoType } from "@/types"

export const searchChatApi = async (q?: string): Promise<UserInfoType[]> => {
  const data = await api.get<UserInfoType[]>(`/chat/search?q${q}`)
  return data.data
}
