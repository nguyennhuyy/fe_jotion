import { DataWorkSpaceType, DocumentAdminType } from "@/types"

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

export const getAllDocsAdminApi = async (): Promise<DocumentAdminType[]> => {
  const data = await apiAdmin.get<DocumentAdminType[]>("/admin/docs/list")
  return data.data
}

export const deleteDocsAdminAPi = async (
  id: string
): Promise<DocumentAdminType[]> => {
  const data = await apiAdmin.delete<DocumentAdminType[]>(
    `/admin/docs/delete/${id}`
  )
  return data.data
}

export const getAllWorkAdminApi = async (): Promise<DataWorkSpaceType[]> => {
  const data = await apiAdmin.get<DataWorkSpaceType[]>("/admin/workspace/list")
  return data.data
}

export const deleteWorksAdminAPi = async (
  id: string
): Promise<DocumentAdminType[]> => {
  const data = await apiAdmin.delete<DocumentAdminType[]>(
    `/admin/workspace/delete/${id}`
  )
  return data.data
}
