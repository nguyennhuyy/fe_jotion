import React, { ReactNode, useState } from "react";
import { File } from "lucide-react";
import { useRouter } from "next/navigation";

import {
	Button,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from "./ui";
import { documentStore } from "@/store";
import { DocumentItem } from "@/types";
import { ModeToggle } from "./mode-toggle";

type SearchCommandType = {
	render?: () => ReactNode;
	disableCmd?: boolean;
};
const SearchCommand = ({ render, disableCmd }: SearchCommandType) => {
	const router = useRouter();
	const [open, setOpen] = useState(false);

	const { documents } = documentStore();

	const onOpenShare = () => {
		setOpen(open => !open);
	};

	const onSelect = (id: string) => {
		router.push(`/documents/${id}`);
		onOpenShare();
	};

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey) && !disableCmd) {
				e.preventDefault();
				setOpen(open => !open);
			}
		};
		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	return (
		<>
			{render ? (
				<slot onClick={onOpenShare}>{render?.()}</slot>
			) : (
				<div className='flex items-center justify-end px-7 py-1 sticky inset-0 z-50 bg-white shadow dark:bg-secondary gap-2'>
					<Button
						variant='ghost'
						onClick={onOpenShare}
						className='rounded-sm h-max py-1 px-2 dark:hover:bg-slate-400'>
						Chia sẻ
					</Button>
					<ModeToggle />
				</div>
			)}
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder='Tìm kiếm tài liệu...' />
				<CommandList>
					<CommandEmpty>Không tìm thấy tài liệu.</CommandEmpty>
					<CommandGroup heading='Tài liệu'>
						{documents?.map((document: DocumentItem) => (
							<CommandItem
								key={document.id}
								value={`${document.id}-${document.title}`}
								title={document.title}
								onSelect={() => onSelect(document.id)}>
								{document.icon ? (
									<p className='mr-2 text-[18px]'>{document.icon}</p>
								) : (
									<File className='mr-2 h-4 w-4' />
								)}
								<span>{document.title}</span>
							</CommandItem>
						))}
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</>
	);
};

export default SearchCommand;
