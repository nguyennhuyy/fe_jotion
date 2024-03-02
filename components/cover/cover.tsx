"use client";

import Image from "next/image";
import { ImageIcon, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { removeCoverImageApi } from "@/apis";
import { useCoverStore } from "@/store";
import { ModalCover } from "./modal-cover";
import { queryClient } from "../providers/tanstack-provider";
import { TypeQuery } from "./enum";

interface CoverImageProps {
	url?: string;
}

export const Cover = ({ url }: CoverImageProps) => {
	const params = useParams();

	const { url: urlStore, onOpen, onReplace } = useCoverStore();
	const { mutateAsync: removeCoverImage } = useMutation({
		mutationKey: ["RemoveCover"],
		mutationFn: removeCoverImageApi
	});

	const onRemove = async () => {
		if (url) {
			const promise = removeCoverImage(params?.documentId as string);
			toast.promise(promise, {
				loading: "Đang xoá ảnh bìa",
				success: () => {
					onReplace("");
					queryClient.removeQueries({
						queryKey: [TypeQuery.DetailDocument, params.documentId]
					});
					return "Xoá ảnh bìa thành công";
				}
			});
		}
	};

	const onOpenModalUpload = () => onOpen();

	useEffect(() => {
		if (url) {
			onReplace(url);
		}
	}, [url]);

	return (
		<>
			<div
				className={cn(
					"relative w-full group",
					urlStore && "bg-muted h-[35vh] "
				)}>
				{!!urlStore && (
					<Image
						src={urlStore as string}
						fill
						alt='Cover'
						className='object-cover'
					/>
				)}
				{urlStore && (
					<div className='opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2'>
						<Button
							onClick={onOpenModalUpload}
							className='text-muted-foreground text-xs'
							variant='outline'
							size='sm'>
							<ImageIcon className='h-4 w-4 mr-2' />
							Change cover
						</Button>
						<Button
							onClick={onRemove}
							className='text-muted-foreground text-xs'
							variant='outline'
							size='sm'>
							<X className='h-4 w-4 mr-2' />
							Remove
						</Button>
					</div>
				)}
			</div>
			<ModalCover />
		</>
	);
};

Cover.Skeleton = function CoverSkeleton() {
	return <Skeleton className='w-full h-[12vh]' />;
};
