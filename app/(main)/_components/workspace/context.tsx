"use client";
import { createContext, useState } from "react";
import React from "react";

import { useCreateWorkItemMutation, useWorkSpaceColQuery } from "../../_query";
import { CreateWorkItemType, DataColType, WorkSpaceColType } from "@/types";

type WorkSpaceType = {
	workSpaceCol: WorkSpaceColType[];
	openCreateItem: boolean;
	dataCol: DataColType;
	handleCreateWorkItem: (body: CreateWorkItemType) => void;
	onToggleCreateItem: () => void;
	handleSetDataCol: (data: DataColType) => void;
};

export const WorkSpaceContext = createContext<Partial<WorkSpaceType>>({});

const WorkSpaceContextProvider = ({
	children
}: {
	children: React.ReactNode;
}) => {
	const [openCreateItem, setOpenCreateItem] = useState<boolean>(false);
	const [dataCol, setDataCol] = useState<DataColType>();

	const { data: workSpaceCol } = useWorkSpaceColQuery();
	const { mutateAsync: mutateCreateWorkItem } = useCreateWorkItemMutation();

	const handleCreateWorkItem = async (body: CreateWorkItemType) => {
		const response = mutateCreateWorkItem(body);
	};

	const onToggleCreateItem = () => setOpenCreateItem(!openCreateItem);
	const handleSetDataCol = (data: DataColType) => setDataCol(data);
	return (
		<WorkSpaceContext.Provider
			value={{
				workSpaceCol,
				openCreateItem,
				dataCol,
				handleCreateWorkItem,
				onToggleCreateItem,
				handleSetDataCol
			}}>
			{children}
		</WorkSpaceContext.Provider>
	);
};

export default WorkSpaceContextProvider;
