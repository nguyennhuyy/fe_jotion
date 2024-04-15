import { api } from "@/lib"
import { DocumentItem, UpdateCoverType, UpdatePublishType } from "@/types"

export const getDocumentsApi = async (id: string): Promise<DocumentItem> => {
  const data = await api.get<DocumentItem>(`/documents/${id}`)
  return data.data
}

export const removeCoverImageApi = async (
  id: string
): Promise<DocumentItem> => {
  const data = await api.patch<DocumentItem>(`/documents/${id}`)
  return data.data
}

export const updateCoverImageApi = async (
  body: UpdateCoverType
): Promise<DocumentItem> => {
  const data = await api.put<DocumentItem>(`/documents/update-cover`, body)
  return data.data
}

export const getPublicDocumentsApi = async (
  id: string
): Promise<DocumentItem> => {
  const data = await api.get<DocumentItem>(`/documents/public/${id}`)
  return data.data
}

export const updatePublishApi = async (
  body: UpdatePublishType
): Promise<DocumentItem> => {
  const data = await api.patch<DocumentItem>(`/documents/public/update`, body)
  return data.data
}

export const writeContentAIApi = async (prompt: string): Promise<string> => {
  const data = await api.post<string>(`/documents/ai-content`, {
    prompt,
  })
  return data.data
}
