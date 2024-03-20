"use client";
import { createContext, useEffect, useState } from "react";
import React from "react";

import {
	useCreateListMutation,
	useDeleteCardMutation,
	useDeleteListMutation,
	useUpdateBoardMutation,
	useUpdateCarddMutation,
	useWorkSpaceColQuery
} from "../../_query";
import {
	CreateListType,
	DataListType,
	UpdateCardType,
	UpdateListType,
	WorkListResponse,
	WorkSpaceType
} from "@/types";
import { useParams } from "next/navigation";
import { toast } from "sonner";

type WorkSpaceContextType = {
	workList: WorkListResponse;
	openCreateItem: boolean;
	dataList: DataListType;
	dataCard: WorkSpaceType;
	onToggleCreateItem: () => void;
	handleSetDataList: (data: DataListType) => void;
	refetchList: () => void;
	handleCreateWorkList: (data: CreateListType) => void;
	handleUpdateBoard: (data: UpdateListType[]) => void;
	handleUpdateCard: (data: UpdateCardType[]) => void;
	handleDeleteList: (id: string) => void;
	handleDeleteCard: (id: string) => void;
	handleSetDataCard: (data: WorkSpaceType) => void;
};

export const WorkSpaceContext = createContext<Partial<WorkSpaceContextType>>(
	{}
);

const WorkSpaceContextProvider = ({
	children
}: {
	children: React.ReactNode;
}) => {
	const params = useParams();

	const [openCreateItem, setOpenCreateItem] = useState<boolean>(false);
	const [dataList, setDataList] = useState<DataListType>();
	const [dataCard, setDataCard] = useState<WorkSpaceType>();

	const { data: workList, refetch: refetchList } = useWorkSpaceColQuery(
		params?.workspaceId as string
	);

	const { mutateAsync: mutateCreateList } = useCreateListMutation();
	const { mutateAsync: mutateUpdateBoard } = useUpdateBoardMutation();
	const { mutateAsync: mutateUpdateCard } = useUpdateCarddMutation();
	const { mutateAsync: mutateDeleteList } = useDeleteListMutation();
	const { mutateAsync: mutateDeleteCard } = useDeleteCardMutation();

	const onToggleCreateItem = () => setOpenCreateItem(!openCreateItem);

	const handleSetDataList = (data: DataListType) => setDataList(data);

	const handleSetDataCard = (data: WorkSpaceType) => setDataCard(data);

	const handleCreateWorkList = async (data: CreateListType) => {
		const promise = mutateCreateList(data);
		return toast.promise(promise, {
			loading: "Đang tạo danh sách",
			success: () => {
				refetchList?.();
				return "Tạo danh sách thành công";
			}
		});
	};

	const handleUpdateBoard = (data: UpdateListType[]) => mutateUpdateBoard(data);

	const handleUpdateCard = (data: UpdateCardType[]) => mutateUpdateCard(data);

	const handleDeleteList = (id: string) => {
		const promise = mutateDeleteList(id);
		return toast.promise(promise, {
			loading: "Đang xoá danh sách",
			success: () => {
				refetchList?.();
				return "Xoá danh sách thành công";
			}
		});
	};

	const handleDeleteCard = (id: string) => {
		const promise = mutateDeleteCard(id);
		return toast.promise(promise, {
			loading: "Đang xoá thẻ",
			success: () => {
				refetchList?.();
				return "Xoá thẻ thành công";
			}
		});
	};

	useEffect(() => {
		if (!openCreateItem) {
			setDataCard(undefined);
		}
	}, [openCreateItem]);

	return (
		<WorkSpaceContext.Provider
			value={{
				workList,
				openCreateItem,
				dataList,
				dataCard,
				onToggleCreateItem,
				handleSetDataList,
				refetchList,
				handleCreateWorkList,
				handleUpdateBoard,
				handleUpdateCard,
				handleDeleteList,
				handleDeleteCard,
				handleSetDataCard
			}}>
			{children}
		</WorkSpaceContext.Provider>
	);
};

export default WorkSpaceContextProvider;
