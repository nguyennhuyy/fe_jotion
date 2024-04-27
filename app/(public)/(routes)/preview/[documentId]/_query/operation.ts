import { commentDocumentApi, getPublicDocumentsApi } from "@/apis"
import { useMutation, useQuery } from "@tanstack/react-query"

import { TypeQuery } from "./enum"

export const useGetPublicDocsQuery = (id: string) =>
  useQuery({
    queryKey: [TypeQuery.PublicDocs, id],
    queryFn: () => getPublicDocumentsApi(id),
  })

export const useCommentDocumentMutation = () =>
  useMutation({
    mutationKey: [TypeQuery.Comment],
    mutationFn: commentDocumentApi,
  })
