export type UserInfoType = {
  id: string
  email: string
  fullname: string
  avatar: string
  phone: string
  address: string
  typeLogin: string
  createdAt: Date
  updatedAt: Date
}

export type UserUpdateInfoType = {
  avatar?: string
  fullname?: string
  phone?: string
  address?: string
}

export type ListGroupType = {
  id: string
  name: string | null
  membersId: UserInfoType
  type: string
  createdAt: Date
  updatedAt: Date
}
