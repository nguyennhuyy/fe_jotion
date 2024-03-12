import { useMutation, useQuery } from "@tanstack/react-query";
import { TypeQuery } from "./enum";
import { createWorkItemApi, getDocumentsApi, getWorkSpaceColApi } from "@/apis";

export const useDetailDocumentQuery = (id: string) =>
	useQuery({
		queryKey: [TypeQuery.DetailDocument, id],
		queryFn: () => getDocumentsApi(id),
		refetchOnMount: !!id
	});

export const useWorkSpaceColQuery = () =>
	useQuery({
		queryKey: [TypeQuery.WorkSpaceCol],
		queryFn: getWorkSpaceColApi
	});

export const useCreateWorkItemMutation = () =>
	useMutation({
		mutationKey: [TypeQuery.CreateWorkItem],
		mutationFn: createWorkItemApi
	});
