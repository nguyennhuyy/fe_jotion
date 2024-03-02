import { api } from "@/lib";
import { DocumentItem, UpdateCoverType } from "@/types";

export const getDocumentsApi = async (id: string): Promise<DocumentItem> => {
	const data = await api.get<DocumentItem>(`/documents/${id}`);
	return data.data;
};

export const removeCoverImageApi = async (
	id: string
): Promise<DocumentItem> => {
	const data = await api.patch<DocumentItem>(`/documents/${id}`);
	return data.data;
};

export const updateCoverImageApi = async (
	body: UpdateCoverType
): Promise<DocumentItem> => {
	const data = await api.put<DocumentItem>(`/documents/update-cover`, body);
	return data.data;
};
