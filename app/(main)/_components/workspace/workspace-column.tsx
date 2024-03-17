"use client";
import { MoreHorizontal, Plus, Trash } from "lucide-react";
import React, { useContext, useState } from "react";

import { cn } from "@/lib";
import { Draggable } from "@hello-pangea/dnd";
import { WorkSpaceContext, WorkSpaceList } from ".";
import { WorkSpaceType } from "@/types";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui";

type WorkSpaceListType = React.HTMLAttributes<HTMLLIElement> & {
	id: string;
	title: string;
	children?: React.ReactNode;
	cards: WorkSpaceType[];
	index: number;
};

const WorkSpaceColumns = ({
	id,
	className,
	title,
	cards,
	children,
	index,
	...props
}: WorkSpaceListType) => {
	const { onToggleCreateItem, handleSetDataList, handleDeleteList } =
		useContext(WorkSpaceContext);

	const [openPopoverList, setOpenPopoverList] = useState<boolean>(false);

	const onClickAddCard = () => {
		onToggleCreateItem?.();
		handleSetDataList?.({
			id,
			title
		});
	};

	const handleOpenPopoverList = () => setOpenPopoverList(!openPopoverList);

	const onDeleteList = () => {
		handleDeleteList?.(id);
		handleOpenPopoverList();
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
							<h2 className='relative text-base text-[rgb(23,43,77)] font-semibold'>
								{title}
							</h2>
							<Popover
								open={openPopoverList}
								onOpenChange={handleOpenPopoverList}>
								<PopoverTrigger asChild>
									<div
										className='p-2 cursor-pointer'
										onClick={handleOpenPopoverList}>
										<MoreHorizontal className='w-4 h-4' />
									</div>
								</PopoverTrigger>
								<PopoverContent className='p-2'>
									<div
										className='flex items-center gap-1.5 cursor-pointer hover:bg-slate-100 py-3 px-2 rounded'
										onClick={onDeleteList}>
										<Trash className='w-4 h-4' />
										<span className='text-sm'>Xoá</span>
									</div>
								</PopoverContent>
							</Popover>
						</div>

						<div className='block h-2 mb-1' />
						<WorkSpaceList cards={cards} id={id} />
						<div
							onClick={onClickAddCard}
							onDragOver={e => e.preventDefault()}
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
