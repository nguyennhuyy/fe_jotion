"use client";

import React, { useContext, useEffect, useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { WorkSpaceColumns, WorkSpaceContext } from ".";
import { WorkSpaceColType } from "@/types";

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
}

const MainWorkSpace = () => {
	const { workSpaceCol } = useContext(WorkSpaceContext);

	const [orderedData, setOrderedData] = useState<
		WorkSpaceColType[] | undefined
	>(workSpaceCol);

	useEffect(() => {
		setOrderedData(workSpaceCol);
	}, [workSpaceCol]);

	function onDragEnd(result: any) {
		const { destination, source, type } = result;
		if (!result.destination) {
			//nếu không có điểm đích thì bỏ qua
			return;
		}

		if (
			//nếu cùng vị trí thì bỏ qua
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		//người dùng di chuyển cột
		if (type === "column") {
			const items = reorder(
				orderedData as WorkSpaceColType[],
				source.index,
				destination.index
			).map((item, index) => ({ ...item, order: index }));

			setOrderedData(items);
			console.log("items", items);

			// executeUpdateListOrder({ items, boardId });
		}

		//người dùng di chuyển card
		if (type === "card") {
			let newOrderedData = [...(orderedData as WorkSpaceColType[])];

			// Source and destination list
			const sourceList = newOrderedData.find(
				list => list.id === source.droppableId
			);

			const destList = newOrderedData.find(
				list => list.id === destination.droppableId
			);

			if (!sourceList || !destList) {
				return;
			}

			//kiểm tra card đã tồn tại trong list nguồn
			if (!sourceList.work) {
				sourceList.work = [];
			}

			//kiểm tra card đã tồn tại trong list đích
			if (!destList.work) {
				destList.work = [];
			}

			//di chuyển card cùng column
			if (source.droppableId === destination.droppableId) {
				const reorderedCards = reorder(
					sourceList.work,
					source.index,
					destination.index
				);
				reorderedCards.forEach((card, idx) => {
					card.order = idx;
				});
				sourceList.work = reorderedCards;
				setOrderedData(newOrderedData);
			} else {
				//xoá card khỏi danh sách
				const [movedCard] = sourceList.work.splice(source.index, 1);

				//gán id mới cho card đã di duyển
				movedCard.id = destination.droppableId;

				//thêm card vào danh sách đích
				destList.work.splice(destination.index, 0, movedCard);

				sourceList.work.forEach((card, idx) => {
					card.order = idx;
				});

				//cập nhật lại vị trí của card trong danh sách đích
				destList.work.forEach((card, idx) => {
					card.order = idx;
				});

				setOrderedData(newOrderedData);
				// executeUpdateCardOrder({
				// 	boardId: boardId,
				// 	items: destList.cards
				// });
			}
		}
	}

	return (
		<div
			className='relative overflow-hidden h-[calc(100%_-_60px)] mt-3'
			tabIndex={-1}>
			<div className='inset-0 absolute overflow-hidden z-50'>
				<div className='relative flex-grow h-full'>
					<DragDropContext onDragEnd={onDragEnd}>
						<Droppable
							droppableId='column'
							type='column'
							direction='horizontal'>
							{provided => (
								<ol
									className='overflow-x-auto overflow-y-hidden inset-0 select-none pb-2 pt-1 mb-2 flex flex-row list-none px-2 absolute'
									ref={provided.innerRef}
									{...provided.droppableProps}>
									{orderedData?.map((col: WorkSpaceColType, idx) => (
										<WorkSpaceColumns
											id={col.id}
											key={col.id}
											work={col.work}
											title={col.title}
											index={idx}
										/>
									))}
									{provided.placeholder}
								</ol>
							)}
						</Droppable>
					</DragDropContext>
				</div>
			</div>
		</div>
	);
};

export default MainWorkSpace;
