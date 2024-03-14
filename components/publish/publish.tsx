import React, { useEffect, useState } from "react";
import { Globe, Link, MonitorPlay } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import { toast } from "sonner";

import { Button, Popover, PopoverContent, PopoverTrigger } from "../ui";
import { useGetPublicDocsQuery, useUpdatePublishMutation } from "./operation";

type ParamsType = {
	documentId: string;
};
const Publish = () => {
	const params = useParams<ParamsType>();
	const pathname = usePathname();

	const hostname = typeof window !== "undefined" && location.origin;
	const linkPreview = `${hostname}/preview/${params.documentId}`;

	const { data: document } = useGetPublicDocsQuery(params.documentId);
	const { mutateAsync: updatePublish } = useUpdatePublishMutation();

	const [isPublish, setIsPublish] = useState<boolean | undefined>(
		document?.isPublished
	);

	const handleUpdatePublished = async () => {
		const promise = updatePublish({
			id: params?.documentId,
			isPublished: true
		});

		return toast.promise(promise, {
			loading: "Đang xuất bản trang web",
			success: () => {
				setIsPublish(true);
				return "Xuất bản trang web thành công";
			}
		});
	};

	const handleUpdateUnPublished = async () => {
		const promise = updatePublish({
			id: params?.documentId,
			isPublished: false
		});
		return toast.promise(promise, {
			loading: "Đang huỷ xuất bản trang web",
			success: () => {
				setIsPublish(false);
				return "Huỷ xuất bản trang web thành công";
			}
		});
	};

	const onNextWebsite = () =>
		typeof window !== "undefined" && window.open(linkPreview, "_blank");

	const onCopy = (text: string) => {
		if (!navigator.clipboard) return null;
		const clipboardItem = new ClipboardItem({
			"text/plain": new Blob([text], { type: "text/plain" })
		});
		navigator.clipboard.write([clipboardItem]).then(() => {
			toast.success("Sao chép thành công");
		});
	};

	useEffect(() => {
		setIsPublish(document?.isPublished);
	}, [document]);

	return (
		<Popover>
			<PopoverTrigger asChild>
				{pathname.includes("documents") && (
					<Button variant='ghost' className='h-max py-1 px-2 rounded-sm'>
						Chia sẻ
					</Button>
				)}
			</PopoverTrigger>
			<PopoverContent
				forceMount
				side='bottom'
				align='end'
				className='w-[400px] p-8'>
				{isPublish ? (
					<div className='flex flex-col gap-2'>
						<div className='flex items-center gap-2'>
							<span className='relative flex h-3 w-3'>
								<span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75' />
								<span className='relative inline-flex rounded-full h-3 w-3 bg-sky-500' />
							</span>
							<p className='text-sm font-medium text-sky-500'>
								website đang được công khai
							</p>
						</div>
						<div className='flex items-center'>
							<div className='border rounded-sm py-1 px-2 bg-slate-50 flex items-center w-full h-7 rounded-tr-none rounded-br-none'>
								<input
									disabled
									value={linkPreview}
									className='text-sm bg-none w-full'
								/>
							</div>
							<div
								className='border border-l-0 h-7 flex justify-center items-center p-1 w-7 rounded-sm rounded-tl-none rounded-bl-none cursor-pointer'
								onClick={() => onCopy(linkPreview)}>
								<Link />
							</div>
						</div>

						<div className='flex justify-between gap-2 mt-8'>
							<Button
								variant='outline'
								className='w-full'
								onClick={handleUpdateUnPublished}>
								Huỷ công khai
							</Button>
							<Button
								className='w-full flex items-center gap-2'
								onClick={onNextWebsite}>
								<Globe className='h-5 w-5' />
								Xem trang
							</Button>
						</div>
					</div>
				) : (
					<div className='flex w-full flex-col items-center justify-center gap-2'>
						<MonitorPlay />
						<p className='text-center font-medium text-sm'>Xuất bản lên web</p>
						<span className='text-center font-normal text-xs'>
							Xuất bản một trang web tĩnh của trang này.
						</span>
						<Button className='w-full mt-6' onClick={handleUpdatePublished}>
							Xuất bản
						</Button>
					</div>
				)}
			</PopoverContent>
		</Popover>
	);
};

export default Publish;
