import { api } from "@/lib"
import {
  CreateGroupChatType,
  ResponseGroupChatType,
  UserInfoType,
} from "@/types"

export const searchChatApi = async (q?: string): Promise<UserInfoType[]> => {
  const data = await api.get<UserInfoType[]>(`/chat/search?q${q}`)
  return data.data
}

export const createGroupChatApi = async (
  body?: CreateGroupChatType
): Promise<ResponseGroupChatType> => {
  const data = await api.post<ResponseGroupChatType>(`/chat/create-group`, body)
  return data.data
}
