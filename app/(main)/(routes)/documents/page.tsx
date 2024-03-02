"use client";

import React from "react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { EventName, socket } from "@/lib";
import { userStore } from "@/store";

const Document = () => {
	const { user } = userStore();
	const onCreate = () => {
		socket.emit(EventName.CreateDocument, {
			userId: user?.id,
			parentDocument: null
		});
	};

	return (
		<div className='h-full flex flex-col items-center justify-center space-y-4'>
			<Image
				src='/empty.png'
				height='300'
				width='300'
				alt='Empty'
				className='dark:hidden'
			/>
			<Image
				src='/empty-dark.png'
				height='300'
				width='300'
				alt='Empty'
				className='hidden dark:block'
			/>
			<h2 className='text-lg font-medium'>
				Chào mừng {user?.fullname}&apos;s tới Jotion
			</h2>
			<Button onClick={onCreate}>
				<PlusCircle className='h-4 w-4 mr-2' />
				Tạo một ghi chú
			</Button>
		</div>
	);
};

export default Document;
