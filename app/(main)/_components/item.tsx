"use client";
import { LucideIcon, MoreHorizontal, Trash } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/components/ui";

interface ItemProps {
	id?: String;
	documentIcon?: string;
	active?: boolean;
	isSearch?: boolean;
	label: string;
	onClick?: () => void;
	onDelete?: () => void;
	icon: string | LucideIcon;
}

const Item = ({
	id,
	label,
	onClick,
	onDelete,
	icon: Icon,
	active,
	documentIcon,
	isSearch
}: ItemProps) => {
	return (
		<div
			onClick={onClick}
			role='button'
			className={cn(
				"group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium pl-[15px]",
				active && "bg-primary/5 text-primary"
			)}>
			{documentIcon ? (
				<div className='shrink-0 mr-2 text-[18px] w-[18px]'>{documentIcon}</div>
			) : (
				<Icon className='shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground' />
			)}
			<span className='truncate'>{label}</span>

			{!!id && (
				<div className='ml-auto flex items-center gap-x-2 group-hover:opacity-100'>
					<DropdownMenu>
						<DropdownMenuTrigger onClick={e => e.stopPropagation()} asChild>
							<div
								role='button'
								className='opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600'>
								<MoreHorizontal className='h-4 w-4 text-muted-foreground' />
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent className='w-60' align='start' side='right'>
							<DropdownMenuItem
								className='cursor-pointer'
								onClick={e => {
									e.stopPropagation();
									onDelete?.();
								}}>
								<Trash className='h-4 w-4 mr-2' />
								Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			)}

			{isSearch && (
				<kbd className='ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100'>
					<span className='text-xs'>⌘</span>K
				</kbd>
			)}
		</div>
	);
};

export default Item;

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
	return (
		<div
			style={{
				paddingLeft: level ? `${level * 12 + 25}px` : "12px"
			}}
			className='flex gap-x-2 py-[3px]'>
			<Skeleton className='h-4 w-4' />
			<Skeleton className='h-4 w-[30%]' />
		</div>
	);
};
