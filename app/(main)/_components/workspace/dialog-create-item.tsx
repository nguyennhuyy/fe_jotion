"use client";
import React, { useContext } from "react";

import {
	Button,
	Dialog,
	DialogContent,
	DialogHeader,
	Textarea
} from "@/components/ui";
import { WorkSpaceContext } from ".";

const DialogCreateItem = () => {
	const { openCreateItem, dataCol, onToggleCreateItem } =
		useContext(WorkSpaceContext);

	console.log("dataCol", dataCol);
	return (
		<Dialog open={openCreateItem} onOpenChange={onToggleCreateItem}>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<h2 className='text-black font-medium text-lg'>
						Thêm tiêu đề thẻ cho cột{" "}
						<span className='text-green-800'>{dataCol?.title}</span>
					</h2>
				</DialogHeader>
				<div className='flex flex-col'>
					<Textarea
						className='resize-none h-10'
						cols={1}
						placeholder='Nhập tiêu đề thẻ'
					/>
					<div className='flex items-center gap-2 mt-3 ml-auto'>
						<Button>Thêm thẻ</Button>
						<Button variant='outline' onClick={onToggleCreateItem}>
							Huỷ
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default DialogCreateItem;
