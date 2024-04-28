import { DateValue } from "react-aria"

import { UserID } from "./documents"

export type WorkSpaceType = {
  id: string
  title: string
  content: string
  avatar: string
  order: number
  date: Date
  tags: string[]
  workListId: string
  createdAt: Date
  updatedAt: Date
}
export type WorkSpaceListType = {
  id: string
  title: string
  userId: string
  order: number
  cards: WorkSpaceType[]
  updatedAt: Date
  createdAt: Date
}

export type WorkListResponse = {
  board: BoardsTypes
  list: WorkSpaceListType[]
}

export type CreateWorkItemType = {
  title: string
  content: string
  workListId: string
  date: any
  tags?: string[]
  avatar?: string
}

export type DataListType = Pick<WorkSpaceListType, "id" | "title">
export type BoardsTypes = {
  id: string
  title: string
  imageThumb: string
  userId: string
  createdAt: string
  updatedAt: string
}

export type CreateBoardType = {
  title: string
  imageThumb: string
}

export type ResponseCreateBoardType = {
  id: string
  title: string
  userId: string
  imageThumb?: string
  createdAt: Date
  updatedAt: Date
}
export type CreateListType = {
  title: string
  boardId: string
}

export type ResponseCreateListType = Omit<
  ResponseCreateBoardType,
  "imageThumb"
> & {
  order: number | null
}

export type UpdateListType = {
  id: string
  title: string
  order: number
  userId: string
  cards: WorkSpaceType[]
  boardId?: string
  createdAt: Date
  updatedAt: Date
}

export type UpdateCardType = {
  id: string
  title: string
  content: string
  order: number
  avatar: string
  date: Date
  tags: string[]
  workListId: string
  createdAt: Date
  updatedAt: Date
}

export type UpdateCardInfoType = {
  id: string
  title: string
  content: string
  avatar?: string
  date?: DateValue | Date
  tags: string[]
}

export type DataWorkSpaceType = {
  id: string
  title: string
  userId: UserID
  imageThumb: string
  createdAt: Date
}
