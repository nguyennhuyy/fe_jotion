"use client";
import { MoreHorizontal, Plus } from "lucide-react";
import React, { useContext } from "react";

import { cn } from "@/lib";
import { Draggable } from "@hello-pangea/dnd";
import { WorkSpaceContext, WorkSpaceList } from ".";
import { WorkSpaceType } from "@/types";

type WorkSpaceColType = React.HTMLAttributes<HTMLLIElement> & {
	id: string;
	title: string;
	children?: React.ReactNode;
	work: WorkSpaceType[];
	index: number;
};

const WorkSpaceColumns = ({
	id,
	className,
	title,
	work,
	children,
	index,
	...props
}: WorkSpaceColType) => {
	const { onToggleCreateItem, handleSetDataCol } = useContext(WorkSpaceContext);

	const onClickAddCard = () => {
		onToggleCreateItem?.();
		handleSetDataCol?.({
			id,
			title
		});
	};
	return (
		<Draggable {...props} draggableId={id} index={index}>
			{provided => (
				<li
					ref={provided.innerRef}
					{...provided.draggableProps}
					className={cn(
						"px-[6px] block whitespace-nowrap self-start h-full flex-shrink-0 "
					)}>
					<div className='w-[272px] max-h-full flex flex-col scroll-m-2 bg-[rgb(241,242,244)] shadow-[rgba(9,30,66,0.11)_0_1px_1px_0_,_rgba(9,30,66,0.1)_0_0_1px_0] rounded-xl justify-between pb-2'>
						<div
							className='flex justify-between items-center pt-2 px-2'
							{...provided.dragHandleProps}>
							<h2 className='relative text-sm text-[rgb(23,43,77)] font-medium'>
								{title}
							</h2>
							<div className='p-2 cursor-pointer'>
								<MoreHorizontal className='w-4 h-4' />
							</div>
						</div>
						<div className='block h-2 mb-1' />
						<ol className={cn("overflow-auto pt-1")}>
							<WorkSpaceList work={work} id={id} />
						</ol>

						<div
							onClick={onClickAddCard}
							className={cn(
								"flex items-center justify-between gap-x-1 py-2 mx-2 rounded-lg ",
								"hover:bg-slate-300/70 cursor-pointer"
							)}>
							<div className='flex items-center'>
								<Plus className='w-4 h-4 mx-3' />
								<span className='text-sm font-medium text-[rgb(68,84,111)]'>
									Thêm mới
								</span>
							</div>
						</div>
					</div>
				</li>
			)}
		</Draggable>
	);
};

export default WorkSpaceColumns;
