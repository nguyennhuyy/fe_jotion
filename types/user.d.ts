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
