"use client";

import React, { ElementRef, useRef, useState } from "react";
import { ImageIcon, Smile, X } from "lucide-react";

import { IconPicker } from "./icon-picker";
import { Button, Textarea } from "./ui";
import { useCoverStore, userStore } from "@/store";
import { useDebounce } from "usehooks-ts";
import { EventName, socket } from "@/lib";
import { useParams } from "next/navigation";

interface ToolbarProps {
	initialData: any;
}

const Toolbar = ({ initialData }: ToolbarProps) => {
	const params = useParams();
	const { user } = userStore();
	const inputRef = useRef<ElementRef<"textarea">>(null);

	const [isEditing, setIsEditing] = useState(false);
	const [icon, setIcon] = useState(initialData.icon);
	const [value, setValue] = useState(initialData.title);

	const debouncedTitle = useDebounce(value, 700);
	const { onOpen } = useCoverStore();

	const enableInput = () => {
		setIsEditing(true);
		setTimeout(() => {
			setValue(initialData.title);
			inputRef.current?.focus();
		}, 0);
	};

	const disableInput = () => setIsEditing(false);

	const onInput = (value: string) => setValue(value);

	const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === "Enter") {
			event.preventDefault();
			disableInput();
		}
	};

	const onIconSelect = (icon: string) => {
		setIcon(icon);
		socket.emit(EventName.UpdateIconDocument, {
			id: params.documentId,
			userId: user?.id,
			icon
		});
	};

	const onRemoveIcon = () => {
		setIcon(null);
		socket.emit(EventName.UpdateIconDocument, {
			id: params.documentId,
			userId: user?.id,
			icon: null
		});
	};

	React.useEffect(() => {
		const updateTitle = () => {
			socket.emit(EventName.UpdateTitleDocument, {
				id: params.documentId,
				userId: user?.id,
				title: value
			});
		};

		updateTitle();
	}, [debouncedTitle]);

	return (
		<div className='pl-[54px] group relative'>
			{!!icon && (
				<div className='flex items-center gap-x-2 group/icon pt-6'>
					<IconPicker onChange={onIconSelect}>
						<p className='text-6xl hover:opacity-75 transition'>{icon}</p>
					</IconPicker>
					<Button
						onClick={onRemoveIcon}
						className='rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs'
						variant='outline'
						size='icon'>
						<X className='h-4 w-4' />
					</Button>
				</div>
			)}
			<div className='opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4'>
				{!icon && (
					<IconPicker asChild onChange={onIconSelect}>
						<Button
							className='text-muted-foreground text-xs'
							variant='outline'
							size='sm'>
							<Smile className='h-4 w-4 mr-2' />
							Add icon
						</Button>
					</IconPicker>
				)}
				{!initialData.coverImage && (
					<Button
						onClick={onOpen}
						className='text-muted-foreground text-xs'
						variant='outline'
						size='sm'>
						<ImageIcon className='h-4 w-4 mr-2' />
						Add cover
					</Button>
				)}
			</div>
			{isEditing ? (
				<Textarea
					ref={inputRef}
					onBlur={disableInput}
					onKeyDown={onKeyDown}
					value={value}
					onChange={e => onInput(e.target.value)}
					rows={1}
					className='text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none border-none'
				/>
			) : (
				<div
					onClick={enableInput}
					className='pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] min-h-[80px] px-3 py-2'>
					{value || initialData.title}
				</div>
			)}
		</div>
	);
};

export default Toolbar;
