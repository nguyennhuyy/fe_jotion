"use client";
import { cn } from "@/lib/utils";
import {
	ChevronLeftIcon,
	MenuIcon,
	PlusCircle,
	Search,
	Settings
} from "lucide-react";
import { usePathname } from "next/navigation";
import React, { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";

import { api } from "@/convex/_generated/api";
import { Item, UserItem } from ".";

const Navigation = () => {
	const pathname = usePathname();
	const isMoble = useMediaQuery("(max-width: 768px)");

	const documents = useQuery(api.documents.get);
	const create = useMutation(api.documents.create);

	const isResizingRef = useRef(false);
	const sidebarRef = useRef<ElementRef<"aside">>(null);
	const navbarRef = useRef<ElementRef<"div">>(null);

	const [isResetting, setIsResetting] = useState<boolean>(false);
	const [isCollapsed, setIsCollapsed] = useState<boolean>(isMoble);

	const handleMouseDown = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		event.stopPropagation();
		event.preventDefault();
		isResizingRef.current = true;

		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);
	};

	const handleMouseMove = (event: MouseEvent) => {
		if (!isResizingRef.current) return;
		let newWidth = event.clientX;

		if (newWidth < 240) newWidth = 240;
		if (newWidth > 480) newWidth = 480;

		if (sidebarRef.current && navbarRef.current) {
			sidebarRef.current.style.width = `${newWidth}px`;
			navbarRef.current.style.setProperty("left", `${newWidth}px`);
			navbarRef.current.style.setProperty(
				"width",
				`calc(100% - ${newWidth}px)`
			);
		}
	};

	const handleMouseUp = (event: MouseEvent) => {
		isResizingRef.current = false;
		document.removeEventListener("mousemove", handleMouseMove);
		document.removeEventListener("mouseup", handleMouseUp);
	};

	const resetWitdth = () => {
		if (sidebarRef.current && navbarRef.current) {
			setIsCollapsed(false);
			setIsResetting(false);

			sidebarRef.current.style.width = isMoble ? "100%" : "240px";
			navbarRef.current.style.setProperty(
				"width",
				isMoble ? "0" : "calc(100% - 240px)"
			);
			navbarRef.current.style.setProperty("left", isMoble ? "100%" : "240px");

			setTimeout(() => setIsResetting(false), 300);
		}
	};

	const collape = () => {
		if (sidebarRef.current && navbarRef.current) {
			setIsCollapsed(true);
			setIsResetting(true);

			sidebarRef.current.style.width = "0";
			navbarRef.current.style.setProperty("left", "0");
			navbarRef.current.style.setProperty("width", "100%");

			setTimeout(() => setIsResetting(false), 300);
		}
	};

	const handleCreate = () => {
		const promise = create({ title: "Untitled" });
		toast.promise(promise, {
			loading: "Creating an new note...",
			success: "New note created!",
			error: "Failed to create a new note"
		});
	};
	useEffect(() => {
		isMoble ? collape() : resetWitdth();
	}, [isMoble]);

	useEffect(() => {
		isMoble && collape();
	}, [pathname, isMoble]);
	return (
		<>
			<aside
				ref={sidebarRef}
				className={cn(
					"group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-50",
					isResetting && "transition-all ease-in-out duration-300",
					isMoble && "w-0"
				)}>
				<div
					onClick={collape}
					role='button'
					className={cn(
						"h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
						isMoble && "opacity-100"
					)}>
					<ChevronLeftIcon className='h-6 w-6' />
				</div>
				<div>
					<UserItem />
					<Item label='Search' icon={Search} onClick={() => {}} isSearch />
					<Item label='New page' icon={PlusCircle} onClick={() => {}} />
					<Item label='Settings' icon={Settings} onClick={() => {}} />
				</div>
				<div className='mt-4'>
					{(documents || []).map(document => (
						<p key={document?._id}>{document.title}</p>
					))}
				</div>
				<div
					onMouseDown={handleMouseDown}
					onClick={resetWitdth}
					className='opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0'
				/>
			</aside>
			<div
				ref={navbarRef}
				className={cn(
					"absolute top-0 z-[9999] left-60 w-[calc(100%-24px)]",
					isResetting && "transition-all ease-in-out duration-300",
					isMoble && "left-0 w-full"
				)}>
				<nav className='bg-transparent px-3 py-2 w-full'>
					{isCollapsed && (
						<MenuIcon
							onClick={resetWitdth}
							role='button'
							className='w-6 h-6 text-muted-foreground'
						/>
					)}
				</nav>
			</div>
		</>
	);
};

export default Navigation;
