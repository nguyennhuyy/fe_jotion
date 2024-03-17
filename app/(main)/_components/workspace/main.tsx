"use client";

import React, { useContext, useEffect, useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";

import { WorkSpaceColumns, WorkSpaceContext } from ".";
import { CreateListType, WorkSpaceListType } from "@/types";
import { Button, Input } from "@/components/ui";
import { useParams } from "next/navigation";

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
}

const MainWorkSpace = () => {
	const {
		workList,
		handleCreateWorkList,
		handleUpdateBoard,
		handleUpdateCard
	} = useContext(WorkSpaceContext);

	const params = useParams();

	const [isNew, setIsNew] = useState<boolean>(false);
	const [orderedData, setOrderedData] = useState<
		WorkSpaceListType[] | undefined
	>(workList?.list);

	useEffect(() => {
		setOrderedData(workList?.list);
	}, [workList]);

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
				orderedData as WorkSpaceListType[],
				source.index,
				destination.index
			).map((item, index) => ({ ...item, order: index }));

			setOrderedData(items);
			handleUpdateBoard?.(items);
		}

		//người dùng di chuyển card
		if (type === "card") {
			let newOrderedData = [...(orderedData as WorkSpaceListType[])];

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
			if (!sourceList.cards) {
				sourceList.cards = [];
			}

			//kiểm tra card đã tồn tại trong list đích
			if (!destList.cards) {
				destList.cards = [];
			}

			//di chuyển card cùng column
			if (source.droppableId === destination.droppableId) {
				const reorderedCards = reorder(
					sourceList.cards,
					source.index,
					destination.index
				);
				reorderedCards.forEach((card, idx) => {
					card.order = idx;
				});
				sourceList.cards = reorderedCards;

				setOrderedData(newOrderedData);
				handleUpdateCard?.(reorderedCards);
			} else {
				//xoá card khỏi danh sách
				const [movedCard] = sourceList.cards.splice(source.index, 1);

				//gán id mới cho card đã di duyển
				movedCard.workListId = destination.droppableId;

				//thêm card vào danh sách đích
				destList.cards.splice(destination.index, 0, movedCard);

				//cập nhật lại vị trí card trong danh sách nguồn
				sourceList.cards.forEach((card, idx) => {
					card.order = idx;
				});

				//cập nhật lại vị trí của card trong danh sách đích
				destList.cards.forEach((card, idx) => {
					card.order = idx;
				});

				setOrderedData(newOrderedData);
				handleUpdateCard?.(destList.cards);
			}
		}
	}

	const handleChangeIsNew = () => setIsNew(!isNew);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<CreateListType>();

	const onSubmit = (data: CreateListType) => {
		try {
			const newData = {
				...data,
				boardId: (params?.workspaceId as string) ?? ""
			};
			handleCreateWorkList?.(newData);
			handleChangeIsNew();
			reset(undefined);
		} catch (error) {}
	};

	return (
		<div
			style={{
				backgroundImage: `url(${workList?.board.imageThumb})`
			}}
			className='relative overflow-hidden h-[calc(100%_-_48px)] pt-3 bg-no-repeat bg-center bg-cover'
			tabIndex={-1}>
			<div className='h-full'>
				<div className='relative flex-grow h-full'>
					<DragDropContext onDragEnd={onDragEnd}>
						<Droppable
							droppableId='column'
							type='column'
							direction='horizontal'>
							{provided => (
								<div className='h-full flex overflow-x-auto overflow-y-hidden pr-4'>
									<ol
										className='select-none pb-2 pt-1 mb-2 flex flex-row list-none px-2 h-full'
										ref={provided.innerRef}
										{...provided.droppableProps}>
										{orderedData?.map((col: WorkSpaceListType, idx) => (
											<WorkSpaceColumns
												id={col.id}
												key={col.id}
												cards={col.cards}
												title={col.title}
												index={idx}
											/>
										))}
										{provided.placeholder}
									</ol>

									<div className='bg-secondary h-max mt-1 flex flex-col gap-1 p-2 rounded-xl min-w-[272px]'>
										{isNew ? (
											<form onSubmit={handleSubmit(onSubmit)}>
												<Input
													autoFocus
													{...register("title", {
														required: true
													})}
													error={errors.title}
													placeholder='Nhập tiêu đề danh sách'
												/>
												<div className='flex items-center gap-3 mt-2'>
													<Button onClick={handleSubmit(onSubmit)}>
														Thêm mới
													</Button>
													<div>
														<X
															className='w-5 h-5 cursor-pointer'
															onClick={handleChangeIsNew}
														/>
													</div>
												</div>
											</form>
										) : (
											<Button
												onClick={handleChangeIsNew}
												variant='secondary'
												className='mt-2 rounded-xl flex gap-2 h-12 bg-slate-200 hover:bg-slate-300'>
												<Plus className='w-5 h-5' />
												Thêm danh sách mới
											</Button>
										)}
									</div>
								</div>
							)}
						</Droppable>
					</DragDropContext>
				</div>
			</div>
		</div>
	);
};

export default MainWorkSpace;
