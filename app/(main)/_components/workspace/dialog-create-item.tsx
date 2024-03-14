"use client";
import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import dayjs from "dayjs";
import { CalendarIcon, X } from "lucide-react";

import {
	Badge,
	Button,
	Calendar,
	Dialog,
	DialogContent,
	DialogHeader,
	Input,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Textarea
} from "@/components/ui";
import { WorkSpaceContext } from ".";
import { useCreateWorkItemMutation } from "../../_query";
import { CreateWorkItemType } from "@/types";
import { Spinner } from "@/components/spinner";
import { cn } from "@/lib";
const DialogCreateItem = () => {
	const { openCreateItem, dataCol, onToggleCreateItem, refetchCol } =
		useContext(WorkSpaceContext);

	const [valueTags, setValueTags] = useState<string>();
	const [tags, setTags] = useState<string[]>([]);

	const { mutateAsync: createWorkItem, isPending } =
		useCreateWorkItemMutation();

	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors }
	} = useForm<CreateWorkItemType>();

	const onSubmit = (data: CreateWorkItemType) => {
		const newBody = {
			...data,
			workSpaceColId: dataCol?.id ?? "",
			tags
		};
		const promise = createWorkItem(newBody);
		toast.promise(promise, {
			loading: "Đang tạo thẻ...",
			success: () => {
				refetchCol?.();
				onToggleCreateItem?.();
				reset(undefined);
				setTags([]);
				return "Tạo thẻ thành công";
			}
		});
	};

	const handleKeyDownTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && e.keyCode === 13) {
			e.preventDefault();
			setTags((prev: any) => (prev ? [...prev, valueTags] : [valueTags]));
			setValueTags("");
		}
	};

	const handleRemoveTag = (idx: number) =>
		setTags(() => tags.filter((_, index) => index !== idx));

	return (
		<Dialog open={openCreateItem} onOpenChange={onToggleCreateItem}>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<h2 className='text-black font-medium text-lg'>
						Thêm tiêu đề thẻ cho cột{" "}
						<span className='text-green-800'>{dataCol?.title}</span>
					</h2>
				</DialogHeader>
				<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
					<Input
						{...register("title", {
							required: "Yêu cầu tiêu đề"
						})}
						error={!!errors?.title?.message}
						placeholder='Tiêu đề thẻ*'
					/>
					<Textarea
						{...register("content")}
						className='resize-none h-10'
						cols={1}
						placeholder='Nội dung'
					/>
					<Controller
						control={control}
						name='date'
						render={({ field }) => (
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant={"outline"}
										className={cn(
											"pl-3 text-left font-normal",
											"text-muted-foreground"
										)}>
										{field.value ? (
											dayjs(field?.value).format("DD-MM-YYYY")
										) : (
											<span>Ngày kết thúc </span>
										)}
										<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
									</Button>
								</PopoverTrigger>
								<PopoverContent className='w-full p-0' align='start'>
									<Calendar
										mode='single'
										selected={field.value}
										onSelect={field.onChange}
										disabled={date => date < new Date()}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
						)}
					/>

					<Input
						value={valueTags}
						onChange={e => setValueTags(e.target.value)}
						onKeyDown={handleKeyDownTags}
						placeholder='#Hashtag'
					/>
					<div className='flex gap-1.5'>
						{tags?.map((tag, idx) => (
							<Badge
								key={idx}
								className='flex items-center justify-between gap-1.5 rounded bg-[#1f845a]'>
								{tag}
								<div role='button' onClick={() => handleRemoveTag(idx)}>
									<X className='w-4 h-4' />
								</div>
							</Badge>
						))}
					</div>
					<div className='flex items-center gap-2 mt-3 ml-auto'>
						<Button onClick={handleSubmit(onSubmit)}>
							{isPending ? <Spinner /> : "Thêm thẻ"}
						</Button>
						<Button
							type='button'
							variant='outline'
							onClick={onToggleCreateItem}>
							Huỷ
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default DialogCreateItem;
