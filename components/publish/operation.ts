import { getPublicDocumentsApi, updatePublishApi } from "@/apis";
import { useMutation, useQuery } from "@tanstack/react-query";
import { TypeQuery } from "./enum";

export const useUpdatePublishMutation = () =>
	useMutation({
		mutationKey: [TypeQuery.UpdatePublish],
		mutationFn: updatePublishApi
	});

export const useGetPublicDocsQuery = (id: string) =>
	useQuery({
		queryKey: [TypeQuery.PublicDocs, id],
		queryFn: () => getPublicDocumentsApi(id)
	});
