"use client";

import React, { useContext, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { WorkSpaceColumns, WorkSpaceContext } from ".";
import { WorkSpaceColType } from "@/types";

const initial = Array.from({ length: 10 }, (v, k) => k).map(k => {
	const custom = {
		id: `id-${k}`,
		content: `Quote ${k}`
	};

	return custom;
});

const initialCol = Array.from({ length: 5 }, (v, k) => k).map(k => {
	const custom = {
		title: `title-${k}`
	};

	return custom;
});

const grid = 8;
const reorder = (list: any, startIndex: any, endIndex: any) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

const MainWorkSpace = () => {
	const { workSpaceCol } = useContext(WorkSpaceContext);

	const [columns, setColumns] = useState(initialCol);
	const [state, setState] = useState({ quotes: initial });
	function onDragEnd(result: any) {
		if (!result.destination) {
			return;
		}

		const source = result.source;
		const destination = result.destination;

		if (
			source.droppableId === destination.droppableId &&
			source.index === destination.index
		) {
			return;
		}

		if (result.type === "COLUMN") {
			const reorderedorder = reorder(columns, source.index, destination.index);

			// setColumns(reorderedorder);

			return;
		}

		if (result.destination.index === result.source.index) {
			return;
		}

		const quotes = reorder(
			state.quotes,
			result.source.index,
			result.destination.index
		);

		setState({ quotes: quotes as any });
	}

	return (
		<div
			className='relative overflow-hidden h-[calc(100%_-_60px)] mt-3'
			tabIndex={-1}>
			<div className='inset-0 absolute overflow-hidden z-50'>
				<div className='relative flex-grow h-full'>
					<DragDropContext onDragEnd={onDragEnd}>
						<Droppable droppableId='list' type='COLUMN'>
							{provided => (
								<ol
									className='overflow-x-auto overflow-y-hidden inset-0 select-none pb-2 pt-1 mb-2 flex flex-row list-none px-2 absolute'
									ref={provided.innerRef}
									{...provided.droppableProps}>
									{workSpaceCol?.map((col: WorkSpaceColType, idx) => (
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
