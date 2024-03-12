"use client";
import { Pencil } from "lucide-react";
import React from "react";
import { cn } from "@/lib";
import { Draggable } from "react-beautiful-dnd";

type WorkSpaceItemType = {
	work: {
		id: string;
		content: string;
	};
	index: number;
};
const WorkSpaceItem = ({ work, index }: WorkSpaceItemType) => {
	return (
		<Draggable draggableId={work?.id} index={index}>
			{(provided, snapshot) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					className={cn(
						"group bg-white shadow-[rgba(9,30,66,0.11)_0_1px_1px_0_,_rgba(9,30,66,0.1)_0_0_1px_0] scroll-m-2 cursor-pointer mb-2 mx-2 rounded-lg hover:ring-2 ring-blue-300 dark:text-black",
						snapshot.isDragging && ""
					)}>
					<div className='flow-root relative pt-2 px-3 pb-1 min-h-9 z-10 '>
						<div className='mb-1 flex justify-between items-center '>
							<span className='h-2 w-10 rounded bg-blue-500' />
							<div className='hidden group-hover:block rounded-full hover:bg-slate-200 p-1.5 absolute top-[2px] right-[2px] z-10'>
								<Pencil className='w-3 h-3' />
							</div>
						</div>
						{work?.content}
					</div>
				</div>
			)}
		</Draggable>
	);
};

export default WorkSpaceItem;
