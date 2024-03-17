"use client";

import React from "react";
import { Star } from "lucide-react";

import { BoardItem, BoardItemCreate } from ".";
import { useListBoardQuery } from "../../_query";
import { Spinner } from "@/components/spinner";

const ListBoard = () => {
	const { data: listBoard, isPending } = useListBoardQuery();

	if (isPending)
		return (
			<div className='w-full h-full min-h-screen flex justify-center items-center'>
				<Spinner />
			</div>
		);
	return (
		<div className='p-4 pt-8 gap-4 flex flex-col'>
			<div className='flex items-center gap-3'>
				<Star className='' />
				<h2 className='text-xl font-semibold'>Danh sách bảng</h2>
			</div>
			<section className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-3'>
				<BoardItemCreate />
				{listBoard?.map(board => (
					<BoardItem
						key={board.id}
						id={board.id}
						title={board.title}
						imageThumb={board.imageThumb}
					/>
				))}
			</section>
		</div>
	);
};

export default ListBoard;
