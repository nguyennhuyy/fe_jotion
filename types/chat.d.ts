export interface CreateGroupChatType {
  name?: string
  type: string
  membersId: string[]
}

export interface ResponseGroupChatType {
  id: string
  name: string
  userId: string
  createdAt: Date
  updatedAt: Date
}

export interface DetailGroupType {
  id: string
  avatar: null
  email: string
  address: null
  fullname: string
  phone: null
  createdAt: Date
  updatedAt: Date
  messages: MessageType[]
}

export type MessageType = {
  id: string
  status: string
  type: string
  message: string
  conversationId: string
  senderId: string
  createdAt: Date
  updatedAt: Date
}
