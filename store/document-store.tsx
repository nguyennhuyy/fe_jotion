import { DocumentItem, UserInfoType } from "@/types";
import { create } from "zustand";

type CoverImageStore = {
	documents?: DocumentItem[] | DocumentItem | any;
	setDocuments: (documents: DocumentItem | DocumentItem[]) => void;
	updateTitle: (documents: DocumentItem) => void;
	updateIcon: (documents: DocumentItem) => void;
	updateDelete: (documents: DocumentItem) => void;
};

export const documentStore = create<CoverImageStore>(set => ({
	documents: undefined,
	setDocuments: (documents: DocumentItem | DocumentItem[]) =>
		set(state => {
			return {
				documents: state.documents
					? [...(state.documents as any), documents]
					: documents
			};
		}),
	updateTitle: (documents: DocumentItem) =>
		set(state => {
			const newData = (state?.documents as any)?.map((item: any) => {
				if (item.id === documents.id) {
					return { ...item, title: documents.title };
				}
				return item;
			});
			return {
				documents: newData
			};
		}),
	updateIcon: (documents: DocumentItem) =>
		set(state => {
			const newData = (state?.documents as any)?.map((item: any) => {
				if (item.id === documents.id) {
					return { ...item, icon: documents.icon };
				}
				return item;
			});
			return {
				documents: newData
			};
		}),
	updateDelete: (documents: DocumentItem) =>
		set(state => {
			const newData = (state?.documents as any)?.filter(
				(item: any) => item.id !== documents.id
			);
			return {
				documents: newData
			};
		})
}));
