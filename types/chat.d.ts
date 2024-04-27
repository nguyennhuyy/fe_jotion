export interface CreateGroupChatType {
  name?: string
  userId: string
}

export interface ResponseGroupChatType {
  id: string
  name: string
  userId: string
  createdAt: Date
  updatedAt: Date
}
