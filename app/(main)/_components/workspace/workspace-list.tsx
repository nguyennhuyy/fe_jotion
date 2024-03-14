"use client";
import React from "react";
import { Droppable } from "@hello-pangea/dnd";

import { cn } from "@/lib";
import { WorkSpaceItem } from ".";
import { WorkSpaceType } from "@/types";

type WorkSpaceListType = {
	work: WorkSpaceType[];
	id: string;
};
const WorkSpaceList = ({ id, work }: WorkSpaceListType) => {
	return (
		<Droppable droppableId={id} type='card'>
			{provided => (
				<ol
					className={cn("overflow-auto pt-1")}
					ref={provided.innerRef}
					{...provided.droppableProps}>
					{work.map((item, index) => (
						<div key={item.id}>
							<WorkSpaceItem work={item} index={index} />
						</div>
					))}
					{provided.placeholder}
				</ol>
			)}
		</Droppable>
	);
};

export default WorkSpaceList;
