import { useMutation, useQuery } from "@tanstack/react-query";
import { TypeQuery } from "./enum";
import {
	createBoardApi,
	createWorkItemApi,
	createWorkListApi,
	getDocumentsApi,
	getListBoardApi,
	getWorkListApi,
	updateBoardApi,
	updateCardApi
} from "@/apis";

export const useDetailDocumentQuery = (id: string) =>
	useQuery({
		queryKey: [TypeQuery.DetailDocument, id],
		queryFn: () => getDocumentsApi(id),
		refetchOnMount: !!id
	});

export const useWorkSpaceColQuery = (id: string) =>
	useQuery({
		queryKey: [TypeQuery.WorkSpaceCol],
		queryFn: () => getWorkListApi(id)
	});

export const useCreateWorkItemMutation = () =>
	useMutation({
		mutationKey: [TypeQuery.CreateWorkItem],
		mutationFn: createWorkItemApi
	});

export const useListBoardQuery = () =>
	useQuery({
		queryKey: [TypeQuery.ListBoard],
		queryFn: getListBoardApi
	});

export const useCreateBoardMutation = () =>
	useMutation({
		mutationKey: [TypeQuery.CreateBoard],
		mutationFn: createBoardApi
	});

export const useCreateListMutation = () =>
	useMutation({
		mutationKey: [TypeQuery.CreateList],
		mutationFn: createWorkListApi
	});

export const useUpdateBoardMutation = () =>
	useMutation({
		mutationKey: [TypeQuery.UpdateBoard],
		mutationFn: updateBoardApi
	});

export const useUpdateCarddMutation = () =>
	useMutation({
		mutationKey: [TypeQuery.UpdateCard],
		mutationFn: updateCardApi
	});
