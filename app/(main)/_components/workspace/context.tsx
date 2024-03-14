"use client";
import { createContext, useState } from "react";
import React from "react";

import { useWorkSpaceColQuery } from "../../_query";
import { CreateWorkItemType, DataColType, WorkSpaceColType } from "@/types";

type WorkSpaceType = {
	workSpaceCol: WorkSpaceColType[];
	openCreateItem: boolean;
	dataCol: DataColType;
	onToggleCreateItem: () => void;
	handleSetDataCol: (data: DataColType) => void;
	refetchCol: () => void;
};

export const WorkSpaceContext = createContext<Partial<WorkSpaceType>>({});

const WorkSpaceContextProvider = ({
	children
}: {
	children: React.ReactNode;
}) => {
	const [openCreateItem, setOpenCreateItem] = useState<boolean>(false);
	const [dataCol, setDataCol] = useState<DataColType>();

	const { data: workSpaceCol, refetch: refetchCol } = useWorkSpaceColQuery();

	const onToggleCreateItem = () => setOpenCreateItem(!openCreateItem);
	const handleSetDataCol = (data: DataColType) => setDataCol(data);
	return (
		<WorkSpaceContext.Provider
			value={{
				workSpaceCol,
				openCreateItem,
				dataCol,
				onToggleCreateItem,
				handleSetDataCol,
				refetchCol
			}}>
			{children}
		</WorkSpaceContext.Provider>
	);
};

export default WorkSpaceContextProvider;
