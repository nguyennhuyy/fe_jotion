"use client";
import { Archive, Clock4, FilePen, Trash } from "lucide-react";
import React, { useContext } from "react";
import { Draggable } from "@hello-pangea/dnd";
import dayjs from "dayjs";

import { WorkSpaceType } from "@/types";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger
} from "@/components/ui";
import { cn } from "@/lib";
import { WorkSpaceContext } from ".";

type WorkSpaceItemType = {
	card: WorkSpaceType;
	index: number;
};
const WorkSpaceItem = ({ card, index }: WorkSpaceItemType) => {
	const { handleDeleteCard, onToggleCreateItem, handleSetDataCard } =
		useContext(WorkSpaceContext);

	const onOpenUpdate = () => {
		onToggleCreateItem?.();
		handleSetDataCard?.(card);
	};

	return (
		<Draggable draggableId={card?.id} index={index}>
			{(provided, snapshot) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					className={cn(
						"group bg-white shadow-[rgba(9,30,66,0.11)_0_1px_1px_0_,_rgba(9,30,66,0.1)_0_0_1px_0] scroll-m-2 cursor-pointer mb-2 mx-2 rounded-lg hover:ring-2 ring-blue-300 dark:text-black",
						snapshot.isDragging && ""
					)}>
					<ContextMenu>
						<ContextMenuTrigger>
							<div className='flow-root relative pt-2 px-3 pb-1 min-h-9 z-10'>
								<div className='mb-1 flex justify-between items-center '>
									<span className='text-sm text-[#172b4d] line-clamp-1'>
										{card?.title}
									</span>
									{/* <div className='hidden group-hover:block rounded-full hover:bg-slate-200 p-1.5 absolute top-[2px] right-[2px] z-10'>
										<Pencil className='w-3 h-3' />
									</div> */}
								</div>
								{card?.content}

								{card?.tags.length > 0 && (
									<div className='flex gap-1.5 mt-1 flex-wrap'>
										{card?.date && (
											<div className='flex gap-1.5 mt-1 bg-[#ffd2cc] text-center rounded w-max p-1 text-xs text-[#ae2a19]'>
												<Clock4 className='w-4 h-4 text-[#ae2a19]' />
												{dayjs(card?.date).format("DD/MM")}
											</div>
										)}
										{card.tags?.map((tag, idx) => (
											<div
												key={idx}
												className='flex gap-1.5 mt-1 bg-[#1f845a] text-center rounded w-max p-1 text-xs text-white font-medium px-2'>
												{tag}
											</div>
										))}
									</div>
								)}
							</div>
						</ContextMenuTrigger>
						<ContextMenuContent className='w-64'>
							<ContextMenuItem
								inset
								className='gap-1.5 pl-3'
								onClick={onOpenUpdate}>
								<FilePen className='w-4 h-4' />
								Chỉnh sửa
							</ContextMenuItem>
							{/* <ContextMenuItem inset className='gap-1.5 pl-3'>
								<Archive className='w-4 h-4' />
								Lưu trữ
							</ContextMenuItem> */}
							<ContextMenuItem
								inset
								className='gap-1.5 pl-3'
								onClick={() => handleDeleteCard?.(card.id)}>
								<Trash className='w-4 h-4' />
								Xoá
							</ContextMenuItem>
						</ContextMenuContent>
					</ContextMenu>
				</div>
			)}
		</Draggable>
	);
};

export default WorkSpaceItem;
