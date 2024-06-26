import { api } from "@/lib";
import {
	BoardsTypes,
	CreateBoardType,
	CreateListType,
	CreateWorkItemType,
	ResponseCreateBoardType,
	ResponseCreateListType,
	UpdateCardInfoType,
	UpdateCardType,
	UpdateListType,
	WorkListResponse,
	WorkSpaceListType
} from "@/types";

export const getWorkListApi = async (id: string): Promise<WorkListResponse> => {
	const data = await api.get<WorkListResponse>(`/workspace/list/${id}`);
	return data.data;
};

export const createWorkItemApi = async (
	body: CreateWorkItemType
): Promise<WorkSpaceListType[]> => {
	const data = await api.post<WorkSpaceListType[]>(
		`/workspace/create-card`,
		body
	);
	return data.data;
};

export const getListBoardApi = async (): Promise<BoardsTypes[]> => {
	const data = await api.get<BoardsTypes[]>(`/workspace/boards`);
	return data.data;
};

export const createBoardApi = async (
	body: CreateBoardType
): Promise<ResponseCreateBoardType> => {
	const data = await api.post<ResponseCreateBoardType>(
		`/workspace/create-board`,
		body
	);
	return data.data;
};

export const createWorkListApi = async (
	body: CreateListType
): Promise<ResponseCreateListType> => {
	const data = await api.post<ResponseCreateListType>(
		`/workspace/create-list`,
		body
	);
	return data.data;
};

export const updateBoardApi = async (
	body: UpdateListType[]
): Promise<UpdateListType[]> => {
	const data = await api.put<UpdateListType[]>(`/workspace/update-list`, body);
	return data.data;
};

export const updateCardApi = async (
	body: UpdateCardType[]
): Promise<UpdateCardType[]> => {
	const data = await api.put<UpdateCardType[]>(`/workspace/update-card`, body);
	return data.data;
};

export const deleteListApi = async (
	id: string
): Promise<CreateWorkItemType> => {
	const data = await api.delete<CreateWorkItemType>(
		`/workspace/list-delete/${id}`
	);
	return data.data;
};

export const deleteCardApi = async (
	id: string
): Promise<CreateWorkItemType> => {
	const data = await api.delete<CreateWorkItemType>(
		`/workspace/delete-card/${id}`
	);
	return data.data;
};

export const updateCardInfoApi = async (
	body: UpdateCardInfoType
): Promise<CreateWorkItemType> => {
	const data = await api.put<CreateWorkItemType>(
		`/workspace/update-card-info`,
		body
	);
	return data.data;
};
