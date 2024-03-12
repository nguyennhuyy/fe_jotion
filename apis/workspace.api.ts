import { api } from "@/lib";
import { CreateWorkItemType, WorkSpaceColType } from "@/types";

export const getWorkSpaceColApi = async (): Promise<WorkSpaceColType[]> => {
	const data = await api.get<WorkSpaceColType[]>(`/workspace`);
	return data.data;
};

export const createWorkItemApi = async (
	body: CreateWorkItemType
): Promise<WorkSpaceColType[]> => {
	const data = await api.post<WorkSpaceColType[]>(
		`/workspace/create-item`,
		body
	);
	return data.data;
};
