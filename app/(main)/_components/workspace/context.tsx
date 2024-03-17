"use client";
import { createContext, useState } from "react";
import React from "react";

import {
	useCreateListMutation,
	useUpdateBoardMutation,
	useUpdateCarddMutation,
	useWorkSpaceColQuery
} from "../../_query";
import {
	CreateListType,
	DataListType,
	UpdateCardType,
	UpdateListType,
	WorkListResponse
} from "@/types";
import { useParams } from "next/navigation";
import { toast } from "sonner";

type WorkSpaceType = {
	workList: WorkListResponse;
	openCreateItem: boolean;
	dataList: DataListType;
	onToggleCreateItem: () => void;
	handleSetDataList: (data: DataListType) => void;
	refetchList: () => void;
	handleCreateWorkList: (data: CreateListType) => void;
	handleUpdateBoard: (data: UpdateListType[]) => void;
	handleUpdateCard: (data: UpdateCardType[]) => void;
};

export const WorkSpaceContext = createContext<Partial<WorkSpaceType>>({});

const WorkSpaceContextProvider = ({
	children
}: {
	children: React.ReactNode;
}) => {
	const params = useParams();

	const [openCreateItem, setOpenCreateItem] = useState<boolean>(false);
	const [dataList, setDataList] = useState<DataListType>();

	const { data: workList, refetch: refetchList } = useWorkSpaceColQuery(
		params?.workspaceId as string
	);

	const { mutateAsync: mutateCreateList } = useCreateListMutation();
	const { mutateAsync: mutateUpdateBoard } = useUpdateBoardMutation();
	const { mutateAsync: mutateUpdateCard } = useUpdateCarddMutation();

	const onToggleCreateItem = () => setOpenCreateItem(!openCreateItem);
	const handleSetDataList = (data: DataListType) => setDataList(data);

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

	return (
		<WorkSpaceContext.Provider
			value={{
				workList,
				openCreateItem,
				dataList,
				onToggleCreateItem,
				handleSetDataList,
				refetchList,
				handleCreateWorkList,
				handleUpdateBoard,
				handleUpdateCard
			}}>
			{children}
		</WorkSpaceContext.Provider>
	);
};

export default WorkSpaceContextProvider;
