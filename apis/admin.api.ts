import { apiAdmin } from "@/lib/axios-admin"

export const loginAdminApi = async (body: {
  fullname: string
  password: string
}): Promise<any> => {
  const data = await apiAdmin.post("/admin/login", body)
  return data.data
}

export const revenueAdminApi = async (): Promise<any> => {
  const data = await apiAdmin.get("/admin/revenue")
  return data.data
}

export const getAllUserAdminApi = async (): Promise<any> => {
  const data = await apiAdmin.get("/admin/user/list")
  return data.data
}
