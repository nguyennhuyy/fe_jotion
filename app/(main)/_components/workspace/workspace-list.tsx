"use client";
import React from "react";
import { Droppable } from "@hello-pangea/dnd";

import { cn } from "@/lib";
import { WorkSpaceItem } from ".";
import { WorkSpaceType } from "@/types";

type WorkSpaceListType = {
	cards: WorkSpaceType[];
	id: string;
};
const WorkSpaceList = ({ id, cards }: WorkSpaceListType) => {
	return (
		<Droppable droppableId={id} type='card'>
			{provided => (
				<ol
					className={cn("overflow-auto pt-1")}
					ref={provided.innerRef}
					{...provided.droppableProps}>
					{cards.map((item, index) => (
						<div key={item.id}>
							<WorkSpaceItem card={item} index={index} />
						</div>
					))}
					{provided.placeholder}
				</ol>
			)}
		</Droppable>
	);
};

export default WorkSpaceList;
