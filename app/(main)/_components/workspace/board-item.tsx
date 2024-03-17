import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { cn } from "@/lib";
import {
	Button,
	Input,
	Label,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Validator
} from "@/components/ui";
import background from "@/mocks/background.json";
import gallery from "@/mocks/gallery.json";
import { useCreateBoardMutation } from "../../_query";
import { CreateBoardType, ResponseCreateBoardType } from "@/types";

type BoardItemType = React.HTMLAttributes<HTMLAnchorElement> & {
	id: string;
	title: string;
	imageThumb: string;
};
const BoardItem = ({
	id,
	className,
	title,
	imageThumb,
	...props
}: BoardItemType) => {
	return (
		<Link
			{...props}
			href={`/workspace/${id}`}
			className={cn(
				"p-2 rounded-[3px] bg-no-repeat bg-center bg-cover",
				className
			)}
			style={{
				backgroundImage: `url(${
					imageThumb ||
					"https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/rainbow.svg"
				})`
			}}>
			<div className='h-[80px]'>
				<div title={title} className='font-semibold text-base text-white'>
					{title}
				</div>
			</div>
		</Link>
	);
};

const BoardItemCreate = () => {
	const backgrounds = [...background, ...gallery];
	const router = useRouter();

	const { mutateAsync: mutateCreateBoard } = useCreateBoardMutation();
	const {
		control,
		watch,
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<CreateBoardType>();

	const watchUrl = watch("imageThumb");

	const onSubmit = async (data: CreateBoardType) => {
		const promise = mutateCreateBoard(data);
		toast.promise(promise, {
			loading: "Đang tạo bảng",
			success: (data: ResponseCreateBoardType) => {
				router.push(`/workspace/${data.id}`);
				return "Tạo bảng thành công";
			}
		});
	};
	return (
		<Popover>
			<PopoverTrigger>
				<div
					className={cn("p-2 rounded-[3px] bg-slate-100")}
					style={{
						backgroundImage: `url(${watchUrl})`
					}}>
					<div className='h-[80px] text-center flex justify-center items-center text-sm'>
						Tạo bảng mới
					</div>
				</div>
			</PopoverTrigger>
			<PopoverContent
				side='right'
				className='border-none shadow-[rgba(9,30,66,0.11)_0_1px_1px_0_,_rgba(9,30,66,0.1)_0_0_1px_0] w-max max-w-[336px]'>
				<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
					<h4 className='text-base text-center font-medium'>Tạo bảng</h4>
					<div className='mt-4'>
						<label className='text-sm font-medium'>Hình nền</label>
						<Controller
							control={control}
							name='imageThumb'
							render={({ field }) => (
								<div className='grid grid-cols-4 gap-2 mt-2'>
									{backgrounds.map((bg, idx) => (
										<div
											onClick={() => field.onChange(bg.url)}
											key={idx}
											className='w-[64px] h-10 rounded bg-no-repeat bg-center cursor-pointer'
											style={{
												backgroundImage: `url(${bg.url})`
											}}
										/>
									))}
								</div>
							)}
						/>
					</div>

					<div className='mt-4 flex flex-col gap-1.5'>
						<Label className='text-sm font-medium mb-1 block'>
							Tiêu đề bảng*
						</Label>
						<Input
							{...register("title", {
								required: "Yêu cầu tiêu đề bảng"
							})}
							autoFocus
							error={errors.title}
						/>
						<Validator className='mt-0' error={errors.title}>
							{errors.title?.message}
						</Validator>
					</div>

					<Button
						onClick={handleSubmit(onSubmit)}
						variant='secondary'
						className='mt-4'>
						Bắt đầu tạo mẫu
					</Button>
				</form>
			</PopoverContent>
		</Popover>
	);
};

export { BoardItem, BoardItemCreate };
