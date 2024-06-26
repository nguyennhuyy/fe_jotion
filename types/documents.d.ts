import { UserInfoType } from "./user"

export type DocumentItem = {
  id: string
  title: string
  userId: string
  isArchived: boolean
  isPublished: boolean
  content: string
  coverImage: string
  icon: string
  parentDocument: string
  createdAt: Date
  updatedAt: Date
  comments: Comments[]
}

type Comments = {
  id: string
  userId: UserInfoType
  documentId: string
  content: string
  createdAt: Date
  updatedAt: Date
}
export type UpdateCoverType = {
  id?: string
  coverImage: string
}

export type UpdatePublishType = {
  id: string
  isPublished: boolean
}

export interface CommentType {
  userId?: string
  documentId: string
  content: string
}

export interface DocumentAdminType {
  id: string
  content: string
  coverImage: string
  createdAt: Date
  icon: null
  isArchived: boolean
  isPublished: boolean
  title: string
  updatedAt: Date
  userId: UserID
}

export interface UserID {
  id: string
  address: string
  createdAt: Date
  email: string
  avatar: null
  fullname: string
  phone: string
  userId: null
  typeLogin: string
  updatedAt: Date
}
