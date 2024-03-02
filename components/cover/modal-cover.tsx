"use client";

import { useCoverStore } from "@/store";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from "../ui";
import { Gallery } from "./gallery";
import { Upload } from "./upload";

export const ModalCover = () => {
	const { isOpen, onClose } = useCoverStore();
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='min-h-[322px]'>
				<DialogHeader>
					<Tabs defaultValue='gallery'>
						<TabsList className='bg-transparent'>
							<TabsTrigger
								value='gallery'
								className='data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none'>
								Bộ sưu tập
							</TabsTrigger>
							<TabsTrigger
								value='upload'
								className='data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none'>
								Tải lên
							</TabsTrigger>
						</TabsList>
						<TabsContent value='gallery'>
							<Gallery />
						</TabsContent>
						<TabsContent value='upload' className='h-full'>
							<Upload />
						</TabsContent>
					</Tabs>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};
