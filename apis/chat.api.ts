import { api } from "@/lib"
import {
  CreateGroupChatType,
  DetailGroupType,
  ListGroupType,
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

export const listGroupApi = async (): Promise<ListGroupType[]> => {
  const data = await api.get<ListGroupType[]>(`/chat/group/list`)
  return data.data
}

export const detailGroupApi = async (id?: string): Promise<DetailGroupType> => {
  const data = await api.get<DetailGroupType>(`/chat/group/${id}`)
  return data.data
}
