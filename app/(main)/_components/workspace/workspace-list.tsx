"use client";
import React, { useContext, useState } from "react";
import { Droppable } from "react-beautiful-dnd";

import { cn } from "@/lib";
import { WorkSpaceContext, WorkSpaceItem } from ".";
import { WorkSpaceType } from "@/types";

const initial = Array.from({ length: 10 }, (v, k) => k).map(k => {
	const custom = {
		id: `id-${k}`,
		content: `Quote ${k}`
	};

	return custom;
});

type WorkSpaceListType = {
	work: WorkSpaceType[];
	id?: string;
};
const WorkSpaceList = ({ id, work }: WorkSpaceListType) => {
	return (
		<Droppable droppableId='LIST' type='QUOTE'>
			{provided => (
				<ol className={cn("overflow-auto pt-1")}>
					{provided.placeholder}
					{work.map((item, index) => (
						<WorkSpaceItem key={item.id} work={item} index={index} />
					))}
				</ol>
			)}
		</Droppable>
	);
};

export default WorkSpaceList;
